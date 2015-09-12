import csv

allocations = [
       15,
       18,
       31,
       37,
       44,
       10,
       2,
       36,
       42,
       17,
       55,
       29,
       43,
       14,
       35,
       23,
       32,
       9,
       53,
       39,
       16,
       56,
       1,
       27,
       54,
       41,
       52,
       8,
       30,
       34,
       13,
       26,
       3,
       38,
       24,
       51,
       45,
       22,
       40,
       11,
       5,
       50,
       25,
       47,
       20,
       49,
       46,
       6,
       19,
       7,
       48,
       28,
       12,
       21,
       4,
       33
    ]

initial_blocks = [
        "points_block",
        "exp_name_block",
        "instructions_block",
        "dot_block",
        "slider_function_block1",
        "response_block_single",
        "debrief_block",

        "exp_name_block",
        "dot_block",
        "instructions_block1",
        "bird_block",
        "images_block",
        "response_block",
        "debrief_block",

        "exp_name_block",
        "dot_block",
        "bird_block",
        "images_block",
        "instructions_block",
        "star_n_cloud_block",
        "response_block",
        "debrief_block",

        "exp_name_block",
        "dot_block",
        "bird_block",
        "images_block",
        "instructions_block",
        "star_n_cloud_block",
        "response_block",
        "debrief_block",

        "exp_name_block",
        "questionaire1_block",
        "response1_block",
        "questionaire2_block",
        "response2_block"
    ]

normal_block = [
        "exp_name_block",
        "dot_block",
        "bird_block",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "images_block",
        "star_n_cloud_block",
        "response_block",
        "debrief_block",
    ]

priming_block = [
        "exp_name_block",
        "dot_block",
        "bird_block1",
        "dot_block",
        "bird_block2",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "slider_check_chunk_loop",
        "images_block",
        "star_n_cloud_block",
        "response_block",
        "debrief_block",
    ]

allocation_trial_mapping = []

allocation_trial_mapping.extend(initial_blocks)
for val in allocations:
    if val > 20 and val < 41:
        allocation_trial_mapping.extend(priming_block)
    else:
        allocation_trial_mapping.extend(normal_block)
allocation_trial_mapping.append("thanks_task")


with open('trials_allocation_map.csv', 'wb') as fp:
    a = csv.writer(fp, delimiter=',')
    a.writerow(['trial_number', 'trial_name'])
    for i in range(0, len(allocation_trial_mapping), 1):
        a.writerow([i, allocation_trial_mapping[i]])



