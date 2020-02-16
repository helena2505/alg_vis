<?php
require_once('database.php');
$id = $_POST["id"];
$STH = $DB->prepare("SELECT s_picture FROM scenes WHERE s_id = :id;");
$STH->setFetchMode(PDO::FETCH_NUM);
if(! $STH->execute(array ("id" => $id))) {
    exit(1);
}
$filename = $STH->fetchAll();
echo "include/images/" . $filename[0][0];
