function selectScene(event) {
    /* The function forms the id of the clicked scene
    * and sends a request to the server for getting html code of the scene.
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina.
     */
    //console.log(event.target.id);
    let requestedId = event.target.id.split('-')[1]; // Forming the target scene's id
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/scene_select.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(requestedId)); // Sending THE REQUESTED SCENE'S ID
    xhr.onreadystatechange = function() { // Waiting for the server's answer
        /* Event listener for getting response from server.
        * Inserts html code for the scene which has been recieved from the server.
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The server's returned code 200 (success)
                let content = xhr.responseText; // Getting the text of the server's response
                content = content.slice(42, content.length - 6); // Slicing the html code in order to remove
                // the parent div which is the canvas
                let canvas2 = document.getElementById('outer-dropzone');
                canvas2.innerHTML = content; // Inserting the HTML code into the canvas
                graphIndicator = 'e'; // Setting the graph editor to the mode for editing a scene
                graphEditor.classList.add("primitives-active"); // Enabling the graph editor's visibility
            }
        }
    };
}