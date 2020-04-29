<?php
//include_once("pages/DAO_Films.php");

	function validate_film_php($type){
		$error='';
		if ($type != "edit"){
			
			if(findByTitle($_POST['title'])){
				$error='This film already exists';
				return $return=array('resultado'=>false,'error'=>$error);
			};
		}
		
		if(isset($_POST["genres"])){ 
			$str1  = "";
			foreach ($_POST['genres'] as $gen)  
				$str1 = $str1 . $gen . ":";

			//remove last character ":"
			$str = substr($str1, 0, -1);
		} 

		$resultado = array(
			'title' => $_POST['title'],

			'director' => $_POST['director'],

			'release_date' => $_POST['release_date'],

			'score' => 0,

			'coverimg' => "module/admin/view/img/delfault-img-film.png"
		);
		return $return=array('resultado'=>true,'error'=>$error,'datos'=>$resultado);
    }
