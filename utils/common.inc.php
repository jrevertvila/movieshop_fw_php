<?php

function loadModel($model_path, $model_name, $function, $arrArgument = '',$arrArgument2 = ''){
    $model = $model_path . $model_name . '.class.singleton.php';

    if (file_exists($model)) {

        include_once($model);
        $modelClass = $model_name;
        
        if (!method_exists($modelClass, $function)){
            throw new Exception();
        }

        $obj = $modelClass::getInstance();
        
        if ($arrArgument !== ''){
            
            if ($arrArgument2 !== '') {
                return call_user_func(array($obj, $function),$arrArgument,$arrArgument2);
            }

            return call_user_func(array($obj, $function),$arrArgument);

        }else{
            return call_user_func(array($obj, $function));
        }
        
    } else {
        throw new Exception();
    }
}

function loadView($path_view = '', $htmlFile = '', $arrPassValue = '') {
    $view_path = $path_view . $htmlFile;
    //$arrData = '';

    if (file_exists($view_path)) {
        if (isset($arrPassValue))
            $arrData = $arrPassValue;
        include_once($view_path);
    } else {
        loadError();
    }
}

function loadError(){
    require(CLIENT_VIEW_PATH . "inc/top_page_error404.html");
    require(CLIENT_VIEW_PATH . "inc/header.html");
    include_once(CLIENT_VIEW_PATH ."inc/error404.html");
    require(CLIENT_VIEW_PATH . "inc/bottom_page.html");
}