<?php
	class shop_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
			
	        $this->dao = shop_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
			// return "gola";
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
		}
		public function getLimitMovies($data){
			// return $data;
			return $this->dao->getLimitMovies($this->db,$data);
		}

		public function getMoviesFiltersGenres($data){
			return $this->dao->getMoviesFiltersGenres($this->db,$data);
		}

		public function getMoviesByTitle($data){
			return $this->dao->getMoviesByTitle($this->db,$data);
		}

		public function checkFavUser($data){
			return $this->dao->checkFavUser($this->db,$data);
		}

		public function removeFav($data){
			return $this->dao->removeFav($this->db,$data);
		}

		public function addFav($data){
			return $this->dao->addFav($this->db,$data);
		}

		public function countAllMovies(){
			return $this->dao->countAllMovies($this->db);
		}

		public function getMoviesFiltersGenresCount($data){
			return $this->dao->getMoviesFiltersGenresCount($this->db,$data);
		}

		public function sumVisitGenre($data){
			return $this->dao->sumVisitGenre($this->db,$data);
		}

		public function getAllGenres(){
			return $this->dao->getAllGenres($this->db);
		}
		
		public function sumVisitMovie($data){
			return $this->dao->sumVisitMovie($this->db,$data);
		}

		public function getMovieById($data){
			return $this->dao->getMovieById($this->db,$data);
		}
	}