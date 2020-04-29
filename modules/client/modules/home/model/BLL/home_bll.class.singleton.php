<?php
	class home_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
			
	        $this->dao = home_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
			// return "gola";
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
		}
		
		public function select_top10_rated_movies(){
			return $this->dao->select_data_rated_movies($this->db);
		}

	}