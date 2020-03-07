<?php
require_once('database.php');
$xml = $_POST["xml"];
$scene_id = $_POST["id"];
$STH = $DB->prepare("UPDATE scenes SET xml_code = :xml WHERE s_id = :id;");
$STH->setFetchMode(PDO::FETCH_NUM);
if(!$STH->execute(array ("id" => $scene_id, "xml" => $xml))) {
    echo "0";
    exit(4);
}
echo "1";