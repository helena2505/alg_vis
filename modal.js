let lst = document.getElementById('available-containers'); // Getting the list of containers
let modal_1wayList = document.getElementById('list1Modal'); // Get modal element
let allCont = lst.querySelectorAll('li'); // All containers
let contName = document.getElementById('cont-name'); // Container name
let contDescr = document.getElementById('cont-descr'); // Container description
let closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
closeBtn.addEventListener('click', closeModal); // Listen for close click
window.addEventListener('click', outsideClick); // Listen for outside click


lst.onclick = function(event) {
    /* Event listener for clicking on the menu
    * The function opens modal window if the click has been on an li element
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
     */
    if(event.target.tagName === 'LI')
        openModal(event);
};

function openModal(event) {
    /* The function opens modal window and fills it with the information from database
    * Input parameter: event.
    * Output parameter: none.
    * Author: Elena Karelina
     */
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/info.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(event.target.id)); // Sending the container's id for which information is requested
    xhr.onreadystatechange = function() { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Inserts the information from server into a modal window
        * Input parameter: event. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The server's returned code 200 (success)
                modal_1wayList.style.display = 'block'; // Enabling visibility of modal window
                contName.innerHTML = document.getElementById(event.target.id).textContent;
                // Inserting information received into modal window
                contDescr.innerHTML = xhr.responseText;
            }
        }
    };
}

function closeModal() {
    /* Function has no input parameters
    * Functions closes modal
    * Function doesn't return anything
    * Author: Shorygina Tatyana
    */
    modal_1wayList.style.display = 'none';
}

function outsideClick(e) {
    /* Function has no input parameters
    * Functions closes modal on outside click
    * Function doesn't return anything
    * Author: Shorygina Tatyana
    */
    if (e.target == modal_1wayList){
        modal_1wayList.style.display = 'none';
    }
}