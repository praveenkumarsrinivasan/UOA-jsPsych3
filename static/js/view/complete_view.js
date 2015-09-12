var complete_view = function() {
    var template1 = _.template(header_template);
    $('#header_template').html( template1 );

    var template2 = _.template(complete_template);
    $('#complete_template').html( template2(complete_data) );
};
