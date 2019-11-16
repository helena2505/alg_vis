let lst = document.getElementById('available-containers'); // Getting the list of containers
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element
let allCont = lst.querySelectorAll('li'); // All containers
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
let showInfo = document.getElementById("show-info"); // Context menu button "Посмотреть информацию"

closeBtn.addEventListener('click', closeModal); // Listen for close click
window.addEventListener('click', outsideClick); // Listen for outside click

function closeModal() {
    /* Function has no input parameters
    * Functions closes modal
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    modal_1wayList.style.display = 'none';
}

function outsideClick(event) {
    /* Function has no input parameters
    * Functions closes modal on outside click
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    if (event.target == modal_1wayList){
        modal_1wayList.style.display = 'none';
    }
}

showInfo.onclick = function() {
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    let idForInf = getLiId(); // Getting id for the clicked container
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