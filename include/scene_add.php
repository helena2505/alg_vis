<?php
require_once('database.php');
$xml = $_POST["xml"];
$alg_id = $_POST["id"];
$STH = $DB->prepare("SELECT insert_scene(:id, :xml);");
$STH->setFetchMode(PDO::FETCH_NUM);
if(!$STH->execute(array("id" => $alg_id, "xml" => $xml))) {
    echo "0";
    exit(1);
}
$inf = $STH->fetchAll();
echo $inf[0][0];
