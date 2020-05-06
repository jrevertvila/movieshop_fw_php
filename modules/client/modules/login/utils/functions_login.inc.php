<?php

function validateLoginUser(){
    //comprobar que el email exista en la bbdd
    if (findByEmail($_POST['email-user'])==false){
        return $return=array('result'=>false,'errorEmail'=>'The account don\'t exists or incorrect password');
    }

    if (verifyPasswd($_POST['passwd-user'],$_POST['email-user'])==false){
        return $return=array('result'=>false,'errorPassword'=>'Incorrect password');
    }
    $info = userInfoSession($_POST['email-user']);
    $result = array(

        'email' => $info[0]->email,

        'username' => $info[0]->username,

        'id' => $info[0]->id,

        'type' => $info[0]->type,
        
        'avatar' => $info[0]->avatar,

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