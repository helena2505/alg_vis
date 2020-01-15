let addButton = document.getElementById("add_a_container"); // Button for adding a container (showing graph primitives menu)
let finishButton = document.getElementById("qbutton"); // Button "Готово" on the graph editor
let graphEditor = document.getElementById("palette-zone"); // Graphical primitives menu
let modalWindow = document.getElementById("modal-window"); // Modal window
let confButton = document.getElementById("conf"); // Button OK of the modal window
let inputName = document.getElementById("str-inp-name"); // String input for inputting a container's name
let containerName = ''; // Let for keeping the container's name which has been input
let inputDescription = document.getElementById("str-inp-info"); // String input for inputting the container's descriprion
let containerDescription = ''; // Let for keeping the container's description which has been input
let baseList = document.getElementById("available-containers"); // List of the containers
let close = document.getElementById("cross1"); // The modal window's cross

window.addEventListener('click', outsideClick); // Listen for outside click

addButton.onclick = function(event) {
    /* Event listener for clicking button "Добавить контейнер"
    * Enables the modal window visibility
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    event.preventDefault(); // Disabling default listener
    modalWindow.style.display = 'block'
}

finishButton.onclick = function(event) {
    /* Event listener for clicking button "Готово"
    * Disables visibility of graph editor and calls the corresponding function
    * depending on the graph indicator state
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    event.preventDefault(); // Disabling default listener
    graphEditor.classList.remove("primitives-active"); // Disabling visibility of the graph editor
    if (graphIndicator === 'c') {
        // If the state of graph indicator is equal to adding a container
        addContainer(); // Call the function for adding a container
    } else {
        if (graphIndicator == 's')
        // If the state of graph indicator is equal to adding a scene
            addScene(currentAlgId); // Call the function for adding a container
    }
    graphIndicator = '';
}

confButton.onclick = function() {
    /* Event listener for the click on the button ОК
    * The function enables the visibility of the graph editor if the container is not an empty string
    * and sets the graph indicator for adding a container
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
   */
    containerName = inputName.value; // Keeping the input name of container
    if (containerName === "") // Checking if the input name is not empty
        alert("Не введено имя контейнера") // Informing the user about the empty string
    else { // Otherwise enable the graph editor
        containerDescription = inputDescription.value;
        modalWindow.style.display = "none"; // Disable visibility of the modal window
        graphEditor.classList.add("primitives-active"); // Enable the graph editor's visibility
        inputName.value = '';
        inputDescription.value = '';
        graphIndicator = 'c';
    }
}

close.onclick = function() {
    /* Event listener for the cross of the modal window
    * The function disables visibity of the modal window and cleans input strings
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    inputName.value = '';
    inputDescription.value = '';
    modalWindow.style.display = "none";
}

function addContainer() {
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/test.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('name=' + encodeURIComponent(containerName) + '&descr=' + encodeURIComponent(containerDescription)); // Sending
    // the container's name and description
    xhr.onreadystatechange = function() { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Inserts the container's name into the list if confirmation of inserting into database was received from server
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The server's returned code 200 (success)
                let results = xhr.responseText.split(' ');
                if (results[0] === "1") { // If the inserting into database was successful insert into the list
                    let tmp = document.createElement("li"); // Creating new li element
                    tmp.innerHTML = "&#9773; " + containerName; // Inserting text to the created li
                    tmp.classList.add("one-container"); // Setting class name
                    tmp.id = results[1]; // Setting id from database which was received from server
                    baseList.appendChild(tmp) // Appending to the ul element (as in the database)
                    let forAlgList = document.createElement("ul");
                    forAlgList.classList.add("algorithm-list")
                    forAlgList.id = "alg" + results[1];
                    forAlgList.addEventListener('click', selectAlg);
                    tmp.after(forAlgList);
                }
                else {
                    alert('При добавлении в базу данных произошла ошибка'); // Informing about the error
                }
            }
        }
    };
}