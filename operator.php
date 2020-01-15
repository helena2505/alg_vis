<!DOCTYPE html>
<?php
require_once 'include/database.php';
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
    <link rel="stylesheet" href="modal_add.css" />
    <link rel="stylesheet" href="modal_style.css" />
</head>

<body>
    <!--Operator mode-->
    <div class="operator">
        <div id="header">
            <div id="add-scene" class="plus-scene">+Добавить сцену</div>
        </div>
        <!--Drawing window-->
        <div id="drawing">
            <div class="menu-draw">
                <div class="primitives" id="graph-primitives">
                    <!--Primitives editor-->
                    <ul class="editor">
                        <button class="btn btn4" id="qbutton">Готово</button>
                        <li>
                            <img id="rectangle" src="pictures1/rect.svg" width="80" height="50" alt="draw rectangle">
                        </li>
                        <li>
                            <img id="circule" src="pictures1/circ.svg" width="100" height="70" alt="draw circle">
                        </li>
                        <li>
                            <img id="right_arrow" src="pictures1/right_arrow.svg" width="100" height="70"
                                alt="draw right arrow">
                        </li>
                        <li>
                            <img id="left_arrow" src="pictures1/left_arrow.svg" width="100" height="70"
                                alt="draw left arrow">
                        </li>
                        <li>
                            <img id="left_down_arrow" src="pictures1/left_down_arrow.svg" width="100" height="70"
                                alt="draw left down arrow">
                        </li>
                        <li>
                            <img id="right_down_arrow" src="pictures1/right_down_arrow.svg" width="100" height="70"
                                alt="draw right down arrow">
                        </li>
                        <li>
                            <img id="stack_queue_without_arrow" src="pictures1/stack_queue_without_arrow.svg"
                                width="100" height="70" alt="draw stack/queue without arrow">
                        </li>
                        <li>
                            <img id="tree_node" src="pictures1/tree_node.svg" width="100" height="70"
                                alt="draw tree_node">
                        </li>
                        <li>
                            <img id="rectangle" src="pictures1/rectangle.svg" width="100" height="70"
                                alt="draw variable">
                        </li>
                        <li>
                            <img id="array" src="pictures1/try.svg" width="100" height="70" alt="draw array element">
                        </li>
                </div>
                <!--Zone where it's allowed to drop objects-->
                <div id="outer-dropzone" class="dropzone"></div>
            </div>
            <!--Structures menu-->
            <div id="structures-col">
                <ul class="menu" id="available-containers">
                <?php foreach ($containers as $container):
                        $id = strval($container["id"]);
                        ?>
                        <li class="one-container" id=<?=$id?>>&#9773; <?=$container["container_name"]?></li>
                        <ul class="algorithm-list" id=<?="alg".$id?>></ul>
                    <?php endforeach; ?>
                </ul>
                <ul class="menu">
                    <li>
                        <div id="add_a_container" class="one-container">+ Создать новый контейнер</div>
                    </li>
                </ul>
            </div>
        </div>
        <!--Footer-->
        <div id="footer">
            <div class="container">
                <button class="btn btn2" id="no-alg">Сбросить</button>
                <button class="btn btn4" id="op_button"> <a href="index.php" class="btn-ref">Выйти из режима
                        оператора</a></button>
            </div>
        </div>
    </div>
    <!--Context menu for removal-->
    <nav class="context-menu" id="my-menu">
        <ul class="context-menu__items">
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="delete-container">
                    <i class="fa fa-eye"></i> Удалить
                </a>
            </li>
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="show-info">
                    <i class="fa fa-eye"></i> Посмотреть информацию
                </a>
            </li>
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="edit-info">
                    <i class="fa fa-eye"></i> Редактировать
                </a>
            </li>
        </ul>
    </nav>
    <!--Dialog window for entering info about a container-->
    <div class="modal" id="modal-window">
        <div class="modal-content">
            <div class="modal-header">
                <span class="cross" id="cross1">&times</span>
                <h2>Добавить структуру данных</h2>
            </div>
            <div class="modal-body">
                <div class="hint" id="struct-name">Название контейнера</div>
                <input class="input-str" id="str-inp-name" type="text">
                <div class="hint" id="struct-info">Описание</div>
                <textarea name="Text1" cols="40" rows="10" class="input-str" id="str-inp-info"></textarea>
                <btn class="confirm" id="conf">OK</btn>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
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
        <div class="modal-content">
            <div class="modal-header">
                <span class="closeBtn" id="cross5">&times;</span>
                <h2 id="alg-name-info"></h2>
            </div>
            <div class="modal-body">
                <p id="alg-descr"></p>
                <h5>Сложность алгоритма:</h5>
                <p id="alg-diff"></p>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>

    <!--Dialog window for entering info about an algorithm-->
    <div class="modal" id="dialog-add-alg">
        <div class="modal-content">
            <div class="modal-header">
                <span class="cross" id="cross2">&times;</span>
                <h2 id="dialog-header">Добавить новый алгоритм</h2>
            </div>
            <div class="modal-body">
                <div class="hint" id="alg-name">Имя алгоритма</div>
                <input class="input-str" id="str-inp-alg-name" type="text">
                <div class="hint" id="alg-info">Описание алгоритма</div>
                <textarea name="Text1" cols="40" rows="10" class="input-str" id="str-inp-alg-info"></textarea>
                <div class="hint" id="alg-dif">Сложность алгоритма</div>
                <input class="input-str" id="str-inp-alg-dif" type="text">
                <btn class="confirm" id="conf1">OK</btn>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>

    <!--Dialog window for editing info about an algorithm-->
    <div class="modal" id="dialog-edit-alg">
        <div class="modal-content">
            <div class="modal-header">
                <span class="cross" id="cross3">&times</span>
                <h2 id="dialog-header">Редактировать информацию об алгоритме</h2>
            </div>
            <div class="modal-body">
                <div class="hint" id="alg-name">Имя алгоритма</div>
                <input class="input-str" id="str-edit-alg-name" type="text">
                <div class="hint" id="edit-alg-info">Описание алгоритма</div>
                <textarea name="Text1" cols="40" rows="10" class="input-str" id="str-edit-alg-info"></textarea>
                <div class="hint" id="edit-alg-dif">Сложность алгоритма</div>
                <input class="input-str" id="str-edit-alg-dif" type="text">
                <btn class="confirm" id="conf3">OK</btn>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>

    <!--Dialog window for editing info about a container-->
    <div class="modal" id="dialog-edit-container">
        <div class="modal-content">
            <div class="modal-header">
                <span class="cross" id="cross4">&times</span>
                <h2>Редактировать информацию о контейнере</h2>
            </div>
            <div class="modal-body">
                <div class="hint" id="struct-name">Название контейнера</div>
                <input class="input-str" id="str-edit-container-name" type="text">
                <div class="hint" id="struct-info">Описание</div>
                <textarea name="Text1" cols="40" rows="10" class="input-str" id="str-edit-container-info"></textarea>
                <btn class="confirm" id="conf4">OK</btn>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>

    <!--Scripts-->
    <script src="main.js"></script>
    <script src="ncontainer.js" type="module"></script>
    <script src="context_menu.js" type="text/javascript"></script>
    <script src="modal.js" type="text/javascript"></script>
    <script src="alg_list.js" type="text/javascript"></script>
    <script src="alg_add.js" type="text/javascript"></script>
    <script src="alg_delete.js" type="text/javascript"></script>
    <script src="alg_edit.js" type="text/javascript"></script>
    <script src="alg_select.js" type="text/javascript"></script>
    <script src="container_edit.js" type="text/javascript"></script>
    <script src="delete_container.js"></script>

    <script src="scene_add.js" type="text/javascript"></script>
    <script src="scene_select.js" type="text/javascript"></script>

</body>

</html>