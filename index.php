<?php
    //require_once 'modules/client/router/router.php';
    // require_once 'modules/admin/index.php';
    function getTypeUser(){
        if (isset($_SESSION['type'])){
            $type = $_SESSION['type'];
            if ($type == 'client'){
                return 'client';
            }else if($type == 'admin'){
                return 'admin';
            }
        }else{
            return 'client';
        }
    }
    
    $usertype = getTypeUser();
    if ($usertype == "admin"){
        include("modules/admin/index.php"); 
    }else if ($usertype == "client"){
        include("modules/client/router/router.php"); 
    }else{
        include("modules/client/router/router.php"); 
    }
    