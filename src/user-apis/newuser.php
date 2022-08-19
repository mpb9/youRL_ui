<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include $_SERVER['DOCUMENT_ROOT'] . '/podfinder/src/includes/db.inc.php';
include $_SERVER['DOCUMENT_ROOT'] . '/podfinder/src/includes/helpers.inc.php';


$restJson = file_get_contents("php://input");
$_POST = json_decode($restJson, true);

if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['password'])) die();

$password = md5($_POST['password'] . 'pod');
$name = $_POST['name'];
$email = $_POST['email'];

try
{
  $sql = 'SELECT COUNT(*) FROM user
      WHERE name = :name OR email = :email';
  $s = $pdo->prepare($sql);
  $s->bindValue(':name', $name);
  $s->bindValue(':email', $email);
  $s->execute();
}
catch (PDOException $e)
{
  $error = 'Error searching for user.';
  include $_SERVER['DOCUMENT_ROOT'] . '/podfinder/src/includes/error.html.php';
  exit();
}

$row = $s->fetch();

if ($row[0] > 0){
    echo ('Taken');

} else {
    try {
    $sql = 'INSERT INTO user SET
        name = :name,
        email = :email,
        password = :password';
    $s = $pdo->prepare($sql);
    $s->bindValue(':name', $name);
    $s->bindValue(':email', $email);
    $s->bindValue(':password', $password);
    $s->execute();

    } catch (PDOException $e) {
    $error = 'Error adding submitted user.';
    include $_SERVER['DOCUMENT_ROOT'] . '/podfinder/src/includes/error.html.php';
    exit();

    }

    echo json_encode($_POST['name']);

}