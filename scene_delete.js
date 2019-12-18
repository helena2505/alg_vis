function deleteScene(id) {
    /* The function sends a request to the server whith the info about the scene
    * which is required to be added. The info is: the algorithm's id and HTML code of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Tatyana Shorygina
    */
    let requestedId = id.split('-')[1]; // Forming the target scene's id
    console.log(requestedId);
    let htmlCode = modal.outerHTML;
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/scene_select.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(requestedId) + '&html=' + encodeURIComponent(htmlCode));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while adding information
        * Input parameter: none. Output parameter: none.
        * Author: Tatyana Shorygina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                let content = xhr.responseText; // Getting the text of the server's response
                let canvas = document.getElementById("show-scene"); // canvas
                canvas.innerHTML = content; // Inserting the HTML code into the canvas
            }
        }
    };
}