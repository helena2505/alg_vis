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
            <h1>Режим оператора</h1>
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
                        <li class="one-container" id=<?=$id?>><div>&#9773; <?=$container["container_name"]?></div></li>
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
                <button class="btn btn2">Сбросить</button>
                <button class="btn btn4" id="op_button"> <a href="index.html" class="btn-ref">Выйти из режима
                        оператора</a></button>
            </div>
        </div>
    </div>
    <!--Context menu for removal-->
    <nav class="context-menu" id="my-menu">
        <ul class="context-menu__items">
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="delete-container">
                    <i class="fa fa-eye"></i> Удалить контейнер
                </a>
            </li>
            <li class="context-menu__item">
                <a href="#" class="context-menu__link">
                    <i class="fa fa-eye"></i> Изменить
                </a>
            </li>
        </ul>
    </nav>
    <!--Dialog window for entering info about container-->
    <div class="modal" id="modal-window">
        <div class="modal-content">
            <div class="modal-header">
                <span id="cross1">&times</span>
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
                <span class="closeBtn">&times;</span>
                <h2>Однонаправленный список</h2>
            </div>
            <div class="modal-body">
                <p>Линейный однонаправленный список — это структура данных, состоящая из элементов одного типа,
                    связанных между собой последовательно посредством указателей.</p>
                <img id="one_list" src="pictures1/stack_queue.svg" width="100" height="70" alt="draw variable">
                <div><button id="editBtn" class="button">Редактировать</button></div>
                <div><button id="deleteBtn" class="button">Удалить</button></div>
            </div>
            <div class="modal-footer">
                <h3> </h3>
            </div>
        </div>
    </div>

    <!--Scripts-->
    <script src="main.js" type="module"></script>
    <script src="ncontainer.js" type="module"></script>
    <script src="delete_container.js" type="module"></script>
    <script src="modal.js" type="module"></script>
</body>

</html>