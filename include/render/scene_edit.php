<?php
require_once('../database.php');
$xml = $_POST["xml"];
$svg_file = "tmp".getmypid().".svg";
$xml_file = "tmp".getmypid().".xml";
file_put_contents($xml_file, $_POST["xml"]);
exec("java -classpath bin;backend/mxgraph-all.jar com.mxgraph.examples.Xml2Svg ".$xml_file." ".$svg_file,
    $message, $status);
if($status != 0) {
    exit(3);
}
else {
    $scene_id = $_POST["id"];
    $request = "SELECT update_scene(".$scene_id.", '".$xml."');";
    $result = mysqli_query($link, $request);
    if(gettype($result) == "boolean") {
        exit(4);
    }
    $inf = mysqli_fetch_all($result, MYSQLI_NUM);
    $file_name = "../images/".$inf[0][0];
    rename($svg_file, $file_name);
    unlink($xml_file);
    echo $inf[0][0];
}