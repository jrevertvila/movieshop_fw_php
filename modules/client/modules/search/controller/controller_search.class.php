<?php

class controller_search {
		
    function __construct(){
        $_SESSION['module'] = "search";
    }

    function getGenres(){

        $json = loadModel(CLIENT_SEARCH_MODEL, "search_model", "getGenres");
        echo json_encode($json);
    }

    function getAutocomplete(){
        $data = array(
            "text" => $_POST['text']
        );

        $json = loadModel(CLIENT_SEARCH_MODEL, "search_model", "getAutocomplete",$data);
        echo json_encode($json);        
    }

}
