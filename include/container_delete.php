<?php
require_once('database.php');
$got_id = $_POST["id"];
$STH = $DB->prepare("DELETE FROM containers WHERE id = :id;");
$STH->bindParam(":id", $got_id);
if($STH->execute()) {
    echo "1";
}
else {
    echo "0";
}