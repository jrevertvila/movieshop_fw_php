<?php
	class cart_bll{
	    private $dao;
	    private $db;
	    static $_instance;

	    private function __construct() {
			
	        $this->dao = cart_dao::getInstance();
	        $this->db = db::getInstance();
	    }

	    public static function getInstance() {

	        if (!(self::$_instance instanceof self)){
	            self::$_instance = new self();
	        }
	        return self::$_instance;
		}
		
		public function getUserBalance($data){
			return $this->dao->getUserBalance($this->db,$data);
		}
		public function pushPurchase($data){
			return $this->dao->pushPurchase($this->db,$data);
		}
		public function getItemPrice($data){
			return $this->dao->getItemPrice($this->db,$data);
		}
		public function subtractBalance($data){
			return $this->dao->subtractBalance($this->db,$data);
		}
		public function deleteFromCart($data){
			return $this->dao->deleteFromCart($this->db,$data);
		}
		public function getItemCart($data){
			return $this->dao->getItemCart($this->db,$data);
		}
		public function deleteOldItemsUser($data){
			return $this->dao->deleteOldItemsUser($this->db,$data);
		}
		public function newItemCart($data){
			return $this->dao->newItemCart($this->db,$data);
		}
		public function getArrayItemsCartBD($data){
			return $this->dao->getArrayItemsCartBD($this->db,$data);
		}
		
	}