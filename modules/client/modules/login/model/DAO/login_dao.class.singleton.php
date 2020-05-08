<?php
class login_dao {
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

    function create_new_user($db,$data){
        $sql = 'INSERT INTO ' . 'users' . ' (id, username, password, email, avatar, token_check, token_recover, type, account_type) VALUES ("'.$data['username'].'","'.$data['username'].'", "'.$data['password'].'", "'.$data['email'].'", "modules/client/modules/login/view/img/default_avatar.png","'.$data['token_check'].'","'.$data['token_recover'].'", "client", "local")';
        return $stmt = $db->ejecutar($sql);
    }

    function active_user($db,$data){
        $newToken = generate_Token_secure(20);
        $sql = 'UPDATE users SET active = 1,token_check = "'.$newToken.'" WHERE token_check = "'.$data['token'].'"';
        return $stmt = $db->ejecutar($sql);
    }

    public function findByUsernameLocal($db,$data) {
        $sql = 'SELECT * FROM users WHERE account_type = "local" AND username = "'.$data['userv'].'"';
        $stmt = $db->ejecutar($sql);
    
        if($db->listar($stmt) == null){
            return false;
        }else{
            return true;
        }
    }

    public function findByEmailLocal($db,$data) {
        $sql = 'SELECT * FROM users WHERE account_type = "local" AND email = "'.$data['emailv'].'"';
        $stmt = $db->ejecutar($sql);
    
        if($db->listar($stmt) == null){
            return false;
        }else{
            return true;
        }
    }

    public function verifyPassword($db,$data) {
        $sql = 'SELECT password FROM users WHERE account_type = "local" AND email = "'.$data['emailv'].'"';
        $stmt = $db->ejecutar($sql);
        $pass = $db->listar($stmt);
    
        return password_verify($data['passv'],$pass[0]['password']);
    }

    public function userDataLocal($db,$data) {
        $sql = 'SELECT * FROM users WHERE account_type = "local" AND email = "'.$data['emailv'].'"';
        $stmt = $db->ejecutar($sql);
        return $pass = $db->listar($stmt);
    
    }

    

}