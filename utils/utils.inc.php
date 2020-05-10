<?php
    function pretty($url, $return = false) {
        $prettys = PRETTY_URLS;
        $link = "";
        if ($prettys) {
            $url = explode("&", str_replace("?", "", $url));
            foreach ($url as $key => $value) {
                $aux = explode("=", $value);
                $link .=  $aux[1]."/";
            }
        } else {
            $link = "index.php?" . $url;
        }
        if ($return) {
            return SITE_PATH . $link;
        }
        echo SITE_PATH . $link;
    }

    //JWT FUNCTIONS

    function encode_token($name){
        $header = '{"typ":"JWT", "alg":"HS256"}';
        $secret = 'maytheforcebewithyou';
        $arrayPayload =array(
         'iat' => time(),
         'exp'=> time() + (30 * 60),
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