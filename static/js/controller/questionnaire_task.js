
/*
 *
 * questionnaire Task - Experiment
 *
 */

var questionnaire_task_exp = function(appModel) {

    var questionnaire_exp_points = 0;

    //define blocks of the experiment
    var exp_name_block = {
        type: "text",
        text: appModel.questionnaire_title,
        cont_key: "mouse"
    };

    var questionnaire1_block = {
        type: "single-stim",
        stimuli: [appModel.questionnaire1],
        is_html: true,
        // timing_response: exp_configCollection.meta_image_timing_response,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
        choices: [49, 50]
        // response_ends_trial: false
    };

    var response1_block = {
        type: "text",
        text: function() {
            //if user choses the right image then display the correct template
            if (getResponse(appModel.questionnaire1_correct_ans)) {
                //award them 1 point
                questionnaire_exp_points++;
                return _.template(appModel.correct)({'correct_msg': ''});
            }
            //else display the incorrect template
            else {
                return _.template(appModel.incorrect)({'wrong_msg': ''});
            }
        },
        cont_key: "mouse"
    };

    var questionnaire2_block = {
        type: "single-stim",
        stimuli: [appModel.questionnaire2],
        is_html: true,
        // timing_response: exp_configCollection.meta_image_timing_response,
        timing_post_trial: appModel.exp_configCollection.meta_timing_post_trial,
        choices: [49, 50]
        // response_ends_trial: false
    };

    var response2_block = {
        type: "text",
        text: function() {
            //if user choses the right image then display the correct template
            if (getResponse(appModel.questionnaire2_correct_ans)) {
                //award them 1 point
                questionnaire_exp_points++;
                return _.template(appModel.correct)({'correct_msg': ''});
            }
            //else display the incorrect template
            else {
                return _.template(appModel.incorrect)({'wrong_msg': ''});
            }
        },
        cont_key: "mouse"
    };

    // function to get the response of the user
    //if the user chose the right image then return true
    //else return false
    var getResponse = function(flag) {
        var trials = jsPsych.data.getTrialsOfType('single-stim');

        var current_trial = 0;
        //consider last three trails
        current_trial = trials.length - 1;

        //get the image number chosen by the user
        var choice = -1;
        if (trials[current_trial].key_press > -1) { //if user responsed
            choice = parseInt(String.fromCharCode(trials[current_trial].key_press), 10);
            console.log(choice);
        }

        if (flag == choice) {
            return true;
        } else {
            return false;
        }
    }

    //blocks in the experiment
    var experiment_blocks = [];
    experiment_blocks.push(exp_name_block);
    experiment_blocks.push(questionnaire1_block);
    experiment_blocks.push(response1_block);
    experiment_blocks.push(questionnaire2_block);
    experiment_blocks.push(response2_block);

    jsPsych.init({
        display_element: $('#exp_target'),
        experiment_structure: experiment_blocks,
        on_finish: function() {
            //count the number of times the exp runs
            appModel.questionnaire_retry_times++;

            //if the user fails the test more than 5 times call exp_fail
            if (appModel.questionnaire_retry_times >= appModel.exp_configCollection.questionnaire_retry_times) {
                exp_fail(appModel);
                return;
            }

            //if user reaches '1' point i.e questionnaire_min_points call mem exp
            if (questionnaire_exp_points == appModel.exp_configCollection.questionnaire_min_points) {
                testing_task_exp(appModel);
            }
            //else restart the test.
            else {
                questionnaire_task_exp(appModel);
            }
        },
        on_data_update: function(data) {
            psiturk.recordTrialData(data);
        }
    });

}
