lst.onclick = function(event) {
    /* Event listener for clicking on the list of the containers
    * The function calls the function of showing list of the container's algorithms
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    event.preventDefault();
    let clickedArea = document.getElementById(event.target.id);
    if(clickedArea.classList.contains("one-container")) // If the click has been on one of the containers from the list
        showAlgorithms(event); // Calling the function
};

function showAlgorithms(event) {
    /* The function gets the list of algorithms of the container from the server's database
    * The function makes the received list visible on the user's page
    * Input parameter: event. Output parameter: none.
    * Author: Elena Karelina
    */
    let targetContainer = event.target.id; // Getting id of the container for which the list is required
    let contId = "alg" + event.target.id; // Forming the id of the ul element for the algorithms list
    let algList = document.getElementById(contId); // Let for algorithms list
    if(algList.classList.contains("algorithm-list-vis")) { // If the list is already visible
        let allLi = algList.querySelectorAll('LI'); // Cleaning it
        for(let j = 0; j < allLi.length; j++) {
            algList.removeChild(allLi[j]);
        }
        algList.classList.remove("algorithm-list-vis"); // And hidding it
    }
    else { // Otherwise get the list of algorithms from server and make it visible
        let xhr = new XMLHttpRequest(); // Creating new HTTP request
        xhr.open("POST", "include/alg_list.php", true); // Setting destination and type
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Setting encoding
        xhr.send('id=' + encodeURIComponent(targetContainer)); // Sending the container's id
        xhr.onreadystatechange = function() { // Waiting for the server's answer
            /* Event listener for getting response from server
            * Inserts the container's algorithms into the list and makes it visible
            * Input parameter: none. Output parameter: none.
            * Author: Elena Karelina
            */
            if (xhr.readyState == 4) { // The answer has been got
                if(xhr.status == 200) { // The server's returned code 200 (success)
                    let algorithms = JSON.parse(xhr.responseText); // Unpackaging the servr's response to get all algorithms'
                    // names with their ids
                    let new_element;
                    for(let i = 0; i < algorithms.length; i++) { // Adding new elements (li) into the list (ul)
                        let res = JSON.parse(algorithms[i]); // Unpackaging each element of the response to get  each algorithm's
                        // id and name
                        new_element = document.createElement('LI'); // Creating new li element
                        new_element.innerText = res["algorithm_name"]; // Adding text - the name of the algorithm
                        new_element.id = "alg-" + toString(res["id"]); // Setting the id according to the id in database
                        algList.appendChild(new_element); // Adding new element to the interface list
                    }
                    new_element = document.createElement('LI'); // Adding button "Добавить алгоритм"
                    new_element.id = "add-alg-" + event.target.id;
                    new_element.innerHTML = "+ Добавить новый алгоритм"
                    algList.appendChild(new_element);
                    new_element.addEventListener('click', inputAlgorithm); // Adding event listener for adding an algorithm
                }
            }
        };
        algList.classList.add("algorithm-list-vis"); // Make the formed list visible
    }
}
