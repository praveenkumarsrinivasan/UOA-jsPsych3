var consent_view = function() {
    var template1 = _.template(header_template);
    $('#header_template').html( template1 );

    var template2 = _.template(consent_template);
    $('#consent_template').html( template2(consent_data) );
};
