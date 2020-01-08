import "@babel/polyfill";


// import './init-ddb';
import 'bootstrap';
import 'aframe';

import testLog from './testLogs'
import './init-space';

import './aframe/components/ortho'
import './three/TransformControls';
import './aframe/components/transformControls';
import './aframe/components/textLabel'

import './render-space';

import Rail from './rail';
import Util from './utils';

// import random from './random';

// import om from 'objectMaganer';
// import dio from 'socket.io-client';

// import panic from 'panic-client';
// panic.server('http://localhost:8080');


L.user = {};

let D = function(){};
window.D = D;

let createMyObject = async function (user) {
    let mine = document.querySelector('#'+user.name)
    if(mine !== null) {
        console.log( mine );
        return
    }

    let sceneEl = document.querySelector('a-scene');

    let myObject = {};
    myObject.id = user.name;
    myObject.parent = 'scene';
    myObject.tagName = 'a-entity';
    myObject.visible = true;
    myObject.attributes = {
        // geometry: {primitive: 'cone'},
        // material: {color:'green'},
    };
    let myEl = document.createElement('a-cone');
    let position = Rail.getRailPosition(user.order);
    let d = 0.5;
    // position.copy(myRailEl.object3D.position);
    position.x = -5 + d;
    position.y = d / 2;
    // position.setZ(myRailEl.object3D.position.z);
    myObject.attributes.position = position;
    // myObject.attributes.scale = {x:d,y:d,z:d};
    // myObject.attributes['transform-controls'] = { activated: false };

    myObject.attributes['text-label'] = {text: user.name};
    // myRailEl.setAttribute('text-label' , {text: L.user.name});

    myEl.setAttribute('id', user.name);

    myEl.setAttribute('position', position);
    myEl.setAttribute('mixin', 'red cone half');
    // myEl.setAttribute('color', 'red');
    // myEl.setAttribute('scale', d+' '+d+' '+d);
    sceneEl.appendChild(myEl);


    putObject(myObject);


    function putObject(object) {


        let obj = G.mine.get(object.id).put({id: 'temp'});

        obj.get('id').put(object.id);
        // obj.get('parent').put(object.parent);
        // obj.get('tagName').put('a-entity');
        //
        // obj.get('attributes').get('mixin').put('green cone half');
        // // obj.get('attributes').get('geometry').put({primitive: object.attributes.geometry.primitive});
        // // obj.get('attributes').get('material').get('color').put(object.attributes.material.color);

        // position

        obj.get('attributes').get('position').put(object.attributes.position);
        // subscribe 하는 부분도 함께 수정 해야함
        // rendeing, init 하는 부분 모두


        // // obj.get('attributes').get('scale').put(object.attributes.scale);
        // // obj.get('attributes').get('transform-controls').put(object.attributes["transform-controls"]);
        // obj.get('attributes').get('text-label').put(object.attributes["text-label"]);
        obj.get('visible').put(object.visible);

        obj.once(console.log);
        obj.get('id').put(object.id);

        G.scene.get('children').set(obj);

    }

    // locateByTime();

    // 누가 한변 G.app.get('fire').put(true);

    G.app.get('fire').on((d, k)=>{
        if(d !== true) return;
        locateByTime();
    })
    console.log('got ready')
}

function getRateByTime(){
    let interval = 5;
    return (G.getTime() % (1000 * interval)) / (1000* interval);
}
function getValueByTime(){
    return (Rail.width * getRateByTime()) - (Rail.width/2);
}
function putLocation(){

    let user = L.user;
    let obj = G.mine.get( user.name );
    let position = Rail.getRailPosition( user.rail);
    let axis = Rail.axis;
    position[axis] = getValueByTime();
    // obj.get('attributes').get('position').get(axis).put(position[axis]);
    // for test
    let dataId = Util.generateUUID(); // for checking data id
    let x = position[axis];
    obj.get('attributes').get('position').put({x: x, dataId: dataId  });

    let logData = {position: position, dataId: dataId};
    let pubLog = testLog.getPubLog( logData );
    L.pubLogs.push(pubLog);
}
function locateByTime(){
    console.log('start');
    setInterval(putLocation, Math.ceil(1000 / 30));
}

function uploadLog(){
    testLog.uploadLogs();
}
function logging(){
    console.log("start logging...")
    let sec = 10;
    setInterval( uploadLog,  sec * 1000);
}

document.addEventListener('onrails',function(){
    // 내이름 상대방 이름 다 적어야하는데
    // 흐음.. 그러게..
    // 일단 내꺼는 여기서
    // 상대방꺼는 render-space에서

    // 상대방꺼는 두종류
    // 미리 들어와있는애들, 새로 들어오는 애들

    console.log(L.user.order);
    let myRailEl = document.querySelector('#rail-' + L.user.order);
    myRailEl.setAttribute('text-label', {text: L.user.name});

})

window.onload = function () {
    // await Rail.createRails();

    // console.log(L.user);

    // socket.emit('join', L.spaceId, function afterJoin(){
    //     D.createMyObject(Number(L.user.order));
    // })


    logging();

};

window.onbeforeunload = function(e){
    e.preventDefault();

    let user = L.user;
    console.log(L.user);
    let obj = G.mine.get( user.name );
    obj.get('visible').put(false);

    // jq.ajax({
    //     url: location.origin + '/test/removeUser',
    //     type: 'POST',
    //     data: {name: L.user.name},
    //     success: function (data) {
    //         console.log(data);
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         console.log("POST Failed: " + textStatus + ": " + errorThrown);
    //     }
    // });
    // e.returnValue = 'asdfasdfas'

}



document.addEventListener( 'onComplete', testLog.uploadLogs());

window.addEventListener('onuser', function(e){
    let pid = e.detail.pid;
    console.log('['+pid + '] is connected.');

    // Pid  저장시키고 session 에 있는 유저정보 받아
    jq.ajax({
        url: location.origin + '/api/pid/create',
        type: 'POST',
        data: {pid: pid},
        success: startCreating,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus)
            console.log(errorThrown);
        }
    });

});

let startCreating =  async function (data) {
    // console.log('[' + pid + '] is stored.')
    console.log(data)
    L.user = await data.user;
    Rail.createRails();
    createMyObject(L.user);
    logging();
}
