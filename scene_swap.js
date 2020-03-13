function allowDrop(event) {
    /* Event listener for a scene crossing another scene
    * The function disables the default event
    * Input parameter: event
    * Output parameter: none
    * Author: Elena Karelina
    */
    event.preventDefault();
}

function drag(event) {
    /* Event listener for starting dragging a scene
    * The function transferes the dragged scene's id
    * and sets the dragged image
    * Input parameter: event
    * Output parameter: none
    * Author: Elena Karelina
    */
    event.dataTransfer.setData("src", event.target.id);
    event.dataTransfer.setDragImage(event.target.parentElement, 0, 0);
}

function drop(event) {
    /* Event listener for dropping a scene on the place of another scene
    * The function sends the request with the ids of swapped scenes
    * The function includes other functions which change the elements in the user's window
    * depend on the server response
    * Input parameter: event
    * Output parameter: none
    * Author: Elena Karelina
    */
    event.preventDefault(); // Disabling the default event
    let src = document.getElementById(event.dataTransfer.getData("src")); // Getting the dragged scene
    let srcParent = src.parentNode; // Getting the frames and the pictures
    let tgt = event.currentTarget.firstElementChild;
    let targetDiv = event.currentTarget;
    targetDiv.replaceChild(src, tgt); // Insert dragged image into the target frame
    srcParent.appendChild(document.createElement('div')); // Insert temporary child element from the source frame
    if(src.id != tgt.id) { // If target and source scenes are not the same one
        let newId = src.id.split('-')[1]; // Getting the ids in the database
        let oldId = tgt.id.split('-')[1];
        let xhr = new XMLHttpRequest(); // Forming request to the server
        xhr.open("POST", "include/scene_swap.php", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
        xhr.send('new=' + encodeURIComponent(newId) + '&old=' + encodeURIComponent(oldId));
        xhr.onreadystatechange = function () {
            /* Event listener for getting the server's response
            * Changes the scenes' pictures order in the user's window
            * if the change in database was successful, otherwise rolls back the changes int the interface
            * Input parameter: none
            * Output parameter: none
            * Author: Elena Karelina
            */
            if (xhr.readyState == 4) { // The reply is ready
                if (xhr.status == 200) { // And the status is success
                    let order = xhr.responseText.split(' ');
                    if(order[0] == 0 && order[1] == 0) { // Checking if the backend script has formed the error's message
                        srcParent.removeChild(srcParent.firstChild);
                        srcParent.appendChild(src.cloneNode(true));
                        targetDiv.replaceChild(tgt, src);
                        alert('При запросе к серверу произошла ошибка');
                    } else { // otherwise parsing the scenes' order in the algorithm
                        let scenePanel = document.getElementById('header'); // Getting the neccessary DOM's elements
                        let order0 = parseInt(order[0]);
                        let order1 = parseInt(order[1]);
                        let newId = srcParent.id; // Setting the temporary variables
                        let tmpId = targetDiv.id;
                        let curPict = tgt, tmpPict = tgt, curId = tmpId;
                        let nextPics = [], i =0;
                        srcParent.id = 'tmp-scene';
                        targetDiv.id = newId;
                        if(parseInt(order[1]) > parseInt(order[0])) { // If it is requested to reorder from lef to right
                            nextPics = scenePanel.querySelectorAll('.one-scene');
                            for (i = order0; i < order1; i++) { // Passing through the scenes which are required to be changed
                                reorderScenes(); // Calling the function for shifting scenes
                            }
                        } else { // If it is requested to reorder from right to left
                            nextPics = scenePanel.querySelectorAll('.one-scene');
                            for(i = order0 - 2; i >= order1 - 1; i--) {
                                reorderScenes(); //Calling the function for shifting scenes
                            }
                        }
                        function reorderScenes() {
                            /* The function keeps the previous scene's picture and id of the frame
                            * and resets the id and the picture according to the new order
                            * Input parameter: none
                            * Output parameter: none
                            * Author: Elena Karelina
                            */
                            tmpId = nextPics[i].id;
                            nextPics[i].id = curId;
                            curId = tmpId;
                            tmpPict = nextPics[i].firstElementChild;
                            nextPics[i].replaceChild(curPict, tmpPict);
                            curPict = tmpPict;
                        }
                    }
                }
            }
        }
    }
}
