<!DOCTYPE html>
<?php
    require_once 'include/container_list.php';
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Algorithm and structure visualisation</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="menu_style.css" />
    <link rel="stylesheet" href="footer_style.css" />
    <link rel="stylesheet" href="context_menu.css" />
    <link rel="stylesheet" href="scene_buttons.css" />
</head>
<body>
<!--Student mode-->
<div class="operator">
    <div id="header"></div>
        <!--Drawing window-->
        <div id="drawing">
            <div class="menu-draw">
                <button class="btn btn2" id="btn-prev-scene">Назад</button>
                <button class="btn btn2" id="btn-next-scene">Вперёд</button>
            </div>
            <!--Structures menu-->
            <div id="structures-col">
                <ul class="menu" id="available-containers">
                <?php foreach ($containers as $container):
                        $id = strval($container["id"]);
                        ?>
                        <li class="one-container" id=<?=$id?>><?=$container["container_name"]?></li>
                        <ul class="algorithm-list" id=<?="alg".$id?>></ul>
                    <?php endforeach; ?>
                </ul>
                </ul>
            </div>
        </div>

    <!--Footer-->
    <div id="footer">
        <div class="container">
            <button class="btn btn4" id="op_button"> <a href="operator.php" class="btn-ref" unselectable="on">Войти в режим оператора</a></button>
        </div>
    </div>
</div>
    <!--Scripts-->
    <script src="student_alg_list.js" type="text/javascript"></script>
    <script src="student_context_menu.js" type="text/javascript"></script>
</body>
</html>