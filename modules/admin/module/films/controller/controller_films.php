<?php
    
    $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop_fw_php/modules/admin/';
    $dummiesPath = $path."module/films/model/dummiesFilms.php";
    $functionsIncPath = $path."module/films/model/functions.inc.php";

    include_once ($_SERVER['DOCUMENT_ROOT'].'/movieshop_fw_php/paths.php');
    include_once ($path."module/films/model/DAO_Films.php");
    include_once ($dummiesPath);
    include_once ($functionsIncPath);
    
    switch($_GET['op']){

        case 'dummies';
            try{
                generateDummies();
            }catch (Exception $e){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }
            generateDummies();
            $callback="index.php?page=controller_films&op=list";
            Browser::redirect($callback);
            die;
            
        break;

        case 'addGenres';
            try{
                saveGenre($_POST['genre']);
                echo json_encode($_POST['genre']);
                exit;
            }catch (Exception $e){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }
        break;

        case 'getGenres';
        
            $genres = getAllGenres();
            
            echo json_encode($genres);
            exit;

        break;

        case 'usertype';
        echo json_encode("aaa");
            exit;
            // changeUsertype();
            // $callback="index.php";
            // Browser::redirect($callback);
            // die;
            // echo json_encode("true");
            // exit;

        break;

        case 'deleteAll';
            try{
                deleteAll();
            }catch (Exception $e){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            $callback="index.php?page=controller_films&op=list";
            Browser::redirect($callback);
            die;

        break;

        case 'list';
            /*try{
                $daouser = new DAOUser();
            	$rdo = $daouser->select_all_user();
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }*/
            
            /*if(!$rdo){
    			$callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/user/view/list_films.php");
            }*/
            try{
                include("modules/admin/module/films/view/list_films.php");
            }catch (Exception $e){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            break;
            
        case 'create';
            
            if ($_POST) {
                $result = validate_film_php("create"); //VALIDATE FILM ON SERVER (PHP VALIDATION)
                
                if ($result['resultado']) {
                    //Insert data on table

                    try{
                        $saveData = save($result);
                        foreach ($result['datos']['genres'] as $gen){
                            saveGenresFilm($saveData[0]->id,$gen);
                        }
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }

                    //redirect
                    $callback="index.php?page=controller_films&op=list";
                    Browser::redirect($callback);
                    die;
                }else{
                    $error = $result['error'];
                }
            }

            include("module/admin/module/films/view/create_film.php");
            break;
            
        case 'edit';

            if ($_POST) {
                $result = validate_film_php("edit"); //VALIDATE FILM ON SERVER (PHP VALIDATION)
        
                if ($result['resultado']) {
                    //edit data of table
                    try{
                        edit($_GET['id'],$result['datos']['title'],$result['datos']['director'],$result['datos']['release_date']);

                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
                        die('<script>window.location.href="'.$callback .'";</script>');
                    }
                                
                    //redirect
                    $callback="index.php?page=controller_films&op=list";
                    Browser::redirect($callback);
                    die;
                }else{
                    $error = $result['error'];
                }
            }
            include("module/admin/module/films/view/edit_film.php");
            break;
            
        case 'logout';
            // session_unset($_SESSION['type']);
            // session_unset($_SESSION['id']);
            session_destroy();
            $callback="index.php?";
            Browser::redirect($callback);
            //echo json_encode($_SESSION['type']);
            exit;
        break;

        case 'view';
            /*if(findById($_GET['id'])==false){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }*/
            //include("module/films/view/show_film.php");
            $film = getById($_GET['idfilm']);
            $film['genres'] = getGenresToString($_GET['idfilm']);
            //$film2 = get_object_vars($film);
            echo json_encode($film);
            exit;
            break;
            
        case 'delete';
            
            if(findById($_GET['id'])==false){
                $callback = 'index.php?page=503';
                die('<script>window.location.href="'.$callback .'";</script>');
            }            
            
            deleteFilm($_GET['id']);
            $callback="index.php?page=controller_films&op=list";
            Browser::redirect($callback);
            die;
            break;
        default;
            include("module/admin/view/inc/error404.php");
            break;
    }