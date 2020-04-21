$(document).ready(function () {
    loadContactView();
 });

 function loadContactView(){
    $('.contact-wrapper').append(
        '<div id="map" class="mapa"></div>'+
            '<div class="contact-form">'+
                '<div class="contact-inputs">'+
                    '<div class="top-canvas">'+
                        '<h4 class="title">Contact Us</h4>'+
                        '<button>Send</button>'+
                    '</div>'+
                    '<form>'+
                        '<div class="input-form">'+
                            '<input type="text" name="name" placeholder="Name">'+
                        '</div>'+
                        
                        '<div class="input-form">'+
                            '<input type="email" name="email" placeholder="Email">'+
                        '</div>'+

                        '<div class="input-form">'+
                            '<input type="text" name="phone" placeholder="Phone">'+
                        '</div>'+

                        '<div class="input-form">'+
                            '<input type="text" name="location" placeholder="Location">'+
                        '</div>'+

                        '<div class="textarea-form">'+
                            '<textarea name="asunto" id="asunto" cols="30" rows="10" placeholder="Put some text..."></textarea>'+
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
 }