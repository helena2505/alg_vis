let dialogAddAlg = document.getElementById("dialog-add-alg"); // The modal window for inputting information about an algorithm
let close2 = document.getElementById("cross2"); // The modal window's cross
let confButton1 = document.getElementById("conf1"); // Button OK of the modal window
let inputName1 = document.getElementById("str-inp-alg-name"); // String input for inputting an algorithm's name
let inputDescription1 = document.getElementById("str-inp-alg-info"); // String input for inputting the algorithm's descriprion
let inputDifficulty = document.getElementById("str-inp-alg-dif"); // String input for inputting the algorithm's difficulty
let algName = ''; // Let for keeping the algorithm's name which has been input
let algDesrcription = ''; // Let for keeping the algorithm's description which has been input
let algDifficulty = ''; // Let for keeping the algorithm's difficulty which has been input
let algContainer = ''; // Let for keeping the id of the container to which the inserted algorithm refers

close2.onclick = function() {
    /* Event listener for the cross of the modal window
    * The function disables visibity of the modal window and cleans input strings
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    inputName1.value = '';
    inputDescription1.value = '';
    inputDifficulty.value = '';
    dialogAddAlg.style.display = 'none';
}

confButton1.onclick = function() {
    /* Event listener for clicking on the button "OK"
    * The function sends the input information to the server
    * and inserts a new algorithm in te interface in case of successful inserting
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    let keepContainer = 'add-alg-'+ algContainer;
    algName = inputName1.value;
    algDesrcription = inputDescription1.value;
    algDifficulty = inputDifficulty.value;
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/add_alg.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('name=' + encodeURIComponent(algName) + '&descr=' + encodeURIComponent(algDesrcription)
    + '&diff=' + encodeURIComponent(algDifficulty) + '&cont=' + encodeURIComponent(algContainer)); // Sending
    // the container's name and description
    xhr.onreadystatechange = function() { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Inserts the container's name into the list if confirmation of inserting into database was received from server
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if(xhr.status == 200) { // The server's returned code 200 (success)
                console.log(xhr.responseText);
                let results = xhr.responseText.split(' ');
                if (results[0] === "1") { // If the inserting into database was successful insert into the list
                    let new_element = document.createElement('LI');
                    let cur = document.getElementById(keepContainer);
                    new_element.innerHTML = algName;
                    new_element.id = 'alg-' + toString(results[1]);
                    new_element.classList.add("one-algorithm");
                    cur.before(new_element);
                }
                else {
                    alert('При добавлении в базу данных произошла ошибка'); // Informing about the error
                }
            }
        }
    };
    inputName1.value = '';
    inputDescription1.value = '';
    inputDifficulty.value = '';
    dialogAddAlg.style.display = 'none';
}

function inputAlgorithm(event) {
    /* Event listener for clicking on the button "Добавить контейнер"
    * The function makes the dialog window visible
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    dialogAddAlg.style.display = 'block';
    algContainer = event.target.id.split('-')[2];
}