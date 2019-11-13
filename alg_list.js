let lst = document.getElementById('available-containers');

lst.onclick = function(event) {
    event.preventDefault();
    if(event.target.tagName === 'LI')
        showAlgorithms(event);
};

function showAlgorithms(event) {
    let targetContainer = event.target.id;
    let contId = "alg" + event.target.id;
    let algList = document.getElementById(contId);
    if(algList.classList.contains("algorithm-list-vis")) {
        let allLi = algList.querySelectorAll('LI');
        for(let j = 0; j < allLi.length; j++) {
            algList.removeChild(allLi[j]);
        }
        algList.classList.remove("algorithm-list-vis");
    }
    else {
        let xhr = new XMLHttpRequest(); // Making new HTTP request to server
        xhr.open("POST", "include/alg_list.php", true); // Definition of type an address of the request
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Encoding info transition
        xhr.send('id=' + encodeURIComponent(targetContainer)); // Info transition
        xhr.onreadystatechange = function() { // Waiting for reply from server
            /* Function handling server answer event
            * In case of successful addition to DB inserts the name of the container into interface
            * No input parameters, no output parameters
            * Authot: Elena Karelina
            */
            if (xhr.readyState == 4) { // Got answer
                if(xhr.status == 200) { // Server returned 200 (which is good)
                    let algorithms = xhr.responseText.split('\\n');
                    for(let i = 0; i < algorithms.length - 1; i++) {
                        let new_element = document.createElement('LI');
                        new_element.innerText = algorithms[i];
                        algList.appendChild(new_element);
                    }
                }
            }
        };
        algList.classList.add("algorithm-list-vis");
    }
}