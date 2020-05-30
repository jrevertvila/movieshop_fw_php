# Movieshop_Fw_PHP (Development name)
This web application consists of the administration and provision of movies for all those people who want to watch any movie without worrying about searching on Netflix, HBO or any online streaming platform for movies. The idea is to link the accounts of Netflix, HBO, Amazon Video, Crunchyroll or different video platforms and easily find the content instantly with the greatest amount of ratings and comments.

## Preview
All the images shown below are provisional and will not be the final aspect of the web application:
### Homepage
![Preview home](https://github.com/Jooui/movieshop/blob/master/readme%20media/homepage.png)
### Shop
![Preview shop](https://github.com/Jooui/movieshop/blob/master/readme%20media/shop.png)
### Login/Register
![Preview login](https://github.com/Jooui/movieshop_fw_php/blob/master/readme%20media/login.png)
### Cart
![Preview cart](https://github.com/Jooui/movieshop_fw_php/blob/master/readme%20media/cart.png)
### Profile
![Preview profile](https://github.com/Jooui/movieshop_fw_php/blob/master/readme%20media/profile.png)
### Admin Panel
![Preview admin](https://github.com/Jooui/movieshop/blob/master/readme%20media/admin%20panel.png)

## Getting Started
To run the code on your local machine and be able to observe the latest changes you need to install the LAMP stack. You also need to import a database.
## Prerequisites

* [Apache2](https://httpd.apache.org/)
* [PHP](https://www.php.net/)
* [MySQL](https://www.mysql.com/)

## Installing
- If you have problems configuring the LAMP stack you can do the following steps:
https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
- My database for testing:https://github.com/Jooui/movieshop/blob/master/readme%20media/bbdd.sql


## Technologies

### Frontend
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [JQuery](https://jquery.com/)
### Backend
* [PHP](https://www.php.net/)
* Framework PHP:  The backend simulates a real backend framework
### Database
* [MySQL](https://www.mysql.com/)

## Features
The application is divided into two important modules, the administrator panel and the client view.

### Admin:
* This is the administration panel. The movies module is the only one available right now. You can add new movies to the database. This module is a CRUD with the view controller model to easily view, edit or delete movies.

* As the application is under development, dummies can be created to fill our database quickly.

* In addition you can create new genres that will appear dynamically both in client view and to add a new movie.

### Client:
* All client view modules are developed with the controller view model.

| Module | Description |
| --- | --- |
| Home | Main page of the application where you can go directly to the store or consult the most viewed and valued genres and movies |
| Shop | Show all available movies with a filtering system by genre and sort by different fields. |
| Search | This module acts as a component throughout the application and can be easily implemented, e.g. in the home and the store. Automatically redirects to the store through the fields searched. |
| Contact | Contact form with Google Maps API integration and Mailgun |
| Cart | Show the products you want to buy |
| Login | Login module with local users and social login with Google and GHub using Firebase |
| Profile | In this module you can see your purchases, change your profile information and your favorite movies |


## APIs
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial?hl=es)
* [Firebase](https://firebase.google.com/)
* [OMDb](http://www.omdbapi.com/)


## Other Technologies
* [DataTables](https://datatables.net/)
* [JQWidgets](https://www.jqwidgets.com/)
* [OWLCarousel](https://owlcarousel2.github.io/OwlCarousel2/)
* [FontAwesome](https://fontawesome.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Multiple-Select](http://multiple-select.wenzhixin.net.cn/)
* [Dropzone](https://www.dropzonejs.com/)
* [Toastr](https://codeseven.github.io/toastr/)
