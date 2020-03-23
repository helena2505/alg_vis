<?php
require_once('database.php');
$id = $_POST["id"];
$new_value = $_POST["new_value"];
$STH = $DB->prepare("UPDATE timings SET t_value = :new_value WHERE timings_id = :id;");
echo $STH->execute(array("new_value" => $new_value, "id" => $id));