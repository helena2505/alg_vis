<?php
require_once('database.php');
$new_id = $_POST["new"];
$old_id = $_POST["old"];
$request = "SELECT swap_scene(".$old_id.", ".$new_id.");";
$result = mysqli_query($link, $request);
if(gettype($result) == "boolean") {
    echo("0 0");
    exit(4);
}
else {
    $inf = mysqli_fetch_all($result, MYSQLI_NUM);
    echo($inf[0][0]);
}
