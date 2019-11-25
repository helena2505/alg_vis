let canvas1 = document.getElementById("outer-dropzone");

function addScene(id) {
    let htmlCode = canvas1.outerHTML;
    console.log(htmlCode);
    //htmlCode = htmlCode.slice(42, htmlCode.length - 6);
    let xhr = new XMLHttpRequest(); // Creating new HTTP request
    xhr.open("POST", "include/add_scene.php", true); // Setting destination and type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
    xhr.send('id=' + encodeURIComponent(id) + '&html=' + encodeURIComponent(htmlCode));
    xhr.onreadystatechange = function () { // Waiting for the server's answer
        /* Event listener for getting response from server
        * Informs the user if an error has occured at updating information
        * Input parameter: none. Output parameter: none.
        * Author: Elena Karelina
        */
        if (xhr.readyState == 4) { // The answer has been got
            if (xhr.status == 200) {
                console.log('One day I will get it, but not now');
            }
        }
    };
}