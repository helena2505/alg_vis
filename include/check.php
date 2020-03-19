<?php

require_once("database.php");

$STH = $DB->prepare("SELECT user_password FROM users WHERE user_login = :login");
$got_password = md5($_POST["password"]);
$STH->execute(array("login" => $_POST["login"]));
$STH->setFetchMode(PDO::FETCH_NUM);
$pass = $STH->fetchAll();
$pass = $pass[0][0];
if($pass == $got_password) {
    header("Location: ../operator.php");
} else {
    echo "Incorrect password";
}
