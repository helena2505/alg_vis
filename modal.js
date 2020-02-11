let lst = document.getElementById('available-containers'); // Getting the list of containers
let algLst = document.getElementById('available-containers'); // Getting the list of algorithms
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element for structure
let algInfoModal = document.getElementById('modal-alg-info'); // Get modal element for algorithm
let allCont = lst.querySelectorAll('li'); // All containers
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let algNameInfo = document.getElementById('alg-name-info'); // Algorithm name
let algDescr = document.getElementById('alg-descr'); // Algorithm description
let algDifficultyInfo = document.getElementById('alg-diff'); // Algorithm description
let closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
let close5 = document.getElementById("cross5"); // The modal window's cross
let close6 = document.getElementById("cross6"); // The modal window's cross
let showSceneModal = document.getElementById('modal-show-scene'); // Get modal element for showing scene

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

close6.onclick = function() {
    /* Event listener for the cross of the modal window
    * The function disables visibity of the modal window and cleans input strings
    * Input parameter: none. Output parameter: none.
    * Author: Tatyana Shorygina
    */
    showSceneModal.style.display = 'none';
}

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
    if (event.target === dialogEditAlg){
        cleandialogEditAlg();
    }
    if (event.target === algInfoModal){
        algInfoModal.style.display = 'none';
    }
    if (event.target === showSceneModal){
        showScene.style.display = 'none';
    }
}

function containerInfo(elementForInfo) {
    /* The function makes modal window which displays information about a container visible
    * The function sends request to the server ang gey information about the requested container as a response
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina.
    */
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    let idForInf = elementForInfo; // Getting id for the clicked container
    xhr.open("POST", "include/info.php", true); // Setting destination and type
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
                modal_1wayList.style.display = 'block'; // Enabling visibility of modal window
                contName.innerHTML = document.getElementById(idForInf).textContent.split(' ').slice(1);
                contDescr.innerHTML = xhr.responseText; // Inserting information received into modal window
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
                algorithmInfo = JSON.parse(algorithmInfo[0]);
                algNameInfo.innerHTML = algorithmInfo["algorithm_name"];
                algDescr.innerHTML = algorithmInfo["description"];
                algDifficultyInfo.innerHTML = algorithmInfo["difficulty"];
                algInfoModal.style.display = 'block';
            }
        }
    };
}

function noScroll() {
    /* The function prevents window and modals from scrolling
    * Input parameter: none. Output parameter: none
    * Author: Tatyana Shorygina
    */
    window.scrollTo(0, 0);
    showSceneModal.scrollTo(0, 0);
  }
  
// add listeners to disable scroll
window.addEventListener('scroll', noScroll);
showSceneModal.addEventListener('scroll', noScroll);
