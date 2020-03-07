<?php
require_once('database.php');
$got_id = $_POST["id"];
$STH = $DB->prepare("DELETE FROM algorithms WHERE algorithms.id = :id;");
$STH->bindParam(":id", $got_id);
if($STH->execute()) {
    echo "1";
}
else {
    echo "0";
}
/*$request = "DELETE FROM algorithms WHERE algorithms.id=".$got_id.";";
$result = mysqli_query($link, $request);
echo $result;*/