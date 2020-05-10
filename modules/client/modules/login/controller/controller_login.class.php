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

    function loginUser(){
        $result = validateLoginUser();
        
        if ($result['result']){
            $dataToken = $result['data']['id'];
            $token = encode_token($dataToken);
            $return = array(
                "result" => true,
                "token" => $token,
                "avatar" => $result['data']['avatar']
            );
            echo json_encode($return);
            exit;
        }else{
            echo json_encode($result);
            exit;
        }
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

    function addUserGoogle(){
        return "hola";
    }

    function active_user(){
        if (isset($_GET['param'])) {
            $data = array( 'token'=>$_GET['param'] );;
            loadModel(CLIENT_LOGIN_MODEL, "login_model", "active_user", $data);
        }
        self::list_login();
    }
    
    function request_change_password_view(){
        require(CLIENT_LOGIN_VIEW_PATH . "inc/top_page_login.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_LOGIN_VIEW_PATH,'request_change_password.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function change_password_view(){
        require(CLIENT_LOGIN_VIEW_PATH . "inc/top_page_login.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_LOGIN_VIEW_PATH,'change_password.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }


    function sendEmailRequestPass(){
        $email = $_POST['email'];
        $data = array('email' => $email);
        $token = loadModel(CLIENT_LOGIN_MODEL, "login_model", "get_token_password", $data);

        $url = "http://localhost/movieshop_fw_php/login/new_password/".$token[0]['token_recover'];



        $html = <<<EOD
            <html>
            <body>
                <strong>Reset your password:</strong>
                <br>
                <span>For reset your password, please click the next link:</span><br>
                <a href="$url">$url</a>
                
                <br>
                <span>You can visit our website in: <a href="http://localhost/movieshop_fw_php/">www.movieshop.com</a></span>
                <br>
                <p>Sent by Movieshop</p>
            </body>
            </html>
            EOD;

            $data = array(
                "type" => "reset_password",
                "email" => $email,
                "html" => $html,
            );
        $result = send_email($data);
            
        echo json_encode($result);
    }

    function change_new_password(){
        $data = array(
            "token" => $_POST['token'],
            "password" => $_POST['new_password']
        );
        try{
            loadModel(CLIENT_LOGIN_MODEL, "login_model", "change_password", $data);
            echo json_encode(true);
        }catch(PDOException $e){
            echo json_encode(false);
        }
    }

    function firebase_login(){
        $data = $_POST['auth_data'];
        $name = "";
        $surnames = "";

        if( $data['providerId'] == "google.com"){
            $fullname = explode(" ",$data['displayName']);
            if (count($fullname) !== 0){
                $name = $fullname[0];
                $surnames_array = array_slice($fullname, 1, count($fullname));
                $surnames = implode(" ", $surnames_array);
            }
        }


        $result = array(
            'id' => $data['uid'],

            'username' => $_POST['username'],
    
            'email' => $data['email'],
    
            'password' => "",
    
            'token_check' => generate_Token_secure(20),
    
            'token_recover' => generate_Token_secure(20),
    
            'account_type' => $data['providerId'],

            'avatar' => $data['photoURL'],

            'name' => $name,

            'surnames' => $surnames
            
        );
        if (loadModel(CLIENT_LOGIN_MODEL, "login_model", "check_if_exists_firebase_user", $result) == false){
            loadModel(CLIENT_LOGIN_MODEL, "login_model", "create_firebase_user", $result);
        }
        

        $token = encode_token($data['uid']);
        $return = array(
            "token" => $token,
            "avatar" => $data['photoURL']
        );

        echo json_encode($return);
    }

    function check_activity_token(){
        $result = activity($_POST['token']);
        
        echo json_encode($result['result']);
    }

    function get_user_id(){
        $token = decode_token($_POST['token']);
        echo $token;
    }

    function get_new_token(){
        $token = encode_token($_POST['id']);
        echo json_encode($token);
    }


    function test(){
        $token = decode_token($_POST['token']);
            
        echo json_encode($token);
    }


}
