function pretty(url) {
    var link="";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i=0;i<url.length;i++) {
    	cont++;
        var aux = url[i].split("=");
        link +=  "/"+aux[1];
    }
    return "http://localhost/movieshop_fw_php" + link;
}

function activity(){
    var token = localStorage.getItem('authToken');

    if (token !== null){
        
        check_activity_token(token).then(function(data){
            console.log(data);
            if (data == "true"){
                get_user_id(token).then(function(data){
                    get_new_token(data.name).then(function(data){
                        localStorage.setItem('authToken',JSON.parse(data))
                    });
                });
            }else{
                toastr.error('Invalid Token');
                setTimeout(() => {
                    $.getScript( "/movieshop_fw_php/modules/client/modules/login/view/js/controller_login.js", function() {
                        logout();
                    });
                }, 800);
            }
        });
    }
}

var check_activity_token = function(token) {
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'POST',
            data: {"token":token},
            url: pretty("?module=login&function=check_activity_token"),
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

var get_user_id = function(token) {
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'POST',
            data: {"token":token},
            url: pretty("?module=login&function=get_user_id"),
        })
        .done(function(data){
            resolve(JSON.parse(data));
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}

var get_new_token = function(id) {
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'POST',
            data: {"id":id},
            url: pretty("?module=login&function=get_new_token"),
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


$(document).ready(function(){
    activity();
});