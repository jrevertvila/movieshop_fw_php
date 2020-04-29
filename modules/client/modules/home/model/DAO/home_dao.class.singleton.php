<?php
class home_dao {
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

    public function select_data_rated_movies($db) {
        $sql = "SELECT * FROM films ORDER BY score DESC LIMIT 10";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


}
