<?php
class profile_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_personal_data_user($data){
        return $this->bll->get_personal_data_user($data);
    }
    
    public function update_user_data($data){
        return $this->bll->update_user_data($data);
    }

    public function get_fav_movies_user($data){
        return $this->bll->get_fav_movies_user($data);
    }

    public function removeFav($data){
        return $this->bll->removeFav($data);
    }

    public function get_checkouts_user($data){
        return $this->bll->get_checkouts_user($data);
    }

    public function get_details_checkout($data){
        return $this->bll->get_details_checkout($data);
    }
    
}