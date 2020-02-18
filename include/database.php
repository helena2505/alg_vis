<?php
$host = "localhost";
$dbname = "project";
$user = "root";
$pass = "";

try {
    $DB = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $DB->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch(PDOException $e) {
    echo $e->getMessage();
}
