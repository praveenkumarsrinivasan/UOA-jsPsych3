/*
 *
 * PRT Task - Experiment
 *
 */

var prt_task_exp = function(appModel) {

    //variable to hold the result
    var res;

    //define blocks of the experiment
    var points_block = {
        type: "text",
        text: appModel.exp_points,
        cont_key: "mouse"
    };

    var exp_name_block = {
        type: "text",
        text: appModel.prt_title,
        cont_key: "mouse"
    };

    var welcome_block = {
        type: "text",
        text: appModel.prt_welcome,
        cont_key: "mouse"
    };

    var instructions_block = {
        type: "text",
        text: appModel.prt_intro_instruction,
        timing_post_trial: appModel.exp_configCollection.prt_timing_post_trial,
        cont_key: "mouse"
    };

    var slider_function_block1 = {
        type: 'slider',
        timing_trial: [200],
        timing_response: appModel.exp_configCollection.prt_slider_timing_response,
    };

    var dot_block = {
        type: "text",
        text: appModel.dot,
        timing_post_trial: appModel.exp_configCollection.prt_timing_post_trial,
        cont_key: "mouse"
    };

    var slider_function_block2 = {
        type: 'slider',
        timing_trial: appModel.exp_configCollection.prt_slider_timing_trials,
        timing_response: appModel.exp_configCollection.prt_slider_timing_response,
        timing_post_trial: appModel.exp_configCollection.prt_timing_post_trial,
    };

    var response_block_single = {
        type: "text",
        text: function() {
            res = getAverageResponseTime_single();
            if (1 == res.valid_trial_count) {
                //if the user succeeds then award them '1' point
                return _.template(appModel.correct)({'correct_msg': ''});
            }
            //else display the incorrect template
            else {
                return _.template(appModel.incorrect)({'wrong_msg': ''});
            }
        },
        cont_key: "mouse"
    };

    var response_block = {
        type: "text",
        text: function() {
            res = getAverageResponseTime();
            if (appModel.exp_configCollection.prt_slider_timing_trials.length == res.valid_trial_count) {
                //if the user succeeds then award them '1' point
                return _.template(appModel.correct)({'correct_msg': ''});
            }
            //else display the incorrect template
            else {
                return _.template(appModel.incorrect)({'wrong_msg': ''});
            }
        },
        cont_key: "mouse"
    };

    var debrief_block = {
        type: "text",
        text: function() {
            var template = _.template(appModel.response_time);
            return template({
                'response_time': res.response_time,
                'change_in_points': appModel.response_change_in_points,
                'total_points': appModel.total_points
            });
        },
        cont_key: "mouse"
    }

    //function to compute the average response time
    //for trials where handle was clicked
    var getAverageResponseTime_single = function() {
        var trials = jsPsych.data.getTrialsOfType('slider');

        var sum_rt = 0;
        var valid_trial_count = 0;

        var current_trial = 0;
        if (trials.length > 0) {
            current_trial = trials.length - 1;
        }

        for (var i = current_trial; i < trials.length; i++) {
            if (trials[i].r_type == 'handle_clicked' && trials[i].rt > -1) {
                sum_rt += trials[i].rt;
                valid_trial_count++;
            }
        }

        //if the user succeeds then award them '1' point
        if (1 == valid_trial_count) {
            appModel.prt_exp_points++;
            appModel.total_points++;
            appModel.response_change_in_points = appModel.exp_configCollection.response_won;
        } else {
            appModel.response_change_in_points = appModel.exp_configCollection.response_lost;
        }

        return {
            response_time: Math.floor(sum_rt / valid_trial_count),
            valid_trial_count: valid_trial_count,
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
            current_trial = trials.length - appModel.exp_configCollection.prt_slider_timing_trials.length;
        }

        for (var i = current_trial; i < trials.length; i++) {
            if (trials[i].r_type == 'handle_clicked' && trials[i].rt > -1) {
                sum_rt += trials[i].rt;
                valid_trial_count++;
            }
        }

        //if the user succeeds then award them '1' point
        if (appModel.exp_configCollection.prt_slider_timing_trials.length == valid_trial_count) {
            appModel.prt_exp_points++;
            appModel.total_points++;
        }

        //return response_time
        return {
            response_time: Math.floor(sum_rt / valid_trial_count),
            valid_trial_count: valid_trial_count,
        }
    }

    //blocks in the experiment
    var experiment_blocks = [];
    experiment_blocks.push(points_block);
    experiment_blocks.push(exp_name_block);
    //experiment_blocks.push(welcome_block);
    experiment_blocks.push(instructions_block);
    experiment_blocks.push(dot_block);
    experiment_blocks.push(slider_function_block1);
    //experiment_blocks.push(slider_function_block2);
    experiment_blocks.push(response_block_single);
    experiment_blocks.push(debrief_block);

    jsPsych.init({
        display_element: $('#exp_target'),
        experiment_structure: experiment_blocks,
        on_finish: function() {
            //count the number of times the exp runs
            appModel.prt_retry_times++;

            //if the user fails the test more than 5 times call exp_fail
            if (appModel.prt_retry_times >= appModel.exp_configCollection.prt_retry_times) {
                exp_fail(appModel);
                return;
            }

            //if user reaches '1' point i.e prt_min_points call mem exp
            if (appModel.prt_exp_points == appModel.exp_configCollection.prt_min_points) {
                //call mem exp
                memory_task_exp(appModel);
                //thanks_task_exp(appModel);
                //testing_priming_task_exp(appModel);
                
            }
            //else restart the test.
            else {
                prt_task_exp(appModel);
            }
        },
        on_data_update: function(data) {
            psiturk.recordTrialData(data);
        }
    });

}
