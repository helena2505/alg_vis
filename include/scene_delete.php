<?php
require_once('database.php');
$got_id = $_POST["id"];
$STH = $DB->prepare("SELECT delete_scene(:id);");
$STH->setFetchMode(PDO::FETCH_NUM);
if(! $STH->execute(array ("id" => $got_id))) {
    echo("4");
    exit(4);
}
else {
    $inf = $STH->fetchAll();
    $file_name = "images/".$inf[0][0];
    unlink($file_name);
    echo "1";
}