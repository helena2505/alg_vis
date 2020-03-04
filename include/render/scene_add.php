<?php
require_once('../database.php');
$xml = $_POST["xml"];
$alg_id = $_POST["id"];
/*$file_name = "scene_";
$STH = $DB->prepare("SELECT insert_scene(:id, :xml, :file_name);");
$STH->setFetchMode(PDO::FETCH_NUM);
if(!$STH->execute(array("id" => $alg_id, "xml" => $xml, "file_name" => $file_name))) {
    echo "4";
    exit(4);
}
$inf = $STH->fetchAll();
$file_name = "../images/".$inf[0][0];*/
echo $file_name;
