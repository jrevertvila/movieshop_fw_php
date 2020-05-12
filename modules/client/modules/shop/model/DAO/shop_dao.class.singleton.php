<?php
class shop_dao {
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

    public function getLimitMovies($db,$data) {
        $sql = 'SELECT *,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs FROM films f ORDER BY '.$data['order'].' '.$data['dir'].' LIMIT '.$data['limit'].' OFFSET '.$data['offset'];
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getMoviesFiltersGenres($db,$data) {
        $sql = 'SELECT distinct f.*,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs from films_genres r inner join films f on r.id_film = f.id and r.id_genre in ('.$data['idsGenres'].') ORDER BY '.$data['order'].' '.$data['dir'].' LIMIT '.$data['limit'].' OFFSET '.$data['offset'];
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getMoviesByTitle($db,$data) {
        $sql = 'SELECT *,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs FROM films f WHERE title like "%'.$data['titleMovie'].'%"  ORDER BY '.$data['order'].' '.$data['dir'].' LIMIT '.$data['limit'].' OFFSET '.$data['offset'];
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function checkFavUser($db,$data) {
        // return $data['id_user'];
        $sql = 'SELECT * FROM user_favorites_movies WHERE id_movie = '.$data['id_movie'].' AND id_user = "'.$data['id_user'].'"';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function removeFav($db,$data) {
        $sql = 'DELETE FROM user_favorites_movies WHERE id_movie = '.$data['id_movie'].' AND id_user = "'.$data['id_user'].'"';
        return $stmt = $db->ejecutar($sql);
    }

    public function addFav($db,$data) {
        // return $data['id_user'];
        $sql = 'INSERT INTO user_favorites_movies (id_movie, id_user) VALUES ('.$data['id_movie'].', "'.$data['id_user'].'")';
        return $stmt = $db->ejecutar($sql);
    }

    public function countAllMovies($db) {
        $sql = 'SELECT count(*) as total FROM films';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getMoviesFiltersGenresCount($db,$data) {
        $sql = 'SELECT count(*) as total from films_genres r inner join films f on r.id_film = f.id and r.id_genre in ('.$data['idsGenres'].')';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function sumVisitGenre($db,$data) {
        $sql = "UPDATE genres SET visits = visits + 1 WHERE id = ".$data['id'];
        return $stmt = $db->ejecutar($sql);
    }

    public function getAllGenres($db) {
        $sql = 'SELECT * FROM genres';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function sumVisitMovie($db,$data) {
        $sql = "UPDATE films SET visits = visits + 1 WHERE id = ".$data['id'];
        return $stmt = $db->ejecutar($sql);
    }

    public function getMovie($db,$data) {
        $sql = 'SELECT * FROM Films WHERE id = '.$data['id'];
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getGenresOfFilm($db,$data) {
        $sql = 'SELECT genre FROM `genres` WHERE id IN (SELECT id_genre FROM `films_genres` where id_film = '.$data['id'].')';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getMovieById($db,$data) {
        $arrayMovie = self::getMovie($db,$data);
        $genres = self::getGenresOfFilm($db,$data);
        $arrayMovie['genres'] = $genres;

        return $arrayMovie;
    }

}
