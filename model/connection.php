<?php
    class connection extends PDO{
        private $tipoDB = 'mysql';
        private $nombreHost = 'localhost';
        private $nombreDB = 'videoclub';
        private $usuario = 'jowi';
        private $password = '12345678';

        public function __construct(){
            try{
            parent::__construct("{$this->tipoDB}:dbname={$this->nombreDB};host={$this->nombreHost};charset=utf8", $this->usuario, $this->password);
            }catch(PDOException $e){
            echo 'Error al conectarse con la base de datos: ' . $e->getMessage();
            exit;
            }
        }
    }