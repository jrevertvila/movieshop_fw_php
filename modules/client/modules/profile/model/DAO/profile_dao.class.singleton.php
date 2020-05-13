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

    public function get_checkouts_user($db,$data) {
        // $sql = 'select formatted_date,count(*) as items from (SELECT DATE_FORMAT(`date_purchase`, "%Y-%m-%d %H:%i") AS `formatted_date`,id_user,id_item,quantity FROM checkouts) as t1 group by formatted_date HAVING id_user = "'.$data['id'].'"';
        
        $sql = 'select formatted_date,count(*) as items,money from (SELECT DATE_FORMAT(`date_purchase`, "%Y-%m-%d %H:%i") AS `formatted_date`,id_user,id_item,quantity,money FROM checkouts WHERE id_user = "'.$data['id'].'") as t1 group by formatted_date';
        
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_details_checkout($db,$data) {
        // $sql = 'select * from films where id in(select id_item from (SELECT DATE_FORMAT(`date_purchase`, "%Y-%m-%d %H:%i") AS formatted_date,id_user,id_item,quantity,money FROM checkouts WHERE id_user = "'.$data['id'].'")t1 where formatted_date = "'.$data['date'].'")';
        $sql = 'select f.*,t2.quantity from films f inner join (select * from (SELECT DATE_FORMAT(`date_purchase`, "%Y-%m-%d %H:%i") AS formatted_date,id_user,id_item,quantity,money FROM checkouts WHERE id_user = "'.$data['id'].'")t1 where formatted_date = "'.$data['date'].'")t2 on f.id = t2.id_item where f.id in(select id_item from (SELECT DATE_FORMAT(`date_purchase`, "%Y-%m-%d %H:%i") AS formatted_date,id_user,id_item,quantity,money FROM checkouts WHERE id_user = "'.$data['id'].'")t1 where formatted_date = "'.$data['date'].'")';
        
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}
