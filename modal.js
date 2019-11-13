let lst = document.getElementById('available-containers');
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element
let allCont = lst.querySelectorAll('li'); // All containers
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
closeBtn.addEventListener('click', closeModal); // Listen for close click
window.addEventListener('click', outsideClick); // Listen for outside click


lst.onclick = function(event) {
    console.log(event.target.tagName);
    if(event.target.tagName === 'LI')
        openModal(event);
};

function openModal(event) {
    console.log(event.target.id);
    modal_1wayList.style.display = 'block';
    let xhr = new XMLHttpRequest(); // Создание нового HTTP запроса к серверу
    xhr.open("POST", "include/info.php", true); // Определение типа и адреса запроса
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Передача кодировки информации
    xhr.send('id=' + encodeURIComponent(event.target.id)); // Передача информации
    xhr.onreadystatechange = function() { // Ждём ответа от сервера
        /* Функция-обработчик события получения ответа от сервера
        * В случае подтверждения сервером удачного добавления в БД добавляет имя контейнера в интерфейс
        * Ничего не принимает, ничего не возвращает
        * Автор: Елена Карелина
        */
        if (xhr.readyState == 4) { // Ответ пришёл
            if(xhr.status == 200) { // Сервер вернул код 200 (что хорошо)
                contName.innerHTML = document.getElementById(event.target.id).textContent;
                contDescr.innerHTML = xhr.responseText;
            }
        }
    };
}

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