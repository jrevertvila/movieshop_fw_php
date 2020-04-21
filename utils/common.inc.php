<?php
//echo "COMMON.INC.PHP";
function loadView($path_view = '', $htmlFile = '', $arrPassValue = '') {
    $view_path = $path_view . $htmlFile;
    //$arrData = '';

    if (file_exists($view_path)) {
        if (isset($arrPassValue))
            $arrData = $arrPassValue;
        include_once($view_path);
    } else {
        /*$result = response_code($path_view);
        $arrData = $result;
        require_once VIEW_PATH_INC_ERROR . "error.php";*/
        //die();
    }
}