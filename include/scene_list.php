<?php
require_once('database.php');
$id = $_POST["id"];
$result = array();
$json_scenes = select_list($id, "SELECT s_id, xml_code FROM scenes WHERE scenes.s_algorithm = :id ORDER BY s_order;", $DB);
$json_timings = select_list($id, "SELECT timings_id, t_value FROM timings WHERE t_alg = :id ORDER BY t_order;", $DB);
$result["scenes"] = $json_scenes;
$result["timings"] = $json_timings;
echo json_encode($result);

function select_list($id, $query, $database) {
    $counter = 0;
    $arr = array();
    $STH = $database->prepare($query);
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
    return json_encode($arr);
}