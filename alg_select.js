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