<?php
require_once('database.php');
$id = $_POST["id"];
$json1 = "";
$json2 = "";
$counter = 0;
$arr = array();
$request = "SELECT s_id, s_picture FROM scenes WHERE scenes.s_algorithm=".$id." ORDER BY s_order;";
$result = mysqli_query($link, $request);
$file_name = mysqli_fetch_all($result, MYSQLI_ASSOC);
foreach ($file_name as $scene):
    $scene["s_picture"] = "include/images/".$scene["s_picture"];
    $json1 = json_encode($scene);
    $arr[$counter] = $json1;
    $counter += 1;
endforeach;
$json2 = json_encode($arr);
echo $json2;