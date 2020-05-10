<?php

// $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
// include ($path."module/home/model/dao_home.php");

class controller_home {
		
    function __construct(){
        $_SESSION['module'] = "home";
    }

    function list_home(){//carga la vista(HTML JS)
        //echo "LIST CONTACT";
        // echo CLIENT_CONTACT_VIEW_PATH . "inc/top_page_contact.php";
        // die;
        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_HOME_VIEW_PATH . "inc/top_page_home.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_HOME_VIEW_PATH,'home.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function rated_movies(){
    
        // $included_files = get_included_files();
        // echo json_encode($included_files);
        // return "hola";
        $json = loadModel(CLIENT_HOME_MODEL, "home_model", "rated_movies");
        echo json_encode($json);
    }

    function visited_movies(){

        $json = loadModel(CLIENT_HOME_MODEL, "home_model", "visited_movies");
        echo json_encode($json);        
    }

    function visited_genres(){

        $json = loadModel(CLIENT_HOME_MODEL, "home_model", "visited_genres", $_POST['offset']);
        echo json_encode($json);        
    }

    function sum_visit_genre(){

        $json = loadModel(CLIENT_HOME_MODEL, "home_model", "sum_visit_genre", $_POST['id']);
        echo json_encode($json);        
    }


}
