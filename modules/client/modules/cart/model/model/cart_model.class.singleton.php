<?php
class cart_model {
    private $bll;
    static $_instance;

    private function __construct() {
        // return "hola MODEL";
        $this->bll = cart_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getUserBalance($data){
        return $this->bll->getUserBalance($data);
    }
    public function pushPurchase($data){
        return $this->bll->pushPurchase($data);
    }
    public function getItemPrice($data){
        return $this->bll->getItemPrice($data);
    }
    public function subtractBalance($data){
        return $this->bll->subtractBalance($data);
    }
    public function deleteFromCart($data){
        return $this->bll->deleteFromCart($data);
    }
    public function getItemCart($data){
        return $this->bll->getItemCart($data);
    }
    public function deleteOldItemsUser($data){
        return $this->bll->deleteOldItemsUser($data);
    }
    public function newItemCart($data){
        return $this->bll->newItemCart($data);
    }
    public function getArrayItemsCartBD($data){
        return $this->bll->getArrayItemsCartBD($data);
    }
    
    
    
}