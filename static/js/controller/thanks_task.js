
//psiturk.completeHIT();


/*
 *
 * questionaire Task - Experiment
 *
 */

var thanks_task_exp = function(appModel) {

    function getQueryParams(qs) {
        qs = qs.split('+').join(' ');

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

    var code = getQueryParams(document.location.search).code;
    var payment_code = '';

    if (appModel.total_points>=5 && appModel.total_points<=35) {
        payment_code = '4';
    } else if (appModel.total_points>35 && appModel.total_points <= 45) {
        payment_code = '4.5';
    } else if (appModel.total_points>45) {
        payment_code = '5';
    } else {
        payment_code = '0.20';
    }

    //compile the html templates
    var thanks_task_template = _.template(appModel.thanks_task);
    var thanks_task = thanks_task_template({
        'total_points': appModel.total_points,
        'payment_code': payment_code,
        'code': code
    });

    //define blocks of the experiment
    var exp_name_block = {
        type: "single-stim",
        stimuli: [thanks_task],
        is_html: true
    }

    //blocks in the experiment
    var experiment_blocks = [];
    experiment_blocks.push(exp_name_block);

    jsPsych.init({
        display_element: $('#exp_target'),
        experiment_structure: experiment_blocks,
        on_finish: function() {
            psiturk.saveData({
                success: function() {
                    completeHIT();
                },
                error: function() {
                }
            });
        },
        on_data_update: function(data) {
            psiturk.recordTrialData(data);
        }
    });

};
