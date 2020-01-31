<?php
require_once('database.php');
$got_id = $_POST["id"];
$req = "SELECT delete_scene(".$got_id.");";
$result = mysqli_query($link, $req);
if(gettype($result) == "boolean") {
    echo("4");
    exit(4);
}
else {
    $inf = mysqli_fetch_all($result, MYSQLI_NUM);
    $file_name = "images/".$inf[0][0];
    unlink($file_name);
}
echo "1";