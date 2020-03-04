let canvas1 = document.getElementById("drawing-field"); // Getting the canvas element

function addScene(id) {
    /* The function sends a request to the server whith the info about the scene
    * which is required to be added. The info is: the algorithm's id and HTML code of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Elena Karelina.
    */
    let tmp = document.getElementById('cur-scene');
    let xmlCode = tmp.src;
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
                let scenePict = document.getElementById('cur-frame');
                let sceneImg = document.getElementById('cur-scene');
                if(parseInt(xhr.responseText) == 0) {
                    sceneImg.parentNode.removeChild(sceneImg);
                    scenePict.parentNode.removeChild(scenePict);
                    alert('Ошибка при добавлении в базу данных');
                } else {
                    scenePict.id = 'scene-' + xhr.responseText;
                    scenePict.addEventListener('click', selectScene);
                    sceneImg.id = 'scenevis-' + xhr.responseText;
                    scenePict.addEventListener('drop', drop); // Adding event listeners for swapping scenes
                    scenePict.addEventListener('dragover', allowDrop);
                    sceneImg.addEventListener('dragstart', drag);
                }
            }
        }
    };
}