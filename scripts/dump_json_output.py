#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2015 praveenkumarsrinivasan <praveen.sxi@gmail.com>
#
# Distributed under terms of the MIT license.

"""
Script to dump the JSPsych MySQL JsonOutput ot Terminal
"""
import MySQLdb as mdb
import json
import csv


host   = 'localhost'
user   = 'uoa'
passwd = 'uoapasswd'
db     = 'cognitive_intelligence'
table  = 't_exp14'

conn = mdb.connect(host, user, passwd, db)
cursor = conn.cursor()

cursor.execute("select uniqueid, assignmentid, workerid, hitid, beginhit, endhit, status, datastring from " + table)
res = cursor.fetchall()

with open('test.csv', 'wb') as fp:
    a = csv.writer(fp, delimiter=',')
    rowList = []

    header = [
        'uniqueid', 'assignmentid', 'workerid',
        'hitid', 'beginhit', 'endhit', 'status',
        'trial_number', 'trial_datetime', 'trial_rt',
        'trial_index_global', 'trial_time_elapsed',
        'trial_type', 'trial_keypress', 'trial_stimulus'
        ]
    a.writerow(header)

    for row in res:
        if row[7] != None:
            datastring = json.loads(str(row[7]))
            for trial in datastring['data']:
                datastring_fields = []
                #common columns
                datastring_fields.append(str(row[0]))
                datastring_fields.append(str(row[1]))
                datastring_fields.append(str(row[2]))
                datastring_fields.append(str(row[3]))
                datastring_fields.append(str(row[4]))
                datastring_fields.append(str(row[5]))
                datastring_fields.append(str(row[6]))
                #data string fields
                datastring_fields.append(trial['current_trial'])
                datastring_fields.append(trial['dateTime'])
                datastring_fields.append(trial['trialdata']['rt'])
                datastring_fields.append(trial['trialdata']['trial_index_global'])
                datastring_fields.append(trial['trialdata']['time_elapsed'])
                datastring_fields.append(trial['trialdata']['trial_type'])
                if trial['trialdata']['trial_type'] == "slider":
                    datastring_fields.append(trial['trialdata']['r_type'])
                else:
                    datastring_fields.append(trial['trialdata']['key_press'])
                if trial['trialdata']['trial_type'] == 'single-stim':
                    datastring_fields.append(trial['trialdata']['stimulus'])
                else:
                    datastring_fields.append('')

                a.writerow(datastring_fields)


