$(document).ready(function() {
    $("#getem").on('click', function() {
        var source   = $("#presentations-template").html(),
            template = Handlebars.compile(source);

        jQuery.ajax({
            'type': 'GET',
            'url': "http://superchicken-devcrowd.rhcloud.com/presentations/full",
            'contentType': 'application/json',
            'accept': 'application/json',
            'headers': {
                'Authorization': 'Basic ' + btoa($("#username-input").val() + ':' + $("#passwd-input").val())
            },
            'success': function( data ) {
                var result = template({presentations: data});
                $("#presentations").html(result);
            }
        });
    });
});
