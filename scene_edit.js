function editScene(sceneId) {
    let xmlCode = getXml();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "include/render/scene_edit.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(sceneId) + '&xml=' + encodeURIComponent(xmlCode));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while editting information
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                if(parseInt(xhr.responseText) === 3) {
                    alert('Ошибка на сервере при рендере изображения');
                } else {
                    if (parseInt(xhr.responseText) === 4) {
                        alert('Ошибка при добавлении в базу данных');
                    } else {
                        let editedPicture = document.getElementById('scenevis-' + sceneId);
                        editedPicture.src = xhr.responseText;
                    }
                }
            }
        }
    }
}