<?php
require_once('../database.php');
$xml = $_POST["xml"];
$scene_id = $_POST["id"];
$STH = $DB->prepare("SELECT update_scene(:id, :xml);");
$STH->setFetchMode(PDO::FETCH_NUM);
if(!$STH->execute(array ("id" => $scene_id, "xml" => $xml))) {
    echo "0";
    exit(4);
}
$inf = $STH->fetchAll();
echo "1";