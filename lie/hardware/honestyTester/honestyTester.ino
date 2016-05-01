const float RATIO=0.25; //ratio of change of value in smoothing
const float THR=30;     //threshold
const char PERIOD=20;   //sampling space in milliseconds

float value=1023;          //value of input(smoothed)
float change=0;         //change of value
unsigned long tTime=0;  //time of last trigger in milliseconds
unsigned long HBCount=0;     //heart beat count

void setup() {
  Serial.begin(9600);
}
void loop(){
  while(1){
    change=RATIO*(analogRead(A0)-value);
    value+=change;
    if(millis()-tTime>300)if(change>THR){
      tTime=millis();
      Serial.println(++HBCount);
    }
    delay(PERIOD);
  }
}
