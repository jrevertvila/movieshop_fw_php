$(document).ready(function(){
    localStorage.removeItem("return_profile");
    load_menu_options();
});

function load_options(){
    $('.option-profile').removeClass('toggled');
    option = get_option_profile_url();
    switch (option) {
        case "account_info":
            $("#account_info").addClass('toggled');
            load_personal_info_view();
        break;
        
        case "orders":
            $("#orders").addClass('toggled');
            load_orders_view();
        break;

        case "favs":
            $("#favs").addClass('toggled');
            load_favs_view();
        break;
    
        case "cash":
            $("#cash").addClass('toggled');
            load_cash_view();
        break;

        default:
            $("#account_info").addClass('toggled');
            load_personal_info_view();
        break;
    }
}

function menu_btns_onclick(){
    $('.option-profile').on('click',function(){
        id = $(this).attr('id');
        $('.option-profile').not($('#'+id)).removeClass('toggled'); //Se quita la clase toggled de todos los botones excepto este para dar impresión de más velocidad en cuanto al tiempo de carga.
        if (id != "logout_op"){
            location.href=pretty("?module=profile&function="+id);
        }
    });
    $('#logout_op').on('click',function(){
        $.getScript( "/movieshop_fw_php/modules/client/modules/login/view/js/controller_login.js", function() {
            logout();
        });
    });
}

function load_menu_options(){
    get_data_user().then(function(data){
        $('.profile-pool-left').append(
            '<div class="canvas-title-pool-left">'+
                '<span class="title-pool-left" data-tr="My Account"></span>'+
            '</div>'+
            
            '<div class="canvas-img-profile"></div>'+
            '<div class="canvas-saldo-profile">'+
                '<span class="saldo-profile" data-tr="Balance:"></span><span class="saldo-profile">'+data.saldo+'€</span>'+
            '</div>'+
            '<div class="canvas-options-profile">'+
                '<div class="option-profile noselect" id="account_info">'+
                    '<span>Personal information</span>'+
                '</div>'+
                '<div class="option-profile noselect" id="orders">'+
                    '<span>Orders</span>'+
                '</div>'+
                '<div class="option-profile noselect" id="favs">'+
                    '<span>Favorites</span>'+
                '</div>'+
                '<div class="option-profile noselect" id="cash">'+
                    '<span>Add Cash</span>'+
                '</div>'+
                '<div class="option-profile noselect" id="logout_op">'+
                    '<span>Log Out</span>'+
                '</div>'+
            '</div>'
        );
        $('.canvas-img-profile').append(
            ' <img class="img-profile" src="'+localStorage.getItem('user_avatar')+'">'
        );
        menu_btns_onclick();
        load_options();
    });
}

