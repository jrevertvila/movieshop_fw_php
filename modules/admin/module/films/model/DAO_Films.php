<?php
    $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop_fw_php/';
    include_once($path."model/connection.php");
    include_once($path."model/Browser.class.php");


    function save($data){ //returns the last object created
        $connection = new connection();
        $query = $connection->prepare('INSERT INTO ' . 'Films' . ' (title, director, release_date, score, coverimg, price) VALUES (:title, :director, :release_date, :score, :coverimg, :price)');
        $query->bindParam(':title', $data['datos']['title']);
        $query->bindParam(':director', $data['datos']['director']);
        $query->bindParam(':release_date', $data['datos']['release_date']);
        // $query->bindParam(':genres', $data['datos']['genres']);
        $query->bindParam(':score', $data['datos']['score']);
        $query->bindParam(':coverimg', $data['datos']['coverimg']);
        $query->bindParam(':price', $data['datos']['price']);
        $query->execute();

        $query = $connection->prepare('SELECT * FROM `films` ORDER BY id DESC LIMIT 1');
        $query->execute();
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);
    }

    function saveGenre($data){ //returns the last object created
        $connection = new connection();
        $query = $connection->prepare('INSERT INTO ' . 'genres' . ' (genre) VALUES (:genre)');
        $query->bindParam(':genre', $data);
        $query->execute();
        $connection = null;
    }

    function getGenresOfFilm($id){
        
        $connection = new connection();
        $query = $connection->prepare('SELECT genre FROM `genres` WHERE id IN (SELECT id_genre FROM `films_genres` where id_film = '.$id.')');
        $query->execute();             
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);
    }

    function getGenresToString($id){
        
        $genres = getGenresOfFilm($id);
        
        $str1  = "";
        for ($i = 0; $i < sizeof($genres); $i++ ){
            $str1 = $str1 . $genres[$i]->genre . ",";
        }

        //remove last character ":"
        $str = substr($str1, 0, -1);
        return $str;
    }

    function saveGenresFilm($idFilm, $idGenre){
        $connection = new connection();
        $query = $connection->prepare('INSERT INTO ' . 'films_genres' . ' (id_film, id_genre) VALUES (:id_film, :id_genre)');
        $query->bindParam(':id_film', $idFilm);
        $query->bindParam(':id_genre', $idGenre);
        $query->execute();
        $connection = null;
    }

    function getAllGenres(){
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM genres');
        $query->execute();
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);
    }



    function deleteAll(){
        $connection = new connection();
        $query = $connection->prepare('DELETE FROM Films');
        $query->execute();
		$connection = null;
    }

    function edit($id,$title,$director,$release_date){//(TITLE, DIRECTOR, DATE)
        $connection = new connection();
        $query = $connection->prepare('UPDATE Films SET title = :title, director = :director, release_date = :release_date  WHERE id = :id');
        $query->bindParam(':title', $title);
        $query->bindParam(':director', $director);
        $query->bindParam(':release_date', $release_date);
        $query->bindParam(':id', $id);
        $query->execute();
        $data = $query->fetch();
        $connection = null;
    }

    function changeUsertype(){//(TITLE, DIRECTOR, DATE)
        $connection = new connection();
        $query = $connection->prepare('UPDATE auth SET usertype = "client"  WHERE id = 1');
        $query->execute();
        $data = $query->fetch();
        $connection = null;
    }

    function findByTitle($title){ //Returns boolean. True if exists, else, false.
        $connection = new connection();
        $query = $connection->prepare('SELECT title FROM Films WHERE title = :title');
        $query->bindParam(':title', $title);
        $query->execute();
        $data = $query->fetch();
        $connection = null;
        if ($data){
            return true;
        }
        else{
            return false;
        }
    }

    function findById($id){ //Returns boolean. True if exists, else, false.
        $connection = new connection();
        $query = $connection->prepare('SELECT id FROM Films WHERE id = :id');
        $query->bindParam(':id', $id);
        $query->execute();
        $data = $query->fetch();
        $connection = null;
        if ($data){
            return true;
        }
        else{
            return false;
        }
    }

    function getById($id){ //Get only one film by ID.
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM Films WHERE id = :id');
        $query->bindParam(':id', $id);
        $query->execute();
        $connection = null;
        //return $query->fetchObject();
        return $query->fetchAll(PDO::FETCH_OBJ);

    }

    function getTitleById($id){ //Get only one film by ID.
        $connection = new connection();
        $query = $connection->prepare('SELECT title FROM Films WHERE id = :id');
        $query->bindParam(':id', $id);
        $query->execute();
        $connection = null;
        $result = $query->fetchAll(PDO::FETCH_OBJ);
        return $result[0]->title;
        
    }

    function getAllFilms(){ //Get all data from Films

        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM Films');
        $query->execute();
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);

    }

    function deleteFilm($id){ //Delete row from Film by ID
        $connection = new connection();
        $query = $connection->prepare('DELETE FROM Films WHERE id = :id');
        $query->bindParam(':id', $id);
        $query->execute();
        $connection = null;
    }


// if( isset($_POST['action'])) {
//     deleteFilm($_POST['action']);
// }