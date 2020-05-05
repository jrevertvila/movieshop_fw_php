$(document).ready(function(){
    loadLogin();
});

function loadLogin(){
    console.log("load");
    if (localStorage.getItem('user_id') !== null && localStorage.getItem('user_type') !== null){ //comprobar que el usuario esté logueado
        location.href="index.php";
        return;
    }
    $(".login-canvas").empty();
    $(".login-canvas").append(
        '<form class="form-login" method="post" name="formLogin" id="formLogin">'+
        '<h4 data-tr="Log in" class="title-form"></h4>'+
        '<span id="e_email_login" class="msg_error"></span>'+
        '<span id="e_passwd_login" class="msg_error"></span>'+
        '<input type="email" name="email-user" id="email-user" class="item-form-login" placeholder="Email">'+
        '<input type="password" name="passwd-user" id="passwd-user" class="item-form-login" placeholder="Password">'+

        '<input name="login" class="login-button" id="login-button" type="button" value="Log In"/>'+
        '<div class="div-left">'+
            '<a href="" class="forgot-passwd" data-tr="Forgot password?"></a>'+
            '<div>'+
                '<span data-tr="Don’t have an account?"></span>'+
                '<a href="#" data-tr="Sign up" style="margin-left: 5px;" class="open-register"></a>'+
            '</div>'+
        '</div>'+
    '</form>'
    );
    changeLang();
    $('.open-register').on('click',function(){
        loadRegister();
    });

    $('#login-button').on('click',function(){
        validateLogin();
    });
}

