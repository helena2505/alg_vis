function editSceneByEditor(event) {
    /* The event listener for clicking on a scene to be edited
    * The function calls the graph editor to edit a scene
    * and passes the picture which is request to be edited
    * Input parameter: event. Output parameter: none
    * Author: Elena Karelina
    */
    indicateClick = 1; // Marking that editing has been requested
    let sceneImage = document.getElementById(event.target.id);
    previousPicture = sceneImage.src;
    editedSceneId = event.target.id.split('-')[1];
    DiagramEditor.editElement(sceneImage); // Calling the editor
}

function editScene(sceneId) {
    /* The function sends a request to update the scene visualisation
    * Input parameter: the id of the scene which is necessary to update
    * Output parameter: none
    * Author: Elena Karelina
     */
    let editedPicture = document.getElementById('scenevis-' + sceneId);
    let xmlCode = editedPicture.src;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "include/scene_edit.php", true);
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
                if (xhr.responseText == "0") {
                    alert('Ошибка при добавлении в базу данных');
                    let editedPicture = document.getElementById('scenevis-' + sceneId);
                    editedPicture.src = previousPicture;
                }
            }
        }
    };
}