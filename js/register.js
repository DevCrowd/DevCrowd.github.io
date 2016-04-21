function confirm(meal) {
    $('#throbber').show();
    jQuery.ajax({
        'type': 'POST',
        'url': "http://superchicken-devcrowd.rhcloud.com/participants/" + getIdFromUrl() + "/confirmed",
        'contentType': 'application/json',
        'accept': 'application/json',
        'data': JSON.stringify(meal),
        'success': function( data ) {
            $('#throbber').hide();
            window.location = "regsuc.html#greatSuccess";
        },
        'error': function( data ) {
            $("#failModal").modal();
            $('#throbber').hide();
        }
    });
}
function getIdFromUrl() {
    var regex = new RegExp("[?]id=([a-zA-Z0-9\-]*)", "i"),
        results = regex.exec(window.location.href);
    return decodeURIComponent(results[1]);
}