function loadRegister(){
    $(".login-canvas").empty();
    $(".login-canvas").append(
        '<form class="form-login" method="post" name="formRegister" id="formRegister">'+
            '<h4 data-tr="Sign in" class="title-form"></h4>'+
                '<span id="e_username" class="msg_error"></span>'+
            '<input type="text" name="username" id="username" class="item-form-register" placeholder="Username *">'+

                '<span id="e_email" class="msg_error"></span>'+
            '<input type="email" name="email-user-sign" id="email-user-sign" class="item-form-register" placeholder="Email *">'+

                '<span id="e_passwd" class="msg_error"></span>'+
            '<input type="password" name="passwd-user" id="passwd-user" class="item-form-register" placeholder="Password *">'+

                '<span id="e_passwd2" class="msg_error"></span>'+
            '<input type="password" name="passwd2-user" id="passwd2-user" class="item-form-register" placeholder="Confirm Password *">'+

            '<input name="sign" class="login-button" id="sign-button" type="button" value="Sign In">'+
            '<div class="div-left">'+
                '<div>'+
                    '<span data-tr="Already have an account?"></span>'+
                    '<a href="" data-tr="Log in" style="margin-left: 5px;" class="open-login"></a>'+
                '</div>'+
            '</div>'+
        '</form>'
    );
    changeLang();
    $('.open-login').on('click',function(){
        loadLogin();
    });
    
    $('#sign-button').on('click',function(){
        validateRegister();
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateLogin(){
    var e = 0;
    if ($('#email-user').val().length==0){
        $('#e_email_login').html('Email can\'t be blank');
        e = 1;
    }else if(validateEmail($('#email-user').val()) == false){
        $('#e_email_login').html('Write a correct email');
        e = 1;
    }else{
        $('#e_email_login').html('');
    }

    if (e == 1){
        return 0;
    }else{
        var data = $("#formLogin").serialize();
        console.log(data);
        ajaxLoginUser(data).then(function(data){
            var result = JSON.parse(data);
            console.log(data);
            console.log(result);
            if (result.result){
                //location.reload();
                console.log("LOGGED");
                console.log(result.data);
                setLocalSUserInfo(result.data);
                // if (localStorage.getItem('shop-redirect') === null || localStorage.getItem('shop-redirect')==""){
                //     location.href="index.php";
                //     $('#e_email_login').html("");
                //     $('#e_passwd_login').html("");
                // }else{
                //     location.href="index.php?page=shop";
                //     $('#e_email_login').html("");
                //     $('#e_passwd_login').html("");
                // }
                
            }else{
                if (result.errorEmail){
                    $('#e_email_login').html(result.errorEmail);
                    $('#e_passwd_login').html("");
                } else {
                    $('#e_passwd_login').html(result.errorPassword);
                    $('#e_email_login').html("");
                }
                return 0;
            }
        });

    }
}

function setLocalSUserInfo(data){
    localStorage.setItem('user_id',data.id);
    localStorage.setItem('user_avatar',data.avatar);
    localStorage.setItem('user_type',data.type);
    setCartLS(data.id);
    console.log(data.email);
}

function setCartLS(id_user){
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/cart/controller/controller_cart.php?op=getArrayItemsBD',
        dataType: 'json',
        data:{"id_user":id_user},
        success: function (data) {
            // console.log(data);
            var items = ""; 
            for (let x = 0; x < data.length; x++) {

                for (let i = 0; i < data[x].quantity; i++) {
                    items = items + data[x].id_item+",";
                }
            }
            items = items.substring(0, items.length - 1);
            itemsArr = items.split(',');
            console.log(itemsArr);
            if(localStorage.getItem('cart-items')!==null && localStorage.getItem('cart-items')!=""){
                noLoggedItems = localStorage.getItem('cart-items').split(',');        
                for (let j = 0; j < noLoggedItems.length; j++) {
                    itemsArr.push(noLoggedItems[j]);                
                }    
            }
            // console.log(noLoggedItems);
            
            

            console.log(itemsArr);
            localStorage.setItem('cart-items',itemsArr);
            
        }
    });
}

function validateRegister(){
    var e = 0;

     //VALIDATE USERNAME
    var illegalChars = /\W/;
    if ($('#username').val().length==0){
        $('#e_username').html('Username can\'t be blank');
        e = 1;
    }else if($('#username').val().length < 4 || $('#username').val().length > 15){
        $('#e_username').html('Four characters minimum');
        e = 1;
    }else if(illegalChars.test($('#username').val())){
        $('#e_username').html('Use only numbers, alphabets and underscores');
        e = 1;
    }else{
        $('#e_username').html('');
    }

    //VALIDATE EMAIL
    if ($('#email-user-sign').val().length==0){
        $('#e_email').html('Email can\'t be blank');
        e = 1;
    }else if(validateEmail($('#email-user-sign').val()) == false){
        $('#e_email').html('Write a correct email');
        e = 1;
    }else{
        $('#e_email').html('');
    }

    //VALIDATE PASSWORD
    if ($('#passwd-user').val().length==0){
        $('#e_passwd').html('Password can\'t be blank');
        e = 1;
    }else if($('#passwd-user').val().length < 4 || $('#passwd-user').val().length > 16){
        $('#e_passwd').html('Four characters minimum');
        e = 1;
    }else{
        $('#e_passwd').html('');
    }

    //VALIDATE THAT THE PASSWORDS MATCH
    if ($('#passwd2-user').val().length==0){
        $('#e_passwd2').html('Confirm password can\'t be blank');
        e = 1;
    }else if($('#passwd2-user').val() != $('#passwd-user').val()){
        $('#e_passwd2').html('Passwords don\'t match');
        e = 1;
    }else{
        $('#e_passwd2').html('');
    }

    if (e == 1){
        return 0;
    }else{
        var data = $("#formRegister").serialize();
        ajaxCreateUser(data).then(function(data){
            var result = JSON.parse(data);
        
            if (result.result){
                location.reload();
            }else{
                if (result.errorUsername){
                    $('#e_username').html(result.errorUsername);
                }else{
                    $('#e_email').html(result.errorEmail);
                }
                return 0;
            }
        });

    }
}

function itemsLSToArray(){
    items = localStorage.getItem('cart-items').split(',');
         
    items.sort();
    var arr = [];
    var current = null;
    var cnt = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i] != current) {
            if (cnt > 0) {
                arr.push({
                    "id":current,"cant":cnt
                });
            }
            current = items[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        arr.push({
            "id":current,"cant":cnt
        });
    }
    return arr;
}


function logout(){
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/login/controller/controller_login.php?op=logout',
        dataType: 'json',
        data:{},
        success: function (data) {
            if(data=='logout'){
                if (localStorage.getItem('cart-items') !== null || localStorage.getItem('cart-items') != ""){
                    console.log("entra en if: logout");
                    var items = itemsLSToArray();
                    ajaxSaveCart(items);
                }
                localStorage.removeItem('user_id');
                localStorage.removeItem('user_avatar');
                localStorage.removeItem('user_type');
                localStorage.removeItem('cart-items');
                location.href="index.php";
            }else{
                location.href="index.php?page=503";
                console.log('error');
            }
            
        },
        error: function(){
            location.href="index.php?page=503";
            console.log('error');
        }
    });
}

var ajaxSaveCart = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"items":data,"idUser":localStorage.getItem('user_id')},
            type: 'POST',
            url: '/movieshop/module/client/module/cart/controller/controller_cart.php?op=saveItemsCart',
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}


var ajaxCreateUser = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: data,
            type: 'POST',
            url: '/movieshop/module/client/module/login/controller/controller_login.php?op=createUser',
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}

var ajaxLoginUser = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: data,
            type: 'POST',
            url: '/movieshop/module/client/module/login/controller/controller_login.php?op=loginUser',
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}