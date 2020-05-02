<?php
	class search_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
			
	        $this->dao = search_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
			// return "gola";
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
		}
		
		public function getGenres(){
			return $this->dao->getGenres($this->db);
		}
		public function getAutocomplete($id){
			return $this->dao->getAutocomplete($this->db,$id);
		}

	}