/*
 *
 * Metacognition Task - Experiment
 *
 */

var metacognition_task2_exp = function(appModel) {

    var cloud_flag = 0;
    //random pic to be displayed
    var memory_bird_number = '1';
    var memory_image_numbers = ['2', '3', '4'];

    //compile the html templates
    var memory_bird_template = _.template(appModel.memory_bird);
    var memory_bird = memory_bird_template({
        'memory_bird_number': memory_bird_number
    });

    var memory_images_template = _.template(appModel.memory_images);
    var memory_images = memory_images_template({
        'memory_image_number_1': memory_image_numbers[0],
        'memory_image_number_2': memory_image_numbers[1],
        'memory_image_number_3': memory_image_numbers[2]
    });


    //define the blocks of the experiment
    var exp_name_block = {
        type: "text",
        text: appModel.meta_title + "2",
        cont_key: "mouse"
    };

    var dot_block = {
        type: "text",
        text: appModel.dot,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
        cont_key: "mouse"
    };

    var bird_block = {
        type: "single-stim",
        stimuli: [memory_bird],
        is_html: true,
        //timing_response: appModel.exp_configCollection.meta_image_timing_response,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
        // response_ends_trial: false,
    };

    var slider_function_block = {
        type: 'slider',
        timing_trial: appModel.exp_configCollection.meta_slider_timing_trials,
        timing_response: appModel.exp_configCollection.meta_slider_timing_response,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
    };

    var images_block = {
        type: "single-stim",
        stimuli: [memory_images],
        is_html: true,
        // timing_response: exp_configCollection.meta_image_timing_response,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
        choices: [49, 50, 51]
        // response_ends_trial: false
    };

    var instructions_block = {
        type: "text",
        text: appModel.metacognition_instruction,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
        cont_key: "mouse"
    };

    var star_n_cloud_block = {
        type: "single-stim",
        stimuli: [appModel.star_cloud],
        is_html: true,
        choices: [49, 50]
    };

    var response_block = {
        type: "text",
        text: function() {
            //if the user is confident
            if (getConfidence()) {
                cloud_flag = 0;
                //if user choses the right image then display the correct template
                if (getResponse()) {
                    //award them 1 point
                    //appModel.meta2_exp_points++;
                    //appModel.total_points++;
                    return _.template(appModel.correct)({'correct_msg': ''});
                }
                //else display the incorrect template
                else {
                    return _.template(appModel.incorrect)({'wrong_msg': ''});
                }
            }
            //if the user is not confident then display the half moon template
            else {
                cloud_flag = 1;
                //50% of the time award them '1' point
                var prob = Math.floor((Math.random() * 2) + 1);
                    appModel.response_change_in_points = appModel.exp_configCollection.response_lost;
                if (prob == 2) {
                    //appModel.response_change_in_points = appModel.exp_configCollection.response_won;
                    //appModel.meta2_exp_points++;
                    //appModel.total_points++;
                }
                return appModel.maybe;
            }
        },
        cont_key: "mouse"
    };

    var debrief_block = {
        type: "text",
        text: function() {
            var template = _.template(appModel.response_time);
            return template({
                //'response_time': getAverageResponseTime(),
                'response_time': '',
                'change_in_points': appModel.response_change_in_points,
                'total_points': appModel.total_points
            });
        },
        cont_key: "mouse"
    }

    //function to check if the user was sure
    var getConfidence = function() {
        var trials = jsPsych.data.getTrialsOfType('single-stim');
        var key_press = parseInt(String.fromCharCode(trials[trials.length - 1].key_press), 10);

        if (key_press == 1) {
            return true;
        } else {
            return false;
        }
    }

    // function to get the response of the user
    //if the user chose the right image then return true
    //else return false
    var getResponse = function() {
        var trials = jsPsych.data.getTrialsOfType('single-stim');

        var current_trial = 0;
        //consider last three trails
        current_trial = trials.length - 1;

        //get the image number of the bird displayed
        var re = /(\d.png)/gi
        var num = (trials[current_trial - 2].stimulus).match(re);
        var image_num = parseInt(num[0].toLowerCase().replace('.png', ''), 10);

        //get the image number chosen by the user
        var choice = -1;
        if (trials[current_trial - 1].key_press > -1) { //if user responsed
            var key_press = parseInt(String.fromCharCode(trials[current_trial - 1].key_press), 10) - 1;
            //-1 because we have to chose the corresponding user choice image in the array
            num = (trials[current_trial - 1].stimulus).match(re);
            choice = parseInt(num[key_press].toLowerCase().replace('.png', ''), 10);
        }

        if (image_num == choice) {
            appModel.response_change_in_points = appModel.exp_configCollection.response_won;
            return true;
        } else {
            appModel.response_change_in_points = appModel.exp_configCollection.response_lost;
            return false;
        }
    }

    //function to compute the average response time
    //for trials where handle was clicked
    var getAverageResponseTime = function() {
        var trials = jsPsych.data.getTrialsOfType('slider');

        var sum_rt = 0;
        var valid_trial_count = 0;

        var current_trial = 0;
        if (trials.length > 0) {
            current_trial = trials.length - appModel.exp_configCollection.meta_slider_timing_trials.length;
        }

        for (var i = current_trial; i < trials.length; i++) {
            if (trials[i].r_type == 'handle_clicked' && trials[i].rt > -1) {
                sum_rt += trials[i].rt;
                valid_trial_count++;
            }
        }
        return Math.floor(sum_rt / valid_trial_count);
    }


    //blocks of the experiment
    var experiment_blocks = [];
    experiment_blocks.push(exp_name_block);
    experiment_blocks.push(dot_block);
    experiment_blocks.push(bird_block);
    //experiment_blocks.push(slider_function_block);
    experiment_blocks.push(images_block);
    experiment_blocks.push(instructions_block);
    experiment_blocks.push(star_n_cloud_block);
    experiment_blocks.push(response_block);
    experiment_blocks.push(debrief_block);

    jsPsych.init({
        display_element: $('#exp_target'),
        experiment_structure: experiment_blocks,
        on_finish: function() {
            //count the number of times the exp runs
            appModel.meta2_retry_times++;

            //if the user reaches 5 points in 8 trials then call test exp
            //else call exp_fail

            //if the number of trails exceed 8 trials then call exp_fail
            if (appModel.meta2_retry_times >= appModel.exp_configCollection.meta2_retry_times) {
                exp_fail(appModel);
                return;
            }

            if (cloud_flag == 1) {
                //if the user reaches 5 points then call test exp
                //if (appModel.meta2_exp_points == appModel.exp_configCollection.meta2_min_points) {
                //call test exp
                //appModel.test_random_val = Math.floor((Math.random() * 2) + 1);
                //if (appModel.test_random_val == 1) {
                    //testing_task_exp(appModel);
                //} else {
                    //testing_priming_task_exp(appModel);
                //}

                questionnaire_task_exp(appModel);
                //}
            }
            //else restart the test.
            else {
                appModel.meta2_exp_points = 0;
                metacognition_task2_exp(appModel);
            }
        },
        on_data_update: function(data) {
            psiturk.recordTrialData(data);
        }
    });

}

