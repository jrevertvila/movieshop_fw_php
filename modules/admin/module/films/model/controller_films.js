$(document).ready(function () {
    $('.viewFilm').on('click', function() {
        var id = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: '/VideoShop/module/films/controller/controller_films.php?op=view',
            dataType: 'json',
            data:{"idfilm":id}, //idfilm es el nombre de la variable: $_GET['idfilm'] i id es la variable anteriormente declarada
            success: function (data) { //$data es toda la informacion que nos retorna el ajax
                //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
                $('#show-film-modal').empty();
                $('<div></div>').attr('id','Div1').appendTo('#show-film-modal');

                $("#Div1").html(
                    '<br><span>ID:   <span id="localidad">'+data[0].id+'</span></span></br>'+
                    '<br><span>Title:   <span id="prov">'+data[0].title+'</span></span></br>'+
                    '<br><span>Director Total:     <span id="capacidad">'+data[0].director+'</span></span></br>'+
                    '<br><span>Genres:     <span id="nombrePropietario">'+data[0].genres+'</span></span></br>'+
                    '<br><span>Release Date:     <span id="dni">'+data[0].release_date+'</span></span></br>'
                )
                modal(data[0].title);
            },
            error: function(){
                console.log("error");
            }
        });
    });
 });

 function modal(data){
    $("#details_home").show();
    $("#home_modal").dialog({
        open: function() {
            $(".ui-dialog-buttonset").prepend("<span class='ui-button ' >Nº Noches:<input type='number' name='quantity' id='quantity' class='quantity' min='1' max='20' step='1'value='1'></span>");
        },
        title:data,
        //width: 500, 
        height: 570, 
        resizable: "false",
        modal: "true", 
        buttons: {
            Reservar: function(){ addToCart();$(this).dialog("close");},//$(this).dialog("close")
            Ok: function () {
                $(this).dialog("close");
            }
        },
        show: {
            effect: "fade",
            duration: 1000
        },
        hide: {
            effect: "fade",
            duration: 1000
        }
    });
}