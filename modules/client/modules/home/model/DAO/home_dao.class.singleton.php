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

    public function select_data_visited_movies($db) {
        $sql = "SELECT * FROM films ORDER BY visits DESC LIMIT 10";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_visited_genres($db,$offset) {
        // return $offset;
        $sql = "SELECT * FROM genres ORDER BY visits DESC LIMIT 3 OFFSET " .$offset;
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function sum_visit_genre($db,$id) {
        $sql = "UPDATE genres SET visits = visits + 1 WHERE id = ".$id;
        return $stmt = $db->ejecutar($sql);
    }

}
