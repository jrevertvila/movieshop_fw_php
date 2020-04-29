<?php
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "homepage";
			include("modules/admin/module/home/view/homepage.php");
			break;
		case "controller_films";
			include("modules/admin/module/films/controller/".$_GET['page'].".php");
			break;
		case "services";
			include("modules/admin/module/services/".$_GET['page'].".php");
			break;
		case "aboutus";
			include("modules/admin/module/aboutus/".$_GET['page'].".php");
			break;
		case "contactus";
			include("modules/admin/module/contact/".$_GET['page'].".php");
			break;
		case "404";
			include("modules/admin/view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include("modules/admin/view/inc/error".$_GET['page'].".php");
			break;
		default;
			include("modules/admin/view/inc/error404.php");
			break;
	}
}else{
	include("modules/admin/module/home/view/homepage.php");
}
	
?>