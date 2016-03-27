# jpg to png
```
//one
convert XX.jpg XX.png
mogrify -format png XX.jpg
//all
mogrify -format png *.jpg
```

# ImageMagick
```
convert green.jpg -fuzz 30% -transparent "rgb(0,255,0)" trans.png	//green->transparent
convert -flatten img1.png img1-white.png						//transparent->white
convert -rotate -10 snake.gif snake-10.gif
convert -fill OOO.png white opaque green XXX.png	//all green to white
convert -fill OOO.png white opaque green XXX.png	//all green to white
convert blackHat.png -fuzz 30% -alpha set -channel RGBA -fill none -opaque white result.png	//white to transparent



```
# loo
midx = 82+306
midy = 550
