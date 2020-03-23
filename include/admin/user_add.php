<?php
require_once('../database.php');
$STH = $DB->prepare("INSERT INTO users (user_login, user_password) VALUES (:user_name, :password);");
$user = $argv[1];
$pass = md5($argv[2]);
if(! $STH->execute(array("user_name" => $user, "password" => $pass))) {
    echo("Error on creating user");
} else {
    echo("User created");
}
