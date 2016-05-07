#!/bin/bash
# $1 = 1 (0~20%), 2(20%~40%), ...
# level, filename, centerX, centerY, shoulderW
level=$1
filename=$2
centerX=$3
centerY=$4
shoulderW=$5
anotherX=$(($3-200))

echo ${level} ${filename} ${centerX} ${centerY} ${anotherX}

# convert to png
convert ./kinect_code/kinect_test_data/images/${filename}.jpeg ./kinect_code/kinect_test_data/images/${filename}.png

# remove bg
# convert ./public/img/raw.jpg -fuzz 15% -transparent "rgb(255,255,255)" ./public/img/person.png

# crop the circle
convert ./kinect_code/kinect_test_data/images/${filename}.png \( +clone -threshold -1 -negate -fill white -draw "circle ${centerX},${centerY} ${anotherX},${centerY} " \) -alpha off -compose copy_opacity -composite ./public/img/person.png

# convert ./kinect_code/kinect_test_data/images/${filename}.png \( +clone -threshold -1 -negate -fill white -draw "circle 974,432 974-444,432 " \) -alpha off -compose copy_opacity -composite ./public/img/person.png
	
convert ./public/img/person.png -resize 300% ./public/img/person.png

# composite 
convert ./public/img/win_loo/win_loo_${level}.png ./public/img/person.png -geometry +-280+200 -composite ./public/img/composite.png
# convert ./public/img/photo_${level}.png ./public/img/person.png -geometry +150+-30 -composite ./public/img/composite.png
