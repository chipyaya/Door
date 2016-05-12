#!/bin/bash
# $1 = 1 (0~20%), 2(20%~40%), ...
# level, filename, centerX, centerY, shoulderW
level=$1
filename=$2
centerX=$3
centerY=$4

path='./kinect_code/NTUAF-Recognize/NTUAF-Recognize/images/'
# convert to png
convert ${path}${filename}.jpeg ${path}${filename}.png

# remove bg
# convert ./public/img/raw.jpg -fuzz 15% -transparent "rgb(255,255,255)" ./public/img/person.png

# crop the circle
convert ${path}${filename}.png \( +clone -threshold -1 -negate -fill white -draw "circle ${centerX},${centerY} 100,${centerY} " \) -alpha off -compose copy_opacity -composite ${path}person.png

# convert ./kinect_code/kinect_test_data/images/${filename}.png \( +clone -threshold -1 -negate -fill white -draw "circle 974,432 974-444,432 " \) -alpha off -compose copy_opacity -composite ./public/img/person.png
	
# convert ./public/img/person.png -resize 300% ./public/img/person.png

# composite 
convert ./public/img/win_loo/win_loo_${level}.png ${path}person.png -geometry +-290+200 -composite ${path}composite.png
