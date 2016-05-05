//model=arduino nano
//pin definition
#define TCRT5000 A0       //sensor output
#define HB A1             //filtered output
#define SERVO 2
#define LASER 3

//heart beat
const float RATIO=0.25;   //ratio of change of value in smoothing
const float THR=30;       //threshold
const char PERIOD=20;     //sampling space in milliseconds
float value=1023;         //value of input(smoothed)
float change=0;           //change of value
unsigned long tTime=0;    //time of last trigger in milliseconds
unsigned long HBCount=0;  //heart beat count

//servo
const int UPPER=3000;     //upper limit of OCR1A
const int LOWER=1600;     //lower limit of OCR1A
const int STEP_INC=25;    //increasing step of OCR1A
const int STEP_DEC=-200;  //decreasing step of OCR1A
volatile int ocr1a_step=0;  //step of OCR1A


void setup(){
  Serial.begin(9600);
  pinMode(SERVO,OUTPUT);
  pinMode(LASER,OUTPUT);
  TCCR1A=0;                       //Reset Timer1 Control Register A
  TCCR1B=_BV(CS11);               //Timer1 Prescaler=8, 30.51Hz
  OCR1A=LOWER;                    //Output Compare Register A
  TIMSK1=_BV(OCIE1A)+_BV(TOIE1);  //Enable Timer1 Output Compare Match A Interrupt and Overflow Interrupt
}
void loop(){
  while(analogRead(TCRT5000)<100);
  digitalWrite(LASER,HIGH);
  TIMSK1=0;                       //disable Timer1 Interrupt
  ocr1a_step=STEP_INC;            //start scanning
  TIMSK1=_BV(OCIE1A)+_BV(TOIE1);  //enable Timer1 Interrupt
  value=analogRead(HB);
  while(analogRead(TCRT5000)>100){
    change=RATIO*(analogRead(HB)-value);
    value+=change;
    if(millis()-tTime>300)if(change>THR){
      tTime=millis();
      Serial.println(++HBCount);
    }
    delay(PERIOD);
  }
  digitalWrite(LASER,LOW);
  TIMSK1=0;                       //disable timer1 interrupt
  ocr1a_step=0;                   //stop scanning
  OCR1A=LOWER;                    //place servo at LOWER position
  TIMSK1=_BV(OCIE1A)+_BV(TOIE1);  //enable Timer1 Interrupt
}

ISR(TIMER1_OVF_vect){             //ISR for timer1 overflow
  digitalWrite(SERVO,HIGH);
  OCR1A+=ocr1a_step;              //modify duty cycle
  if(OCR1A>UPPER){                //limit detection
    OCR1A=UPPER;
    ocr1a_step=STEP_DEC;
    digitalWrite(LASER,LOW);
  }
  if(OCR1A<LOWER){
    OCR1A=LOWER;
    ocr1a_step=STEP_INC;
    digitalWrite(LASER,HIGH);
  }
}

ISR(TIMER1_COMPA_vect){           //ISR for timer1 compare match A
  digitalWrite(SERVO,LOW);
}
