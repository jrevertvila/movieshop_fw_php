var urlAjax = "";
var numItemsShop = 0;
var actualPage = 0;
var lengthMovies = 0;

$(document).ready(function(){

    if(localStorage.getItem('movie-details')=="null"){ // AL RECARGAR LA PAGINA COMPROBAR SI ESTABA EN EL DETAILS
        numItemsShop = 0;
        //AQUÍ checkFilters()  EN CASO DE HABER GENEROS EN LOCALSTORAGE
        loadItems(); //Show movies
        loadFilters(); //Se cargan dinamicamente todos los filtros
        infoButtonClick(); //Mostrar o esconder breve descipción de la pelicula
        onClickGenre(); //Al clicar un genero
        onOrderChange(); //Si cambia un select de order
        toggleFilters(); //MARCA LOS FILTROS QUE ESTÁN EN LocalS, al reload page se marcan automaticamente
        //loadItemsOnScroll(); //Cargar la funcion para cargar más movies al hacer scroll (dinamicamente)
        bootpagCFG();
    }else{
        printDetails(localStorage.getItem('movie-details'));
    }
    
});

function loadItems(type = "title",mode = "asc"){
    //numItemsShop = $('.card-shop').length; //OBTENER CUANTAS PELICULAS HAY PARA CARGAR 20 MAS
    //CONTROLLER PARA SABER QUE BUSCAR (HAY GENEROS?, ALGUN FILTRO ORDER SELECCIONADO?)
    numItemsShop = (20*actualPage);
    if (localStorage.getItem('shop-genre')==="null"){
        if (!localStorage.hasOwnProperty('type') || !localStorage.hasOwnProperty('mode')){
            urlAjax = pretty("?module=shop&function=getMovies");
            ajaxData = {                        
                "limit":20,
                "offset":numItemsShop,
                "idsGenres":localStorage.getItem('shop-genre'),
                "order":"title",
                "dir":"asc"
            };
        }else{
            urlAjax = pretty("?module=shop&function=getMovies");
            ajaxData = {                        
                "limit":20,
                "offset":numItemsShop,
                "idsGenres":localStorage.getItem('shop-genre'),
                "order":localStorage.getItem('type'),
                "dir":localStorage.getItem('mode')
            };
        }
        
    }else{
        getPages("genres");
        urlAjax = pretty("?module=shop&function=getMoviesFiltered");
        ajaxData = {                        
            "limit":20,
            "offset":numItemsShop,
            "idsGenres":localStorage.getItem('shop-genre'),
            "order":type,
            "dir":mode
        };
    }

    if (localStorage.getItem('text-movie')!=="null"){
        $("#search-bar").val(localStorage.getItem('text-movie'));
        urlAjax = pretty("?module=shop&function=getMoviesByTitle");
        ajaxData = {                        
            "limit":20,
            "offset":numItemsShop,
            "titleMovie":localStorage.getItem('text-movie'),
            "order":"title",
            "dir":"asc"
        };
    }

    $.ajax({
        type: 'POST',
        url: urlAjax,
        dataType: 'json',
        async: false, //,"genres":idGenreOnLocalStorage,"idsGenres":idsGenresType
        data: ajaxData,
        success: function (data) {
            $("#loadingGif").html(
                
                '<img src="module/client/view/img/loadingGif.gif" class="loading-gif" alt="Loading">'
                
            );
            //sleep(1000);
            if (data.length == 0){
                $("#cardsContainer").append(
                    '<span>NO SE HA ENCONTRADO NINGUN RESULTADO</span>'
                );
            }else{
                for(i = 0; i < data.length; i++){
                    $urlCoverImage = data[i].coverimg;
                  
                    $("#cardsContainer").append(
                        '<div class="card-shop" id="'+data[i].id+'">'+
                            '<div class="buttons-card">'+
                                '<a class="card-button btn-card-cart"><span data-tr="Add to cart"></span></a>'+
                                '<a class="card-button btn-card-view" href="#"><span data-tr="View"></span></a>'+
                            '</div>'+

                            '<div class="card-shop-img get-details">'+
                                '<div class="black-card"></div>'+
                               ' <img class="img-size" src="'+$urlCoverImage+'">'+
        
                            '</div>'+
                            
                            '<div class="card-shop-data">'+
                                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>'+
                            '</div>'+
                            '<div class="favs-movie">'+
                                '<i class="fas fa-heart fav-shop"></i>'+
                                '<span>'+data[i].favs+'</span>'+
                            '</div>'+
                            '<div class="info-button" id="info-button">'+
                                '<i class="fa fa-bars"></i>'+
                            '</div>'+
        
                            '<div class="card-shop-footer get-details">'+
                                '<div class="effect-3d"></div>'+
                                '<div class="card-footer-text">'+
                                    '<div class="top-footer-card">'+
                                        '<span>'+data[i].title+'</span>'+
                                        
                                    '</div>'+
        
                                    '<div class="card-rate">'+
                                        '<strong>'+
                                           '<i class="fa fa-fw fa-star"></i>'+
                                           data[i].score+' / 10'+
                                        '</strong>'+
                                       '<div class="likes-card">'+
                                            '<i class="far fa-eye"></i>'+
                                            '<span>'+data[i].visits+'</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    );
                    checkFavUser(data[i].id,$('#'+data[i].id+' .favs-movie i'));
                } 
            }
            //numItemsShop = numItemsShop + data.length;

            getDetails();
            favClick();
            backArrow();
            onClickBtn();
        },
        error: function(){
          console.log("error");
        }
    });
}

function checkFavUser(id_movie,favItem){
    if (localStorage.getItem('authToken') !== null){ //comprobar que el usuario esté logueado
        $.ajax({
            type: 'POST',
            url: pretty("?module=shop&function=checkFavUser"),
            data: {"id_movie":id_movie,"token":localStorage.getItem('authToken')},
            dataType: 'json',
            success: function (data) {
                if (data == true){
                    favItem.addClass('fav-toggled');
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}

function onClickBtn(){
    $('.btn-card-cart').on('click', function() {
        var card1 = $(this).parent();
        var card = card1.parent('.card-shop');
        var id = card.attr('id');
        if (localStorage.getItem("cart-items") === null || localStorage.getItem("cart-items") == "") {
            array_items = [id];
            localStorage.setItem("cart-items",array_items);
        }else{
            array_items = localStorage.getItem('cart-items').split(',');
            array_items.push(id);
            localStorage.setItem("cart-items",array_items);
        }
        console.log("cart");
    });

    $('.btn-card-view').on('click', function() {
        var card1 = $(this).parent();
        var card = card1.parent('.card-shop');
        var id = card.attr('id');
        console.log(id);
        localStorage.setItem('movie-details',id);
        
        printDetails(id);
    });
}

function favClick(){
    $('.fav-shop').on('click', function() {
        var p1 = $(this).parent();
        var parent = p1.parent();
        var parentID = parent.attr('id')
        var spanText = p1.children('span').text();
        var integer = parseInt(spanText, 10)

        if (localStorage.getItem('authToken') !== null){ //comprobar que el usuario esté logueado
            if ($(this).hasClass("fav-toggled")){
                $.ajax({
                    type: 'POST',
                    url: pretty("?module=shop&function=removeFav"),
                    data: {"id_movie":parentID,"token":localStorage.getItem('authToken')},
                    success: function () {
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
                $(this).removeClass("fav-toggled");
                p1.children('span').text(integer-1);
            }else{
                $.ajax({
                    type: 'POST',
                    url: pretty("?module=shop&function=addFav"),
                    data: {"id_movie":parentID,"token":localStorage.getItem('authToken')},
                    success: function (data) {
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
                $(this).addClass("fav-toggled");
                p1.children('span').text(integer+1);
            }
        }else{
            alert('You have to be logged!');
            location.href=pretty("?module=login");
        }
        
    });
}

function getPages(type = ""){
    var urlPages = pretty("?module=shop&function=countAllMovies");
    ajaxData = {};
    if (localStorage.getItem('shop-genre')!=="null"){
        urlPages = pretty("?module=shop&function=getMoviesFilteredCount");
        ajaxData = {                        
            "idsGenres":localStorage.getItem('shop-genre'),
        };
    }
    $.ajax({
        type: 'POST',
        url: urlPages,
        async: false,
        data: ajaxData,

        success: function (data) {
            result = data.substring(1, data.length-1);
            total = parseInt(result);
            ret = Math.ceil(total/20);
        },

        error: function(data) {
            console.log(data);
        }
    });
    return ret;
}

function bootpagCFG(){
    $('#page-selection').bootpag({
        total: getPages()
    }).on("page", function(event, num){
        $("#cardsContainer").empty();
        console.log(num);
        actualPage = (num-1);
        loadItems();
    });
    $('#page-selection').on('click',function() {
        $("html, body").animate({ scrollTop: 0 }, "medium");
    });
}

function toggleFilters(){
    lengthGenres = $('.genre-filter').length;
    films = $('.genre-filter');
    LSGenres = localStorage.getItem('shop-genre').split(',');

    for (let i = 0; i < LSGenres.length; i++) { //toggle genres
        for (x=0; x<lengthGenres;x++){
            if(films[x].getAttribute('id')==LSGenres[i]){
                films[x].checked = true;
            }
        }
    }

    switch (localStorage.getItem('type')) {
        case "title":
            $("#release_date").val('asc');
            $("#score").val('asc');
            $("#visits").val('asc');
            $("#title").val(localStorage.getItem('mode'));
            break;
        
        case "release_date":
            $("#title").val('asc');
            $("#score").val('asc');
            $("#visits").val('asc');
            $("#release_date").val(localStorage.getItem('mode'));
            break;
        
        case "score":
            $("#title").val('asc');
            $("#release_date").val('asc');
            $("#visits").val('asc');
            $("#score").val(localStorage.getItem('mode'));
            break;

        case "visits":
            $("#title").val('asc');
            $("#release_date").val('asc');
            $("#score").val('asc');
            $("#visits").val(localStorage.getItem('mode'));
            break;
    }
}

function infoButtonClick(){
    $('.info-button').on('click', function() { //ABRIR INFORMACION FILM AL PULSAR BOTON INFO
        var card_img = $(this).parent().find('.card-shop-img');

        if (!card_img.hasClass('toggled')){
            $('.card-shop-img').removeClass('toggled')
            card_img.addClass('toggled');
        }else{
            card_img.removeClass('toggled');
        }

        var card_data = $(this).parent().find('.card-shop-data');

        if (!card_data.hasClass('toggled-data')){
            $('.card-shop-data').removeClass('toggled-data')
            card_data.addClass('toggled-data');
        }else{
            card_data.removeClass('toggled-data');
        }
    });
}

function saveGenresOnLS(){
    lengthGenres = $('.genre-filter').length;
    films = $('.genre-filter');
    var idGenres1 = "";
    for (x=0; x<lengthGenres;x++){
        if(films[x].checked){
            idGenres1 = idGenres1+films[x].getAttribute('id')+",";
        }
    }
    if (idGenres1 == ""){
        localStorage.setItem('shop-genre',null);
        return null;
    }
    idGenres = idGenres1.substring(0, idGenres1.length - 1);
    localStorage.setItem('shop-genre',idGenres);
    return idGenres;
}

function onClickGenre(){
    $('.genre-filter').on('click',function() {
        actualPage = 0;
        id = $(this).attr('id');
        localStorage.setItem("text-movie",null);
        $.ajax({
            type: 'POST',
            url: pretty("?module=shop&function=sumVisitGenre"),
            async: false,
            data:{"id":id},
            error: function(data) {
                console.log(data);
            }
        });
        saveGenresOnLS();
        // $('#cardsContainer').empty();
        // loadItems();
        location.reload();
        
    });
}

function onOrderChange(){
    $('.order-filter').on('change',function() {
        $('#cardsContainer').empty();
        type = $(this).attr("id");
        mode = $(this).val();
        localStorage.setItem('type',type);
        localStorage.setItem('mode',mode);
        toggleFilters();
        loadItems();
    });
}

function loadFilters(){
    $('#filters-shop').append(
        '<h1 class="title-filters">Filters</h1>'+
        '<hr>'+
        '<span class="title-section">Order by:</span>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Alphabetically: </span>'+
            '<select id="title" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Release Date: </span>'+
            '<select id="release_date" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Rating: </span>'+
            '<select id="score" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Visits: </span>'+
            '<select id="visits" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<hr>'+
        '<span class="title-section">Genres: </span>'+
        '<div class="genres-wrapper">'+
        '</div>'
    );
    $.ajax({
        type: 'POST',
        url: pretty("?module=shop&function=getGenresFilters"),
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
            for(i = 0; i < data.length; i++){
                $(".genres-wrapper").append(
                    '<label class="label-genre"><input type="checkbox" id="'+data[i].id+'" value="'+data[i].id+'" class="genre-filter">'+data[i].genre+'</label>'
                );
            }
        },
        error: function(data){
          console.log("error: "+data);
        }
      });
}


function getDetails(){
    $('.get-details').on('click', function() {

        var card = $(this).parent('.card-shop');
        var id = card.attr('id');
        localStorage.setItem('movie-details',id);
        
        printDetails(id);
        
    });
}

/*function loadItemsOnScroll(){
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            loadItems();
        }
    });
}*/

function backArrow(){
    $('.back-arrow').on('click', function() {
        localStorage.setItem('movie-details',null);
        location.reload();
    });
}

var getApiMovies = function(urlTitle) {
    title = urlTitle.split(' ').join('+');
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'GET',
            url: 'http://www.omdbapi.com/?s='+title+'&apikey='+API_OMDb+'&plot=full',
            dataType: 'json',
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

function printDetails(id){

    $.ajax({
        type: 'POST',
        url: pretty("?module=shop&function=sumVisit"),
        data:{"id":id},
        error: function(data) {
            console.log(data);
        }
    });

    $.ajax({
        type: 'POST',
        url: pretty("?module=shop&function=getMovieById"),
        dataType: 'json',
        async: false,
        data:{"id":id},
        success: function (data) {
            console.log(data);
            $('#cardsContainer').hide();
            $('#filters-shop').hide();
            $('.filters').hide();
            $('#page-selection').hide();
            $('#loadingGif').empty();
            $('#details-movie').append(
                    '<i class="fas fa-arrow-left back-arrow"></i>'+
                    '<img src="modules/client/view/media/banner-movie.jpg" class="img-banner-movie" alt="Banner movie">'+
                    "<div class='movie-info'>"+
                        '<div class="details-left">'+
                            "<img src='"+data[0].coverimg+"' id='img-movie' alt='img movie'>"+
                            '<div class="separator"></div>'+
                            '<div class="flex-row-center"><span data-tr="score">Score: </span><span>'+data[0].score+'</span></div>'+
                            '<div class="flex-row-center"><span data-tr="Date:">Date: </span><span>'+data[0].release_date+'</span></div>'+
                            '<div class="flex-row-center"><span data-tr="Genres:">Genres: </span><span>'+data[0].genres+'</span></div>'+
                            '<div class="flex-row-center"><span data-tr="Visits:">Visits: </span><span>'+data[0].visits+'</span></div>'+
                        '</div>'+
                        
                        "<div class='details-right'>"+
                            "<h1 id='title-movie'>"+data[0].title+"</h1>"+
                            '<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>'+
                        "</div>"+
                    "</div>"+
                    '<br>'+
                    '<h3>Similar Films</h3>'+
                    '<div id="canvas-api-movies"></div>'
            );

            getApiMovies("harry potter").then(function(data){
                console.log(data);
                for(i = 0; i < 5; i++){
                    $("#canvas-api-movies").append(
                        '<div class="item movie-carousel card-api-movie" id="'+data.Search[i].imdbID+'">'+
        
                            '<img src="'+data.Search[i].Poster+'">'+
                            '<div class="canvas-score">'+
                                '<span class="score-movie-carousel"> <i class="fas fa-star score-star"></i>0</span>'+
                            '</div>'+
                            '<div class="footer-item">'+
                                '<span class="movie-title-footer">'+data.Search[i].Title+'</span>'+
                            '</div>'+
                            '<br> <span>'+data.Search[i].title+'</span>'+
                        '</div>'
                    );
                }
            });
            backArrow();
        },
        error: function(data) {
            console.log(data);
        }
    });
}