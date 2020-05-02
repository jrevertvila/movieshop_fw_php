$(document).ready(function(){
    $('.info-button').on('click', function() { //ABRIR INFORMACION FILM AL PULSAR BOTON INFO
        var card_img = $(this).parent().find('.card-shop-img');

        if (!card_img.hasClass('toggled')){
            $('.card-shop-img').removeClass('toggled')
            card_img.addClass('toggled');
        }else{
            card_img.removeClass('toggled');
        }

        var card_data = $(this).parent().find('.card-shop-data');

        if (!card_data.hasClass('toggled-data')){
            $('.card-shop-data').removeClass('toggled-data')
            card_data.addClass('toggled-data');
        }else{
            card_data.removeClass('toggled-data');
        }
    });
    hoverCard();
});

    function hoverCard(){
        $('.card-shop-img').hover( function(){
            $('.buttons-card').css({
                visibility:"visible"
            });
            $('.black-card').css({
                visibility:"visible",
            });
        }, function() {
            $('.buttons-card').css({
                visibility:"hidden"
            });
            $('.black-card').css({
                visibility:"hidden",
            });
        });
        $('.buttons-card').hover( function(){
            $('.buttons-card').css({
                visibility:"visible"
            });
            $('.black-card').css({
                visibility:"visible",
            });
        }, function() {
            $('.buttons-card').css({
                visibility:"hidden"
            });
            $('.black-card').css({
                visibility:"hidden",
            });
        });
        	
        // $('.card-shop-img').off( function(){

        // });
    }