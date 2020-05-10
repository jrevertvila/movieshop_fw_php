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
        $hashEmail = md5 (strtolower(trim($data['email'])));
        $avatar = "https://api.adorable.io/avatars/285/".$hashEmail;
        $sql = 'INSERT INTO ' . 'users' . ' (id, username, password, email, avatar, token_check, token_recover, type, account_type) VALUES ("'.$data['username'].'","'.$data['username'].'", "'.$data['password'].'", "'.$data['email'].'", "'.$avatar.'","'.$data['token_check'].'","'.$data['token_recover'].'", "client", "local")';
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

    public function get_token_password($db,$data) {
        $sql = 'SELECT token_recover FROM users WHERE account_type = "local" AND email = "'.$data['email'].'"';
        $stmt = $db->ejecutar($sql);
        return $pass = $db->listar($stmt);
    }

    function change_password($db,$data){
        

        $newToken = generate_Token_secure(20);
        
        $newPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $sql = 'UPDATE users SET password = "'.$newPassword.'",token_recover = "'.$newToken.'" WHERE token_recover = "'.$data['token'].'"';
        return $stmt = $db->ejecutar($sql);
    }

    function create_firebase_user($db,$data){
        $sql = 'INSERT INTO ' . 'users' . ' (id, username, password, email, avatar, token_check, token_recover, type, account_type, name, surnames) VALUES ("'.$data['id'].'","'.$data['username'].'", "'.$data['password'].'", "'.$data['email'].'", "'.$data['avatar'].'","'.$data['token_check'].'","'.$data['token_recover'].'", "client", "'.$data['account_type'].'", "'.$data['name'].'", "'.$data['surnames'].'")';
        return $stmt = $db->ejecutar($sql);
    }

    public function check_if_exists_firebase_user($db,$data) {
        $sql = 'SELECT * FROM users WHERE id = "'.$data['id'].'"';
        $stmt = $db->ejecutar($sql);
    
        if($db->listar($stmt) == null){
            return false;
        }else{
            return true;
        }
    }

    

}
