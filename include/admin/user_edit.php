<?php
require_once('../database.php');
$STH = $DB->prepare("UPDATE users SET user_password = :pass WHERE user_login = :user;");
$user = $argv[1];
$new_pass = md5($argv[2]);
if(!$STH->execute(array("user" => $user, "pass" => $new_pass))) {
    echo "Update failed".PHP_EOL;
} else {
    echo "Update is success".PHP_EOL;
}
