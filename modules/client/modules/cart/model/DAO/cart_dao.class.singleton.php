<?php
class cart_dao {
    static $_instance;

    private function __construct() {
        $_SESSION['constr'] = "constr";
    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function getUserBalance($db,$data) {
        $sql = 'SELECT saldo FROM users WHERE id = "'.$data['id'].'"';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function pushPurchase($db,$data) {
        $sql = 'INSERT INTO checkouts(id_user,id_item,quantity,money) VALUES("'.$data['id_user'].'","'.$data['id_item'].'","'.$data['quantity'].'","'.$data['money'].'")';
        return $stmt = $db->ejecutar($sql);
    }

    public function getItemPrice($db,$data) {
        $sql = 'SELECT price FROM films WHERE id = "'.$data.'"';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function subtractBalance($db,$data) {
        $sql = 'UPDATE users SET saldo = "'.$data['balance'].'" WHERE id = "'.$data['id_user'].'"';
        return $stmt = $db->ejecutar($sql);
    }

    public function deleteFromCart($db,$data) {
        $sql = 'DELETE FROM cart_items WHERE id_user = "'.$data['id_user'].'" AND id_item = "'.$data['id_item'].'"';
        return $stmt = $db->ejecutar($sql);
    }

    public function getItemCart($db,$data) {
        $sql = 'SELECT * FROM films WHERE id = "'.$data['id_user'].'"';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function deleteOldItemsUser($db,$data) {
        $sql = 'DELETE FROM cart_items WHERE id_user = "'.$data.'"';
        return $stmt = $db->ejecutar($sql);
    }

    public function newItemCart($db,$data) {
        $sql = 'INSERT INTO cart_items(id_user,id_item,quantity) VALUES("'.$data['id_user'].'","'.$data['id_item'].'","'.$data['cant'].'")';
        return $stmt = $db->ejecutar($sql);
    }
    public function getArrayItemsCartBD($db,$data) {
        $sql = 'SELECT * FROM cart_items WHERE id_user = "'.$data['id_user'].'"';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
