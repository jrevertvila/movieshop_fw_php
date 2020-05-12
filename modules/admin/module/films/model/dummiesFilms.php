<?php
function randomName(){
  $names = array("VICENT", "WALTER", "JOAN", "MARIA", "DANIEL", "JOSEP", "SARA", "PEPA", "FELIPE", "JAUME",
  "SERGIO", "PACO", "EMILIO", "NANDO", "ALFONS", "EDUARD", "ATALIA", "VERONICA", "FINA", "PEPE", "OSCAR",
  "LORELAY", "JIM", "LOLA", "LAIA", "ISMAEL", "JORDI", "RAMON", "JAVIER", "NURIA", "ELENA", "BELTRAN",
  "PABLO", "JUANJO");

 $name = $names[array_rand($names)];
 return $name;
}

function random_pic($dir = 'modules/admin/view/img/cover-film'){
    $files = glob($dir . '/*.*');
    $file = array_rand($files);
    return $files[$file];
}

function randomScore($min, $max, $decimals = 0) {
  $scale = pow(10, $decimals);
  return mt_rand($min * $scale, $max * $scale) / $scale;
}

function randomDate(){
  $dates = array("2001-05-06","2003-08-14","2005-04-27","2006-12-12","2007-09-25","2009-05-28","2009-06-05","2010-10-03",
  "2012-01-22","2012-07-12","2013-04-13","2013-06-16","2015-05-16","2015-06-26","2016-07-11","2016-12-27","2017-02-23",
  "2017-07-24","2018-02-13","2018-09-23","2018-11-02","2019-02-13","2019-04-17","2019-09-15","2020-03-18","2006-10-21",
  "2006-11-17","2006-12-22","2007-05-11","2008-11-16","2008-12-29","2009-09-15","2010-11-12","2012-03-13","2013-09-23",
  "2017-01-23","2019-02-18","2007-07-18","2008-03-11","2008-12-26","2009-04-29","2010-01-01","2010-02-15","2011-07-10",
  "2011-10-08","2012-04-26","2013-01-31","2014-10-05","2015-07-16","2015-12-24","2017-06-17","2017-09-28","2018-07-16");

   $date = $dates[array_rand($dates)];
   return $date;
 }

 function randomTitle(){
  $titles1 = array("Lost", "Only", "Last", "First", "Third", "Sacred", "Bold", "Lovely", "Final", "Missing",
   "Shadowy", "Seventh", "Dwindling", "Missing", "Absent", "Vacant", "Cold", "Hot", "Burning", "Forgotten",
   "Weeping", "Dying", "Lonely", "Silent", "Laughing", "Whispering", "Forgotten", "Smooth", "Silken",
   "Rough", "Frozen", "Wild", "Trembling", "Fallen", "Ragged", "Broken", "Cracked", "Splintered",
   "Slithering", "Silky", "Wet", "Magnificent", "Luscious", "Swollen", "Erect", "Bare", "Naked",
   "Stripped", "Captured", "Stolen", "Sucking", "Licking", "Growing", "Kissing", "Green", "Red", "Blue",
   "Azure", "Rising", "Falling", "Elemental", "Bound", "Prized", "Obsessed", "Unwilling", "Hard", "Eager",
   "Ravaged", "Twinkling", "Dwindling", "Missing", "Absent", "Vacant", "Cold", "Hot", "Burning",
   "Forgotten", "Some", "No", "All", "Every", "Each", "Which", "What", "Playful", "Silent", "Weeping",
   "Dying", "Lonely", "Silent", "Laughing", "Whispering", "Forgotten", "Smooth", "Silken", "Rough",
   "Frozen", "Wild", "Trembling", "Fallen", "Ragged", "Broken", "Cracked", "Splintered");
 
   $titles2 = array("Sons", "Child", "Children", "Illusion", "Sliver", "Destruction", "Crying", "Weeping",
   "Gift", "Word", "Words", "Thought", "Thoughts", "Scent", "Ice", "Snow", "Night", "Silk", "Guardian",
   "Angel", "Angels", "Secret", "Secrets", "Search", "Eye", "Eyes", "Danger", "Game", "Fire", "Flame",
   "Flames", "Bride", "Husband", "Wife", "Time", "Flower", "Flowers", "Light", "Lights", "Door", "Doors",
   "Window", "Windows", "Bridge", "Bridges", "Ashes", "Memory", "Thorn", "Thorns", "Name", "Names",
   "Future", "Past", "History", "Something", "Nothing", "Someone", "Nobody", "Person", "Man", "Woman",
   "Boy", "Girl", "Way", "Mage", "Witch", "Witches", "Lover", "Tower", "Valley", "Abyss", "Hunter",
   "Truth", "Edge");
 
   $title1 = $titles1[array_rand($titles1)];   
   $title2 = $titles2[array_rand($titles2)];
   

   $title = ($title1 . " " . $title2);
   return $title;
 }

 function randomGen($min, $max, $quantity) {
  $numbers = range($min, $max);
  shuffle($numbers);
  return array_slice($numbers, 0, $quantity);
 }
  
function randomGenre(){
  $genres = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18");

  $randomNums = randomGen(0,17,3);
  
  $str1  = "";
  foreach ($randomNums as $num)  
    $str1 = $str1 . $genres[$num] . ":";

  //remove last character ":"
  $str = substr($str1, 0, -1);

  $arrayGenres = explode(':', $str);
  




  return $arrayGenres;
}

function generateDummies(){
  
    for ($i = 0; $i < 20; $i++){
      
        $data = [
            "title" => randomTitle(),
            "director" => randomName(),
            "release_date" => randomDate(),
            "score" => randomScore(0, 10, 2),
            "coverimg" => "/movieshop_fw_php/".random_pic(),
            "price" => randomScore(1, 50, 2)
        ];
        $return=array('datos'=>$data);
        if (findByTitle($data['title']) == false){
          
          $saveData = save($return);
          $rGenres = randomGenre();
          foreach ($rGenres as $gen){
            saveGenresFilm($saveData[0]->id,$gen);
          }
          //$x = save($return);
          /*if ($x == null){
            $callback="index.php?page=503";
            Browser::redirect($callback);
          }*/
        }
        
    }
}
