$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});
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
        speakerDescValidators = {
            validators: {
                notEmpty: {
                    message: 'Pole musi być wypełnione'
                },
                stringLength: {
	                max: 500,
	                message: 'Za długie'
	            }
            }
        },
        presentationDescValidators = {
            validators: {
                notEmpty: {
                    message: 'Pole musi być wypełnione'
                },
                stringLength: {
	                max: 2000,
	                message: 'Za długie'
	            }
            }
        },
        presentationTitleValidators = {
            validators: {
                notEmpty: {
                    message: 'Pole musi być wypełnione'
                },
                stringLength: {
	                max: 250,
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
        selectionValidators = {
            validators: {
                notEmpty: {
                    message: 'Opcja musi być wybrana'
                }
            }
        },
        speakerIndex = 0,
        presentationIndex = 0;

    $('#proposalForm')
        .formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'speaker[0].name': nameValidators,
                'speaker[0].surname': surnameValidators,
                'speaker[0].email': emailValidators,
                'speaker[0].desc': speakerDescValidators,
                'speaker[0].size': selectionValidators,
                'presentation[0].title': presentationTitleValidators,
                'presentation[0].desc': presentationDescValidators,
                'presentation[0].lang': selectionValidators
            }
        })
        .on('click', '.addSpeakerButton', function() {
            speakerIndex++;
            var template = $('#speakerTemplate'),
                clone    = template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .attr('data-speaker-index', speakerIndex)
                                .insertBefore(template);

            clone
                .find('[name="name"]').attr('name', 'speaker[' + speakerIndex + '].name').end()
                .find('[name="surname"]').attr('name', 'speaker[' + speakerIndex + '].surname').end()
                .find('[name="email"]').attr('name', 'speaker[' + speakerIndex + '].email').end()
                .find('[name="desc"]').attr('name', 'speaker[' + speakerIndex + '].desc').end()
                .find('[name="size"]').attr('name', 'speaker[' + speakerIndex + '].size').end()
                .find('[name="picture"]').attr('name', 'speaker[' + speakerIndex + '].picture').end()
                .find('[name="origin"]').attr('name', 'speaker[' + speakerIndex + '].origin').end();

            $('#proposalForm')
                .formValidation('addField', 'speaker[' + speakerIndex + '].name', nameValidators)
                .formValidation('addField', 'speaker[' + speakerIndex + '].surname', surnameValidators)
                .formValidation('addField', 'speaker[' + speakerIndex + '].email', emailValidators)
                .formValidation('addField', 'speaker[' + speakerIndex + '].desc', speakerDescValidators)
                .formValidation('addField', 'speaker[' + speakerIndex + '].size', selectionValidators);
        })
        .on('click', '.removeSpeakerButton', function() {
            var row  = $(this).parents('.form-group'),
                index = row.attr('data-speaker-index');

            $('#proposalForm')
                .formValidation('removeField', row.find('[name="speaker[' + index + '].name"]'))
                .formValidation('removeField', row.find('[name="speaker[' + index + '].surname"]'))
                .formValidation('removeField', row.find('[name="speaker[' + index + '].email"]'))
                .formValidation('removeField', row.find('[name="speaker[' + index + '].size"]'))
                .formValidation('removeField', row.find('[name="speaker[' + index + '].desc"]'));

            row.remove();
        })
        .on('click', '.addPresentationButton', function() {
            presentationIndex++;
            var template = $('#presentationTemplate'),
                clone    = template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .attr('data-presentation-index', presentationIndex)
                                .insertBefore(template);

            clone
                .find('[name="title"]').attr('name', 'presentation[' + presentationIndex + '].title').end()
                .find('[name="desc"]').attr('name', 'presentation[' + presentationIndex + '].desc').end()
                .find('[name="lang"]').attr('name', 'presentation[' + presentationIndex + '].lang').end();

            $('#proposalForm')
                .formValidation('addField', 'presentation[' + presentationIndex + '].title', presentationTitleValidators)
                .formValidation('addField', 'presentation[' + presentationIndex + '].desc', presentationDescValidators)
                .formValidation('addField', 'presentation[' + presentationIndex + '].lang', selectionValidators);
        })
        .on('click', '.removePresentationButton', function() {
            var row  = $(this).parents('.form-group'),
                index = row.attr('data-presentation-index');

            $('#proposalForm')
                .formValidation('removeField', row.find('[name="presentation[' + index + '].title"]'))
                .formValidation('removeField', row.find('[name="presentation[' + index + '].desc"]'))
                .formValidation('removeField', row.find('[name="presentation[' + index + '].lang"]'));

            row.remove();
        });
});