<?php
require_once('database.php');
$got_name = $_POST["name"];
$got_descr = $_POST["descr"];
$got_diff = $_POST["diff"];
$got_cont = $_POST["cont"];
$STH = $DB->prepare("INSERT INTO algorithms (algorithm_name, description, difficulty, container) VALUES (:name, :description, :difficulty, :container);");
$STH->bindParam(":name", $got_name);
$STH->bindParam(":description", $got_descr);
$STH->bindParam(":difficulty", $got_diff);
$STH->bindParam(":container", $got_cont);
$result = $STH->execute();
if($result) {
    $set_id = $DB->lastInsertId("algorithms");
    echo "1 ".$set_id;
}
else {
    echo "0 0";
}
