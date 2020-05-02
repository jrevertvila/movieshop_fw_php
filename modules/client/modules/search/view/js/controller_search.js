$(document).ready(function(){
    onClicks();
    loadGenres();
    autocomplete();
});

function loadGenres(){
    $.ajax({
      type: 'POST',
      url: pretty("?module=search&function=getGenres"),
      dataType: 'json',
      async: false,
      data:{},
      success: function (data) {
          for(i = 0; i < data.length; i++){
              $("#genres").append(
                  '<option type="checkbox" value="'+data[i].id+'">'+data[i].genre+'</option>'
              );
          }
      },
      error: function(data){
        console.log("error: "+data);
      }
    });
  
    $('#genres').multipleSelect({
      minimumCountSelected: 8,
      selectAll: false
    });
  }

function onClicks(){
    $('.search-button').on('click', function() {
        console.log(getCheckedGenres());
        console.log($('#search-bar').val());
        if ($('#search-bar').val() == ""  && getCheckedGenres() ==""){
            console.log("NULL TODO");
            localStorage.setItem("shop-genre",null);
            localStorage.setItem("movie-details",null);
            localStorage.setItem("text-movie",null);
            location.href=pretty("?module=shop");
        }else {
            if ($('#search-bar').val() == ""){
                localStorage.setItem('text-movie',null);
                getCheckedGenres();
                location.href=pretty("?module=shop"); 
            }else{
                localStorage.setItem('shop-genre',null);
                localStorage.setItem('text-movie',$('#search-bar').val());
                location.href=pretty("?module=shop");
            }
        }
        
    });
}

function autocomplete(){
    $( "#search-bar" ).focus(function() {
        if ($( "#search-bar" ).val() != ""){
            keyupSearch();
        }
        $( "#search-bar" ).keyup(function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                if ($('#search-bar').val() == ""){
                    localStorage.setItem('text-movie',null);
                    getCheckedGenres();
                    location.href=pretty("?module=shop"); 
                }else{
                    localStorage.setItem('shop-genre',null);
                    localStorage.setItem('text-movie',$('#search-bar').val());
                    location.href=pretty("?module=shop");
                }
            }
            keyupSearch();
        });
    });
    $("#search-bar").blur(function(){
        if( $( "#search-bar" ).val() == "")
        $(".autocomplete-div").empty();
    });
}

function keyupSearch(){
    text = $( "#search-bar" ).val();
    console.log(text);
    $(".autocomplete-div").empty();
    $.ajax({
        type: 'POST',
        url: pretty("?module=search&function=getAutocomplete"),
        dataType: 'json',
        async: false,
        data:{"text":text},
        success: function (data) {
            for(i = 0; i < data.length; i++){
                $(".autocomplete-div").append(
                    '<div class="item-autocomplete" id="'+data[i].id+'">'+
                        '<img src="'+data[i].coverimg+'" class="img-item-autocomplete">'+
                        '<span class="text-item-autocomplete">'+data[i].title+'</span>'+
                        '<span class="text-item-autocomplete">Genres: </span>'+
                    '</div>'
                );
                onClickItemAuto();
            }
            
        },
        error: function(data){
            console.log("error: "+data);
        }
    });
}

function onClickItemAuto(){
    $('.item-autocomplete').on('click', function() {
        console.log("CLICK");
        itemId = $(this).attr('id');
        localStorage.setItem('movie-details',itemId);
        localStorage.setItem('type','title');
        location.href=pretty("?module=shop");
    });
}

function getTitle(){
    textValue = $('#search-bar').val();
    localStorage.setItem('textSearch',textValue);
}

function getOrder(){
    valueOrder = $('#search-orders').val();
    localStorage.setItem('orderSearch',valueOrder);
}

function getCheckedGenres(){
    generos = $('#genres option');
    checkedGenres1 = "";
    for (let x = 0; x < generos.length; x++) {
        if (generos[x].selected){
            checkedGenres1 = checkedGenres1+generos[x].getAttribute('value')+",";
        }
    }
    checkedGenres = checkedGenres1.substring(0, checkedGenres1.length - 1);
    localStorage.setItem('shop-genre',checkedGenres);
    return checkedGenres;
}