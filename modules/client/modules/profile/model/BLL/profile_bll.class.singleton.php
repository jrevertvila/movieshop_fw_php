<?php
	class profile_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
			
	        $this->dao = profile_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {
			// return "gola";
	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
		}
		
		public function get_personal_data_user($data){
			return $this->dao->get_personal_data_user($this->db,$data);
		}

		public function update_user_data($data){
			return $this->dao->update_user_data($this->db,$data);
		}
		

	}