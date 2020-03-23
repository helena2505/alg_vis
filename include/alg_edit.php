<?php
require_once('database.php');
$got_id = $_POST["id"];
$got_name = $_POST["name"];
$got_descr = $_POST["descr"];
$got_diff = $_POST["diff"];
$STH = $DB->prepare("UPDATE algorithms SET algorithm_name = :name, description = :description, difficulty = :difficulty WHERE id = :id;");
$STH->bindParam(":id", $got_id);
$STH->bindParam(":name", $got_name);
$STH->bindParam(":description", $got_descr);
$STH->bindParam(":difficulty", $got_diff);
if($STH->execute()) {
    echo "1";
}
else {
    echo "0";
}