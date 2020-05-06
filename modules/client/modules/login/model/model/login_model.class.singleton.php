<?php
class login_model {
    private $bll;
    static $_instance;

    private function __construct() {
        // return "hola MODEL";
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function findByUsernameLocal($data){
        return $this->bll->findByUsernameLocal($data);
    }
    public function findByEmailLocal($data){
        return $this->bll->findByEmailLocal($data);
    }
    public function create_new_user($data){
        return $this->bll->create_new_user($data);
    }
    public function active_user($data){
        return $this->bll->active_user($data);
    }
    
    
    
}