const defaultTiming = '5';
let prev = defaultTiming;
let prevKept = '5';

function keepPrevious(event) {
    prev = event.target.textContent;
}

function validateTime(event) {
    let square = event.target;
    let inputString = event.target.textContent;
    if( !(isValidInteger(inputString) || inputString == '')) {
        alert('Некорректное значение тайминга');
        square.innerHTML = prev;
    }
}

function keepStable(event){
    prevKept = event.target.textContent;
}

function editTiming(event) {
    let square = event.target;
    let editedId = square.id.split('-')[1];
    let inputString = square.textContent;
    if(!isValidInteger(inputString)) {
        alert('Некорректное значение тайминга');
        square.innerHTML = prevKept;
    }
    else {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "include/timing_edit.php", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
        xhr.send('id=' + encodeURIComponent(editedId) + '&new_value=' + encodeURIComponent(square.textContent));
        xhr.onreadystatechange = function () { // Waiting for the server's answer
            /* Event listener for getting response from server
            * Informs the user if an error has occured while editting information
            * Input parameter: none. Output parameter: none.
            * Author: Elena Karelina
            */
            if (xhr.readyState == 4) { // The answer has been got
                if (xhr.status == 200) {
                    if (xhr.responseText == "0") {
                        square.innerHTML = prevKept;
                        alert('Ошибка при сохранении на сервер нового значения тайминга')
                    }
                }
            }
        };
    }
}

function isValidInteger(str) {
    /* The function checks if a string is an integer between 0 and 600
    * The function returns true if the string is an integer between 0 and 600
    * Otherwise it returns false
    * Author: Elena Karelina
    */
    let n = Math.floor(Number(str));
    return n <= 600 && String(n) === str && n >= 0;
}