<?php
require_once('database.php');
$got_id = $_POST["id"];
$STH = $DB->prepare("SELECT delete_scene(:id);");
$STH->setFetchMode(PDO::FETCH_NUM);
if(!$STH->execute(array ("id" => $got_id))) {
    echo("4");
    exit(4);
}
else {
    echo "1";
}
