<?php
    require('autoload.php');
       
    function handlerRouter() {
        //echo "HANDLER_ROUTER_CLIENT";
        if (!empty($_GET['module'])) {
            $URI_module = $_GET['module'];
        } else {
            // $URI_module = 'home';
            $URI_module = 'home';
            /////PREGUNTAR
            //echo'<script>window.location.href = "./home/list_home/";</script>';
            /////PREGUNTAR
        }
    
        if (!empty($_GET['function'])) {
            $URI_function = $_GET['function'];
        } else {
            $URI_function = 'default'; //Asignar a default para identificarla en handlerModule()
        }
        handlerModule($URI_module, $URI_function);
    }

    function handlerModule($URI_module, $URI_function) {
        //echo "<br> HANDLER MODULE";
        //echo "<br>";
        $modules = simplexml_load_file(CLIENT_SITE_PATH.'resources/modules.xml');
        //print_r($modules);
        $exist = false;
        
        foreach ($modules->module as $module) {
            if (($URI_module === (String) $module->uri)) {
                $exist = true;
                $default_func = (String) $module->default_function;
                $path = CLIENT_MODULES_PATH . $URI_module . "/controller/controller_" . $URI_module . ".class.php";
                //echo $path;
                if (file_exists($path)) {
                    require_once($path);
                    $controllerClass = "controller_" . $URI_module;
                    $obj = new $controllerClass;
                    //var_dump($obj);
                } else {
                    //die($URI_module . ' - Controlador no encontrado');
                    // require_once(VIEW_PATH_INC . "header.php");
                    // require_once(VIEW_PATH_INC . "menu.php");
                    // require_once(VIEW_PATH_INC . "404.php");
                    // require_once(VIEW_PATH_INC . "footer.html");
                }
                
                if ($URI_function == 'default'){ //Si UriFunction es default, asigna la funcion por defecto establecida en XML.
                    $URI_function = $default_func;
                }

                handlerFunction(((String) $module->name), $obj, $URI_function);
                break;
            }
        }
        if (!$exist) {
            require_once(VIEW_PATH_INC . "header.php");
            require_once(VIEW_PATH_INC . "menu.php");
            require_once(VIEW_PATH_INC . "404.php");
            require_once(VIEW_PATH_INC . "footer.html");
        }
    }

    function handlerFunction($module, $obj, $URI_function) {
        //echo "<br>";
        //echo "HANDLER FUNCTION";
        //echo "<br>";
        
        $functions = simplexml_load_file(CLIENT_MODULES_PATH . $module . "/resources/function.xml");
        $exist = false;
        foreach ($functions->function as $function) {
            if (($URI_function === (String) $function->uri)) {
                $exist = true;
                $event = (String) $function->name;
                break;
            }
        }
        
        
        //echo "<br>";

        if (!$exist) {
            require_once(VIEW_PATH_INC . "header.php");
            require_once(VIEW_PATH_INC . "menu.php");
            require_once(VIEW_PATH_INC . "404.php");
            require_once(VIEW_PATH_INC . "footer.html");
        } else {
            // echo CLIENT_MODULES_PATH;
            // var_dump($event);
            // die;
            call_user_func(array($obj, $event));
        }
    }


    handlerRouter();