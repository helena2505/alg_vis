<?php
require_once('database.php');
$got_id = $_POST["id"];
$request = "SELECT algorithm_name FROM algorithms WHERE container = '".$got_id."';";
$result = mysqli_query($link, $request);
$inf = mysqli_fetch_all($result, MYSQLI_ASSOC);
foreach ($inf as $algorithm):
    echo $algorithm["algorithm_name"];
    echo '\n';
endforeach;