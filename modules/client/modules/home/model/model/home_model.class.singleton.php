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
    public function visited_movies(){
        return $this->bll->select_top10_visited_movies();
    }
    public function visited_genres($offset){
        return $this->bll->select_visited_genres($offset);
    }
    public function sum_visit_genre($id){
        return $this->bll->sum_visit_genre($id);
    }
    
    
}