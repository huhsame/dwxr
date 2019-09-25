import "@babel/polyfill";

import events from './events';
import util from './utils';

import './init-ddb'
import 'bootstrap';
import 'aframe';

import testLog from './testLogs'
import './init-space';

import './aframe/components/ortho'
import './three/TransformControls';
import './aframe/components/transformControls';
import './aframe/components/textLabel'

import './render-space';
import random from './random';
// import om from 'objectMaganer';


// 입장하면 내꺼랑 ..+ a-text 생성
// 처음 위치를 어떻게 잡지 ?
// 처음 위치를 어떻게 잡지
// 지금 문제가 되는건. 몇명 들어갈지 모르니까.
// 일단 4명으로 잡아놓고 시작하자
// 이동.. 이동..
//



const origin =  { x: 0, y: 0, z: 0};
const railWidth = 10;
const axis = 'x';
function setAttributes( el, attributes ){
    for( let key in attributes){
        el.setAttribute( key, attributes[key])
    }
    return el;
}
function getLine(i){
    return Math.ceil(i/2)
}
function directionZ(i){
    return i%2 ? -1 : 1 ; // odd : -
}
function getRailPosition(i) {
    // 0 1 2 3 4
    // 0 1 1 2 2
    let position ={};
    position.x = origin.x;
    position.y = origin.y;

    position.z = origin.z + parseInt(getLine(i) * directionZ(i));

    return position;
};

function createRails( number ){
    let sceneEl = document.querySelector('a-scene');

    // let number = 5;
    let interval = 1;
    let space = 0.1;

    let attributes = {};
    attributes.color = 'grey';
    attributes.width = railWidth;
    attributes.height = interval - space;
    attributes.rotation = {x: -90, y:0, z:0};

    for(let i = 0; i < number; i++){
        let railEl = document.createElement('a-plane');
        railEl = setAttributes(railEl, attributes);
        railEl.setAttribute('id', 'rail-'+i);
        railEl.setAttribute('position', getRailPosition(i));
        sceneEl.appendChild(railEl);
    }
}

let D = function(){};
window.D = D;


D.createMyObject = function ( i ){
    let sceneEl = document.querySelector('a-scene');

    let myObject = {};
    myObject.id = L.user.name;
    myObject.parent = 'scene';
    myObject.tagName = 'a-entity';
    myObject.visible = true;
    myObject.attributes = {
        // geometry: {primitive: 'cone'},
        // material: {color:'green'},
    };
    let myEl = document.createElement('a-cone');
    let myRailEl = document.querySelector('#rail-'+i);
    let position = getRailPosition(i);
    let d = 0.5;
    // position.copy(myRailEl.object3D.position);
    position.x = -5+d;
    position.y = d/2;
    // position.setZ(myRailEl.object3D.position.z);
    console.log( position);
    myObject.attributes.position = position;
    // myObject.attributes.scale = {x:d,y:d,z:d};
    // myObject.attributes['transform-controls'] = { activated: false };

    myObject.attributes['text-label'] = {text: L.user.name};
    // myRailEl.setAttribute('text-label' , {text: L.user.name});

    myEl.setAttribute('id', L.user.name);
    myEl.setAttribute('position', position);
    myEl.setAttribute('mixin', 'red cone half');
    // myEl.setAttribute('color', 'red');
    // myEl.setAttribute('scale', d+' '+d+' '+d);
    myEl.setAttribute('text-label',{text: L.user.name});
    sceneEl.appendChild(myEl);
    putObject(myObject);

    function putObject( object){
        let obj = G.objects.get( object.id ).put({id: object.id});

        // obj.get('id').put(object.id);
        obj.get('parent').put(object.parent);
        obj.get('tagName').put('a-entity');
        obj.get('visible').put(object.visible);

        obj.get('attributes').get('mixin').put('green cone half');
        // obj.get('attributes').get('geometry').put({primitive: object.attributes.geometry.primitive});
        // obj.get('attributes').get('material').get('color').put(object.attributes.material.color);
        obj.get('attributes').get('position').put(object.attributes.position);
        // obj.get('attributes').get('scale').put(object.attributes.scale);
        // obj.get('attributes').get('transform-controls').put(object.attributes["transform-controls"]);
        obj.get('attributes').get('text-label').put(object.attributes["text-label"]);

        G.scene.get('children').set( obj );
    }

    // if(L.user.auto === true){
        locateByTime();
    // }

}

function getRateByTime(){
    return (Date.now() % 1000) / 1000;
}
function getValueByTime(){
    return (railWidth * getRateByTime()) - (railWidth/2);
}
function putLocation(){
    let obj = G.objects.get( L.user.name );
    obj.get('attributes').get('position').get(axis).put(getValueByTime());
}
function locateByTime(){
    console.log('start')
    setInterval(putLocation, 20);
}
window.onload = async function () {
    await createRails(20);
    console.log(L.user)
    D.createMyObject(Number(L.user.order));

};

window.onbeforeunload = function(e){
    e.preventDefault();

    // 서버 리스트에서 유저 지우고
    // 내꺼는 안지워도 어차피 꺼지니까 상관없는데
    // 다른애들한테서 지워야지..
    // 건디비의 값을 수정해야함
    // 어떻게 할것이냐
    // 업데이트 하기전에, 리스트에 있는지 ? 확인하고 업데이트
    // 그러면 이미 생성된거는 어떻게 지우냐
    // 따로 이벤트를 받아야지뭐.. 해당 변수에 ..
    // 메타데이터로 플래그를 세워야겠네

    let obj = G.objects.get( L.user.name );
    obj.get('visible').put(false);

    jq.ajax({
        url: location.origin + '/test/removeUser',
        type: 'POST',
        data: {name: L.user.name},
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("POST Failed: " + textStatus + ": " + errorThrown);
        }
    });
    console.log('whyy!!!!!!')
    // e.returnValue = 'asdfasdfas'

}



document.addEventListener( 'onComplete', submitAndNext);
async function submitAndNext() {
    console.log('submit and next');
    // TODO 항상 sub->pub 순서로 할것
    // pub 마지막 부분에서 페이지를 넘기기 때문에???
    // 페이지 넘기는 부분 다시해야겠다. 지금 펍섭 메소드 합쳐놔서 그냥 넘어가겟는데

    await testLog.logsUpload(L.subLogs, 'sub');
    await testLog.logsUpload(L.pubLogs, 'pub');
}

window.addEventListener('getuser', function(){

});
