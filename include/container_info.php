<?php
require_once('database.php');
$arr = array();
$counter = 0;
$got_id = $_REQUEST["id"];
$STH = $DB->prepare("SELECT container_name, description FROM containers WHERE containers.id = :id;");
$STH->setFetchMode(PDO::FETCH_ASSOC);
$STH->bindParam(':id', $got_id);
if($STH->execute()) {
    while($info = $STH->fetch()) {
        $json1 = json_encode($info);
        $arr[$counter] = $json1;
        $counter += 1;
    }
    echo $json1;
}
