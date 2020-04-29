function changeLang(lang) {

    lang = lang || localStorage.getItem('app-lang') || 'en'; //Lang = al argumento introducido, al LocalStorage o por defecto ingles
    localStorage.setItem('app-lang', lang); //Guardar en LocalStorage la seleccion
    var dTable = $("#table_list_films").dataTable();
    $('#lang').val(lang);
    var elems = document.querySelectorAll('[data-tr]');
    //var elems = document.querySelectorAll('*');
    //console.log(elems);
    if (lang != "en"){
        
        $.ajax({ 
            type: 'POST',
            url: 'module/admin/view/json/'+lang+'.json',
            dataType: 'json',
            success: function (data) { 

                //console.log(data["strings"].hasOwnProperty("Hoe"));
                for (var x = 0; x < elems.length; x++) {
                    //console.log(elems[x].textContent);
                    //console.log(elems[x].textContent);

                    /*if (elems[x].hasAttribute('value')){
                        elems[x].value = data["strings"][elems[x].value]
                    }else if (data["strings"].hasOwnProperty(elems[x].textContent)){
                        // console.log(elems[x].textContent);

                        //elems[x].textContent.replace(elems[x].textContent,data["strings"][elems[x].textContent]);
                        elems[x].innerHTML = data["strings"][elems[x].textContent]
                    }*/

                    elems[x].innerHTML = data["strings"][elems[x].dataset.tr]      
                }
                dTable.fnDestroy();
                dTable = null;
                dTable = $("#table_list_films").dataTable( { "oLanguage" : data["strings"]} );

            }
        });
    } else {
        
        for (var x = 0; x < elems.length; x++) {
            elems[x].innerHTML = elems[x].dataset.tr;
        }
        dTable.fnDestroy();
        dTable = null;
        dTable = $("#table_list_films").dataTable();
    }
}
  
$( document ).ready(function() {

    changeLang();

    $( '#lang' ).on( "change", function() {
        if ($(this).val()=="es")
        changeLang('es');

        if ($(this).val()=="en")
        changeLang('en');

        if ($(this).val()=="va")
        changeLang('va');
    });
});