<?php
require_once('database.php');
$got_name = $_POST["name"];
$got_description = $_POST["descr"];
$STH = $DB->prepare("INSERT INTO containers (container_name, description) VALUES (:name, :description);");
$STH->bindParam(':name', $got_name);
$STH->bindParam(':description', $got_description);
$result = $STH->execute();
if($result) {
    $new_id = $DB->lastInsertId();
    echo("1 ".$new_id);
}
else {
    echo("0 0");
}
