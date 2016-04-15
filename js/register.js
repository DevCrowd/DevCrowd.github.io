$(document).ready(function() {
    var nameValidators = {
            validators: {
                notEmpty: {
                    message: 'Pole musi być wypełnione'
                },
                stringLength: {
                    max: 30,
                    message: 'Za długie'
                }
            }
        },
        surnameValidators = {
            validators: {
                notEmpty: {
                    message: 'Pole musi być wypełnione'
                },
                stringLength: {
                    max: 30,
                    message: 'Za długie'
                }
            }
        },
        emailValidators = {
            validators: {
                notEmpty: {
                    message: 'Email musi być podany'
                },
                emailAddress: {
                    message: 'Niepoprawny adres email'
                }
            }
        },
        preapreDataAndSend = function(htmlParticipants) {
            var participant = {},
                jQParticipant = $(htmlParticipants[0]);

            participant.firstname = jQParticipant.find('#name').val();
            participant.lastname = jQParticipant.find('#surname').val();
            participant.email = jQParticipant.find('#email').val();
            participant.origin = jQParticipant.find('#origin').val();
            participant.teeSize = jQParticipant.find('#size').val();

            jQuery.ajax({
                'type': 'POST',
                'url': "http://superchicken-devcrowd.rhcloud.com/participants",
                'contentType': 'application/json',
                'accept': 'application/json',
                'data': JSON.stringify(participant),
                'dataType': 'json',
                'success': function( data ) {
                    $('#throbber').hide();
                    window.location = "regsuc.html#greatSuccess";
                },
                'error': function( data ) {
                    $("#failModal").modal();
                    $('#throbber').hide();
                }
            });
        };

    $('#proposalForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'participant[0].name': nameValidators,
                'participant[0].surname': surnameValidators,
                'participant[0].email': emailValidators
            }
        })
        .on('click', '#registerSave', function() {
            var form = $(this.parentElement.parentElement),
                formValidation = form.data('formValidation');
            formValidation.validate();

            if (formValidation.isValid()) {
                $('#throbber').show();
                preapreDataAndSend(form.find("[type=participant]"));
            }

            return false;
        });
});

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
