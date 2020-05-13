<?php

// $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
// include ($path."module/home/model/dao_home.php");

class controller_profile {
		
    function __construct(){
        $_SESSION['module'] = "profile";
    }

    function list_info_profile(){
        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_PROFILE_VIEW_PATH . "inc/top_page_profile.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_PROFILE_VIEW_PATH,'profile.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function list_orders_profile(){
        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_PROFILE_VIEW_PATH . "inc/top_page_profile.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_PROFILE_VIEW_PATH,'profile.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function list_favs_profile(){
        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_PROFILE_VIEW_PATH . "inc/top_page_profile.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_PROFILE_VIEW_PATH,'profile.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function list_addcash_profile(){
        require(CLIENT_VIEW_PATH . "inc/top_page_client.html");
        require(CLIENT_PROFILE_VIEW_PATH . "inc/top_page_profile.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_PROFILE_VIEW_PATH,'profile.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }
    

    function get_data_user(){

        $token = $_POST['token_jwt'];
        $decoded = json_decode(decode_token($token));
        $data = array("id" => $decoded->name);
        $result = loadModel(CLIENT_PROFILE_MODEL, "profile_model", "get_personal_data_user", $data);
        $return = array(
            "id" => $result[0]['id'],
            "account_type" => $result[0]['account_type'],
            "active" => $result[0]['active'],
            "avatar" => $result[0]['avatar'],
            "email" => $result[0]['email'],
            "name" => $result[0]['name'],
            "surnames" => $result[0]['surnames'],
            "username" => $result[0]['username'],
            "saldo" => $result[0]['saldo'],
            "registration_date" => $result[0]['registration_date'],
            "password" => $result[0]['password'],
            "token_recover" => $result[0]['token_recover']
        );

        echo json_encode($return); 
    }

    function update_user_data(){
        $data = array(
            "name" => $_POST['name'],
            "surnames" => $_POST['surnames'],
            "id" => $_POST['id']
        );
        loadModel(CLIENT_PROFILE_MODEL, "profile_model", "update_user_data", $data);
    }

    function get_fav_movies_user(){

        $token = $_POST['token_jwt'];
        $decoded = json_decode(decode_token($token));
        $data = array("id" => $decoded->name);
        $return = loadModel(CLIENT_PROFILE_MODEL, "profile_model", "get_fav_movies_user", $data);

        echo json_encode($return); 
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

    function get_checkouts_user(){

        $token = $_POST['token_jwt'];
        $decoded = json_decode(decode_token($token));
        $data = array("id" => $decoded->name);
        $return = loadModel(CLIENT_PROFILE_MODEL, "profile_model", "get_checkouts_user", $data);

        echo json_encode($return); 
    }

    function get_details_checkout(){

        $token = $_POST['token_jwt'];
        $decoded = json_decode(decode_token($token));
        $data = array(
            "id" => $decoded->name,
            "date" => $_POST['date']
        );
        $return = loadModel(CLIENT_PROFILE_MODEL, "profile_model", "get_details_checkout", $data);

        echo json_encode($return); 
    }

}
