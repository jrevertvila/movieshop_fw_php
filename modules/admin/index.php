<?php 
	/*if ((isset($_GET['page'])) && ($_GET['page']==="controller_films") ){
		include("view/inc/top_pages/top_page_films.php");
	}else{
		include("view/inc/top_pages/top_page.php");
	}*/
	
	include("view/inc/top_page_films.php");
?>

<div class="verticalMenu" id="menu">
		<?php include("view/inc/menu.php"); ?>
</div>

<div id="wrapper">

	<div id="header">
    	<?php include("view/inc/header.php"); ?>
	</div>

    <div id="contenido">
    	<?php include("view/inc/pages.php"); ?>
        <br style="clear:both;" />
	</div>

</div>	
    <div id="footer">
	    <?php include("view/inc/footer.php"); ?>
	</div>
	

<?php include("view/inc/bottom_page.php"); ?>