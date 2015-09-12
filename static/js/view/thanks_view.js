 var thanks_view = function() {       
     var template1 = _.template(header_template);
     $('#header_template').html( template1 );

     var template2 = _.template(thanks_template);
     $('#thanks_template').html( template2(thanks_data) );
 };
