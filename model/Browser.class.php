<?php
	class Browser {

		public static function redirect($url){

            die('<script>top.location.href="'.$url .'";</script>');
            
        }
    
	}