addSceneButton.onclick = function() {
    /* The function enables visibility of the graph editor
    * and sets the indicator for adding a scene
    * Input parameter: none. Output parameter: none.
    * Author: Elena Karelina
    */
    indicateClick = 0;
    let header = document.getElementById('header'); // Panel for all pictures
    let allPictures = header.querySelectorAll('img'); // Getting all scenes of the algorithm
    let frame = document.createElement('div'); // Creating frame for a new picture
    frame.classList.add('one-scene');
    frame.id = 'cur-frame';
    addSceneButton.before(frame);
    let curTiming = document.createElement('div');
    curTiming.id = 'cur-timing';
    curTiming.classList.add('timing');
    curTiming.contentEditable = 'true';
    curTiming.innerHTML = '5';
    frame.before(curTiming);
    let sceneImage = document.createElement('img'); // Creating image for the scene visualization
    frame.appendChild(sceneImage);
    sceneImage.classList.add('small-scene');
    sceneImage.id = 'cur-scene';
    let numberOfScenes = allPictures.length;
    if(numberOfScenes === 0) { // If there is no previous scene set the src as an empty picture
        sceneImage.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxcHgiIGhlaWdodD0iMXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMSAxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7d3d3LmRyYXcuaW8mcXVvdDsgbW9kaWZpZWQ9JnF1b3Q7MjAyMC0wMi0yOVQwODozNzowMi4yMjRaJnF1b3Q7IGFnZW50PSZxdW90O01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84MC4wLjM5ODcuMTIyIFNhZmFyaS81MzcuMzYmcXVvdDsgZXRhZz0mcXVvdDs4UnJ5dnJmd2pDZTJxMHZfd01UNiZxdW90OyB2ZXJzaW9uPSZxdW90OzEyLjcuOSZxdW90OyB0eXBlPSZxdW90O2RldmljZSZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDs1WmxOQmJHSXh6LWJjaEtlYTQtQyZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtkWkhCRHNJZ0RJYWZodnNHeWRUem5Icnh0SU5uTXVvZ1lldkNNSnMrdlN5QWsweFBsSzkvS1g5TFdObk5aOE1IZVVVQm10Qk16SVFkQ2FVNXpRN3VXTWpUazRMdVBHaU5Fa0cwZ2xxOUlNQXMwSWNTTUNaQ2k2aXRHbExZWU45RFl4UEdqY0VwbGQxUnAxMEgzc0lHMUEzWFczcFR3a3BQOTlIRndpK2dXaGs3NTBVdzNQRW9EazVHeVFWT1g0aFZoSlVHMGZxb20wdlF5L0RpWEh6ZDZVLzI4ekVEdmYxUjRJTDFiWGRKTnNTcU53PT0mbHQ7L2RpYWdyYW0mZ3Q7Jmx0Oy9teGZpbGUmZ3Q7IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpOyI+PGRlZnMvPjxnLz48L3N2Zz4=";
    } else { // Else setting the src from the previous picture
        sceneImage.src = allPictures[numberOfScenes - 1].src;
    }
    DiagramEditor.editElement(sceneImage);
    sceneImage.addEventListener('click', editSceneByEditor); // Adding event listener for editing
};

function addScene(id) {
    /* The function sends a request to the server with the info about the scene
    * which is required to be added. The info is: the algorithm's id and HTML code of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Elena Karelina.
    */
    let tmp = document.getElementById('cur-scene');
    let xmlCode = tmp.src;
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/scene_add.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(id) + '&xml=' + encodeURIComponent(xmlCode));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured while adding information
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                let scenePict = document.getElementById('cur-frame');
                let sceneImg = document.getElementById('cur-scene');
                let sceneTime = document.getElementById('cur-timing');
                if(parseInt(xhr.responseText) == 0) {
                    sceneImg.parentNode.removeChild(sceneImg);
                    scenePict.parentNode.removeChild(scenePict);
                    sceneTime.parentNode.removeChild(sceneTime);
                    alert('Ошибка при добавлении в базу данных');
                } else {
                    let ids = xhr.responseText.split(' ');
                    scenePict.id = 'scene-' + ids[0];
                    sceneImg.id = 'scenevis-' + ids[0];
                    scenePict.addEventListener('drop', drop); // Adding event listeners for swapping scenes
                    scenePict.addEventListener('dragover', allowDrop);
                    sceneImg.addEventListener('dragstart', drag);
                    sceneTime.id = 'timing-' + ids[1];
                    sceneTime.addEventListener('keyup', validateTime);
                    sceneTime.addEventListener('keydown', keepPrevious);
                    sceneTime.addEventListener('blur', editTiming);
                }
            }
        }
    };
}