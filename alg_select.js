let menu1 = document.getElementById('available-containers'); // Containers' menu
let algTree = menu1.querySelectorAll('.algorithm-list'); // Getting all lists of algorithms
let currentAlgId = ''; // Let for keeping the clicked algorithm id
let addSceneButton = document.getElementById('add-scene'); // Button for adding a scene
let graphIndicator = ''; // Let for keeping the state of the graph editor: if it has been enabled for adding a container or a scene
let noAlgButton = document.getElementById('no-alg');
let indicateClick = 2;
let editedSceneId = 0;
let previousPicture = '';

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
    if (check.length === 2) { // Checking that the click has been on an algorithm but not on the button
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
                    let fileName = JSON.parse(xhr1.responseText); // Parsing the answer to get information about
                    // each scene separately
                    for(let i = 0; i < fileName.length; i++) { // Going through each scene
                        let scenePict = document.createElement('div'); // Creating a frame for each scene's visualisation
                        let sceneInfo = JSON.parse(fileName[i]); // Parsing the info about the scene
                        let sceneImg = new Image(); // Creating an interface image for a scene's visualisation
                        scenePict.id = 'scene-' + sceneInfo["s_id"]; // Setting an id for the frame
                        scenePict.classList.add("one-scene"); // Setting class for the frame
                        scenePict.addEventListener('click', editSceneByEditor); // Setting event listener for working with the scene
                        sceneImg.src = sceneInfo["xml_code"]; // Setting the pictures content gor from the server
                        sceneImg.id = 'scenevis-' + sceneInfo["s_id"]; // Setting id for the image
                        sceneImg.classList.add('small-scene'); // Setting class for the image
                        addSceneButton.before(scenePict); // Inserting the frame into the user's interface
                        scenePict.appendChild(sceneImg); // Appending the image to the frame
                        scenePict.addEventListener('drop', drop); // Adding event listeners for swapping scenes
                        scenePict.addEventListener('dragover', allowDrop);
                        sceneImg.addEventListener('dragstart', drag);
                    }
                    addSceneButton.style.display = 'block'; // Enabling visibility fo the button 'Добавить сцену'
                }
            }
        };
    }
}

addSceneButton.onclick = function() {
    /* The function enables visibility of the graph editor
    * and sets the indicator for adding a scene
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    indicateClick = 0;
    let header = document.getElementById('header');
    let allPictures = header.querySelectorAll('img');
    console.log(allPictures);
    let frame = document.createElement('div');
    frame.classList.add('one-scene');
    frame.id = 'cur-frame';
    addSceneButton.before(frame);
    let sceneImage = document.createElement('img');
    frame.appendChild(sceneImage);
    sceneImage.classList.add('small-scene');
    sceneImage.id = 'cur-scene';
    let numberOfScenes = allPictures.length;
    if(numberOfScenes === 0) {
        sceneImage.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxcHgiIGhlaWdodD0iMXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMSAxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7d3d3LmRyYXcuaW8mcXVvdDsgbW9kaWZpZWQ9JnF1b3Q7MjAyMC0wMi0yOVQwODozNzowMi4yMjRaJnF1b3Q7IGFnZW50PSZxdW90O01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84MC4wLjM5ODcuMTIyIFNhZmFyaS81MzcuMzYmcXVvdDsgZXRhZz0mcXVvdDs4UnJ5dnJmd2pDZTJxMHZfd01UNiZxdW90OyB2ZXJzaW9uPSZxdW90OzEyLjcuOSZxdW90OyB0eXBlPSZxdW90O2RldmljZSZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDs1WmxOQmJHSXh6LWJjaEtlYTQtQyZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtkWkhCRHNJZ0RJYWZodnNHeWRUem5Icnh0SU5uTXVvZ1lldkNNSnMrdlN5QWsweFBsSzkvS1g5TFdObk5aOE1IZVVVQm10Qk16SVFkQ2FVNXpRN3VXTWpUazRMdVBHaU5Fa0cwZ2xxOUlNQXMwSWNTTUNaQ2k2aXRHbExZWU45RFl4UEdqY0VwbGQxUnAxMEgzc0lHMUEzWFczcFR3a3BQOTlIRndpK2dXaGs3NTBVdzNQRW9EazVHeVFWT1g0aFZoSlVHMGZxb20wdlF5L0RpWEh6ZDZVLzI4ekVEdmYxUjRJTDFiWGRKTnNTcU53PT0mbHQ7L2RpYWdyYW0mZ3Q7Jmx0Oy9teGZpbGUmZ3Q7IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpOyI+PGRlZnMvPjxnLz48L3N2Zz4=";
    } else {
        sceneImage.src = allPictures[numberOfScenes - 1].src;
    }
    DiagramEditor.editElement(sceneImage);
    sceneImage.addEventListener('click', editSceneByEditor);
};

function onFinishEdit() {
    if(indicateClick === 0) {
        addScene(currentAlgId);
    } else {
        editScene(editedSceneId);
    }
}

function editSceneByEditor(event) {
    indicateClick = 1;
    let sceneImage = document.getElementById(event.target.id);
    previousPicture = sceneImage.src;
    editedSceneId = event.target.id.split('-')[1];
    DiagramEditor.editElement(sceneImage);
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
    addSceneButton.style.display = 'none'; // Disabling visibility for the button "Добавить сцену"
}