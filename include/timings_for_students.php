<?php
require_once('database.php');
$id = $_POST["id"];
$json1 = "";
$json2 = "";
$counter = 0;
$arr = array();
$STH = $DB->prepare("SELECT t_value FROM timings WHERE t_alg = :id ORDER BY t_order;");
$STH->setFetchMode(PDO::FETCH_ASSOC);
if(! $STH->execute(array("id" => $id))) {
    echo "0";
    exit(1);
}
$file_name = $STH->fetchAll();
foreach ($file_name as $scene):
    $json1 = json_encode($scene);
    $arr[$counter] = $json1;
    $counter += 1;
endforeach;
$json2 = json_encode($arr);
echo $json2;
