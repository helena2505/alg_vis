<?php

require_once("database.php");

$STH = $DB->prepare("SELECT user_password FROM users WHERE user_login = :login");
$got_password = md5($_POST["password"]);
$STH->execute(array("login" => $_POST["login"]));
$STH->setFetchMode(PDO::FETCH_NUM);
$pass = $STH->fetchAll();
$pass = $pass[0][0];
if($pass == $got_password) { ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Operator</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    </head>
    <body>
        <div height="100px" width="100px" background-color="pink" color="red">Authorize success</div>
    </body>
<?php
} else {
    echo "Incorrect password";
}
