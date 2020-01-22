<?php
require_once('../database.php');
$xml = $_POST["xml"];
$xml_file = "tmp".getmypid().".xml";
$svg_file = "tmp".getmypid().".svg";
file_put_contents($xml_file, $_POST["xml"]);
exec("java -classpath bin;backend/mxgraph-all.jar com.mxgraph.examples.Xml2Svg ".$xml_file." ".$svg_file,
    $message, $status);
if($status != 0) {
    exit(3);
}
else {
    $alg_id = $_POST["id"];
    $file_name = "alg_".$alg_id."_scene_";
    $request = "SELECT insert_scene(".$alg_id.", '".$xml."', '".$file_name."');";
    $result = mysqli_query($link, $request);
    $inf = mysqli_fetch_all($result, MYSQLI_NUM);
    $file_name = "../images/".$inf[0][0];
    rename($svg_file, $file_name);
    $file_name = "include/images/".$inf[0][0];
    unlink($xml_file);
    echo $file_name;
}
