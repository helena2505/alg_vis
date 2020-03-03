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
    <link rel="stylesheet" href="modal_add.css" />
    <link rel="stylesheet" href="modal_style.css" />
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>

<body>
    <!--Operator mode-->
    <div class="operator">
        <div id="header" class="header">
            <!--div id="new-test" class="one-scene">
                <img onclick="DiagramEditor.editElement(this);" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7S0pGVkY2aTMxSHhFYlYzRldPR1omcXVvdDsgYWdlbnQ9JnF1b3Q7TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xMjIgU2FmYXJpLzUzNy4zNiZxdW90OyBtb2RpZmllZD0mcXVvdDsyMDIwLTAyLTI4VDE3OjUyOjAyLjk1OFomcXVvdDsgaG9zdD0mcXVvdDt3d3cuZHJhdy5pbyZxdW90OyB2ZXJzaW9uPSZxdW90OzEyLjcuOSZxdW90OyB0eXBlPSZxdW90O2RldmljZSZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDtyVXV4dm1hbWROWjF6ckxYT2xfNiZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtuWk5kYjRNZ0ZJWi9qWmRORUxaMnZWeHQ3YkxFcGx1WExPa2RFUW9rS0liaTFQNzZZVDFXWFMrV3pSdmxPUjl3WGw0REVtWDExdEpDSm9aeEhXREU2b0NzQTR4RGpKYisxWkttSTNPODZJQ3dpa0hTQUE3cXdnRWlvS1ZpL0R4SmRNWm9wNG9wVEUyZTg5Uk5HTFhXVk5PMGs5SFRYUXNxK0IwNHBGVGYwMC9Gbk96bzB5TWErQXRYUXZZN2h3Z2lHZTJUQVp3bFphWWFJYklKU0dTTmNkMVhWa2RjdCtMMXV1ekMvZm9Cay9kWmZrU3B3TStibzFDenJsbjhsNUxiQ0pibjd0K3RhN25OUkh4UlJWS3lqL3h0LzdvckV5aEJYMVNYb0JmTTZwcGVRR3ZLblBHMlNSaVFWU1dWNDRlQ3BtMjA4cGJ4VExwTVEvaWt0STZNTnZaYVN4Q0tZNjhuV1FsTG1mS25IOFZPMThmSDRBamNPbDcvdUxOZkJnNXZ0K0R0eTAzR25XMThIWFRCQzVnT25MdUVaVFhZSU96dlZvNHNNQWRHd1huaTFubFExMytBd1AxeThNRTFOdnFieU9ZYiZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSIgaWQ9Im14LWdyYWRpZW50LTAwZmYwMC0xLWZmZmZmZi0xLXMtMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwRkYwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI5IiByeT0iOSIgZmlsbD0idXJsKCNteC1ncmFkaWVudC0wMGZmMDAtMS1mZmZmZmYtMS1zLTApIiBzdHJva2U9IiMwMDAwMDAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PC9zdmc+" width="100%" height="100%">
            </div-->
            <div id="add-scene" class="plus-scene">+Добавить сцену</div>
        </div>
        <!--Drawing window-->
        <div id="drawing">
            <div class="menu-draw">
                <!--iframe src="mxgraph-4.0.6/javascript/examples/grapheditor/www/index.html" class="editor" id="draw"></iframe-->
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
                <div id="add-a-container-div"><div id="add_a_container" class="one-container">+</div></div>
                </ul>
            </div>
        </div>
        <!--Footer-->
        <div id="footer">
            <div class="container">
                <button class="btn btn2" id="no-alg">Сбросить</button>
                <button class="btn btn2" id="op_button"> <a href="index.php" class="btn-ref" unselectable="on">Выйти из режима
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
        <!--Context menu for a scene-->
        <nav class="context-menu" id="scene-menu">
        <ul class="context-menu__items">
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="show-scene-button">
                    <i class="fa fa-eye"></i> Показать сцену
                </a>
            </li>
            <li class="context-menu__item">
                <a href="#" class="context-menu__link" id="scene-delete-button">
                    <i class="fa fa-eye"></i> Удалить сцену
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
        <div class="modal-content" id="dialog-alg-add-content">
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

    <!--App's scripts-->
    <script src="main.js" type="text/javascript"></script>
    <script src="drawio-integration/diagram-editor.js"></script>
    <script src="ncontainer.js" type="module"></script>
    <script src="context_menu.js" type="text/javascript"></script>
    <script src="modal.js" type="text/javascript"></script>
    <script src="alg_list.js" type="text/javascript"></script>
    <script src="alg_add.js" type="text/javascript"></script>
    <script src="alg_delete.js" type="text/javascript"></script>
    <script src="alg_edit.js" type="text/javascript"></script>
    <script src="alg_select.js" type="text/javascript"></script>
    <script src="container_edit.js" type="text/javascript"></script>
    <script src="clear_canvas.js"></script>
    <script src="delete_container.js"></script>
    <script src="scene_add.js" type="text/javascript"></script>
    <script src="scene_select.js" type="text/javascript"></script>
    <script src="scene_edit.js" type="text/javascript"></script>
    <script src="scene_show.js"></script>
    <script src="scene_delete.js" type="text/javascript"></script>
    <script src="scene_swap.js" type="text/javascript"></script>

</body>

</html>