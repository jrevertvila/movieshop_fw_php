
$(document).ready(function(){

    //CHANGE HEADER-MAIN OPACITY WHILE SCROLLING DOWN
    /*$(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $(".header").css({
            "background-color": function(){
                var elementHeight = 390;
                var value = 1 - (elementHeight - scrollTop) / elementHeight;
                // console.log(value);
                return "rgba(20, 20, 20," + value + " )";
            }        
        });
        
        // console.log(scrollTop);
    });

    //FUNCTION FOR CHANGE THE LENGTH OF BORDER-BOTTOM
    /*$( "#header-login" ).hover(
        function() {
            $(this).css({
                "display": "block",
                "width": "20px",
                "border-bottom": "1px solid white",
                "border-bottom-width": "15px,"
            })
        }, function() {
            $(this).css({"border-bottom": "0px solid white"})
        }
    );*/
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
        location.href="index.php?page=profile";
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
        location.href="index.php?page=contact";
    });

    $('#header-register').on('click', function() {
        location.href="index.php?page=login";
    });

    $('#header-cart').on('click', function() {
        location.href="index.php?page=cart";
    });

    $('#shop').on('click', function() {
        localStorage.setItem("shop-genre",null);
        localStorage.setItem("movie-details",null);
        localStorage.setItem("text-movie",null);
        location.href="index.php?page=shop";
    });

    $('#header-logout').on('click', function() {
        console.log("logout");
        $.getScript( "module/client/module/login/controller/controller_login.js", function() {
            console.log("load"); // Data returned
            logout();
          });
        
        // $.ajax({
        //     type: 'GET',
        //     url: '/movieshop/module/client/module/login/controller/controller_login.php?op=logout',
        //     dataType: 'json',
        //     data:{},
        //     success: function (data) {
        //         if(data=='logout'){
        //             localStorage.removeItem('user_id');
        //             localStorage.removeItem('user_avatar');
        //             localStorage.removeItem('user_type');
        //             localStorage.removeItem('cart-items');
        //             location.href="index.php";
        //         }else{
        //             location.href="index.php?page=503";
        //             console.log('error');
        //         }
                
        //     },
        //     error: function(){
        //         location.href="index.php?page=503";
        //         console.log('error');
        //     }
        // });
        
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
