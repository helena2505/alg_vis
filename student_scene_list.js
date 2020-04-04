let algPanel = document.getElementById('structures-col');
let algorithms  = algPanel.querySelectorAll('.one-algorithm');
let scenes = [];
let timersIds = [];
let curSceneNum = 0;
let nextButton = document.getElementById('btn-next-scene');
let prevButton = document.getElementById('btn-prev-scene');
let resetButton = document.getElementById('no-alg2');
let watchButton = document.getElementById('watch-scenes');

prevButton.disabled = true; // The buttons are disabled before choosing an algorithm
nextButton.disabled = true;

nextButton.onclick = function() {
    /* Event listener for the clicking button "Вперед"
    * The function switches to the next scene of the algorithm
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    if(curSceneNum + 1 < scenes.length) { // If there is the next scene
        prevButton.disabled = false; // Enable the button "Назад"
        curSceneNum++; // Incrementing the number of the scene
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"]; // Changing the image source
    }
    if(curSceneNum + 1 == scenes.length) { // If the current scene is the last
        nextButton.disabled = true; // Disabling the button
    }
};

prevButton.onclick = function() {
    /* Event listener for the clicking button "Назад"
    * The function switches to the previous scene of the algorithm
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    if(curSceneNum > 0) { // If there is the previous scene
        nextButton.disabled = false; // Enable the button "Вперед"
        curSceneNum--; // Decrementing the number of the scene
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"]; // Changing the image source
    }
    if(curSceneNum == 0) { // If the current scene is the last
        prevButton.disabled = true; // Disabling the button
    }
};

resetButton.onclick = function() {
    /* Event listener for clicking reset button
    * Clears the screen from the showed scene
    * And clears the memory of the scenes of the current algorithms
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    curSceneNum = 0;
    scenes = []; // Clearing the array of the pictures
    let img = document.getElementById('current-scene'); // Clearing the screen
    img.parentNode.removeChild(img);
    nextButton.disabled = true; // Disabling the buttons
    prevButton.disabled = true;
    for(let i = 0; i < timersIds.length; i++) {
        clearTimeout(timersIds[i]);
    }
    timersIds = [];
};

watchButton.onclick = function() {
    /* Event listener for clicking on button "Посмотреть алгоритм"
    * The function checks if the algorithm visualisation contains scenes
    * and sends a request to the server to get the timers values
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    let img = document.getElementById('current-scene');
    if(img == null) { // Checking if there are any scenes
        modalNoScenes.style.display = 'block';
    } else {
        img.parentNode.removeChild(img); // Clearing the screen before showing
        let xhr = new XMLHttpRequest(); // Creating new HTTP request
        xhr.open("POST", "include/timings_for_students.php", true); // Setting destination and type
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
        xhr.send('id=' + encodeURIComponent(showedAlg)); // Sending the request
        xhr.onreadystatechange = function () { // Waiting for the server's answer
            /* Event listener for getting response from server.
            * The function unpackages the info about the timing values between each pair of scenes
            * The function sets delays of showing visualisation of each scene
            * according to the timers
            * Input parameter: none. Output parameter: none.
            * Author: Elena Karelina
            */
            if (xhr.readyState == 4) { // The answer has been got
                if (xhr.status == 200) { // The server's code is 200 (OK)
                    let timings = JSON.parse(xhr.responseText); // Parsing the answer
                    let canvas = document.getElementById('show-scene');
                    let curScene = document.createElement('img'); // Showing the first scene
                    curScene.classList.add('editor');
                    curScene.id = 'current-scene';
                    canvas.appendChild(curScene);
                    let code = JSON.parse(scenes[0]);
                    curScene.src = code['xml_code'];
                    let timing = 0;
                    for(let i = 0; i < timings.length; i++) { // Setting timers for switching to the next scene
                        timing += JSON.parse(timings[i])['t_value'] * 1000;
                        timersIds[i] = setTimeout(changeScene, timing, i+1); // Keeping timers ids
                    }
                    nextButton.disabled = true; // Disabling the buttons before showing
                    prevButton.disabled = true;
                    setTimeout(enableButtons, timing); // Setting timer for the function which enables button after showing

                    function changeScene(i) {
                        /* The function changes the showed picture for the picture
                        * which has number i in the array of scenes
                        * Input parameter: i (the index of the scene which is required to be shown next)
                        * Output parameter: none
                        * Author: Elena Karelina
                        */
                        let code = JSON.parse(scenes[i]);
                        curScene.src = code['xml_code'];
                    }

                    function enableButtons() {
                        /* The function enables buttons "Вперед" and "Назад"
                        * Input parameter: none
                        * Output parameter: none
                        * Author: Elena Karelina
                        */
                        nextButton.disabled = true; // Disabling the button because it is the last scene
                        prevButton.disabled = false; // Enabling the button for showing previous scenes
                        timersIds = []; // Clearing the timers ids
                        curSceneNum = scenes.length - 1; // Settting the current scene to the last
                    }

                }
            }
        };
    }
};