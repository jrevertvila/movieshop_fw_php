$(document).ready(function(){
    //saveItemsOnDB();

    var arr = location.href.split('/');
    if (arr.indexOf('cart')!="-1"){
        loadItemsCart();
    }else{
        cartHeader();
    }
    
});
var totalPrice = 0;

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

function saveItemsOnDB(){

    var arr = itemsLSToArray();

    new Promise(function(resolve, reject){
        $.ajax({
            data: {
                "items":arr,
                "token":localStorage.getItem('authToken')
            },
            type: 'POST',
            url: '/movieshop/module/client/module/cart/controller/controller_cart.php?op=saveItemsCart',
            dataType: 'json',
        })
        .done(function(data){
            if (data == 'ok')
            resolve();

            console.log(data);
            resolve();
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })

}


function loadItemsCart(){

        $('.cart-container').empty();
        $('.cart-summary').empty();

        if(localStorage.getItem('cart-items')===null || localStorage.getItem('cart-items')==""){ // AL RECARGAR LA PAGINA COMPROBAR SI ESTABA EN EL DETAILS
            $('.cart-container').append(
                '<div class="title-cart">'+
                    '<span data-tr="Basket"></span>'+
                    '<span>(0)</span>'+
                '</div>'+
                '<div class="cart-items"></div>'
            );

            $('.cart-summary').append(
                '<h3>Order summary</h3>'+
                '<div class="info-summary"></div>'+
                '<a class="purchase-button-summary" data-tr="Buy">Buy</a>'
            );

            $('.cart-items').append(
                '<span>Any item in the cart</span>'
            );
        }else{
            
            var arr = itemsLSToArray();
            var totalPrice = 0;
            //ADD TITLE BASKET AND LENGTH OF PRODUCTS
            $('.cart-container').append(
                '<div class="title-cart">'+
                    '<span data-tr="Basket"></span>'+
                    '<span>('+arr.length+')</span>'+
                '</div>'+
                '<div class="cart-items"></div>'
            );

            $('.cart-summary').append(
                '<h3>Order summary</h3>'+
                '<div class="info-summary"></div>'+
                '<a class="purchase-button-summary" data-tr="Buy">Buy</a>'
            );

            
            for (let x = 0; x < arr.length; x++) {

                getItemCart(arr[x].id).then(function(data){
                    console.log(data);
                    film = JSON.parse(data)[0];
                    price = parseFloat((arr[x].cant * film.price),10);
                    price = Math.round(price * 100) / 100;
                    totalPrice = (totalPrice + price);
                    totalPrice = Math.round(totalPrice * 100) / 100

                    $('.cart-items').append(
                        '<div class="item-cart" id="'+film.id+'">'+
                            '<img class="item-cart-img" src="'+film.coverimg+'">'+
                            '<div class="item-info">'+
                                '<h4>'+film.title+'</h4>'+
                                '<div class="item-description">'+
                                    '<span style="margin-right:6px;font-weight: bold;">Director:</span>'+
                                    '<span style="margin-right:6px;">'+film.director+'</span>'+
                                    '<span style="margin-right:6px;font-weight: bold;">Release Date:</span>'+
                                    '<span>'+film.release_date+'</span>'+
                                '</div>'+
                                '<div class="price">'+
                                    '<div class="indiv-price-item">'+
                                        '<span style="margin-right:6px;font-weight: bold;">€</span>'+
                                        '<span style="font-weight: bold;">'+film.price+'</span>'+
                                    '</div>'+
                                    '<div class="total-price-item">'+
                                        '<span style="font-weight: bold;">'+arr[x].cant+' X '+film.price+'€ = </span>'+
                                        '<span style="margin-right:6px;font-weight: bold;">'+price+'€</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="item-buttons">'+
                                '<div class="item-quantity">'+
                                    '<a class="minus">-</a>'+

                                    '<input type="number" min="0" max="5" name="quantity" class="quantity-input" value="'+arr[x].cant+'"/>'+

                                    '<a class="plus">+</a>'+
                                '</div>'+
                                '<a class="remove-item-cart" data-tr="Remove">Remove</a>'+
                            '</div>'+
                        '</div>'
                    );
                });
            } //end-for
            updateSummary();
            setTimeout(function() {
                btnRemove();
                btnsQuantity(); 
            },500);
        }
}

function loadCartHeaderItems(){
    
    if(localStorage.getItem('cart-items')===null || localStorage.getItem('cart-items')==""){
        $('.num-items-cart-header').html('(0)');
        $('.cart-header-info').append(
            '<div class="title-cart">'+
                '<span data-tr="Basket"></span>'+
                '<span>(0)</span>'+
            '</div>'
        );
    }else{
        var arr = itemsLSToArray();
        var totalPrice = 0;
        
        $('.num-items-cart-header').html('('+arr.length+')');
        $('.cart-header-info').append(
            '<div class="title-cart">'+
                '<span data-tr="Basket"></span>'+
                '<span>('+arr.length +')</span>'+
            '</div>'
        );
            
        for (let x = 0; x < arr.length; x++) {
            
    
            getItemCart(arr[x].id).then(function(data){
                film = JSON.parse(data)[0];
                
                price = parseFloat((arr[x].cant * film.price),10);
                price = Math.round(price * 100) / 100
                totalPrice = (totalPrice + price);
                totalPrice = Math.round(totalPrice * 100) / 100
                
                $('.cart-header-items').append(
                    '<div class="item-cart" id="'+film.id+'">'+
                        '<img class="item-cart-img" src="'+film.coverimg+'">'+
                        '<div class="item-info">'+
                            '<h4>'+film.title+'</h4>'+
                            '<div class="item-description">'+
                                '<span style="margin-right:6px;font-weight: bold;">Director:</span>'+
                                '<span style="margin-right:6px;">'+film.director+'</span>'+
                                '<span style="margin-right:6px;font-weight: bold;">Release Date:</span>'+
                                '<span>'+film.release_date+'</span>'+
                            '</div>'+
                            '<div class="price">'+
                                '<div class="indiv-quantity-item">'+
                                    '<span style="margin-right:6px;font-weight: bold;">Quantity:</span>'+
                                    '<span style="font-weight: bold;">'+arr[x].cant+'</span>'+
                        
                                '</div>'+
                                '<div class="indiv-price-item">'+
                                    
                                    '<span style="margin-right:6px;font-weight: bold;">Price:</span>'+
                                    '<span style="font-weight: bold;">'+Math.round(film.price * 100) / 100+'€</span>'+
                                '</div>'+
                                '<div class="total-price-item">'+
                                    '<span style="font-weight: bold;">Total Price: </span>'+
                                    '<span style="margin-right:6px;font-weight: bold;">'+price+'€</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="item-buttons" style="display:none">'+
                                '<div class="item-quantity">'+
                                    '<a class="minus">-</a>'+
    
                                    '<input type="number" min="0" max="5" name="quantity" class="quantity-input" value="'+arr[x].cant+'"/>'+
    
                                    '<a class="plus">+</a>'+
                                '</div>'+
                                '<a class="remove-item-cart" data-tr="Remove">Remove</a>'+
                            '</div>'+
                        '</div>'+
                        
                    '</div>'
                );
            });
        } //end-for
    
        
    
        setTimeout(function() {
            // btnRemove();
            // btnsQuantityHeader(); 
            $('.purchase-button-summary').on('click', function() {
                location.href=pretty("?module=cart");
            });
            $('.totalPrice').html(totalPrice);
        },500);
        $('.cart-header-summary').append(
            '<h3>Order summary</h3>'+
            '<div class="info-summary">'+
                '<span>Total Price:</span>'+
                '<span class="totalPrice"></span>'+
            '</div>'+
            '<a class="purchase-button-summary" data-tr="View In Cart"></a>'
        );
    }
    
}

function btnsQuantityHeader(){

    $('.purchase-button-summary').on('click', function() {
        location.href=pretty("?module=cart");
    });

    $('.plus').on('click', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        var p4 = p3.parent();
        items = localStorage.getItem('cart-items').split(',');
        items.push(p4.attr('id'));
        localStorage.setItem('cart-items',items);
        location.reload();
    });
    
    $('.minus').on('click', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        var p4 = p3.parent();
        items = localStorage.getItem('cart-items').split(',');
        for (let i = 0; i < items.length; i++) {
            if (items[i] == p4.attr('id')){
                console.log(i);
                items.splice(i,1);
                break;
            }
            
        }
        localStorage.setItem('cart-items',items);
        location.reload();
    });

    $('.quantity-input').on('change', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        var p4 = p3.parent();
        items = localStorage.getItem('cart-items').split(',');
        items2=[];
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            if (items[i] != p4.attr('id')){
                items2.push(items[i]);
            }
        }
        console.log(items2);
        var leng=$(this).val();
        console.log(leng);
        for (let j = 0; j < leng; j++) {
            items2.push(p4.attr('id'));
        }
        console.log(items2);
        localStorage.setItem('cart-items',items2);
        location.reload();
    });
}

