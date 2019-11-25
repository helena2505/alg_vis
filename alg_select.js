let menu1 = document.getElementById('available-containers'); // Containers' menu
let algTree = menu1.querySelectorAll('.algorithm-list'); // Getting all lists of algorithms
let currentAlgId = ''; // Let for keeping the clicked algorithm id
let addSceneButton = document.getElementById('add-scene'); // Button for adding a scene
let graphEditor = document.getElementById("graph-primitives"); // Graphical primitives menu
let graphIndicator = ''; // Let for keeping the state of the graph editor: if it has been enabled for adding a container or a scene

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
    if (check.length === 2) { // Checkking that the click has been on an algorithm but not on the buttton
        // 'Добавить алгоритм'
        currentAlgId = check[1]; // Getting the algorithm's id which it has in the database
        cleanScenes();
        let xhr1 = new XMLHttpRequest(); // Creating new HTTP request
        xhr1.open("POST", "include/scene_list.php", true); // Setting destination and type
        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
        xhr1.send('id=' + encodeURIComponent(currentAlgId));
        xhr1.onreadystatechange = function () { // Waiting for the server's answer
            /* Event listener for getting response from server
            * Informs the user if an error has occured at updating information
            * Input parameter: none. Output parameter: none.
            * Author: Elena Karelina
            */
            if (xhr1.readyState == 4) { // The answer has been got
                if (xhr1.status == 200) {
                    let fileName = JSON.parse(xhr1.responseText);
                    for(let i = 0; i < fileName.length; i++) {
                        let scenePict = document.createElement('div');
                        let sceneInfo = JSON.parse(fileName[i]);
                        let sceneImg = new Image();
                        scenePict.id = 'scene-' + sceneInfo["s_id"];
                        scenePict.classList.add("one-scene");
                        sceneImg.src = 'data:image/jpg;base64,' + sceneInfo["s_picture"];
                        sceneImg.classList.add('small-scene');
                        addSceneButton.before(scenePict);
                        scenePict.appendChild(sceneImg);
                    }
                }
            }
        };
        addSceneButton.style.display = 'block'; // Enabling visibility fo the button 'Добавить сцену'
    }
}

addSceneButton.onclick = function() {
    /* The function enables visibility of the graph editor
    * and sets the indicator for adding a scene
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
     */
    graphEditor.classList.add("primitives-active"); // Enabling the graph editor's visibility
    graphIndicator = 's';
}

function cleanScenes () {
    /* The function removes all child nodes from the
    * panel which displays images of the scenes
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    let sceneImageDisplay = document.getElementById("header"); // The element which keeps all scenes
    let allScenes = sceneImageDisplay.querySelectorAll('div'); // Selecting all child divs
    for(let i = 0; i < allScenes.length; i++) { // Removing each div
        let curDiv = allScenes[i];
        if(curDiv.id != 'add-scene')
            sceneImageDisplay.removeChild(curDiv);
    }
}