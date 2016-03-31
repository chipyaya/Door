#!/bin/bash
# $1 = 1 (0~20%), 2(20%~40%), ...

if [ "$1" == "1" ]; then
	cropX=${2}-${4}/2;
	cropY=${2}+100;		
	x=500;y=1000;
fi
convert ./public/img/raw.jpg -fuzz 15% -transparent "rgb(255,255,255)" ./public/img/person.png
convert -crop 500x800+280+150 ./public/img/person.png ./public/img/person2.png
convert ./public/img/bg${1}.png ./public/img/person2.png -geometry +500+1000 -composite ./public/img/composite.png
