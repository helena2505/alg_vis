<?php
require_once 'database.php';

$STH = $DB->prepare("SELECT id, container_name FROM containers ORDER BY id;");
$STH->setFetchMode(PDO::FETCH_ASSOC);
$STH->execute();
$containers = array();
while ($container = $STH->fetch()) {
    array_push($containers, $container);
}