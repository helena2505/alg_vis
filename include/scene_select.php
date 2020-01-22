<?php
require_once('database.php');
$id = $_POST["id"];
$str = "";
$request = "SELECT xml_code FROM scenes WHERE s_id=".$id.";";
$result = mysqli_query($link, $request);
$html_code = mysqli_fetch_all($result, MYSQLI_ASSOC);
foreach($html_code as $content):
    $str = $content["xml_code"];
endforeach;
echo $str;
