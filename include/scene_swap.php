<?php
require_once('database.php');
$new_id = $_POST["new"];
$old_id = $_POST["old"];

$STH = $DB->prepare("SELECT swap_scene(:old_id, :new_id);");
$STH->setFetchMode();
if(! $STH->execute(array("old_id" => $old_id, "new_id" => $new_id))) {
    echo("0 0");
    exit(4);
}
else {
    $inf = $STH->fetchAll();
    echo($inf[0][0]);
}
