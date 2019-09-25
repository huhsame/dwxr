import "@babel/polyfill";

import './events';
import './utils';

import './init-ddb';
import 'bootstrap';
import 'aframe';
import testLog from './testLogs'
import './init-space';
import random from './random';


// 씬에 들어가서 데이터 다 받으면 이벤트 보내고
// 새로 오브젝트 생성해서
// 시간차를 두고 (<- 중요) 포지션 값 변경시키기 setInterval
// 로그 전송

// for simulation
// let myObjectEl;

window.addEventListener('getuser', function(){
    let myObject = random.put();
    console.log(myObject);
    let x = myObject.attributes.position.x;
    console.log(x);

    let axises = ['x','y','z'];
    // axises[Math.ceil(Math.random()*3)]
    let d = Math.random()*0.2 + 0.1 ;
    // let dy = Math.random()*0.4 + 0.1 ;
    // let dz = Math.random()*0.4 + 0.1 ;

    let limit ={
        x:{ left: -8, right: 8 },
        y: { left: -3, right: 7},
        z: { left: -25, right: 0}
    };
    function checkRange(before){
        // if(limit.x.left <)
    }

    function increase(axis, l,r) {
        G.objects.get(myObject.id).get('attributes').get('position').get(axis).once(function(data){
            let before = data;
            if(before > r){
                d = Math.abs(d) * (-1)
            }else if(before < l ){
                d = Math.abs(d)
            }
            this.put(before + d);
        });
    }
    function increase_other(axis, l,r) {
        G.objects.get(myObject.id).get('attributes').get('position').once(function(data){
            let before = data;

            if(before > r){
                d = Math.abs(d) * (-1)
            }else if(before < l ){
                d = Math.abs(d)
            }
            this.put(parseFloat(before + d));
        });
    }

    function increseX(){
        increase('x', -8, 8);
    }
    function moveMyObject(){

        increase('x',-8, 8);
        // increase('y', -3,7);
        // increase('z', -25,0);
    }
    setInterval( moveMyObject, 5);

});



// for data log
let onComplete = new Event('onComplete');
function emitComplete (){
    document.dispatchEvent(onComplete);
}
document.addEventListener('onComplete', submitAndNext);

async function submitAndNext() {
    // TODO 항성 sub->pub 순서로 할것
    // pub 마지막 부분에서 페이지를 넘기기 때문에
    await testLog.logsUpload(S.subLogs, 'sub');
    await testLog.logsUpload(S.pubLogs, 'pub');

}
