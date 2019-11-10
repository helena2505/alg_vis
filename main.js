let containerMenu = document.getElementById('available-containers'); // Available containers menu
let allPictures = containerMenu.querySelectorAll('img'); // Loading all images of the menu
let dropLoc = document.getElementById("outer-dropzone"); // Канва, на которую осуществляется перетаскивание

// Adding event listener for starting drag
for(let i = 0; i < allPictures.length; i++) {
    let curImage = allPictures[i];
    curImage.addEventListener('dragstart', transferId);
}

function transferId(event) {
    /* Event listener for drag start
    * Records the dragged element to event
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    event.dataTransfer.setData('key', event.target.id);
}

dropLoc.ondragover = function(event) {
    /* Event listener for getting to the area of the drop zone
    * Input parameter: event. Output parameter: none.
    * The function disables default listener
    * Author: Elena Karelina
    */
    event.preventDefault();
}

dropLoc.ondrop = function(event) {
    /* Event listener for dropping the picture to the drop zone
    * Input parameter: event. Output parameter: none.
    * The function creates a picture identical to the dragged one
    * and sets its size and coordinates
    * Input parameter: event. Output parameter: none.
    */
    event.preventDefault();
    let dropItem = event.dataTransfer.getData('key'); // Getting information about the dragged picture
    let droppedElement = document.getElementById(dropItem);
    let newElement = document.createElement('img'); // Creating new picture on the drop zone
    // Setting size
    newElement.style.height = "70px";
    newElement.style.width = "100px";
    newElement.src = droppedElement.src; // Setting the image's file
    // Setting coordinates
    console.log(droppedElement.left);
    console.log(event.pageX)
    newElement.style.left = event.pageX - newElement.offsetWidth/2 + 'px';
    newElement.style.top = event.pageY - newElement.offsetHeight/2 + 'px';
    newElement.style.position = 'absolute';
    // Setting id for the picture
    newElement.classList.add('drag-drop');
    dropLoc.appendChild(newElement); // Appending to a parent element
}
