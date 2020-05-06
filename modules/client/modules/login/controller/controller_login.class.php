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

    function createUser(){
        $result = validateUser();
        if ($result['result']){
            $return = array(
            'result' => true,
            );
            loadModel(CLIENT_LOGIN_MODEL, "login_model", "create_new_user", $result['data']);
            $tokenMail = $result['data']['token_check'];
            $url = pretty("?module=login&function=active_user&param=".$tokenMail, true);
            $html = <<<EOD
            <html>
            <body>
                <strong>Validate account</strong>
                <br>
                <span>For use your account, please click the next link:</span><br>
                <a href="$url">$url</a>
                
                <br>
                <span>Puedes visitar nuestra web en: <a href="http://localhost/movieshop_fw_php/">www.movieshop.com</a></span>
                <br>
                <p>Sent by Movieshop</p>
            </body>
            </html>
            EOD;

            $data = array(
                "type" => "register",
                "email" => $result['data']['email'],
                "html" => $html,
            );
            send_email($data);
            echo json_encode($return);
            exit;
        }else{
            echo json_encode($result);
            exit;
        }
    }

    function active_user(){
        if (isset($_GET['param'])) {
            $data = array( 'token'=>$_GET['param'] );;
            loadModel(CLIENT_LOGIN_MODEL, "login_model", "active_user", $data);
        }
        self::list_login();
    }


}
