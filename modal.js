let lst = document.getElementById('available-containers');
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element
let allCont = lst.querySelectorAll('li'); // All containers
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
let showInfo = document.getElementById("show-info");

closeBtn.addEventListener('click', closeModal); // Listen for close click
window.addEventListener('click', outsideClick); // Listen for outside click

function closeModal() {
    /* Function has no input parameters
    * Functions closes modal
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    modal_1wayList.style.display = 'none';
}

function outsideClick(e) {
    /* Function has no input parameters
    * Functions closes modal on outside click
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    if (e.target == modal_1wayList){
        modal_1wayList.style.display = 'none';
    }
}

showInfo.onclick = function() {
    /* Функция-обработчик события получения ответа от сервера
    * В случае подтверждения сервером удачного добавления в БД добавляет имя контейнера в интерфейс
    * Ничего не принимает, ничего не возвращает
    * Автор: Елена Карелина
    */
    let xhr = new XMLHttpRequest(); // Создание нового HTTP запроса к серверу
    let idForInf = getLiId();
    xhr.open("POST", "include/info.php", true); // Определение типа и адреса запроса
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Передача кодировки информации
    xhr.send('id=' + idForInf); // Передача информации
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                modal_1wayList.style.display = 'block';
                contName.innerHTML = document.getElementById(idForInf).textContent.split(' ').slice(1);
                contDescr.innerHTML = xhr.responseText;
            }
        }
    };
}