let lst = document.getElementById('available-containers'); // Getting the list of containers
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element for structure
let algInfoModal = document.getElementById('modal-alg-info'); // Get modal element for algorithm
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let algNameInfo = document.getElementById('alg-name-info'); // Algorithm name
let algDescr = document.getElementById('alg-descr'); // Algorithm description
let algDifficultyInfo = document.getElementById('alg-diff'); // Algorithm description
let closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
let close5 = document.getElementById("cross5"); // The modal window's cross
let close0 = document.getElementById("cross0"); // The modal window's cross
let showSceneModal = document.getElementById('modal-show-scene'); // Get modal element for showing scene
let dialogAddAlg = document.getElementById("dialog-add-alg"); // The modal window for inputting information about an algorithm

closeBtn.addEventListener('click', closeModal); // Listen for close click
window.addEventListener('click', outsideClick); // Listen for outside click


function outsideClick(e) {
    /* Function has no input parameters
    * Functions closes modal on outside click
    * Function doesn't return anything
    * Author: Shorygina Tatyana
    */
    if (e.target == showSceneModal){
        showSceneModal.style.display = 'none';
    }
}

function closeModal() {
    /* Function has no input parameters
    * Functions closes modal
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    modal_1wayList.style.display = 'none';
}

close0.onclick = function() {
    /* Event listener for the cross of the modal window
    * The function disables visibity of the modal window and cleans input strings
    * Input parameter: none. Output parameter: none.
    * Author: Tatyana Shorygina
    */
    showSceneModal.style.display = 'none';
};

close5.onclick = function() {
    /* Event listener for the cross of the modal window
    * The function disables visibity of the modal window and cleans input strings
    * Input parameter: none. Output parameter: none.
    * Author: Tatyana Shorygina
    */
    algInfoModal.style.display = 'none';
}

function outsideClick(event) {
    /* Function has no input parameters
    * Function closes modal on outside click
    * Function doesn't return anything
    * Author: Shorygina Tatyana
    */
    if (event.target == modal_1wayList){
        modal_1wayList.style.display = 'none';
    }
    if (event.target === dialogAddAlg){
        cleanDialogAdd();
    }
    if (event.target === algInfoModal){
        algInfoModal.style.display = 'none';
    }
    if (event.target === showSceneModal){
        showSceneModal.style.display = 'none';
    }
}

lst.onclick = function(event) {
    /* Event listener for clicking on the list of the containers
    * The function calls the function of showing list of the container's algorithms
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    event.preventDefault();
    let clickedArea = document.getElementById(event.target.id);
    if(clickedArea.classList.contains("one-container")) // If the click has been on one of the containers from the list
        showAlgorithms(event); // Calling the function
};
