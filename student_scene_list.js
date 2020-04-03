let algPanel = document.getElementById('structures-col');
let algorithms  = algPanel.querySelectorAll('.one-algorithm');
let scenes = [];
let curSceneNum = 0;
let nextButton = document.getElementById('btn-next-scene');
let prevButton = document.getElementById('btn-prev-scene');
let resetButton = document.getElementById('no-alg2');

for(let i = 0; i < algorithms; i++) {
    let curAlgTree = algorithms[i];
    curAlgTree.addEventListener('click', selectAlg)
}

nextButton.onclick = function() {
    if(curSceneNum + 1 < scenes.length) {
        prevButton.classList.remove("inactive");
        curSceneNum++;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"];
    }
    else {
        nextButton.classList.add("inactive");
    }
};

prevButton.onclick = function() {
    if(curSceneNum > 0) {
        nextButton.classList.remove("inactive");
        curSceneNum--;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"];
    }
    else {
        prevButton.classList.add("inactive");
    }
};

resetButton.onclick = function() {
    nextButton.classList.remove("inactive");
    prevButton.classList.remove("inactive");
    curSceneNum = 0;
    scenes = [];
    let img = document.getElementById('current-scene');
    img.parentNode.removeChild(img);
};