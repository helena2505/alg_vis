<?php
require_once('database.php');
$id = $_POST["id"];
$str = "";
$request = "SELECT s_picture FROM scenes WHERE s_id=".$id.";";
$result = mysqli_query($link, $request);
$filename = mysqli_fetch_all($result, MYSQLI_NUM);
echo "include/images/" . $filename[0][0];

