<?php

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
    JOIN follows
    ON media.username = follows.following
    WHERE follows.follower = :username
    ORDER BY media.id DESC";
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

$num = 0;

while(($row = $s->fetch(PDO::FETCH_ASSOC)) != false){
  $posts[] = array(
    'id' => $row['id'],
    'poster' => $row['username'], 
    'title' => $row['title'],
    'url' => $row['url'],
    'img' => $row['img'],
    'caption' => $row['caption']
  );
  $num =1;
}

if($num !== 0) echo json_encode($posts);
else {
  $posts[] = array(
    'id' => '0',
    'poster' => 'no_friends_found', 
    'title' => 'Go follow someone!',
    'url' => 'https://www.webfx.com/blog/social-media/social-media-101/',
    'img' => 'https://simkl.net/fanart/66/6681208bf91de020_0.jpg',
    'caption' => 'No need to worry, add friends through searching or the popular page!'
  );
  echo json_encode($posts);
}