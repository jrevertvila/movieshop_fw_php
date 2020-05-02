<?php
class shop_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function getLimitMovies($data){
        return $this->bll->getLimitMovies($data);
    }

    public function getMoviesFiltersGenres($data){
        return $this->bll->getMoviesFiltersGenres($data);
    }

    public function getMoviesByTitle($data){
        return $this->bll->getMoviesByTitle($data);
    }

    public function checkFavUser($data){
        return $this->bll->checkFavUser($data);
    }

    public function removeFav($data){
        return $this->bll->removeFav($data);
    }

    public function addFav($data){
        return $this->bll->addFav($data);
    }

    public function countAllMovies(){
        return $this->bll->countAllMovies();
    }

    public function getMoviesFiltersGenresCount($data){
        return $this->bll->getMoviesFiltersGenresCount($data);
    }

    public function sumVisitGenre($data){
        return $this->bll->sumVisitGenre($data);
    }

    public function getAllGenres(){
        return $this->bll->getAllGenres();
    }

    public function sumVisitMovie($data){
        return $this->bll->sumVisitMovie($data);
    }
    
    public function getMovieById($data){
        return $this->bll->getMovieById($data);
    }
}