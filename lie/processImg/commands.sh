#!/bin/bash
level=$1
filename=$2
centerX=$3
centerY=$4
anotherX=$((${centerX}-450))

path='./kinect_code/NTUAF-Recognize/NTUAF-Recognize/images/'
convert_cmd='C:/Windows/System32/ImageMagick-7.0.1-1-portable-Q16-x64/convert.exe'
# convert to png
${convert_cmd} ${path}${filename}.jpeg ${path}${filename}.png

# remove bg
# convert ./public/img/raw.jpg -fuzz 15% -transparent "rgb(255,255,255)" ./public/img/person.png

# crop the circle
${convert_cmd} ${path}${filename}.png \( +clone -threshold -1 -negate -fill white -draw "circle ${centerX},${centerY} ${anotherX},${centerY} " \) -alpha off -compose copy_opacity -composite ${path}person.png

# convert ./kinect_code/kinect_test_data/images/${filename}.png \( +clone -threshold -1 -negate -fill white -draw "circle 974,432 974-444,432 " \) -alpha off -compose copy_opacity -composite ./public/img/person.png
	
# convert ./public/img/person.png -resize 300% ./public/img/person.png

# composite 
${convert_cmd} ./public/img/win_loo/win_loo_${level}.png ${path}person.png -geometry +-290+200 -composite ${path}composite.png
