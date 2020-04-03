let algPanel = document.getElementById('structures-col');
let algorithms  = algPanel.querySelectorAll('.one-algorithm');
let scenes = [];
let curSceneNum = 0;
let nextButton = document.getElementById('btn-next-scene');
let prevButton = document.getElementById('btn-prev-scene');
let resetButton = document.getElementById('no-alg2');

prevButton.disabled = true;
nextButton.disabled = true;

for(let i = 0; i < algorithms; i++) {
    let curAlgTree = algorithms[i];
    curAlgTree.addEventListener('click', selectAlg)
}

nextButton.onclick = function() {
    if(curSceneNum + 1 < scenes.length) {
        prevButton.disabled = false;
        curSceneNum++;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"];
    }
    if(curSceneNum + 1 == scenes.length) {
        nextButton.disabled = true;
    }
};

prevButton.onclick = function() {
    if(curSceneNum > 0) {
        nextButton.disabled = false;
        curSceneNum--;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"];
    }
    if(curSceneNum == 0) {
        prevButton.disabled = true;
    }
};

resetButton.onclick = function() {
    nextButton.disabled = false;
    prevButton.disabled = false;
    curSceneNum = 0;
    scenes = [];
    let img = document.getElementById('current-scene');
    img.parentNode.removeChild(img);
};