let menu = document.getElementById('my-menu'); // Context menu let
let menuState = 0; // Let of context's menu state (visible or not, not visible by default)
let activeClassName = "context-menu--active"; // Class name for enableing context menu's visibility
let taskItemClassName = 'one-algorithm'; // Menu's class name
let taskItemClassName2 = 'one-scene'; // Menu's class name
let windowWidth = 0; // Let for keeping the window's width
let windowHeight = 0; // Let for keeping the window's height
let clickCoords; // Let for keeping the coordinates where the click occured
let clickCoordsX; // Let for keeping the coordinate X where the click occured
let clickCoordsY; // Let for keeping the coordinate Y where the click occured
let elementForDelete = ''; // ID of target elemet (algorithm or container)
let typeForDelete = ''; // Type of target element (algorithm or container)
let showInfo = document.getElementById("show-info"); // Context menu button "Посмотреть информацию"
let sceneMenu = document.getElementById('scene-menu'); // Context menu
let showSceneButton = document.getElementById('show-scene-button'); // Context menu button "Показать сцену"
let deleteSceneButton = document.getElementById("scene-delete-button"); // Context menu's button "Удалить сцену"
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element for structure
let algInfoModal = document.getElementById('modal-alg-info'); // Get modal element for algorithm
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let algNameInfo = document.getElementById('alg-name-info'); // Algorithm name
let algDescr = document.getElementById('alg-descr'); // Algorithm description
let algDifficultyInfo = document.getElementById('alg-diff'); // Algorithm description

// Adding event listener of left click for all document's area
document.addEventListener( "click", function(event) {
    /* Event listener of left click
    * The function disables the visibility of the context menu if the left click has occured
    * Input parameter: event. Output parameters: no
    * Author: Elena Karelina
     */
    var button = event.which || event.button; // Checking that left click has happened indeed
    if (button === 1) {
        toggleMenuOff(); // Disabling context menu visibility
    }
});

//  Adding event listener of pressing escape key
window.onkeyup = function(event) {
    /* Event listner of pressing escape
    * The function disables the visibility of the context menu if clicking escape has occured
    * Input parameter: event. Output parameters: no
    * Author: Elena Karelina
     */
    if (event.keyCode === 27) { // Checking that pressing escape has happened indeed
        toggleMenuOff(); // Disabling context menu visibility
    }
};

//  Adding event listener of resizing window
window.onresize = function(event) {
    /* Event listener of resizing window
    * The function disables the visibility of the context menu if clicking escape has occured
    * Input parameter: event. Output parameters: no
    * Authors: Elena Karelina, Tatyana Shorygina
     */
    toggleMenuOff(); // Disabling context menu visibility
};

function clickInsideElement(event, className) {
    /* The function checks that the left click has been on the list of containers or on the list of algorithms
    * Input parameters: event, class name of any list of containers
    * Returns the parent element of className or element of one container if the click has been on it
    * Otherwise returns false
    * Author: Elena Karelina
    */
    let el = event.srcElement || event.target; // Getting the element on which the click has been
    if (el.classList.contains("small-scene") || el.classList.contains("one-scene")) {
        elementForDelete = el.id;
        typeForDelete = 'scene';
        return 3;
    }
    if (el.classList.contains("one-algorithm") || el.classList.contains("algorithm-list-vis")) {
        elementForDelete = el.id;
        typeForDelete = 'alg';
        return 2;
    }
    if (el.classList.contains("one-container")) {
        elementForDelete = el.id;
        typeForDelete = 'cont';
        return 1;
    }
    return 0; // This line is to be executed only in case when none of the parents' elements belongs to the class className
}

// Adding event listener for right click
document.addEventListener("contextmenu", function(event) {
    /* Event listener of right click
    * The function shows the context menu in place where the right click has happened if it has happened on the containers' list
    * Otherwise the function hides the context menu
    * Input parameters: event, class name of the parent element
    * Authors: Elena Karelina, Tatyana Shorygina
     */
    let q = clickInsideElement(event, taskItemClassName);
    if (q == 1 || q == 2 ) { // Checking that the right click has happened on the containers' list
        event.preventDefault(); // Disabling default listener
        toggleMenuOn(); // Enabling visibility of context menu
        positionMenu(event); // Calling the function for positioning menu
    } else { // If the right click hasn't been on containers list
        toggleMenuOff(); // Disabling visibility of context menu
    }
    if (clickInsideElement(event, taskItemClassName2) === 3) { // Checking that the right click has happened on the scenes' list
        event.preventDefault(); // Disabling default listener
        toggleMenuOn2(); // Enabling visibility of context menu
        positionMenu(event); // Calling the function for positioning menu
        return 0;
    } /*else { // If the right click hasn't been on containers list
        toggleMenuOff(); // Disabling visibility of context menu
    }*/
});

function toggleMenuOff() {
    /* The function disables visibility of the context menu
    * Input parameters: none
    * Output parameters: none
    * Authors: Elena Karelina, Tatyana Shorygina
     */
    if ( menuState !== 0 ) {
        menuState = 0;
        sceneMenu.classList.remove(activeClassName);
        menu.classList.remove(activeClassName);
    }
}

