<?php

class controller_login {
		
    function __construct(){
        $_SESSION['module'] = "login";
        include(CLIENT_LOGIN_UTILS . "functions_login.inc.php");
    }

    function list_login(){//carga la vista(HTML JS)

        require(CLIENT_LOGIN_VIEW_PATH . "inc/top_page_login.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_LOGIN_VIEW_PATH,'login.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }


}
