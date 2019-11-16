<?php
require_once('database.php');
$got_name = $_POST["name"];
$got_descr = $_POST["descr"];
$got_diff = $_POST["diff"];
$got_cont = $_POST["cont"];
$request = "INSERT INTO algorithms (algorithm_name, description, difficulty, container) VALUES ('".$got_name."', '".$got_descr."', '".$got_diff."', '".$got_cont."');";
$result = mysqli_query($link, $request);
$request1 = "SELECT id FROM algorithms WHERE algorithm_name='".$got_name."' AND container='".$got_cont."';";
$result1 = mysqli_query($link, $request1);
$id = mysqli_fetch_all($result1, MYSQLI_ASSOC);
$k = 0;
foreach ($id as $id1):
    $k = $id1["id"];
endforeach;
echo $result." ".$k;