function cartHeader(){
    
    loadCartHeaderItems();
    changeLang();
    $('.cart-header-hover').hover( function(){
        
        
        $('.cart-header-container').css({
            visibility:"visible",
            width:"400px"

        });
        
    }, function() {

        $('.cart-header-container').css({
            visibility:"hidden",
            width:"0px"

        });
        
    });
}

function updateSummary(){
    saldo = getUserBalance().then(function(saldo){
        
        var arr = itemsLSToArray();
        var totalPrice = 0;
        for (let x = 0; x < arr.length; x++) {
            
            getItemCart(arr[x].id).then(function(data){
                film = JSON.parse(data)[0];
    
                price = parseFloat((arr[x].cant * film.price),10);
                price = Math.round(price * 100) / 100
                totalPrice = (totalPrice + price);
                totalPrice = Math.round(totalPrice * 100) / 100
            });
    
        }

        setTimeout(function() {
            finalSaldo = (saldo[0].saldo - totalPrice);
            $('.info-summary').append(
                '<span data-tr="Balance">Balance: '+saldo[0].saldo+'€</span><br>'+
                '<span>Total Price: '+totalPrice+'€</span>'+
                '<hr>'+
                '<span data-tr="Balance">Final Balance: '+finalSaldo+'€</span>'+
                ''
            );
        },500);
    });
    onPurchase();  
}

