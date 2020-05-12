$(document).ready(function(){
    loadLogin();
    btnsRequestChangePasswd();
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
            '<a href="#" class="forgot-passwd" data-tr="Forgot password?"></a>'+
            '<div>'+
                '<span data-tr="Don’t have an account?"></span>'+
                '<a href="#" data-tr="Sign up" style="margin-left: 5px;" class="open-register"></a>'+
            '</div>'+
        '</div>'+
        '<div class="social-btns">'+
            '<a href="#" class="google-btn-signin"><img alt="google-btn" class="google-btn-signin-img" src="modules/client/modules/login/view/img/btn_google_signin.png"></a>'+
            '<a class="ghub-btn-signin btn btn-block btn-social btn-github">'+
                '<i class="fab fa-github"></i> Sign in with GitHub'+
            '</a>'+
        '</div>'+
        '<a href="#" class="checkLogged">CHECK LOGGED</a>'+
        '<a href="#" class="logoutGoogle">LOG OUT</a>'+ 
    '</form>'
    );
    changeLang();
    $('.open-register').on('click',function(){
        loadRegister();
    });

    $('#login-button').on('click',function(){
        validateLogin();
    });

    $('.forgot-passwd').on('click',function(){
        location.href=pretty("?module=login&function=change_password");
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
            '<div class="social-btns">'+
                '<a href="#" class="google-btn-signin"><img alt="google-btn" class="google-btn-signin-img" src="modules/client/modules/login/view/img/btn_google_signin.png"></a>'+
                '<a class="ghub-btn-signin btn btn-block btn-social btn-github">'+
                    '<i class="fab fa-github"></i> Sign in with GitHub'+
                '</a>'+
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
        ajaxLoginUser(data).then(function(data){
            var result = JSON.parse(data);
            console.log(result);
            if (result.result){
                console.log(result);
                localStorage.setItem('authToken',result.token);
                localStorage.setItem('user_avatar',result.avatar);
                setCartLS();
                
                if (localStorage.getItem('shop-redirect') === null || localStorage.getItem('shop-redirect')==""){
                    location.href=pretty("?module=home");
                    $('#e_email_login').html("");
                    $('#e_passwd_login').html("");
                }else{
                    location.href=pretty("?module=shop");
                    $('#e_email_login').html("");
                    $('#e_passwd_login').html("");
                }
                
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


function setCartLS(){
    $.ajax({
        type: 'POST',
        url: pretty("?module=cart&function=getArrayItemsBD"),
        dataType: 'json',
        data:{"token":localStorage.getItem("authToken")},
        success: function (data) {
            // console.log(data);
            console.log(data);
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
            console.log(data);
            var result = JSON.parse(data);
        
            if (result.result){
                
                toastr.success('Account created successfully! Check your mail inbox!!');
                
                setTimeout(function(){
                    location.reload();
                  },2000);
                
            }else{
                if (result.errorUsername){
                    $('#e_username').html(result.errorUsername);
                }else{
                    $('#e_email').html(result.errorEmail);
                }
                toastr.error('Something went wrong :/ Wait or try again.');
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
    // if(check_auth_state() == true){
        
    // }
    firebase.auth().signOut();

    if (localStorage.getItem('cart-items') !== null && localStorage.getItem('cart-items') != ""){
        var items = itemsLSToArray();
        ajaxSaveCart(items);
    }
    localStorage.removeItem('user_avatar');
    localStorage.removeItem('authToken');
    localStorage.removeItem('cart-items');
    location.href=pretty('?module=home');
}

var ajaxSaveCart = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"items":data,"token":localStorage.getItem('authToken')},
            type: 'POST',
            url: pretty("?module=cart&function=saveItemsCart"),
        })
        .done(function(data){
            console.log(data);
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
            url: pretty("?module=login&function=createUser"),
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
            url: pretty("?module=login&function=loginUser"),
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

function btnsRequestChangePasswd(){
    $('#RequestChangePassword').on('click',function(){
        requestChangePassword();
    });
    $('#ChangePassword').on('click',function(){
        validateNewPassword();
    });
}

function requestChangePassword(){
    var data = $('#email_pass').val();

    $.ajax({
        type: 'POST',
        data: {"email":data},
        url: pretty("?module=login&function=sendEmailRequestPass"),
    })
    .done(function(data){
        console.log(data);
        if (data == "true"){
            toastr.success('Email sent successfully! Check your mail inbox!!');
        }else{
            toastr.error('Something went wrong :/ Wait or try again.');
        }
    })
    .fail(function(data){
        console.log(data);
    });

}

function validateNewPassword(){
    //VALIDATE PASSWORD
    var e = 0;
    if ($('#pass1').val().length==0){
        $('#passwd1_error').html('Password can\'t be blank');
        return 0;
    }else if($('#pass1').val().length < 4 || $('#pass1').val().length > 16){
        $('#passwd1_error').html('Four characters minimum');
        e = 1;
    }else{
        $('#passwd1_error').html('');
    }

    //VALIDATE THAT THE PASSWORDS MATCH
    if ($('#pass1').val().length==0){
        $('#no_matches_error').html('Confirm password can\'t be blank');
        e = 1;
    }else if($('#pass2').val() != $('#pass1').val()){
        $('#no_matches_error').html('Passwords don\'t match');
        e = 1;
    }else{
        $('#no_matches_error').html('');
    }

    if (e == 1){
        return 0;
    }else{

        var passwd = $('#pass1').val();
        var token = get_token_url_by('new_password');

        $.ajax({
            type: 'POST',
            data: {"token":token,"new_password":passwd},
            url: pretty("?module=login&function=change_new_password"),
        })
        .done(function(data){
            console.log(data);
            if (data == "true"){
                toastr.success('Password changed successfully');
                if (localStorage.getItem('return_profile')=="true"){
                    location.href = pretty("?module=profile&function=account_info");
                }
            }else{
                toastr.error('Something went wrong :/ Wait or try again.');
            }
        })
        .fail(function(data){
            console.log(data);
        });


    }
}

function get_token_url_by(indexof){ //La funcion deberia seguir funcionando en caso de que la URL sea modificada, ya que busca la posicion de new_password y el siguiente es el token
    var arr = location.href.split('/');
    var tokenIndex = (arr.indexOf(indexof)+1);
    var Token = arr[tokenIndex];
    return Token;
}