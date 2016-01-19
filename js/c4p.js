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
        presentationIndex = 0,
        preapreDataAndSend = function(htmlSpeakers, htmlPresentations) {
        	var proposition = {},
        		objectsToRead = htmlSpeakers.length + htmlPresentations.length,
        		convertToSpeakersObjects = function(proposition, callback) {
		        	var convertSpeaker = function(htmlSpeaker) {
			    		var jQSpeaker = $(htmlSpeaker),
			    			picEl = jQSpeaker.find('#picture').get(0),
			    			result = {};

						result.firstname = jQSpeaker.find('#name').val();
			    		result.lastname = jQSpeaker.find('#surname').val();
			    		result.email = jQSpeaker.find('#email').val();
			    		result.descrition = jQSpeaker.find('#descrition').val();
			    		result.origin = jQSpeaker.find('#origin').val();
			    		result.teeSize = jQSpeaker.find('#size').val();

						if (picEl.files.length > 0) {
			    			var file = picEl.files[0],
			    				reader = new FileReader();

							reader.onload = function(readerEvt) {
							    var binaryString = readerEvt.target.result;
							    result.picture = btoa(binaryString);
							    proposition.speakers.push(result);
							    objectsToRead--;
							
								if (objectsToRead === 0) {
									callback(proposition);
								}
							};

							reader.readAsBinaryString(file);
						} else {
							proposition.speakers.push(result);
							objectsToRead--;
							
							if (objectsToRead === 0) {
								callback(proposition);
							}
						}
			    	};

		    		$.each(htmlSpeakers, function(i, val) {convertSpeaker(val);});
		        },
        		convertToPresentationObjects = function(proposition, callback) {
		        	var convertPresentation = function(htmlPresentation) {
			    		var jQPresentation = $(htmlPresentation),
			    			result = {};

						result.title = jQPresentation.find('#title').val();
			    		result.description = jQPresentation.find('#description').val();
			    		result.language = jQPresentation.find('#lang').val();

						proposition.presentations.push(result);
						objectsToRead--;
						
						if (objectsToRead === 0) {
							callback(proposition);
						}
			    	};

		    		$.each(htmlPresentations, function(i, val) {convertPresentation(val);});
		        };

        	proposition.speakers = [];
        	proposition.presentations = [];

			convertToPresentationObjects(proposition, send);
			convertToSpeakersObjects(proposition, send);
        },
        send = function(data) {
        	$.post( "localhost:8080", data)
				.done(function( data ) {
					//turn off spiner, give info of success
				})
				.fail(function() {
					//turn off spiner, give info of failure
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
                clone = template
	                        .clone()
	                        .removeClass('hide')
	                        .removeAttr('id')
	                        .attr('data-speaker-index', speakerIndex)
	                        .attr('type', 'speaker')
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
                clone  = template
                            .clone()
                            .removeClass('hide')
                            .removeAttr('id')
                            .attr('data-presentation-index', presentationIndex)
                            .attr('type', 'presentation')
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
        }).on('click', '#c4pSave', function() {
        	var form = $(this.parentElement),
        		formValidation = form.data('formValidation');
        	formValidation.validate();

        	if (formValidation.isValid()) {
        		//turn on spiner
				preapreDataAndSend(form.find("[type=speaker]"), form.find("[type=presentation]"));
        	}

        	return false;
        });
});

function save(el) {

}