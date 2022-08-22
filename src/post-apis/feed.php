<?php
// TESTING W/ JUST USER'S POST FIRST

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include $_SERVER['DOCUMENT_ROOT'] . '/mediashare/src/includes/db.inc.php';
include $_SERVER['DOCUMENT_ROOT'] . '/mediashare/src/includes/helpers.inc.php';


$restJson = file_get_contents("php://input");
$_POST = json_decode($restJson, true);

if (empty($_POST['name'])) die();

$name = $_POST['name'];

try
{
  $sql = "SELECT * FROM media
      WHERE username = :username
      ORDER BY id DESC";
  $s = $pdo->prepare($sql);
  $s->bindValue(':username', $name);
  $s->execute();
}
catch (PDOException $e)
{
  $error = 'Error finding your posts';
  include $_SERVER['DOCUMENT_ROOT'] . '/mediashare/src/includes/error.html.php';
  exit();
}

while(($row = $s->fetch(PDO::FETCH_ASSOC)) != false){
  $posts[] = array(
    'id' => $row['id'],
    'poster' => $row['username'], 
    'title' => $row['title'],
    'url' => $row['url'],
    'img' => $row['img'],
    'caption' => $row['caption']
  );
}


echo json_encode($posts);
