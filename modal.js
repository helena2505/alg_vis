var modal_1wayList = document.getElementById('list1Modal'); // Get modal element
var modalBtn1List = document.getElementById('cont2'); // Get open modal button
var closeBtn = document.getElementsByClassName('closeBtn')[0]; // Get close button
modalBtn1List.addEventListener('click', openModal); // Listen for open click
closeBtn.addEventListener('click', closeModal); // Listen for close click
window.addEventListener('click', outsideClick); // Listen for outside click

function openModal() {
    /* Function has no input parameters
    * Functions opens modal
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    modal_1wayList.style.display = 'block';
}

function closeModal() {
    /* Function has no input parameters
    * Functions closes modal
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    modal_1wayList.style.display = 'none';
}

function outsideClick(e) {
    /* Function has no input parameters
    * Functions closes modal on outside click
    * Function doesn't return anything
    * Author: Shorygina Tatyana */
    if (e.target == modal_1wayList){
        modal_1wayList.style.display = 'none';
    }
    
}