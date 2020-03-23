<?php
require_once('database.php');
$id = $_POST["id"];
$str = "";
$STH = $DB->prepare("SELECT xml_code FROM scenes WHERE s_id = :id;");
$STH->setFetchMode(PDO::FETCH_NUM);
if(!$STH->execute(array ("id" => $id))) {
    exit(1);
}
$xml_code = $STH->fetchAll();
echo $xml_code[0][0];
