let canvas1 = document.getElementById("drawing-field"); // Getting the canvas element

function addScene(id) {
    /* The function sends a request to the server whith the info about the scene
    * which is required to be added. The info is: the algorithm's id and HTML code of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Elena Karelina.
    */
    let xmlCode = getXml();
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/render/scene_add.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(id) + '&xml=' + encodeURIComponent(xmlCode));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while adding information
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                if(parseInt(xhr.responseText) === 3) {
                    alert('Ошибка на сервере при рендере изображения');
                } else {
                    if(parseInt(xhr.responseText) === 4) {
                        alert('Ошибка при добавлении в базу данных');
                    } else {
                        let scenePict = document.createElement('div');
                        let sceneImg = new Image();
                        let fileName = xhr.responseText;
                        let sceneNum = fileName.split('_')[1];
                        sceneNum = sceneNum.split('.')[0];
                        scenePict.id = 'scene-' + sceneNum;
                        scenePict.classList.add("one-scene"); // Setting class for the frame
                        scenePict.addEventListener('click', selectScene);
                        sceneImg.src = fileName;
                        sceneImg.id = 'scenevis-' + sceneNum;
                        sceneImg.classList.add('small-scene'); // Setting class for the image
                        addSceneButton.before(scenePict); // Inserting the frame into the user's interface
                        scenePict.appendChild(sceneImg); // Appending the image to the frame
                    }
                }
            }
        }
    };
}