var getUserBalance = function() {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"token":localStorage.getItem('authToken')},
            type: 'POST',
            url: pretty("?module=cart&function=getUserBalance"),
        })
        .done(function(data){
            console.log(data);
            console.log(JSON.parse(data));
            return resolve(JSON.parse(data));
            //return JSON.parse(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}

function onPurchase(){
    $('.purchase-button-summary').on('click',function(){
        if (localStorage.getItem('authToken') === null){
            alert('Inicia Sesión para realizar el pedido!');
            localStorage.setItem('shop-redirect',true);
            location.href = pretty("?module=login");
        }else{
            $.confirm({
                title: 'Purchase?',
                content: 'You can\'t undo this action! Are you sure?',
                buttons: {
                    
                    accept: {
                        text: 'Accept',
                        btnClass: 'btn-blue',
                        action: function(){
                            var items = itemsLSToArray()
                            pushPurchase(items).then(function(data){
                                console.log(data);
                                if (data == "false"){
                                    $.confirm({
                                        title: 'ERROR!',
                                        content: 'You don\'t have enough money',
                                        buttons: {
                                            
                                            somethingElse: {
                                                text: 'Accept',
                                                btnClass: 'btn-blue',
                                                
                                                action: function(){
                                                    location.reload();
                                                }
                                            }
                                        }
                                    });
                                }else{
                                    $.confirm({
                                        title: 'SUCCESSFULLY!',
                                        content: 'Purchase made successfully!',
                                        buttons: {
                                            
                                            somethingElse: {
                                                text: 'Accept',
                                                btnClass: 'btn-blue',
                                                
                                                action: function(){
                                                    localStorage.removeItem('cart-items');
                                                    location.reload();
                                                }
                                            }
                                        }
                                    });
                                }                                
                            });
                        }
                    },
        
                    cancel: {
                        text: 'Cancel',
                        btnClass: 'btn-red',
                        action: function(){
                            $.alert('');
                        }
                    }
                }
            });
        }
    });
}

var pushPurchase = function(items) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"arr_items":items,"token":localStorage.getItem('authToken')},
            type: 'POST',
            url: pretty("?module=cart&function=pushPurchase"),
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


var getItemCart = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"id":data},
            type: 'POST',
            url: pretty("?module=cart&function=getItemCart"),
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

function btnRemove(){
    $('.remove-item-cart').on('click', function() {
        var p1 = $(this).parent();
        var parent = p1.parent();
        var parentID = parent.attr('id');

        items = localStorage.getItem('cart-items').split(',');
        console.log(items);

        filteredItems = items.filter(function(item) {
            return item !== parentID;
        });
        localStorage.setItem('cart-items',filteredItems);
        location.reload();
    });
}

function btnsQuantity(){
    $('.plus').on('click', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        items = localStorage.getItem('cart-items').split(',');
        items.push(p3.attr('id'));
        localStorage.setItem('cart-items',items);
        location.reload();
    });
    
    $('.minus').on('click', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        items = localStorage.getItem('cart-items').split(',');
        for (let i = 0; i < items.length; i++) {
            if (items[i] == p3.attr('id')){
                console.log(i);
                items.splice(i,1);
                break;
            }
            
        }
        localStorage.setItem('cart-items',items);
        location.reload();
    });

    $('.quantity-input').on('change', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        items = localStorage.getItem('cart-items').split(',');
        items2=[];
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            if (items[i] != p3.attr('id')){
                items2.push(items[i]);
            }
        }
        console.log(items2);
        var leng=$(this).val();
        console.log(leng);
        for (let j = 0; j < leng; j++) {
            items2.push(p3.attr('id'));
        }
        console.log(items2);
        localStorage.setItem('cart-items',items2);
        location.reload();
    });
}