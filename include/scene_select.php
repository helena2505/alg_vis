<?php
require_once('database.php');
$id = $_POST["id"];
$str = "";
$request = "SELECT xml_code FROM scenes WHERE s_id=".$id.";";
$result = mysqli_query($link, $request);
$xml_code = mysqli_fetch_all($result, MYSQLI_NUM);
echo $xml_code[0][0];
