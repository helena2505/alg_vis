<?php
require_once('database.php');
$got_id = $_POST["id"];
$req = "DELETE FROM scenes WHERE scenes.s_id=".$got_id.";";
$result = mysqli_query($link, $req);
echo $result;