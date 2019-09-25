import "@babel/polyfill";

import events from './events';
import util from './utils';

import './init-ddb'
import 'bootstrap';
import 'aframe';

import testLog from './testLogs'
import './init-space';

import './three/TransformControls';
import './aframe/components/transformControls';

import './render-space';
import random from './random';


window.addEventListener('getuser', function(){
    let myObject = random.put();
    console.log(myObject);
});

document.addEventListener('loadmyobject', function(){
    let myObjectEl = document.querySelector('#'+ myObject.id)
});



// event 쪽으론 정리해두고싶은데.. 그러면 테스트로그가 없어서 ..
document.addEventListener( 'onComplete', submitAndNext);
async function submitAndNext() {
    console.log('submit and next');
    // TODO 항상 sub->pub 순서로 할것
    // pub 마지막 부분에서 페이지를 넘기기 때문에
    await testLog.logsUpload(L.subLogs, 'sub');
    await testLog.logsUpload(L.pubLogs, 'pub');
}

