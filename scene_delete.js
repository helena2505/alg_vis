function showScene(id) {
    /* The function sends a request to the server whith the info about the scene
    * which is required to be deleted. The info is: the algorithm's id and HTML code of
    * the scene's visualisation.
    * Input parameter: id of the algorithm for which is required to add a scene.
    * Output parameter: none.
    * Author: Tatyana Shorygina
    */
    let requestedId = event.target.id.split('-')[1]; // Forming the target scene's id
    console.log(requestedId);
}