let menu = document.getElementById('my-menu'); // Context menu let
let menuState = 0; // Let of context's menu state (visible or not, not visible by default)
let activeClassName = "context-menu--active" // Class name for enableing context menu's visibility
let taskItemClassName = 'one-algorithm'; // Menu's class name
let menuPosition = 0; // Let for context menu's position
let menuPositionX = 0; // Let for coordinate X of context menu
let menuPositionY = 0; // Let for coordinate Y of context menu
let windowWidth = 0; // Let for keeping the window's width
let windowHeight = 0; // Let for keeping the window's height
let clickCoords; // Let for keeping the coordinates where the click occured
let clickCoordsX; // Let for keeping the coordinate X where the click occured
let clickCoordsY; // Let for keeping the coordinate Y where the click occured
let deleteContainer = document.getElementById("delete-container"); // Let of context menu's button "Удалить контейнер"
let elementForDelete = ''; // ID of target elemet (algorithm or container)
let typeForDelete = ''; // Type of target element (algorithm or container)
let showInfo = document.getElementById("show-info"); // Context menu button "Посмотреть информацию"
let editInfo = document.getElementById("edit-info"); // Context menu button "Редактировать"

// Adding event listener of right click for all document's area
document.addEventListener( "contextmenu", function(event) {
    /* Event listener of right click
    * The function disables default listener if the right click has been on containers' list
    * Input parameter: event
    * Author: Elena Karelina
     */
    if (clickInsideElement(event, taskItemClassName)) { // Checking that the right click has been on the containers list
        event.preventDefault(); // Disabling the default listener
        toggleMenuOn(); // Enabling context menu visibility
    }
});

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
}

//  Adding event listener of resizing window
window.onresize = function(event) {
    /* Event listener of resizing window
    * The function disables the visibility of the context menu if clicking escape has occured
    * Input parameter: event. Output parameters: no
    * Author: Elena Karelina
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
    if (el.id === 'add_a_container' || el.classList.contains("add-alg-button")) { // If it was the button "Добавить контейнер", disable default listener
        // and don't enable context menu visibility (for not enabaling returning false)
        event.preventDefault();
        return false;
    }
    if (el.classList.contains(className)) { // If the click has occured on the element of algorithms' just return it
        elementForDelete = el.id; // Keeping the algorithm's id for deleting
        typeForDelete = 'alg'; // Keeping that the deleted element is an algorithm
        return el;
    } else { // Looking for the parent element
        do {
            if (el.classList.contains(className)) { // If the click has occured on the element of algorithms' just return it
                elementForDelete = el.id; // Keeping the algorithm's id for deleting
                typeForDelete = 'alg'; // Keeping that the deleted element is an algorithm
                return el;
            }
            if (el.classList && el.classList.contains("one-container")) { // If one of the parents' element is the element of the containers' list
                elementForDelete = el.id; // Keeping the container's id for deleting
                typeForDelete = 'cont'; // Keeping that the deleted element is a container
                return el;
            }
        } while (el = el.parentNode); // The loop continues until the last parent element
    }
    return false; // This line is to be executed only in case when none of the parents' elements belongs to the class className
}

// Adding event listener for right click
document.addEventListener( "contextmenu", function(event) {
    /* Event listener of right click
    * The function shows the context menu in place where the right click has happened if it has happened on the containers' list
    * Otherwise the function hides the context menu
    * Input parameters: event, class name of the parent element
    * Author: Elena Karelina
     */
    if (clickInsideElement(event, taskItemClassName)) { // Checking that the right click has happened on the containers' list
        event.preventDefault(); // Disabling default listener
        toggleMenuOn(); // Enabling visibility of context menu
        positionMenu(event); // Calling the function for positioning menu
    } else { // If the right click hasn't been on containers list
        toggleMenuOff(); // Disabling visibility of context menu
    }
});

function toggleMenuOff() {
    /* The function disables visibility of the context menu
    * Input parameters: none
    * Output parameters: none
    * Author: Elena Karelina
     */
    if ( menuState !== 0 ) {
        menuState = 0;
        menu.classList.remove(activeClassName);
    }
}

function toggleMenuOn() {
    /* The function enables visibility of the context menu
    * Input parameters: none
    * Output parameters: none
    * Author: Elena Karelina
     */
    if (menuState !== 1) {
        menuState = 1;
        menu.classList.add(activeClassName);
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
    * Author: Elena Karelina
     */
    clickCoords = getPosition(event); // Computing the mouse's coordinates
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    let menuWidth = menu.offsetWidth + 4; // Computing the context menu's size and adding 4 pixels of border to them
    let menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth; // Getting the window's size
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) { // Checking that the context menu's size and position have enough width in the window
        menu.style.left = windowWidth - menuWidth + "px"; // If not setting the X coordinate with value window width + border
    } else {
        menu.style.left = clickCoordsX + "px"; // Otherwise setting the X coordinate with the value of the mouse coordinates
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) { // Checking that the context menu's size and position have enough height in the window
        menu.style.top = windowHeight - menuHeight + "px"; // If not setting the Y coordinate with value window width + border
    } else {
        menu.style.top = clickCoordsY + "px"; // Otherwise setting the Y coordinate with the value of the mouse coordinates
    }
}

deleteContainer.onclick = function() {
    /* Event listener for clicking button "Удалить" of the context menu
    * The function calls a neccessary function of deleting according to the clicked element (algorithm or container)
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
     */
    if(typeForDelete === 'cont')
        deleteAContainer(elementForDelete);
    if(typeForDelete === 'alg')
        deleteAlgorithm(elementForDelete);
}

showInfo.onclick = function() {
    /* Event listener for clicking button "Посмотреть информацию" of the context menu
    * The function calls a neccessary function of sowing information according to the clicked element (algorithm or container)
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
     */
    if(typeForDelete === 'cont')
        containerInfo(elementForDelete);
    if(typeForDelete === 'alg')
        algorithmInfo(elementForDelete);
}

editInfo.onclick = function() {
    /* Event listener for clicking button "Редактировать" of the context menu
    * The function calls a neccessary function of editing according to the clicked element (algorithm or container)
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
     */
    if(typeForDelete === 'cont')
        editContainer(elementForDelete);
    if(typeForDelete === 'alg')
        editAlgorithm(elementForDelete);
}