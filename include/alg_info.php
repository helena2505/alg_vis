<?php
require_once('database.php');
$got_id = $_POST["id"];
$arr = array();
$STH = $DB->prepare("SELECT algorithm_name, description, difficulty FROM algorithms WHERE algorithms.id = :id");
$STH->setFetchMode(PDO::FETCH_ASSOC);
$STH->bindParam(":id", $got_id);
if($STH->execute()) {
    while($info = $STH->fetch()) {
        $json1 = json_encode($info);
    }
}
echo $json1;