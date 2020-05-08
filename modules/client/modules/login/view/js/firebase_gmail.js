$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyCpC-wWyh-q81YQhzJKYRdN7MxVLwCKau8",
        authDomain: "movieshop-fw-php.firebaseapp.com",
        databaseURL: "https://movieshop-fw-php.firebaseio.com/",
        projectId: "movieshop-fw-php",
        storageBucket: "",
        messagingSenderId: "441823435522"
    };

    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');

    var authService = firebase.auth();

    $('.google-btn-signin').on('click',function(){
        console.log("GOOGLE");
        authService.signInWithPopup(provider)
        .then(function(result) {
            console.log(result)
            console.log('Hemos autenticado al usuario ', result.user);
            console.log(result.user.displayName);
            console.log(result.user.email);
            console.log(result.user.photoURL);
        })
        .catch(function(error) {
            console.log('Se ha encontrado un error:', error);
        });
    });



    $('.ghub-btn-signin').on('click',function(){
        console.log("GOOGLE");
    });
    $('.checkLoggedGoogle').on('click',function(){
        checkIfLoggedIn();
    });
    $('.logoutGoogle').on('click',function(){
        authService.signOut();
        checkIfLoggedIn();
    });


});


function checkIfLoggedIn()
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