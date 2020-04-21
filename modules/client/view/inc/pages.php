<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "home";
			include($path."module/home/view/homepage.html");
			break;
		case "controller";
			include($path."module/home/controller/".$_GET['page'].'.php');
			break;
		case "controller_films";
			include($path."module/films/controller/".$_GET['page'].".php");
			break;
		case "404";
			include($path."view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include($path."view/inc/error".$_GET['page'].".php");
			break;
		case "shop";
			include($path."module/shop/view/shop.html");
			//include($path."module/shop/controller/controller_shop.php");
			break;
		case "contact";
			include($path."module/contact/view/contact.html");
			break;
		case "login";
			include($path."module/login/view/login.html");
			break;
		case "cart";
			include($path."module/cart/view/cart.html");
			break;
		default;
			include($path."module/home/view/homepage.html");
			break;
	}
}else{
	include($path."module/home/view/homepage.html");
}
	
?>