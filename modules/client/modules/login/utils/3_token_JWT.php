<?php
    require_once "JWT.php";

    function encode_token($name){
        $header = '{"typ":"JWT", "alg":"HS256"}';
        $secret = 'maytheforcebewithyou';
        $arrayPayload =array(
         'iat' => time(),
         'exp'=> time() + (5 * 60),
         'name'=> $name
        );
        $payload = json_encode($arrayPayload);
    
        $JWT = new JWT;
        return $JWT->encode($header, $payload, $secret);
    }
    ////////////////test encode_token
    $token = encode_token('yomogan');
    echo $token;
    echo '<br>';


    function decode_token($token){
        $secret = 'maytheforcebewithyou';
        $JWT = new JWT;
        $json = $JWT->decode($token, $secret);
        return $json;
    }
    ////////////////test decode_token
    $json = decode_token($token);
    echo json_decode($json)->name;
    echo '<br>';


    function validate_user_token($token){
        $arrayPayload = decode_token($token);               //payload del token que viene de localStorage
        $cmpr_token = encode_token($arrayPayload->name);    // con el nombre del token_user generamos un nuevo token
        $newPayload = decode_token($cmpr_token);            // decodificamos el nuevo token para comparar fechas

        if(  (json_decode($arrayPayload)->exp) > (json_decode($newPayload)->iat)  ){
            $result = array(
                'success' => true,
                'token' => $cmpr_token,
                'name' => json_decode($arrayPayload)->name
            );
        } else {
            $result = array(
                'error' => true,
                'name' => "token invalid"
            );
        }
    
        return $result;
    }
    ////////////////test validate_user_token
    $result = validate_user_token($token);
    echo '<br>';
    print_r($result);
    echo '</br>';
