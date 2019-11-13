let lst = document.getElementById('available-containers');

lst.onclick = function(event) {
    event.preventDefault();
    if(event.target.tagName === 'LI')
        showAlgorithms(event);
};

function showAlgorithms(event) {
    let targetContainer = event.target.id;
    let contId = "alg" + event.target.id;
    let algList = document.getElementById(contId);
    if(algList.classList.contains("algorithm-list-vis")) {
        let allLi = algList.querySelectorAll('LI');
        for(let j = 0; j < allLi.length; j++) {
            algList.removeChild(allLi[j]);
        }
        algList.classList.remove("algorithm-list-vis");
    }
    else {
        let xhr = new XMLHttpRequest(); // Создание нового HTTP запроса к серверу
        xhr.open("POST", "include/alg_list.php", true); // Определение типа и адреса запроса
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Передача кодировки информации
        xhr.send('id=' + encodeURIComponent(targetContainer)); // Передача информации
        xhr.onreadystatechange = function() { // Ждём ответа от сервера
            /* Функция-обработчик события получения ответа от сервера
            * В случае подтверждения сервером удачного добавления в БД добавляет имя контейнера в интерфейс
            * Ничего не принимает, ничего не возвращает
            * Автор: Елена Карелина
            */
            if (xhr.readyState == 4) { // Ответ пришёл
                if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                    let algorithms = xhr.responseText.split('\\n');
                    for(let i = 0; i < algorithms.length - 1; i++) {
                        let new_element = document.createElement('LI');
                        new_element.innerText = algorithms[i];
                        algList.appendChild(new_element);
                    }
                }
            }
        };
        algList.classList.add("algorithm-list-vis");
    }
}