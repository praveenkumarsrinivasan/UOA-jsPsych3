#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2015 praveenkumarsrinivasan <praveen.sxi@gmail.com>
#
# Distributed under terms of the MIT license.

"""

"""

import csv
import re
import sys


def main(args):
    commands = []
    with open(args[0], 'rb') as csvfile:
        reader = csv.DictReader(csvfile)
        payment = {}
        for row in reader:
            script = './grantBonus.sh -workerid %s -amount %s -assignment %s -reason "Bonus Payment"'
            pay = 0.20

            match = re.search(r'Total Points\s+\: (\d+)', row['trial_stimulus'])
            if match:
                total = int(match.group(1))
                if total >=5 and total <= 35:
                    pay = 4.00
                elif total >= 36 and total <=45:
                    pay = 4.50
                elif total >= 46:
                    pay = 5.00
                else:
                    pay = 0.20
                workerid = row['workerid']
                assignment = row['assignmentid']
                script = script % (workerid, pay, assignment)
                commands.append(script)


    with open(args[1], 'wb') as outfile:
        outfile.write('cd $MTURK_CMD_HOME/bin/\n')
        for command in commands:
            outfile.write(command + '\n')
        outfile.write('cd -\n')
        outfile.close()


if __name__ == "__main__":
    main(sys.argv[1:])

