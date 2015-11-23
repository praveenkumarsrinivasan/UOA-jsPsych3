var exp_fail = function(appModel) {
    //- Thank you for your participation, however you have not met the criteria for this study
    //- Give a code that sends them to a leaving screen
    //- compute their final award
    //var template = _.template(appModel.attributes.exp_fail);
    //$('#exp-target').html(template({
        //'fail_code': 'FAIL'
    //}));
    thanks_task_exp(appModel);
};

var completeHIT = function() {
    console.log('complete');
    psiturk.completeHIT();
}

//start exp process
var exp_flow = function(appModel) {
    prt_task_exp(appModel);
    //memory_task_exp(appModel);
    //metacognition_task_exp(appModel);
    //metacognition_task2_exp(appModel);
    //questionnaire_task_exp(appModel);
    //testing_task_exp(appModel);
    //testing_priming_task_exp(appModel);
    //thanks_task_exp(appModel);
}
