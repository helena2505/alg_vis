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
    <link rel="stylesheet" href="modal_add.css" />
    <link rel="stylesheet" href="modal_style.css" />
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
            <button class="btn btn4" id="op_button"> <a href="login.html" class="btn-ref" unselectable="on">Войти в режим оператора</a></button>
        </div>
    </div>

    <!--Context menu for show info-->
        <nav class="context-menu" id="my-menu">
        <ul class="context-menu__items">
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="show-info">
                    <i class="fa fa-eye"></i> Посмотреть информацию
                </a>
            </li>
        </ul>
    </nav>

            <!--Context menu for a scene-->
            <nav class="context-menu" id="scene-menu">
        <ul class="context-menu__items">
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="show-scene-button">
                    <i class="fa fa-eye"></i> Показать сцену
                </a>
            </li>
        </ul>

</div>

    <!--Modal window for displaying info about structures-->
    <div id="list1Modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="closeBtn" id="cross0">&times;</span>
                    <h2 id="cont-name"></h2>
                </div>
                <div class="modal-body">
                    <p id="cont-descr"></p>
                </div>
                <div class="modal-footer">
                    <h3> </h3>
                </div>
            </div>
    </div>

    <!--Modal window for displaying info about an algorithm-->
    <div id="modal-alg-info" class="modal">
        <div class="modal-content" id="modal-alg-info-content">
            <div class="modal-header">
                <span class="closeBtn" id="cross5">&times;</span>
                <h2 id="alg-name-info"></h2>
            </div>
            <div class="modal-body">
                <p id="alg-descr"></p>
                <h4>Сложность алгоритма:</h4>
                <p id="alg-diff"></p>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>

        <!--Dialog window for showing a scene-->
        <div class="modal" id="modal-show-scene">
        <div class="modal-content">
            <div class="modal-header">
                <span class="cross" id="cross6">&times</span>
                <h2>Просмотр сцены</h2>
            </div>
            <div class="show-scene-wrap">
            <p class="modal-body" id="show-scene"></p></div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>
    
    <!--Scripts-->
    <script src="student_alg_list.js" type="text/javascript"></script>
    <script src="student_modal.js" type="text/javascript"></script>
    <script src="student_context_menu.js" type="text/javascript"></script>
</body>
</html>
