<!--<div class="verticalMenu">-->
<!--navbar navbar-expand-lg navbar-dark bg-dark-->
    <div class ="profile_VerticalMenu no-minibar">
        
        
        <a href="index.php?page=homepage" class="brand_VerticalMenu profile_item">VideoShop</a>
        <div class="img_profile_canvas">
            <img src="modules/admin/view/img/img-profile.png" class="img_profile profile_item" alt="Profile image">
        </div>
        <span class="profile_name profile_item">Admin Profile</span>
    <!--<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>-->
    </div>

    <div class="verticalMenu_options">
        
        <div class="button_VerticalMenu_canvas" onclick="location.href='index.php?page=homepage'">
            <i class="fas fa-home big_icon"></i>
            <span data-tr="Home" class="no-minibar">Home</span>
        </div>

        <div>
            <div class="button_VerticalMenu_canvas dropdown_button">
                <i class="fas fa-film big_icon"></i>
                <span data-tr="Films" class="no-minibar">Films</span>
                <i class="fas fa-caret-down submenu_arrow no-minibar"></i>
            </div>
            <div class="dropdown-container">
                <a class="button_VerticalMenu_canvas" href="index.php?page=controller_films&op=list" data-tr="List Films">List Films</a>
                <a class="button_VerticalMenu_canvas" href="index.php?page=controller_films&op=create" data-tr="New Film">New Film</a>
            </div>
        </div>
        <a href="index.php?page=aboutus" class="button_VerticalMenu_canvas">
            <i class="fas fa-question-circle big_icon"></i>
            <span data-tr="About Us" class="no-minibar">About Us</span>
        </a>

        
        <div class="button_VerticalMenu_canvas" onclick="location.href='index.php?page=services'">
            <i class="fab fa-stripe-s big_icon"></i>
            <span data-tr="Services" class="no-minibar">Services</span>
        </div>
        <div class="button_VerticalMenu_canvas " onclick="location.href='index.php?page=contactus'">
            <i class="fas fa-id-card-alt big_icon"></i>
            <span data-tr="Contact Us" class="no-minibar">Contact Us</span>
        </div>
        <div class="button_VerticalMenu_canvas" id="menu-login">
            <i class="fas fa-id-card-alt big_icon"></i>
            <span data-tr="Client View" class="no-minibar"></span>
        </div>

        <div class="button_VerticalMenu_canvas" id="btn-logout">
            <i class="fas fa-sign-out-alt big_icon"></i>
            <span data-tr="Logout" class="no-minibar"></span>
        </div>

    </div>
	
    
    
<!--</div>-->