<?php
require_once('../database.php');
$xml = $_POST["xml"];
$xml_file = "tmp".getmypid().".xml";
$svg_file = "tmp".getmypid().".svg";
file_put_contents($xml_file, $_POST["xml"]);
exec("java -Dfile.encoding=UTF-8 -classpath bin".PATH_SEPARATOR."backend/mxgraph-all.jar com.mxgraph.examples.Xml2Svg ".$xml_file." ".$svg_file,
    $message, $status);
if($status != 0) {
    unlink($xml_file);
    unlink($svg_file);
    echo "3";
    exit(3);
}
else {
    $alg_id = $_POST["id"];
    $file_name = "scene_";
    $STH = $DB->prepare("SELECT insert_scene(:id, :xml, :file_name);");
    $STH->setFetchMode(PDO::FETCH_NUM);
    if(!$STH->execute(array("id" => $alg_id, "xml" => $xml, "file_name" => $file_name))) {
        unlink($xml_file);
        unlink($svg_file);
        echo "4";
        exit(4);
    }
    $inf = $STH->fetchAll();
    $file_name = "../images/".$inf[0][0];
    rename($svg_file, $file_name);
    $file_name = "include/images/".$inf[0][0];
    unlink($xml_file);
    echo $file_name;
}
