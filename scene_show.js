function showScene(id) {
    /* The function sends a request to the server with the info about the scene
    * which is required to be shown. The info is: the algorithm's id and image of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Tatyana Shorygina
    */
    let requestedId = id.split('-')[1]; // Forming the target scene's id
    let modal = document.getElementById("modal-show-scene"); // Modal
    modal.style.display = 'block';
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/scene_show.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(requestedId));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while adding information
        * Input parameter: none. Output parameter: none.
        * Author: Tatyana Shorgygina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                let sceneImg = document.createElement('img');
                let canvas = document.getElementById("show-scene");
                canvas.innerHTML = '';
                sceneImg.id = 'cur-scene';
                sceneImg.src = xhr.responseText;
                canvas.appendChild(sceneImg);
            }
        }
    };
}