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
$STH = $DB->prepare("SET NAMES UTF8");
$STH->execute();
$STH = $DB->prepare("SET CHARACTER SET UTF8");
$STH->execute();
$STH = $DB->prepare("SET character_set_client = UTF8");
$STH->execute();
$STH = $DB->prepare("SET character_set_connection = UTF8");
$STH->execute();
$STH = $DB->prepare("SET character_set_results = UTF8");
$STH->execute();