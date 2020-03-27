let menu1 = document.getElementById('available-containers'); // Containers' menu
let algTree = menu1.querySelectorAll('.algorithm-list'); // Getting all lists of algorithms
let currentAlgId = ''; // Let for keeping the clicked algorithm id
let graphEditor = document.getElementById("palette-zone"); // Graphical primitives menu
let graphIndicator = ''; // Let for keeping the state of the graph editor: if it has been enabled for adding a container or a scene
let noAlgButton = document.getElementById('no-alg2');

// Adding event listeners for clicking on each algorithm
for(let i = 0; i < algTree.length; i++) {
    let curAlgTree = algTree[i];
    curAlgTree.addEventListener('click', selectAlg)
}

function selectAlg(event) {
    /* The function gets the id of the clicked algorithm
    * and enables visibility of the button 'Добавить сцену'
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
     */
    let eventTarget = event.target.id;
    let check = eventTarget.split('-') // Splitting the clicked element id
    console.log(check);
    if (check.length === 2) { // Checkking that the click has been on an algorithm but not on the buttton
        // 'Добавить алгоритм'
        currentAlgId = check[1]; // Getting the algorithm's id which it has in the database
        cleanScenes();
        let xhr1 = new XMLHttpRequest(); // Creating new HTTP request
        xhr1.open("POST", "include/scene_list.php", true); // Setting destination and type
        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
        xhr1.send('id=' + encodeURIComponent(currentAlgId));
        xhr1.onreadystatechange = function () { // Waiting for the server's answer
            /* Event listener for getting response from server.
            * The function unpackages the info about the visualisation of each scene
            * and about their ids. The function inserts the recived scenes' visualisation
            * into the list of the scenes.
            * Input parameter: none. Output parameter: none.
            * Author: Elena Karelina
            */
            if (xhr1.readyState == 4) { // The answer has been got
                if (xhr1.status == 200) {
                    console.log("success");
                    let fileName = JSON.parse(xhr1.responseText); // Parsing the answer to get information about
                    // each scene separately
                    for(let i = 0; i < fileName.length; i++) { // Going through each scene
                        let scenePict = document.createElement('div'); // Creating a frame for each scene's visualisation
                        let sceneInfo = JSON.parse(fileName[i]); // Parsing the info about the scene
                        let sceneImg = new Image(); // Creating an interface image for a scene's visualisation
                        scenePict.id = 'scene-' + sceneInfo["s_id"]; // Setting an id for the frame
                        scenePict.classList.add("one-scene"); // Setting class for the frame
                        scenePict.addEventListener('click', selectScene); // Setting event listener for working with the scene
                        sceneImg.src = sceneInfo["s_picture"]; // Setting the pictures content got from the server
                        sceneImg.id = 'scenevis-' + sceneInfo["s_id"]; // Setting id for the image
                        sceneImg.classList.add('small-scene'); // Setting class for the image
                        scenePict.appendChild(sceneImg); // Appending the image to the frame
                        scenePict.addEventListener('drop', drop); // Adding event listeners for swapping scenes
                        scenePict.addEventListener('dragover', allowDrop);
                        sceneImg.addEventListener('dragstart', drag);
                    }
                }
            }
        };
    }
}

function cleanScenes () {
    /* The function removes all child nodes from the
    * panel which displays images of the scenes.
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    let sceneImageDisplay = document.getElementById("header"); // The element which keeps all scenes
    let allScenes = sceneImageDisplay.querySelectorAll('div'); // Selecting all child divs
    for(let i = 0; i < allScenes.length; i++) { // Removing each div
        let curDiv = allScenes[i];
        if(curDiv.id != 'add-scene') // It is not necessary to remove the button "Добавить сцену" as it should be
            // on the panel for every algorithm
            sceneImageDisplay.removeChild(curDiv);
    }
}

noAlgButton.onclick = function() {
    /* The function relises exit from wroking with an algorithm mode
    * and resets the current algorithm's id.
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina.
     */
    cleanScenes(); // Calling the function for cleaning the panel of the scenes
    currentAlgId = ''; // Resetting the current algorithm id
}