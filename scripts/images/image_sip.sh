#! /bin/sh
#
# image_sip.sh
# Copyright (C) 2015 praveenkumarsrinivasan <praveen.sxi@gmail.com>
#
# Distributed under terms of the MIT license.
#


#for i in *.jpg; do sips -s format png $i –out Converted/${i%jpg}png;done
#for i in *.jpg; do sips -s format png $i --out Converted/${i/%\.jpg/\.png};done

#final
for i in *.jpg; do sips -s format png $i --out Converted/${i/%\.jpg/\.png};done
for i in *.gif; do sips -s format png $i --out Converted/${i/%\.gif/\.png};done
for i in *.jpeg; do sips -s format png $i --out Converted/${i/%\.jpeg/\.png};done
for i in *.png; do sips -s format png $i --out Converted/${i/%\.png/\.png};done
sips -Z 512 *.png

for i in *.png; do mv $i ${i/Choice A/manipulation}; done
for i in *.png; do mv $i ${i/Choice  A/manipulation}; done
for i in *.png; do mv $i ${i/Choice 1/manipulation}; done
for i in *.png; do mv $i ${i/Choice B/manipulation x}; done
for i in *.png; do mv $i ${i/Choice 2/manipulation x}; done
for i in *.png; do mv $i ${i/Original/original}; done
for i in *.png; do mv $i ${i/original - Copy/original}; done
for i in *.png; do mv $i ${i/Small Size/condition}; done
for i in *.png; do mv $i ${i/Large Size/condition}; done
for i in *.png; do mv $i ${i/Control/condition}; done
for i in *.png; do mv $i ${i/Related Prime/condition}; done
for i in *.png; do mv $i ${i/Low Contrast/condition}; done
for i in *.png; do mv $i ${i/Blur/condition}; done

for i in *.png; do mv $i ${i/%\. png/\.png}; done
for i in *.png; do mv $i ${i/%\ .png/\.png}; done

#rename s/\d\-.+manipulation/$1manipulation *.png -vn

counter=0
for old in *.png; do
    new=$(echo $old | sed -e 's/^.+manipulation/'.$counter.' manipulation/')
    echo $new
    #mv -v "$old" "$new"
    counter=counter+1
done
