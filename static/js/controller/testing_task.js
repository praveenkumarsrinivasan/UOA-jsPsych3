/*
 *
 * Testing Task - Experiment
 *
 */

var testing_task_exp = function(appModel) {

    var allocationType = appModel.testing_configCollection.allocationType;
    //var memory_images = appModel.testing_configCollection.allocation2[appModel.test_retry_times];
    //var memory_bird = memory_images[0];
    var memory_bird = appModel.testing_configCollection.allocation2[appModel.test_retry_times];
    var memory_images = [' manipulation x', ' manipulation', ' original'];
    memory_images = _.shuffle(memory_images);

    //compile the html templates
    var testing_bird_template = _.template(appModel.testing_bird);
    var testing_bird_large_template = _.template(appModel.testing_bird_large);
    var testing_bird_small_template = _.template(appModel.testing_bird_small);
    var testing_images_template = _.template(appModel.testing_images);

    var testing_bird;
    var allocationIndex = parseInt((memory_bird-1)/8, 10);//8 images for each type
    //console.log(allocationIndex);
    //console.log(allocationType[allocationIndex]);
    if (allocationType[allocationIndex] == "large size") {
        testing_bird = testing_bird_large_template({
            'memory_bird_number': memory_bird + ' condition'
        });
    } else if (allocationType[allocationIndex] == "small size") {
        testing_bird = testing_bird_small_template({
            'memory_bird_number': memory_bird + ' condition'
        });
    } else {
        testing_bird = testing_bird_template({
            'memory_bird_number': memory_bird + ' condition'
        });
    }
    var testing_images = testing_images_template({
        'memory_image_number_1': memory_bird + memory_images[0],
        'memory_image_number_2': memory_bird + memory_images[1],
        'memory_image_number_3': memory_bird + memory_images[2]
    });

    //define the blocks of the experiment
    var exp_name_block = {
        type: "text",
        text: appModel.test_title,
        cont_key: "mouse"
    };

    var dot_block = {
        type: "text",
        text: appModel.dot,
        timing_post_trial: appModel.exp_configCollection.test_timing_post_trial,
        cont_key: "mouse"
    };

    var bird_block = {
        type: "single-stim",
        stimuli: [testing_bird],
        is_html: true,
        //timing_response: appModel.exp_configCollection.test_image_timing_response,
        timing_post_trial: appModel.exp_configCollection.test_timing_post_trial,
        // response_ends_trial: false,
    };

    var slider_function_block = {
        type: 'slider',
        timing_trial: appModel.exp_configCollection.test_slider_timing_trials,
        timing_response: appModel.exp_configCollection.test_slider_timing_response,
        timing_post_trial: appModel.exp_configCollection.test_timing_post_trial,
    };

    var slider_check_chunk_loop = {
        chunk_type: "while",
        timeline: [slider_function_block],
        continue_function: function(data) {
            var res = getAverageResponseTime().valid_trial_count;
            if (res == appModel.exp_configCollection.test_priming_slider_timing_trials.length) {
                return false;
            } else {
                return true;
            }
        }
    };

    var images_block = {
        type: "single-stim",
        stimuli: [testing_images],
        is_html: true,
        // timing_response: exp_configCollection.test_image_timing_response,
        timing_post_trial: appModel.exp_configCollection.test_timing_post_trial,
        choices: [49, 50, 51]
            // response_ends_trial: false
    };

    //picl between star, cloud and star_cloud blocks in the below mentioned probabilities
    //star - 25%, cloud - 25%, star_cloud - 50%
    //var star_n_cloud_block = {};
    //var val = Math.floor((Math.random() * 4) + 1);
    //switch (val) {
        //case 1:
            //star_n_cloud_block = {
                //type: "text",
                //text: appModel.star,
                //cont_key: "mouse"
            //}
            //break;
        //case 2:
            //star_n_cloud_block = {
                //type: "text",
                //text: appModel.cloud,
                //cont_key: "mouse"
            //}
            //break;
        //case 3:
            //star_n_cloud_block = {
                //type: "single-stim",
                //stimuli: [appModel.star_cloud],
                //is_html: true,
                //choices: [49, 50]
            //};
            //break;
        //case 4:
            //star_n_cloud_block = {
                //type: "single-stim",
                //stimuli: [appModel.star_cloud],
                //is_html: true,
                //choices: [49, 50]
            //};
            //break;
        //default:
            //break;
    //}
    var star_n_cloud_block = {
        type: "single-stim",
        stimuli: [appModel.star_cloud],
        is_html: true,
        //choices: [49, 50]
        choices: [56, 57]
    };

    var response_block = {
        type: "text",
        text: function() {
            if (star_n_cloud_block.type == "text") {
                if (star_n_cloud_block.text[0].match(/star/gi) != null) {
                    //if the user chose star then check
                    //if user chose the right image then display the correct template
                    //else display the incorrect template
                    if (getResponse('star')) {
                        //the user is confident and correct
                        //award them '1' point
                        appModel.test_exp_points++;
                        appModel.total_points++;
                        return _.template(appModel.correct)({'correct_msg': ''});
                    } else {
                        appModel.test_exp_points--;
                        appModel.total_points--;
                        if (appModel.test_exp_points < 0) {
                            appModel.test_exp_points = 0;
                        }
                        if (appModel.total_points < 0) {
                            appModel.total_points = 0;
                        }
                        //the user is confident and incorrect
                        return _.template(appModel.incorrect)({'wrong_msg': ''});
                    }
                } else {
                    //the user chose cloud
                    //the user is not confident
                    //50% of the time award them '1' point
                    var prob = Math.floor((Math.random() * 2) + 1);
                        appModel.response_change_in_points = appModel.exp_configCollection.response_lost2;
                    if (prob == 2) {
                        appModel.response_change_in_points = appModel.exp_configCollection.response_won;
                        appModel.test_exp_points++;
                        appModel.total_points++;
                    }
                    return appModel.maybe;
                }
            } else {
                if (getConfidence()) {
                    //if user chose the right image then display the correct template
                    //else display the incorrect template
                    if (getResponse('star_cloud')) {
                        //the user is confident and correct
                        //award them '1' point
                        appModel.test_exp_points++;
                        appModel.total_points++;
                        return _.template(appModel.correct)({'correct_msg': ''});
                    } else {
                        //the user is confident and incorrect
                        appModel.test_exp_points--;
                        appModel.total_points--;
                        if (appModel.test_priming_exp_points < 0) {
                            appModel.test_priming_exp_points = 0;
                        }
                        if (appModel.total_points < 0) {
                            appModel.total_points = 0;
                        }
                        return _.template(appModel.incorrect)({'wrong_msg': ''});
                    }
                } else {
                    //the user is not confident
                    //50% of the time award them '1' point
                    var prob = Math.floor((Math.random() * 2) + 1);
                        appModel.response_change_in_points = appModel.exp_configCollection.response_lost2;
                    if (prob == 2) {
                        appModel.response_change_in_points = appModel.exp_configCollection.response_won;
                        appModel.test_exp_points++;
                        appModel.total_points++;
                    }
                    return appModel.maybe;
                }
            }
        },
        cont_key: "mouse"
    };

    var debrief_block = {
        type: "text",
        text: function() {
            var template = _.template(appModel.response_time);
            return template({
                'response_time': getAverageResponseTime().response_time,
                'change_in_points': appModel.response_change_in_points,
                'total_points': appModel.total_points
            });
        },
        cont_key: "mouse"
    }

    //function to check if the user was sure
    var getConfidence = function() {
        var trials = jsPsych.data.getTrialsOfType('single-stim');
        var key_press = String.fromCharCode(trials[trials.length-1].key_press);

        //if (key_press == 1) {
            //return true;
        //} else {
            //return false;
        //}
        if (key_press == 8) {
            return true;
        } else if (key_press == 9) {
            return false;
        }
    }

    //function to get the response of the user
    //if the user chose the right image then return true
    //else return false
    var getResponse = function(flag) {
        var trials = jsPsych.data.getTrialsOfType('single-stim');

        var current_trial = 0;
        if (flag == 'star_cloud') {
            //consider last three trails
            current_trial = trials.length - 1;
        } else {
            //consider last two trails
            current_trial = trials.length;
        }

        //get the image number of the bird displayed
        var re1 = /(\d* condition.png)/gi; // regex to match displayed image
        var re2 = /(\d* (original|manipulation|manipulation x).png)/gi; // regex to match
        //console.log(trials);
        //console.log(current_trial);
        var num = (trials[current_trial - 2].stimulus).match(re1);
        var image_num = parseInt(num[0].toLowerCase().replace(' condition.png', ''), 10);
        image_num = image_num + ' original';
        //console.log(image_num);

        //get the image number chosen by the user
        var choice = -1;
        if (trials[current_trial - 1].key_press > -1) { //if user responsed
            var key_press = parseInt(String.fromCharCode(trials[current_trial - 1].key_press), 10) - 1;
            //-1 because we have to chose the corresponding user choice image in the array
            num = (trials[current_trial - 1].stimulus).match(re2);
            choice = num[key_press].toLowerCase().replace('.png', '');
            //console.log(choice);
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
            current_trial = trials.length - appModel.exp_configCollection.test_slider_timing_trials.length;
        }

        for (var i = current_trial; i < trials.length; i++) {
            if (trials[i].r_type == 'handle_clicked' && trials[i].rt > -1) {
                sum_rt += trials[i].rt;
                valid_trial_count++;
            }
        }
        return {
            response_time : Math.floor(sum_rt / valid_trial_count),
            valid_trial_count: valid_trial_count
        }
    }

    var experiment_blocks = [];
    //experiment_blocks.push(exp_name_block);
    experiment_blocks.push(dot_block);
    experiment_blocks.push(bird_block);
    experiment_blocks.push(slider_check_chunk_loop);
    experiment_blocks.push(images_block);
    experiment_blocks.push(star_n_cloud_block);
    experiment_blocks.push(response_block);
    experiment_blocks.push(debrief_block);

    jsPsych.init({
        display_element: $('#exp_target'),
        experiment_structure: experiment_blocks,
        on_finish: function() {
            //count the number of times the exp runs
            appModel.test_retry_times++;

            //total number of trails to run
            //after all the trails, compute the final award for the participant
            //also compute bonus for the person with the highest score
            if (appModel.test_retry_times >= appModel.exp_configCollection.test_retry_times) {
                psiturk.saveData({
                    success: function() {
                        thanks_task_exp(appModel);
                        //compute_award(appModel);
                    },
                    error: function() {
                    }
                });
            } else {
                var val = appModel.testing_configCollection.allocation2[appModel.test_retry_times];
                var allocation = allocationType[parseInt((val-1)/8, 10)];
                console.log(val);
                console.log(allocation);
                if (allocation == 'related prime' || allocation == 'unrelated prime') {
                    testing_priming_task_exp(appModel);
                } else {
                    testing_task_exp(appModel);
                }
            }
        },
        on_data_update: function(data) {
            psiturk.recordTrialData(data);
        }
    });

}
