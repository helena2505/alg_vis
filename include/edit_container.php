<?php
require_once('database.php');
$got_id = $_POST["id"];
$got_name = $_POST["name"];
$got_descr = $_POST["descr"];
$request = "UPDATE containers SET container_name = '".$got_name."', description = '".$got_descr."' WHERE id=".$got_id.";";
$result = mysqli_query($link, $request);
echo $result;