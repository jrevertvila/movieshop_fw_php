
$(document).ready(function(){

    if (localStorage.getItem('authToken')===null){
        
        $('#contact-us').after(
            '<a id="header-register" class="header-button" href="#" data-tr="Login"></a>'
        );
    }else{
        $('#header-cart').after(
            '<div class="user-dropdown">'+
                '<button class="dropbtn"></button>'+
                '<div id="myDropdown" class="dropdown-content">'+
                    '<a id="header-profile" class="" href=# data-tr="Profile"></a>'+
                    '<a id="header-orders" class="" href=# data-tr="Orders"></a>'+
                    '<a id="header-logout" class="" href=# data-tr="Log out"></a>'+
                '</div>'+
            '</div>'
        );
    }


    $('.dropbtn').css('background-image', 'url(' + localStorage.getItem('user_avatar') + ')');

    $('.user-dropdown').on('click', function() {
        $('.dropbtn').addClass('toggled');
        $('#myDropdown').addClass('show');
    });

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdown = $(".dropdown-content");
            
            if (dropdown.hasClass('show')) {
                dropdown.removeClass('show');
                $('.dropbtn').removeClass('toggled');
            }
        }
    }

    $('#header-profile').on('click', function() {
        location.href=pretty("?module=profile");
    });

    $('#header-orders').on('click', function() {
        location.href=pretty("?module=profile&function=orders");
    });

    $( "#header-login" ).hover(
        function() {
            $(this).css({
                "border-bottom": "1.3px solid white",
            })
        }, function() {
            $(this).css({"border-bottom": "1.3px solid transparent"})
        }
    );
    $('#contact-us').on('click', function() {
        console.log("aaaaaa");
        location.href=pretty("?module=contact");
    });

    $('#main-logo').on('click', function() {
        console.log("aaaaaa");
        location.href=pretty("?module=home");
    });

    $('#header-register').on('click', function() {
        location.href=pretty("?module=login");
    });

    $('#header-cart').on('click', function() {
        location.href=pretty("?module=cart");
    });

    $('#shop').on('click', function() {
        localStorage.setItem("shop-genre",null);
        localStorage.setItem("movie-details",null);
        localStorage.setItem("text-movie",null);
        location.href=pretty("?module=shop");
    });

    $('#header-logout').on('click', function() {
        
        $.getScript( "/movieshop_fw_php/modules/client/modules/login/view/js/controller_login.js", function() {
            logout();
        });
        
    });

    $('#header-login').on('click', function() {

        $.ajax({
            type: 'GET',
            url: '/movieshop/module/client/module/home/controller/controller.php?op=usertype',
            dataType: 'json',
            async: false,
            data:{},
            success: function () { //$data es toda la informacion que nos retorna el ajax
                location.href="index.php";
            },
            error: function(){
                location.href="index.php?page=503";
                console.log('error');
            }
        });
        
    });

});


    
    //document.getElementById("myDropdown").classList.toggle("show");
    

  
  // Close the dropdown menu if the user clicks outside of it
