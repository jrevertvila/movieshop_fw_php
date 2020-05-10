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

function activity($token){
        $arrayPayload = json_decode(decode_token($token));               //payload del token que viene de localStorage
        $cmpr_token = encode_token($arrayPayload->name);    // con el nombre del token_user generamos un nuevo token
        $newPayload = json_decode(decode_token($cmpr_token));            // decodificamos el nuevo token para comparar fechas

        if(  ($arrayPayload->exp) > ($newPayload->iat)  ){
            $result = array(
                'result' => true,
                'token' => $cmpr_token,
                'name' => $arrayPayload->name
            );
        } else {
            $result = array(
                'result' => false,
                'name' => "token invalid"
            );
        }

    return $result;
}

// function activity($token){
//     // $tok = json_decode($token);
//     $arrayPayload = decode_token($token);
//     $name=  json_decode($arrayPayload)->name;               //payload del token que viene de localStorage
//     return $name;
//     $cmpr_token = encode_token($name);    // con el nombre del token_user generamos un nuevo token
//     $newPayload = decode_token($cmpr_token);            // decodificamos el nuevo token para comparar fechas

//     if(  (json_decode($arrayPayload)->exp) > (json_decode($newPayload)->iat)  ){
//         $result = array(
//             'result' => true,
//             'token' => $cmpr_token,
//             'name' => json_decode($arrayPayload)->name
//         );
//     } else {
//         $result = array(
//             'result' => false,
//             'name' => "token invalid"
//         );
//     }

//     return $result;
// }