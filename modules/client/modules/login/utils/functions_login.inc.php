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
    if (findByUsername($_POST['username'])){
        return $return=array('result'=>false,'errorUsername'=>'The username already exists');
    }

    if (findByEmail($_POST['email-user-sign'])){
        return $return=array('result'=>false,'errorEmail'=>'The email already exists');
    }
    $result = array(
        'username' => $_POST['username'],

        'email' => $_POST['email-user-sign'],

        'password' => $_POST['passwd-user'],

    );
    return $return=array('result'=>true,'data'=>$result);
}