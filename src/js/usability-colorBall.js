require('@babel/polyfill');

import './modules/setGun';
import CB from './modules/colorBall';
// import DL from './modules/dataLogger';
import Util from './modules/utils';
import Events from './modules/customEvents';
// import Syncer from './modules/synchronizer';
import US from './modules/utilsForScene';

import 'bootstrap';

import 'aframe';
import './three/TransformControls';
import './aframe/components/transformControls';
import './aframe/components/textLabel'



// load scene
let sceneEl = null;

window.onload = function () {
    getReady()
};

function getReady(){
    sceneEl = document.querySelector('a-scene');
    if (sceneEl.hasLoaded) {
        init();
    } else {
        // 씬 엘리먼트가 로드 된 후 run 실행
        sceneEl.addEventListener('loaded', init);
    }
}

function init(){
    console.log('init');
    US.setSceneEl();
    sceneEl.addEventListener(Events.ballsLoaded, checkAnswer);

    CB.createPlates();
    CB.createBalls();
}

function run(){

}

function checkAnswer(){
    console.log('checkAnswer');
    CB.checkBalls();
    // CB.checkPlates();
}
