let canvas1 = document.getElementById("outer-dropzone"); // Getting the canvas element

function addScene(id) {
    /* The function sends a request to the server whith the info about the scene
    * which is required to be added. The info is: the algorithm's id and HTML code of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Elena Karelina.
    */
    let htmlCode = canvas1.outerHTML;
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/add_scene.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(id) + '&html=' + encodeURIComponent(htmlCode));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while adding information
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                console.log('One day I will get it, but not now');
            }
        }
    };
}