let algPanel = document.getElementById('structures-col');
let algorithms  = algPanel.querySelectorAll('.one-algorithm');
let scenes = [];
let curScene = 0;
let nextButton = document.getElementById('btn-next-scene');
let prevButton = document.getElementById('btn-prev-scene');

for(let i = 0; i < algorithms; i++) {
    let curAlgTree = algorithms[i];
    curAlgTree.addEventListener('click', selectAlg)
}

function getScenes(event) {
    let requiredId = event.target.id.split('-')[1];
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/scenes_for_students.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(requiredId));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server.
        * The function unpackages the info about the visualisation of each scene
        * and about their ids. The function inserts the recived scenes' visualisation
        * into the list of the scenes.
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                scenes = JSON.parse(xhr.responseText);
                let canvas = document.getElementById('show-scene');
                let curScene = document.createElement('img');
                let code = JSON.parse(scenes[0]);
                curScene.classList.add('editor');
                curScene.id = 'current-scene';
                curScene.src = code["xml_code"];
                canvas.appendChild(curScene);
                curScene = 0;
            }
        }
    }
}

nextButton.onclick = function() {
    if(curScene + 1 < scenes.length) {
        curScene++;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curScene]);
        img.src = tmp["xml_code"];
    }
};

prevButton.onclick = function() {
    if(curScene > 0) {
        curScene--;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curScene]);
        img.src = tmp["xml_code"];
    }
};