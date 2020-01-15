<?php
require_once('database.php');
$got_id = $_POST["id"];
$json1 = "";
$json2 = "";
$file_name = "";
$arr = array();
$counter = 0;
$request = "SELECT algorithm_name, description, difficulty FROM algorithms WHERE algorithms.id = '".$got_id."';";
$result = mysqli_query($link, $request);
$inf = mysqli_fetch_all($result, MYSQLI_ASSOC);
foreach ($inf as $algorithm):
    $json1 = json_encode($algorithm);
    $arr[$counter] = $json1;
    $counter += 1;
endforeach;
$json2 = json_encode($arr);
echo $json2;