<?php
require_once('database.php');
$got_id = $_POST["id"];
$request = "DELETE FROM algorithms WHERE algorithms.id=".$got_id.";";
$result = mysqli_query($link, $request);
echo $result;