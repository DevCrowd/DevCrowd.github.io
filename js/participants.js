$(document).ready(function() {
    $("#getem").on('click', function() {
        var source   = $("#participants-template").html(),
            template = Handlebars.compile(source);

        jQuery.ajax({
            'type': 'GET',
            'url': "http://superchicken-devcrowd.rhcloud.com/participants",
            'contentType': 'application/json',
            'accept': 'application/json',
            'headers': {
                'Authorization': 'Basic ' + btoa($("#username-input").val() + ':' + $("#passwd-input").val())
            },
            'success': function( data ) {
                var result = template({participants: data});
                $("#participants").html(result);
            }
        });
    });
});
