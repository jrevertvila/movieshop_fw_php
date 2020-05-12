<?php
class profile_dao {
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

    public function get_personal_data_user($db,$data) {
        $sql = 'SELECT * FROM users WHERE id = "'.$data['id'].'"';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function update_user_data($db,$data) {
        $sql = 'UPDATE users SET name = "'.$data['name'].'",surnames = "'.$data['surnames'].'" WHERE id = "'.$data['id'].'"';
        return $stmt = $db->ejecutar($sql);
    }

    public function get_fav_movies_user($db,$data) {
        $sql = 'SELECT * FROM films WHERE id in (select id_movie from user_favorites_movies where id_user = "'.$data['id'].'")';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function removeFav($db,$data) {
        $sql = 'DELETE FROM user_favorites_movies WHERE id_movie = '.$data['id_movie'].' AND id_user = "'.$data['id_user'].'"';
        return $stmt = $db->ejecutar($sql);
    }

}
