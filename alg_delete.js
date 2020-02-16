function deleteAlgorithm(elementForDelete) {
    /* The function forms request for deleting an algorithm to the server database
    * The function gets the server's response and removes the container from the interface
    * if the deletion has been successful. Otherwise it informs user about error while deleting
    * Input parameters: none. Output parameters: none.
    * Author: Elena Karelina
     */
    let clickedId = elementForDelete;
    let deletedAlgId = clickedId.split('-')[1]
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/del_alg.php", true); // Setting type and address
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(deletedAlgId));
    xhr.onreadystatechange = function() { // Waiting for the server's response
        /* Event listener for the server's response
        * In case of confirmation of deleting from database deletes the algorithm's name from the interface
        * Input parameter: none. Output parameter: none
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been recieved
            if(xhr.status == 200) { // The returned server's answer is 200 (OK)
                if(xhr.responseText == "1") { // If the deleting was succesful delete from the interface
                    let deletedAlgorithm = document.getElementById(clickedId); // Remember the element which is neccessary to delete
                    // its ID has been saved in function clickInsideElement
                    let algorithmMenu = deletedAlgorithm.parentNode;
                    algorithmMenu.removeChild(deletedAlgorithm); // Deleting li element
                }
                else {
                    alert('При удалении из базы данных произошла ошибка');
                }
            }
        }
    };
}