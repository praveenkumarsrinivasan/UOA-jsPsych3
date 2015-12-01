#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2015 praveenkumarsrinivasan <praveen.sxi@gmail.com>
#
# Distributed under terms of the MIT license.

"""

"""

import glob, os, re

i=0
j=1
for filename in glob.glob('Converted/*.png'):

     new_name = re.sub(r'\d.+manipulation x', str(j) + ' manipulation x', filename)
     new_name = re.sub(r'\d.+manipulation',   str(j) + ' manipulation',   new_name)
     new_name = re.sub(r'\d.+condition',      str(j) + ' condition',      new_name)
     new_name = re.sub(r'\d.+original',       str(j) + ' original',       new_name)

     os.rename(filename, new_name)
     # print new_name
     i = i + 1
     if i%4 == 0:
        j=j+1

