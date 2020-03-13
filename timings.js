const defaultTiming = '5';
let prev = String(defaultTiming);

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

function editTiming() {
    console.log('here');
}

function isValidInteger(str) {
    let n = Math.floor(Number(str));
    return n <= 600 && String(n) === str && n >= 0;
}