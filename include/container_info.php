<?php
require_once('database.php');
$got_id = $_POST["id"];
$json1 = "";
$json2 = "";
$arr = array();
$counter = 0;
#$request = "SELECT container_name, description FROM containers WHERE containers.id = '".$got_id."';";
$request = "SELECT container_name, description FROM containers WHERE containers.id = '".$got_id."';";
$result = mysqli_query($link, $request);
$inf = mysqli_fetch_all($result, MYSQLI_ASSOC);
foreach ($inf as $container):
    $json1 = json_encode($container);
    $arr[$counter] = $json1;
    $counter += 1;
endforeach;
$json2 = json_encode($arr);
echo $json2;