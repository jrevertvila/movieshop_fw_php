<?php
	class login_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
			
	        $this->dao = login_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {

	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
		}
		
		public function findByUsernameLocal($data){
			return $this->dao->findByUsernameLocal($this->db,$data);
		}
		public function findByEmailLocal($data){
			return $this->dao->findByEmailLocal($this->db,$data);
		}
		public function create_new_user($data){
			return $this->dao->create_new_user($this->db,$data);
		}
		public function active_user($data){
			return $this->dao->active_user($this->db,$data);
		}
		public function verifyPassword($data){
			return $this->dao->verifyPassword($this->db,$data);
		}
		public function userDataLocal($data){
			return $this->dao->userDataLocal($this->db,$data);
		}

	}