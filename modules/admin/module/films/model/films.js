function validate_film(type) {
    if ($('#title').val().length==0){
        document.getElementById('e_title').innerHTML = "Title can't be blank";
        document.formfilms.title.focus();
        return 0;
    }
    document.getElementById('e_title').innerHTML = "";

    if ($('#director').val().length==0){
        document.getElementById('e_director').innerHTML = "Director can't be blank";
        document.formfilms.director.focus();
        return 0;
    }
    document.getElementById('e_director').innerHTML = "";

    if ($('#release_date').val().length==0){
        document.getElementById('e_release_date').innerHTML = "Release date can't be blank";
        document.formfilms.release_date.focus();
        return 0;
    }
    document.getElementById('e_release_date').innerHTML = "";
    
    if ($('#genres').val()===null){
      document.getElementById('e_genres').innerHTML = "Genres date can't be blank";
      document.formfilms.genres.focus();
      return 0;
  }
  document.getElementById('e_genres').innerHTML = "";

    if (type = "create"){
      document.formfilms.submit();
      document.formfilms.action="index.php?page=controller_films&op=create";
    } else if (type = "edit"){
      document.formfilms.submit();
      document.formfilms.action="index.php?page=controller_films&op=edit";
    }
}

function deleteFilm($id,$title){
  if (confirm("Are you sure to erase the movie: "+$title+" ?") == true){
    location.href="index.php?page=controller_films&op=delete&id="+$id;
  }
}

function deleteAll(){
  if (confirm("Are you sure to erase all data?") == true){
    location.href="index.php?page=controller_films&op=deleteAll";
  }
}

/* <option value="1">January</option> */
function newGenre(){
  $('#button_new_genre').on('click', function() {
    var genre = $('#new_genre').val();
    
    $.ajax({
      type: 'POST',
      url: '/movieshop/module/admin/module/films/controller/controller_films.php?op=addGenres',
      data: {genre: genre},
      success: function(data) {
        console.log("Se ha añadido. Data: "+data);
        $('#notif_new_genre').html("Se ha añadido: "+data);
        $('#new_genre').val("");
      },
      error: function(data){
        console.log(error);
      }
    });

  });
}

function loadGenresCreate(){
  $.ajax({
    type: 'GET',
    url: '/movieshop/module/admin/module/films/controller/controller_films.php?op=getGenres',
    dataType: 'json',
    async: false,
    data:{},
    success: function (data) { //$data es toda la informacion que nos retorna el ajax
        for(i = 0; i < data.length; i++){
            $("#genres").append(
                '<option value="'+data[i].id+'">'+data[i].genre+'</option>'
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

function modalView(){
  $('.viewFilm').on('click', function() {
    event.preventDefault();
    this.blur();
      var id = $(this).attr('id');
      $.ajax({
        type: 'GET',
        url: '/movieshop/module/admin/module/films/controller/controller_films.php?op=view',
        dataType: 'json',
        data:{"idfilm":id}, //idfilm es el nombre de la variable: $_GET['idfilm'] i id es la variable anteriormente declarada
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
          console.log(data);
          $("#show-film-modal").html(
              '<br><span>ID:   <span>'+data[0].id+'</span></span></br>'+
              '<br><span>Title:   <span>'+data[0].title+'</span></span></br>'+
              '<br><span>Director Total:     <span>'+data[0].director+'</span></span></br>'+
              '<br><span>Genres:     <span>'+data[0].genres+'</span></span></br>'+
              '<br><span>Release Date:     <span>'+data[0].release_date+'</span></span></br>'
          );
        },
        error: function(){
          console.log("error");
        }
      });
      console.log("aaaa");

      var detailsArray = $('#show-film-modal');
      var details = detailsArray[0];
      details.style.display = "";

      $('#show-film-modal').modal("show");
      $('#show-film-modal').modal({
        escapeClose: true,
        clickClose: false,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        },
      })

/*
      $("#show-film-modal").dialog({
        width: 850, //<!-- ------------- ancho de la ventana -->
        height: 500, //<!--  ------------- altura de la ventana -->
        resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
        modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        },
      });*/

    });
}

$( document ).ready(function() {
  newGenre();
  loadGenresCreate();
  modalView();

  $('#table_list_films').dataTable({
    "bPaginate": true,
    "bLengthChange": true,
    "bFilter": true,
    "bInfo": true,
    "bAutoWidth": true 
  });
});
$('.dataTables_length').addClass('bs-select');