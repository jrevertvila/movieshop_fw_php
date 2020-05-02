<?php
class search_dao {
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

    public function getGenres($db) {
        $sql = 'SELECT * FROM genres';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getAutocomplete($db,$data) {
        $sql = 'SELECT * FROM films WHERE title like "%'.$data['text'].'%" limit 5';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


}
