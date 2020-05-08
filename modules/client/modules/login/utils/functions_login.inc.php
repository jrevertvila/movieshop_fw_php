<?php

function validateLoginUser(){
    //comprobar que el email exista en la bbdd

    $userArr = array(
                'emailv' => $_POST['email-user'],
                'passv' => $_POST['passwd-user']
    );
    
    // return $return=array('result'=>false,'errorEmail'=>loadModel(CLIENT_LOGIN_MODEL, "login_model", "verifyPassword", $userArr));
    
    if (loadModel(CLIENT_LOGIN_MODEL, "login_model", "findByEmailLocal", $userArr)==false){
        return $return=array('result'=>false,'errorEmail'=>'The account don\'t exists or incorrect password');
    }
    
    if (loadModel(CLIENT_LOGIN_MODEL, "login_model", "verifyPassword", $userArr)==false){
        return $return=array('result'=>false,'errorPassword'=>'Incorrect password');
    }
    $userArr = array('emailv' => $_POST['email-user']);

    $info = loadModel(CLIENT_LOGIN_MODEL, "login_model", "userDataLocal", $userArr);

    $result = array(
        'id' => $info[0]['id'],

        'email' => $info[0]['email'],

        'username' => $info[0]['username'],

        'type' => $info[0]['type'],
        
        'avatar' => $info[0]['avatar'],

        'active' => $info[0]['active'],

        'registration_date' => $info[0]['registration_date'],

        'saldo' => $info[0]['saldo']

    );

    return $return=array('result'=>true,'data'=>$result);
}

function validateUser(){
    $userArr = array('userv' => $_POST['username'],
                    'emailv' => $_POST['email-user-sign']
                );
    if (loadModel(CLIENT_LOGIN_MODEL, "login_model", "findByUsernameLocal", $userArr)){
        return $return=array('result'=>false,'errorUsername'=>'The username already exists');
    }
    
    if (loadModel(CLIENT_LOGIN_MODEL, "login_model", "findByEmailLocal", $userArr)){
        return $return=array('result'=>false,'errorEmail'=>'The email already exists');
    }
    
    $result = array(
        'username' => $_POST['username'],

        'email' => $_POST['email-user-sign'],

        'password' => password_hash($_POST['passwd-user'], PASSWORD_DEFAULT),

        'token_check' => generate_Token_secure(20),

        'token_recover' => generate_Token_secure(20),

        'account_type' => 'local'

    );
    return $return=array('result'=>true,'data'=>$result);
}

function generate_Token_secure($longitud){
    if ($longitud < 4) {
        $longitud = 4;
    }
    return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
}

function encode_token($name){
    $header = '{"typ":"JWT", "alg":"HS256"}';
    $secret = 'maytheforcebewithyou';
    $arrayPayload =array(
     'iat' => time(),
     'exp'=> time() + (5 * 60),
     'name'=> $name,
    );
    $payload = json_encode($arrayPayload);

    $JWT = new JWT;
    return $JWT->encode($header, $payload, $secret);
}

function decode_token($token){
    $secret = 'maytheforcebewithyou';
    $JWT = new JWT;
    $json = $JWT->decode($token, $secret);
    return $json;
}