$(document).ready(function(){

    cfg_firebase();
    google_auth();
    github_auth();

});

function cfg_firebase(){
    var config = {
        apiKey: API_FIREBASE,
        authDomain: "movieshop-fw-php.firebaseapp.com",
        databaseURL: "https://movieshop-fw-php.firebaseio.com/",
        projectId: "movieshop-fw-php",
        storageBucket: "",
        messagingSenderId: "441823435522"
    };

    firebase.initializeApp(config);
}

//GOOGLE AUTH

function google_auth(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');

    var authService = firebase.auth();

    $('.google-btn-signin').on('click',function(){
        console.log("GOOGLE");
        authService.signInWithPopup(provider)
        .then(function(result) {
            console.log(result.user.providerData[0]);
            var emailArr = result.user.providerData[0].email.split('@');
            var username = emailArr[0];
            
            $.ajax({
                type: 'POST',
                data: {"auth_data":result.user.providerData[0],"username":username},
                url: pretty("?module=login&function=firebase_login"),
            })
            .done(function(data){
                var result = JSON.parse(data);
                console.log(result);
                localStorage.setItem('authToken',result.token);
                localStorage.setItem('user_avatar',result.avatar);

                if (localStorage.getItem('shop-redirect') === null || localStorage.getItem('shop-redirect')==""){
                    location.href=pretty("?module=home");
                    $('#e_email_login').html("");
                    $('#e_passwd_login').html("");
                }else{
                    location.href=pretty("?module=shop");
                    $('#e_email_login').html("");
                    $('#e_passwd_login').html("");
                }

            })
            .fail(function(data){
                console.log(data);
            });

        })
        .catch(function(error) {
            console.log('Se ha encontrado un error:', error);
        });
    });
    google_auth_buttons();
}

function google_auth_buttons(){
    $('.checkLogged').on('click',function(){
        console.log(check_auth_state());
    });
    $('.logoutGoogle').on('click',function(){
        firebase.auth().signOut();
    });
}



function check_auth_state(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user){ //loggeado
            return true;
        }else{ //not logged
            return false;
        }
    });
}

//GITHUB AUTH

function github_auth(){
    var provider = new firebase.auth.GithubAuthProvider();
    var authService = firebase.auth();

    $('.ghub-btn-signin').on('click', function() {
        authService.signInWithPopup(provider)
        .then(function(result) {
            console.log(result);
            var emailArr = result.user.providerData[0].email.split('@');
            var username = emailArr[0];

            $.ajax({
                type: 'POST',
                data: {"auth_data":result.user.providerData[0],"username":username},
                url: pretty("?module=login&function=firebase_login"),
            })
            .done(function(data){
                console.log(data);
                var result = JSON.parse(data);
                console.log(result);
                localStorage.setItem('authToken',result.token);
                localStorage.setItem('user_avatar',result.avatar);
                
                if (localStorage.getItem('shop-redirect') === null || localStorage.getItem('shop-redirect')==""){
                    location.href=pretty("?module=home");
                    $('#e_email_login').html("");
                    $('#e_passwd_login').html("");
                }else{
                    location.href=pretty("?module=shop");
                    $('#e_email_login').html("");
                    $('#e_passwd_login').html("");
                }
            })
            .fail(function(data){
                console.log(data);
            });
            
        }).catch(function(error) {
          console.log(error);
        });
    });
    github_auth_buttons();
}

function github_auth_buttons(){
    $('.checkLogged').on('click',function(){
        console.log(check_auth_state());
    });
}