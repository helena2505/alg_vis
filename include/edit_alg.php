<?php
require_once('database.php');
$got_id = $_POST["id"];
$got_name = $_POST["name"];
$got_descr = $_POST["descr"];
$got_diff = $_POST["diff"];
$request = "UPDATE algorithms SET algorithm_name = '".$got_name."', description = '".$got_descr."', difficulty='".$got_diff."' WHERE id=".$got_id.";";
$result = mysqli_query($link, $request);
echo $result;