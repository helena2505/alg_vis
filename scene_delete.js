function deleteScene(id) {
    /* This function deletes a scene.
    * Input parameter: scene id
    * Output parameter: none.
    * Author: Tatyana Shorygina
    */
    let clickedId = id.split('-')[1]; // Forming the target scene's id
    console.log(clickedId);
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/scene_delete.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(clickedId));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while adding information
        * Input parameter: none. Output parameter: none.
        * Author: Tatyana Shorygina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The returned server's answer is 200 (OK)
                if(xhr.responseText === "1") { // If the deleting was succesful delete from the interface
                    let deletedScene = document.getElementById(id); // Remember the element which is neccessary to delete
                    let borderOfScene = deletedScene.parentNode; // Border of scene element
                    let headerWithScenes = borderOfScene.parentNode; // Header element
                    headerWithScenes.removeChild(borderOfScene); // Recursively delete border with scene image from header
                }
                else {
                    alert('При удалении из базы данных произошла ошибка');
                }
            }
        }
    };
}