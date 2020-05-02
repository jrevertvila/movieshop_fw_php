<?php
class search_model {
    private $bll;
    static $_instance;

    private function __construct() {
        // return "hola MODEL";
        $this->bll = search_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getGenres(){
        return $this->bll->getGenres();
    }
    public function getAutocomplete($id){
        return $this->bll->getAutocomplete($id);
    }
    
    
}