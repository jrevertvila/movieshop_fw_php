<?php
    function send_email($data) {
        $html = '';
        $subject = '';
        $body = '';
        $ruta = '';
        $return = '';
        
        switch ($data['type']) {    
            case 'contact':
                $ruta = '<a href=' . 'http://localhost/movieshop_fw_php/'. '></a>';
                $body = 'Puedes visitar nuestra web en: ' . $ruta;
            break;
        }
        
        $html .= "<html>";
        $html .= "<body>";
            $html .= "Contact information:";
            $html .= "<br><br>";
            $html .= "<span>Name: ".$data['issue']."</span>";
            $html .= "<span>Email: ".$data['issue']."</span>";
            $html .= "<span>Tlf: ".$data['issue']."</span>";
            $html .= "<span>Location: ".$data['issue']."</span>";
           $html .= "<br><br>";
           $html .= "Mensaje:";
           $html .= "<br><br>";
           $html .= $data['issue'];
           $html .= "<br><br>";
	       $html .= $body;
	       $html .= "<br><br>";
	       $html .= "<p>Sent by Movieshop</p>";
		$html .= "</body>";
		$html .= "</html>";

        //set_error_handler('ErrorHandler');
        try{
            if ($data['type'] === 'admin')
                $address = 'movieshop@gmail.com';
            else
                $address = $data['email'];
            $result = send_mailgun('movieshop@gmail.com', $address, $subject, $html);    
        } catch (Exception $e) {
			$return = 0;
		}
		//restore_error_handler();
        return $result;
    }

    function send_mailgun($from, $email, $subject, $html){
		include UTILS.'apikeys.php';
    	$config = array();
    	$config['api_key'] = $APIKEY_MAILGUN; //API Key
    	$config['api_url'] = $APIURL_MAILGUN; //API Base URL

    	$message = array();
    	$message['from'] = $from;
    	$message['to'] = $email;
    	$message['h:Reply-To'] = "movieshop@gmail.com";
    	$message['subject'] = "Hello, this is a test";
    	$message['html'] = 'Hello ' . $email . ',</br></br> This is a test';
     
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL, $config['api_url']);
    	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    	curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    	curl_setopt($ch, CURLOPT_POST, true); 
    	curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
    	$result = curl_exec($ch);
    	curl_close($ch);
    	return $result;
    }
    