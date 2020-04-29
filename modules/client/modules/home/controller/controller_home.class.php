<?php

// $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
// include ($path."module/home/model/dao_home.php");

class controller_home {
		
    function __construct(){
        $_SESSION['module'] = "contact";
    }

    function list_home(){//carga la vista(HTML JS)
        //echo "LIST CONTACT";
        // echo CLIENT_CONTACT_VIEW_PATH . "inc/top_page_contact.php";
        // die;
        require(CLIENT_HOME_VIEW_PATH . "inc/top_page_home.php");
        require(CLIENT_VIEW_PATH . "inc/header.html");
        loadView(CLIENT_HOME_VIEW_PATH,'home.html');
        require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
    }

    function rated_movies(){
    
        // $included_files = get_included_files();
        // echo json_encode($included_files);
        
        $json = loadModel(CLIENT_HOME_MODEL, "home_model", "rated_movies");
        echo json_encode($json);
    }

    function visited_movies(){
        
    }


}



// switch($_GET['op']){

//     case 'rated-movies';

//         $movies = getTop10Films();

//         echo json_encode($movies);
//         exit;

//     break;

//     case 'visited-movies';

//         $movies = getTop10VisitedFilms();

//         echo json_encode($movies);
//         exit;

//     break;

//     case 'sumVisitGenre';
//         sumVisitGenre($_GET['id']);
//     break;

//     case 'get_genres_movies';
//     //echo json_encode($movies);
    
//        $movies = getSixGenres($_GET['offset']);
//        echo json_encode($movies);

//        exit;
        

//     break;

//     case 'usertype';

//         changeUsertype();
//         echo json_encode("true");
//         exit;

//     break;

// }
