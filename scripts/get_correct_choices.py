import csv
import re
from collections import *


result = defaultdict(list)

with open('test.csv', 'rb') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        response = 0
        if row[12] == 'single-stim':
            uniqueid = row[0]
            single_stim = row[14]
            response = int(row[13]) - 48
            res = re.findall(r'(\d+ manipulation.png|\d+ manipulation x.png|\d+ original.png)', single_stim)
            if len(res) == 3:
                correct_option = -1
                for i in range(0, len(res)):
                    if res[i].find('original') != -1:
                        correct_option = i+1
                correct_ans = 0 
                if response == correct_option:
                    correct_ans = 1 
                result[uniqueid].append([res, response, correct_ans])


with open('output_test.csv', 'wb') as csvfile:
    csvwriter = csv.writer(csvfile)
    for k,v in result.items():
        for item in v:
            csvwriter.writerow([k,'| '.join(item[0]), item[1] , item[2]])
