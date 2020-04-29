<?php
class home_model {
    private $bll;
    static $_instance;

    private function __construct() {
        // return "hola MODEL";
        $this->bll = home_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function rated_movies(){
        return $this->bll->select_top10_rated_movies();
    }
    
}