<?php
require_once('database.php');
$got_id = $_POST["id"];
$json1 = "";
$json2 = "";
$arr = array();
$counter = 0;
$STH = $DB->prepare("SELECT id, algorithm_name FROM algorithms WHERE container = :id;");
$STH->setFetchMode(PDO::FETCH_ASSOC);
$STH->bindParam(":id", $got_id);
if($STH->execute()) {
    while($algorithm = $STH->fetch()) {
        $json1 = json_encode($algorithm);
        $arr[$counter] = $json1;
        $counter += 1;
    }
    $json2 = json_encode($arr);
    echo $json2;
}
/*$request = "SELECT id, algorithm_name FROM algorithms WHERE container = '".$got_id."';";
$result = mysqli_query($link, $request);
$inf = mysqli_fetch_all($result, MYSQLI_ASSOC);
foreach ($inf as $algorithm):
    $json1 = json_encode($algorithm);
    $arr[$counter] = $json1;
    $counter += 1;
endforeach;
$json2 = json_encode($arr);
echo $json2;*/