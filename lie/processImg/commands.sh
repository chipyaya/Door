#!/bin/bash
# $1 = 1 (0~20%), 2(20%~40%), ...
# level, centerX, centerY, shoulderW, leftShoulderX, leftShoulderY

if [ "$1" == "1" ]; then
	cropX=${2}-${4};
	cropY=${3}-100;		
	x=${4};y=1000;
fi

# remove bg
# convert ./public/img/raw.jpg -fuzz 15% -transparent "rgb(255,255,255)" ./public/img/person.png

# mask yellow
# convert ./public/img/raw.png -fill "rgb(251, 188)" -colorize 20%  ./public/img/person.png

# crop the circle
# convert ./public/img/person.png \( +clone -threshold -1 -negate -fill white -draw "circle ${centerX},${centerY} ${centerX}-444,${centerY} " \) -alpha off -compose copy_opacity -composite ./public/img/person.png
convert ./public/img/raw.png \( +clone -threshold -1 -negate -fill white -draw "circle 552,560 996,560" \) -alpha off -compose copy_opacity -composite ./public/img/person.png
	
# composite 
convert ./public/img/test.png ./public/img/person.png -geometry +150+-30 -composite ./public/img/composite.png
# convert ./public/img/photo_${1}.png ./public/img/person.png -geometry +150+-30 -composite ./public/img/composite.png