function load_personal_info_view(){
    
    get_data_user().then(function(data){
        if (data.name == null)
            data.name = "";
        if(data.surnames == null)
            data.surnames = "";
        
        $('.profile-pool-right').append(
            '<div class="title-section-profile">'+
                '<span>Personal information</span>'+
            '</div>'+
            '<div class="wrapper-pool-right">'+
                '<div class="info-user-profile">'+
                    '<div class="info-user-row name-profile">'+
                        '<span data-tr="Name:"></span>'+
                        '<input type="text" name="name_profile" id="name_profile" class="form-control" disabled value="'+data.name+'">'+
                    '</div>'+
                    '<div class="info-user-row surnames-profile">'+
                        '<span data-tr="Surnames:"></span>'+
                        '<input type="text" name="surnames_profile" id="surnames_profile" class="form-control" disabled value="'+data.surnames+'">'+
                    '</div>'+
                    '<div class="info-user-row username-profile">'+
                        '<span data-tr="Username:"></span>'+
                        '<input type="text" name="username_profile" id="username_profile" class="form-control" disabled value="'+data.username+'">'+
                    '</div>'+
                    '<div class="info-user-row email-profile">'+
                        '<span data-tr="Email:"></span>'+
                        '<input type="text" name="email_profile" id="email_profile" class="form-control" disabled value="'+data.email+'">'+
                    '</div>'+
                    '<div class="info-user-row">'+
                        '<span data-tr="Password:"></span>'+
                        '<input type="button" name="password_profile" id="password_profile" class="form-control btn btn-primary" disabled value="Change Password">'+
                    '</div>'+
                    '<div class="info-user-row">'+
                        '<span data-tr="Registration date:"></span>'+
                        '<input type="text" name="registration_profile" id="registration_profile" class="form-control" disabled value="'+data.registration_date+'">'+
                    '</div>'+
                    '<div class="canvas-btn-edit-profile">'+
                        '<a href="#" class="btn-edit-profile" data-tr="Edit Profile"></a>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );
        $('.btn-edit-profile').on('click',function(){
            $.confirm({
                title: 'Change user information',
                content: 'Be careful with the data you change!',
                buttons: {
                    ok: {
                        text: 'Confirm',
                        btnClass: 'btn-blue',
                        keys: ['enter', 'shift'],
                        action: function(){
                            console.log("YES");
                            $('#name_profile').removeAttr("disabled");
                            $('#surnames_profile').removeAttr("disabled");
                            if(data.account_type == "local"){
                                $('#password_profile').removeAttr("disabled");
                            }

                            $('.canvas-btn-edit-profile').empty();
                            $('.canvas-btn-edit-profile').append(
                                '<a href="#" class="btn-edit-profile btn_cancel" data-tr="Cancel"></a>'+
                                '<span class="separator-btns"></span>'+
                                '<a href="#" class="btn-edit-profile btn_apply" data-tr="Apply changes"></a>'
                            );
                            changeLang();

                            $('.btn_cancel').on('click',function(){
                               location.reload();
                            });

                            $('.btn_apply').on('click',function(){
                                var nameVal = $('#name_profile').val();
                                var surnamesVal = $('#surnames_profile').val();;
                                $.ajax({
                                    data: {"name":nameVal,"surnames":surnamesVal,"id":data.id},
                                    type: 'POST',
                                    url: pretty("?module=profile&function=update_user_data"),
                                })
                                .done(function(){
                                    location.reload();
                                })
                                .fail(function(data){
                                    console.log(data);
                                });
                             });
                        }
                    },
                    cancel: function () {
                       
                    }
                }
            });
        });

        $('#password_profile').on('click',function(){
            localStorage.setItem("return_profile","true");
            location.href = pretty("?module=login&function=new_password&param=")+data.token_recover;
        });

    });
    
    

}

function load_orders_view(){
    $('.profile-pool-right').append(
        '<div class="title-section-profile">'+
            '<span>Orders</span>'+
        '</div>'+
        '<div class="wrapper-pool-right">'+
        '<div class="wrapper-orders">'+
        '<table id="table_orders" class="table table-striped table-bordered" style="width:90%">'+
            '<thead>'+
                '<tr>'+
                    '<th>Purchase ID</th>'+
                    '<th>Products</th>'+
                    '<th>State</th>'+
                    '<th>Date</th>'+
                    '<th>Details</th>'+
                '</tr>'+
            '</thead>'+
            '<tbody>'+
        '<div>'+
        '</div>'
    );
    get_checkouts_user().then(function(data){
        for (let x = 0; x < data.length; x++) {
            idRow1 = data[x].formatted_date;
            idRow = idRow1.replace('-','').replace(' ','').replace(':','').replace('-','');

            $("#table_orders").append(
                '<tr>'+
                    '<td>'+idRow+'</td>'+
                    '<td>'+data[x].items+'</td>'+
                    '<td>Success</td>'+
                    '<td>'+data[x].formatted_date+'</td>'+
                    '<td><button class="btn btn-danger color-red-light btn-show-order" id="'+data[x].formatted_date+'">Show</button></td>'+
                '</tr>'
            );
        }
        $("#table_orders").append(
            '</tbody>'+
            '</table>'
        );

        $('#table_orders').DataTable({
            "scrollY":"200px",
            "scrollCollapse": true
        });
        
        $('.btn-show-order').on('click',function(){
            id = $(this).attr('id');
            idRow1 = id;
            idRow = idRow1.replace('-','').replace(' ','').replace(':','').replace('-','');
            get_details_checkout(id).then(function(data){

                html = '<div class="wrapper-details-checkout">';

                for (let i = 0; i < data.length; i++) {
                    html = html +
                    '<div class="item-details-checkout" id="'+data[i].id+'">'+
                        '<img class="details-check-img" src="'+data[i].coverimg+'">'+
                        '<span class="details-check-title">'+data[i].title+'</span>'+
                        '<span class="details-check-quant">Quantity: '+data[i].quantity+'</span>'+
                        '<span class="details-check-price">Total Price: '+(data[i].quantity*data[i].price)+'</span>'+
                    '</div>'
                    
                }

                html = html+'<div>';

                $.dialog({
                    title: 'Purchase Nº '+idRow,
                    content: html,
                    boxWidth: '700px',
                    useBootstrap: false,
                    onOpen: function () {
                        $('.item-details-checkout').on('click',function(){
                            id = $(this).attr('id');
                            localStorage.setItem('movie-details',id);
                            location.href=pretty("?module=shop");
                        });
                    }
                });
            });
        });
        changeLang();
    });


}

function load_favs_view(){
    $('.profile-pool-right').append(
        '<div class="title-section-profile">'+
            '<span>Favourite Movies</span>'+
        '</div>'+
        '<div class="wrapper-pool-right">'+
            '<div class="wrapper-favs"><div>'+
        '</div>'
    );

    //GET FAVOURITES MOVIES OF USER
    var token = localStorage.getItem('authToken');
    $.ajax({
        data: {"token_jwt":token},
        type: 'POST',
        url: pretty("?module=profile&function=get_fav_movies_user"),
    })
    .done(function(data){
        movies = JSON.parse(data);

        for (let i = 0; i < movies.length; i++) {
            $('.wrapper-favs').append(
                '<div class="item-fav" id="'+movies[i].id+'">'+
                    '<div class="overlay"></div>'+
                    '<i class="fas fa-eye show-movie-fav"></i>'+
                    '<i class="fas fa-heart-broken unlike-movie-fav"></i>'+
                    '<img class="img-item-fav" src="'+movies[i].coverimg+'">'+
                    '<span class="title-movie-fav">'+movies[i].title+'</span>'+
                '</div>'
            );
        }
        $('.show-movie-fav').on('click',function(){
            var id = $(this).parent().attr('id')
            localStorage.setItem('movie-details',id);
            location.href=pretty('?module=shop');
        });

        $('.unlike-movie-fav').on('click',function(){
            var id = $(this).parent().attr('id')
            $.ajax({
                type: 'POST',
                url: pretty("?module=profile&function=removeFav"),
                data: {"id_movie":id,"token":localStorage.getItem('authToken')},
                success: function () {
                },
                error: function(data) {
                    console.log(data);
                }
            });
            $(this).parent().remove();
        });
        
    })
    .fail(function(data){
        console.log(data);
    });
}

function load_cash_view(){
    $('.profile-pool-right').append(
        '<div class="title-section-profile">'+
            '<span>Add Cash</span>'+
        '</div>'+
        '<div class="wrapper-pool-right">'+
            
        '</div>'
    );
}

function get_option_profile_url(){
        var arr = location.href.split('/');
        var optionIndex = (arr.indexOf('profile')+1);
        var option = arr[optionIndex];
        return option;
}


var get_data_user = function() {
    var token = localStorage.getItem('authToken');
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"token_jwt":token},
            type: 'POST',
            url: pretty("?module=profile&function=get_data_user"),
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

var get_checkouts_user = function() {
    var token = localStorage.getItem('authToken');
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"token_jwt":token},
            type: 'POST',
            url: pretty("?module=profile&function=get_checkouts_user"),
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

var get_details_checkout = function(date) {
    var token = localStorage.getItem('authToken');
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {
                "token_jwt":token,
                "date":date
            },
            type: 'POST',
            url: pretty("?module=profile&function=get_details_checkout"),
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
