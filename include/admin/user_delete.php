<?php
require_once('../database.php');
$STH = $DB->prepare("DELETE FROM users WHERE user_login = :user;");
$user = $argv[1];
if(!$STH->execute(array("user" => $user))) {
    echo "Delete failed".PHP_EOL;
} else {
    echo "Delete is success".PHP_EOL;
}
