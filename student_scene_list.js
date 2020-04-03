let algPanel = document.getElementById('structures-col');
let algorithms  = algPanel.querySelectorAll('.one-algorithm');
let scenes = [];
let curSceneNum = 0;
let nextButton = document.getElementById('btn-next-scene');
let prevButton = document.getElementById('btn-prev-scene');
let resetButton = document.getElementById('no-alg2');
let modalNoScenes = document.getElementById('modal-no-scenes');

for(let i = 0; i < algorithms; i++) {
    let curAlgTree = algorithms[i];
    curAlgTree.addEventListener('click', selectAlg)
}

nextButton.onclick = function() {
    if(curSceneNum + 1 < scenes.length) {
        curSceneNum++;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"];
    }
};

prevButton.onclick = function() {
    if(curSceneNum > 0) {
        curSceneNum--;
        let img = document.getElementById('current-scene');
        const tmp = JSON.parse(scenes[curSceneNum]);
        img.src = tmp["xml_code"];
    }
};

resetButton.onclick = function() {
    curSceneNum = 0;
    scenes = [];
    let img = document.getElementById('current-scene');
    img.parentNode.removeChild(img);
};