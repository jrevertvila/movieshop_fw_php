$(document).ready(function () {
    loadContactView();
 });

 function loadContactView(){
    $('.contact-wrapper').append(
        '<div id="map" class="mapa"></div>'+
        '<div class="contact-form">'+
            '<div class="contact-inputs">'+

                '<form class="form-contact" method="post" name="formContact" id="formContact">'+
                '<div class="top-canvas">'+
                    '<h4 class="title">Contact Us</h4>'+
                    '<button type="button" class="send-contact" id="submit">Send</button>'+
                '</div>'+
                    
                    '<div class="input-form">'+
                        '<span id="e_name_contact" class="msg_error"></span>'+
                        '<input type="text" id="name-contact" name="name-contact" placeholder="Name *" value="Joel Revert Vila">'+
                    '</div>'+
                    
                    '<div class="input-form">'+
                        '<span id="e_email_contact" class="msg_error"></span>'+
                        '<input type="email" id="email-contact" name="email-contact" placeholder="Email *" value="joel.iestacio@gmail.com">'+
                    '</div>'+
                    
                    '<div class="input-form">'+
                        '<span id="e_tlf_contact" class="msg_error"></span>'+
                        '<input type="text" id="tlf-contact" name="tlf-contact" placeholder="Tlf" value="665996125">'+
                    '</div>'+
                    
                    '<div class="input-form">'+
                        '<span id="e_location_contact" class="msg_error"></span>'+
                        '<input type="text" id="location-contact" name="location-contact" placeholder="Location *" value="Spain">'+
                    '</div>'+
                    '<div class="textarea-form">'+
                        '<span id="e_issue_contact" class="msg_error"></span>'+
                        '<textarea name="issue-contact" id="issue-contact" cols="30" rows="10" placeholder="Put some text...  *">TEXTO DE PRUEBA CONTACT</textarea>'+
                    '</div>'+
                '</form>'+
            '</div>'+

            '<div class="contact-info">'+
                '<div class="top-canvas">'+
                    '<h1>Information</h1>'+
                '</div>'+
                
                '<div class="address-info item">'+
                    '<h4>Address</h4>'+
                    '<span>Ontinyent, 46870</span>'+
                    '<span>Av. Almaig, 96</span>'+
                '</div>'+
                '<div class="schedule-info item">'+
                    '<h4>Schedule</h4>'+
                    '<span>Monday to Saturday</span>'+
                '</div>'+
                '<div class="tlf-info item">'+
                    '<h4>Phone</h4>'+
                    '<span>'+
                        'TLF: 962384567'+
                    '</span>'+
                    '<span>'+
                        'MOBILE: 633422376'+
                    '</span>'+
                '</div>'+
            '</div>'+
        '</div>'
    );
    $('.send-contact').on('click',function(){
        validateContact();
    });
 }
 function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateContact(){
    var e = 0;
    //validate email
    if ($('#email-contact').val().length==0){
        $('#e_email_contact').html('Email can\'t be blank');
        e = 1;
    }else if(validateEmail($('#email-contact').val()) == false){
        $('#e_email_contact').html('Write a correct email');
        e = 1;
    }else{
        $('#e_email_contact').html('');
    }

    //validate name
    if ($('#name-contact').val().length==0){
        $('#e_name_contact').html('Name can\'t be blank');
        e = 1;
    }else if($('#name-contact').val().length<5){
        $('#e_name_contact').html('Write name and surname');
        e = 1;
    }else{
        $('#e_name_contact').html('');
    }

    //validate tlf
    if ($('#tlf-contact').val().length==0){
        $('#e_tlf_contact').html('Tlf can\'t be blank');
        e = 1;
    }else if($('#tlf-contact').val().length<8){
        $('#e_tlf_contact').html('Write a correct phone number');
        e = 1;
    }else{
        $('#e_tlf_contact').html('');
    }

    //validate location
    if ($('#location-contact').val().length==0){
        $('#e_location_contact').html('location can\'t be blank');
        e = 1;
    }else if($('#location-contact').val().length<4){
        $('#e_location_contact').html('Write a correct location');
        e = 1;
    }else{
        $('#e_location_contact').html('');
    }

    //validate issue
    if ($('#issue-contact').val().length==0){
        $('#e_issue_contact').html('Issue can\'t be blank');
        e = 1;
    }else if($('#issue-contact').val().length<10){
        $('#e_issue_contact').html('Minimum 30 letters');
        e = 1;
    }else{
        $('#e_issue_contact').html('');
    }



    if (e == 1){
        return 0;
    }else{
        var data = $("#formContact").serialize();
        var check = sendContact(data);
        if(check == true){
            console.log("ENVIADO");
            toastr.success('Email sent successfully!');
        }else{
            console.log("ERROR");
            toastr.error('Something went wrong :/ Wait or try again.');
        }

    }
}

function sendContact(data){
    var a = true;
    $.ajax({
        data: data,
        type: 'POST',
        url: pretty("?module=contact&function=send_contact"),
        success: function (data) {
            if (data == "true"){
                a = true;
            }else{
                a = false;
            }
        },
        error: function(){
            console.log('error');
            a = false;
        }
    });
    return a;
}