function toggleMenuOn() {
    /* The function enables visibility of the context menu
    * Input parameters: none
    * Output parameters: none
    * Authors: Elena Karelina
     */
    if (menuState !== 1) {
        menuState = 1;
        menu.classList.add(activeClassName);
    }
}

function toggleMenuOn2() {
    /* The function enables visibility of the context menu
    * Input parameters: none
    * Output parameters: none
    * Authors: Tatyana Shorygina
     */
    if (menuState !== 1) {
        menuState = 1;
        sceneMenu.classList.add(activeClassName);
    }
}

function getPosition(e) {
    /* The function of computing the mouse's coordinates at clicking
    * Input parameter: event
    * Output parameters: the mouse's coordinates at click
    * Author: Elena Karelina
     */
    let posX = 0;
    let posY = 0;
    // If the event is empty set it to the current window event
    if (!e) var e = window.event;

    if (e.pageX || e.pageY) { // If both coordinates are not empty the function returns them
        posX = e.pageX;
        posY = e.pageY;
    } else if (e.clientX || e.clientY) { // Otherwise computing the coordinates using scrolling parameters
        posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    // Returning the mouse coordinates
    return {
        x: posX,
        y: posY
    }
}

function positionMenu(event) {
    /* The function sets the context menu's position
    * Input parameters: none
    * Output parameters: none
    * Authors: Elena Karelina, Tatyana Shorygina
     */
    clickCoords = getPosition(event); // Computing the mouse's coordinates
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    let menuWidth = menu.offsetWidth + 4; // Computing the context menu's size and adding 4 pixels of border to them
    let menuHeight = menu.offsetHeight + 4;

    //let menuWidth = sceneMenu.offsetWidth + 4;
    //let menuHeight = sceneMenu.offsetHeight + 4;

    windowWidth = window.innerWidth; // Getting the window's size
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) { // Checking that the context menu's size and position have enough width in the window
        menu.style.left = windowWidth - menuWidth + "px"; // If not setting the X coordinate with value window width + border
        sceneMenu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px"; // Otherwise setting the X coordinate with the value of the mouse coordinates
        sceneMenu.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) { // Checking that the context menu's size and position have enough height in the window
        menu.style.top = windowHeight - menuHeight + "px"; // If not setting the Y coordinate with value window width + border
        sceneMenu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px"; // Otherwise setting the Y coordinate with the value of the mouse coordinates
        sceneMenu.style.top = clickCoordsY + "px";
    }
}

showInfo.onclick = function() {
    /* Event listener for clicking button "Посмотреть информацию" of the context menu
    * The function calls a neccessary function of sowing information according to the clicked element (algorithm or container)
    * Input parameter: none. Output parameter: none.
    * Authors: Elena Karelina, Tatyana Shorygina
     */
    if(typeForDelete === 'cont')
        containerInfo(elementForDelete);
    if(typeForDelete === 'alg')
        algorithmInfo(elementForDelete);
    if(typeForDelete === 'scene')
        deleteAlgorithm(elementForDelete);
};

showSceneButton.onclick = function() {
    /* Event listener for clicking button "Показать сцену" of the context menu
    * The function calls a neccessary function of showing a scene
    * Input parameter: none. Output parameter: none.
    * Author: Tatyana Shorygina
     */
    showScene(elementForDelete);
};


function containerInfo(elementForInfo) {
    /* The function makes modal window which displays information about a container visible
    * The function sends request to the server ang gey information about the requested container as a response
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina.
    */
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    let idForInf = elementForInfo; // Getting id for the clicked container
    xhr.open("POST", "include/container_info.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + idForInf); // Sending the container's id for which information is requested
    xhr.onreadystatechange = function() { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Inserts the information from server into a modal window
        * Input parameter: event. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The server's returned code 200 (success)
            console.log("here");
                let info = JSON.parse(xhr.responseText);
                modal_1wayList.style.display = 'block'; // Enabling visibility of modal window
                contName.innerHTML = info["container_name"]; // Inserting information received into modal window
                contDescr.innerHTML = info["description"]; // Inserting information received into modal window
            }
        }
    };
}

function algorithmInfo(currentId) {
    /* The function makes modal window which displays information about an algorithm visible
    * The function sends request to the server ang gey information about the requested container as a response
    * Input parameter: none. Output parameter: none
    * Author: Tatyana Shorygina
    */
    algId3 = currentId.split('-')[1]; // Getting id for the clicked algorithm
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/alg_info.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(algId3));
    xhr.onreadystatechange = function() { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Inserts the information about the algorithm into the modal window and makes it visible
        * Input parameter: none. Output parameter: none
        * Author: Tatyana Shorygina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The server's returned code 200 (success)
                let algorithmInfo = JSON.parse(xhr.responseText); // Unpackaging the server's response to get all algorithms
                //algorithmInfo = JSON.parse(algorithmInfo[0]);
                algNameInfo.innerHTML = algorithmInfo["algorithm_name"];
                algDescr.innerHTML = algorithmInfo["description"];
                algDifficultyInfo.innerHTML = algorithmInfo["difficulty"];
                algInfoModal.style.display = 'block';
            }
        }
    };
}