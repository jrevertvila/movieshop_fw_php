<?php

// $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
// include ($path."module/home/model/dao_home.php");

class controller_shop {
		
    function __construct(){
        $_SESSION['module'] = "shop";
    }

    function list_shop(){//carga la vista(HTML JS)
        
        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_SHOP_VIEW_PATH . "inc/top_page_shop.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_SHOP_VIEW_PATH,'shop.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function getMovies(){

        $data = array(
                'limit' => $_POST['limit'],
                'offset' => $_POST['offset'],
                'order' => $_POST['order'],
                'dir' => $_POST['dir']
        );

        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "getLimitMovies", $data);
        echo json_encode($json);        
    }

    function getMoviesFiltered(){

        $data = array(
            'limit' => $_POST['limit'],
            'offset' => $_POST['offset'],
            'idsGenres' => $_POST['idsGenres'],
            'order' => $_POST['order'],
            'dir' => $_POST['dir']
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "getMoviesFiltersGenres", $data);
        echo json_encode($json);        
    }

    function getMoviesByTitle(){

        $data = array(
            'limit' => $_POST['limit'],
            'offset' => $_POST['offset'],
            'titleMovie' => $_POST['titleMovie'],
            'order' => $_POST['order'],
            'dir' => $_POST['dir']
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "getMoviesByTitle", $data);
        echo json_encode($json);        
    }

    function checkFavUser(){

        $payload = json_decode(decode_token($_POST['token']));               //payload del token que viene de localStorage
        $id = $payload->name;

        $data = array(
            'id_movie' => $_POST['id_movie'],
            'id_user' => $id
        );

        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "checkFavUser", $data);
        
        if ($json){
            $val = true;
        }
        else{
            $val = false;
        }
        echo json_encode($val);        
    }

    function removeFav(){

        $payload = json_decode(decode_token($_POST['token']));               //payload del token que viene de localStorage
        $id = $payload->name;

        $data = array(
            'id_movie' => $_POST['id_movie'],
            'id_user' => $id
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "removeFav", $data);
        
        echo json_encode($json);        
    }

    function addFav(){

        $payload = json_decode(decode_token($_POST['token']));               //payload del token que viene de localStorage
        $id = $payload->name;

        $data = array(
            'id_movie' => $_POST['id_movie'],
            'id_user' => $id
        );
        
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "addFav", $data);
        
        echo json_encode($json);        
    }

    function countAllMovies(){

        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "countAllMovies");
        echo json_encode($json[0]['total']);        
    }

    function getMoviesFilteredCount(){

        $data = array(
            'idsGenres' => $_POST['idsGenres']
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "getMoviesFiltersGenresCount", $data);
        
        echo json_encode($json[0]['total']);        
    }

    function sumVisitGenre(){

        $data = array(
            'id' => $_POST['id']
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "sumVisitGenre", $data);
        
        echo json_encode($json);        
    }

    function getGenresFilters(){

        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "getAllGenres");
        echo json_encode($json);        
    }

    // MEJORA: !!!!!!!! AGRUPAR LAS DOS SIGUIENTES FUNCIONES EN BLL !!!!!!!!

    function sumVisit(){

        $data = array(
            'id' => $_POST['id']
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "sumVisitMovie", $data);
        
        echo json_encode($json);        
    }

    function getMovieById(){

        $data = array(
            'id' => $_POST['id']
        );
        $json = loadModel(CLIENT_SHOP_MODEL, "shop_model", "getMovieById", $data);
        
        echo json_encode($json);        
    }

}
