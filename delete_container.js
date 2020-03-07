function deleteAContainer(elementForDelete) {
    /* Event listener for the click on button "Удалить контейнер" of the context menu
    * The function deletes a container from a list
    * Input parameter: event. Output parameter: none
    * Author: Elena Karelina
     */
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/container_delete.php", true); // Setting type and address
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(elementForDelete));
    xhr.onreadystatechange = function() { // Waiting for the server's response
        /* Event listener for the server's response
        * In case of confirmation of deleting from database deletes the container's name from the interface
        * Input parameter: none. Output parameter: none
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been recieved
            if(xhr.status == 200) { // The returned server's answer is 200 (OK)
                if(xhr.responseText == "1") { // If the deleting was succesful delete from the interface
                    let deletedContainer = document.getElementById(elementForDelete); // Remember the element which is neccessary to delete
                    // its ID has been saved in function clickInsideElement
                    let containerMenu = document.getElementById('available-containers');
                    containerMenu.removeChild(deletedContainer); // Deleting li element
                    let listForDelete = document.getElementById('alg' + elementForDelete);
                    listForDelete.parentNode.removeChild(listForDelete);
                    elementForDelete = ''; // Forgetting the deleted id
                }
                else {
                    alert('При удалении из базы данных произошла ошибка');
                }
            }
        }
    };
}