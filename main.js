let containerMenu = document.getElementById('available-containers'); // Available containers menu
let allPictures = containerMenu.querySelectorAll('img'); // Loading all images of the menu
let dropLoc = document.getElementById("outer-dropzone"); // Canvas for dropping objects

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
    event.stopPropagation();
    let dropItem = event.dataTransfer.getData('key'); // Getting information about the dragged picture
    let droppedElement = document.getElementById(dropItem);
    let newElement = document.createElement('img'); // Creating new picture on the drop zone
    dropLoc.appendChild(newElement); // Appending to a parent element (canvas)
    // Setting size
    newElement.style.height = "10%";
    newElement.style.width = "10%";
    newElement.src = droppedElement.src; // Setting the image's source file
    // Setting coordinates
    /*newElement.style.left = event.pageX + 'px';
    newElement.style.top = event.pageY + 'px';
    newElement.style.position = 'absolute';*/
    // Setting id for the picture
    newElement.classList.add('drag-drop');
}
