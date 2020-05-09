$(document).ready(function(){

    cfg_firebase();
    google_auth();
    github_auth();

});

function cfg_firebase(){
    var config = {
        apiKey: "AIzaSyCpC-wWyh-q81YQhzJKYRdN7MxVLwCKau8",
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
            console.log(result);
        })
        .catch(function(error) {
            console.log('Se ha encontrado un error:', error);
        });
    });
    google_auth_buttons();
}

function google_auth_buttons(){
    $('.checkLoggedGoogle').on('click',function(){
        google_check_auth_state();
    });
    $('.logoutGoogle').on('click',function(){
        firebase.auth().signOut();
    });
}



function google_check_auth_state()
{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { //loggeado
            console.log("LOGGED");
            console.log(user);
          
        } else { //not logged
          console.log("Not logged");
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
            
        }).catch(function(error) {
          console.log(error);
        });
    });
    //github_auth_buttons();
}

// function github_auth_buttons(){

// }