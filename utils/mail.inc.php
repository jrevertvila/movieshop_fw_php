<?php
    function send_email($data) {
        $html = $data['html'];
        $subject = '';
        $body = '';
        $ruta = '';
        $return = '';
        
        switch ($data['type']) {    
            case 'contact':
                $subject = "Contact Email MovieShop";
            break;
            case 'register':
                $subject = "Validate your account";
            break;
            case 'reset_password':
                $subject = "Reset your password";
            break;
        }
        try{
            if ($data['type'] === 'admin'){
                $addressTO = 'jrevertvila@gmail.com';
            }else if($data['type'] === 'contact'){
                $subject="Contact Message Movieshop";
                $addressTO = 'jrevertvila@gmail.com';
                send_mailgun('movieshop@gmail.com', $data['email'], $subject, "The email has been sent successfully. Wait until the team answers. This can take between 1 or 3 days.");
            }else{
                $addressTO = $data['email'];
            }
                
            send_mailgun('movieshop@gmail.com', $addressTO, $subject, $html);    
        } catch (Exception $e) {
			$return = 0;
		}
		//restore_error_handler();
        return true;
    }

    function send_mailgun($from, $emailTO, $subject, $html){
		include UTILS.'apikeys.php';
    	$config = array();
    	$config['api_key'] = $APIKEY_MAILGUN; //API Key
    	$config['api_url'] = $APIURL_MAILGUN; //API Base URL

    	$message = array();
    	$message['from'] = $from;
    	$message['to'] = $emailTO;
    	$message['h:Reply-To'] = "movieshop@gmail.com";
    	$message['subject'] = $subject;
    	$message['html'] = $html;
     
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
    