$(document).ready(function() {
    Handlebars.registerHelper('exists', function(variable, options) {
        if (typeof variable !== 'undefined') {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    var source   = $("#proposals-template").html();
    var template = Handlebars.compile(source);

    jQuery.ajax({
        'type': 'GET',
        // 'url': "http://chickentest-devcrowd.rhcloud.com/proposals",
        'url': "http://superchicken-devcrowd.rhcloud.com/proposals",
        'contentType': 'application/json',
        'accept': 'application/json',
        'success': function( data ) {
            var result = template({proposals: data});
            $("#proposals").html(result);
        }
    });
});
