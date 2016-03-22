var exp_view = function() {
    var template1 = _.template(header_template);
    $('#header_template').html(template1);

    var testing_configCollection = allocation_data;
    var exp_configCollection = exp_data;

    var appModel = {

        // config data
        testing_configCollection : testing_configCollection,
        exp_configCollection : exp_configCollection,

        //title templates
        prt_title     : prt_title_template,
        memory_title  : memory_title_template,
        meta_title    : meta_title_template,
        test_title    : test_title_template,
        priming_title : priming_title_template,

        //prt templates
        prt_welcome : prt_welcome_template,
        prt_intro_instruction : prt_intro_instruction_template,

        //memory templates
        memory_instruction1 : memory_instruction1_template,
        memory_instruction2 : memory_instruction2_template,
        memory_bird : memory_bird_template,
        memory_images : memory_images_template,

        //meta-cognition templates
        metacognition_instruction : metacognition_instruction_template,

        //questionnaire templates
        questionnaire_title : questionnaire_title_template,
        questionnaire1 : questionnaire1_template,
        questionnaire2 : questionnaire2_template,
        questionnaire3 : questionnaire3_template,
        questionnaire4 : questionnaire4_template,

        //testing templates
        slider_instructions :  slider_instructions_template,
        testing_bird : testing_bird_template,
        testing_bird_large : testing_bird_large_template,
        testing_bird_small : testing_bird_small_template,
        testing_images : testing_images_template,

        //general templates
        response_time : response_time_template,
        star : star_template,
        star_cloud : star_cloud_template,
        cloud : cloud_template,
        dot : dot_template,
        correct : correct_template,
        incorrect : incorrect_template,
        maybe : maybe_template,

        //exp templates
        exp_fail: exp_fail_template,
        exp_complete: exp_complete_template,
        exp_points: exp_points_template,

        thanks_task: thanks_task_template,

        //app variables
        total_points : 0,
        prt_exp_points : 0,
        mem_exp_points : 0,
        meta_exp_points : 0,
        meta2_exp_points : 0,
        questionnaire_exp_points : 0,

        test_exp_points : 0,
        test_priming_exp_points : 0,

        prt_retry_times : 0,
        mem_retry_times : 0,
        meta_retry_times : 0,
        meta2_retry_times : 0,

        questionnaire_retry_times : 0,
        questionnaire1_correct_ans : 1,
        questionnaire2_correct_ans : 2,
        questionnaire3_correct_ans : 1,
        questionnaire4_correct_ans : 2,

        test_retry_times : 0,
        test_priming_retry_times : 0,

        response_change_in_points: '',

        test_random_val : 0,

        metacognition_task1_random_numbers : [],
        metacognition_task2_random_numbers : [],
        testing_random_numbers : [],
        testing_priming_random_numbers : [],

    };

    exp_flow(appModel);
};
