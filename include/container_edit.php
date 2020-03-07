<?php
require_once('database.php');
$got_id = $_POST["id"];
$got_name = $_POST["name"];
$got_description = $_POST["descr"];
$STH = $DB->prepare("UPDATE containers SET container_name = :name, description = :description WHERE id = :id;");
$STH->bindParam(":id", $got_id);
$STH->bindParam(":name", $got_name);
$STH->bindParam(":description", $got_description);
if($STH->execute()) {
    echo "1";
}
else {
    echo "0";
}