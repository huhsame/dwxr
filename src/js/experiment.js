require('@babel/polyfill');

import './modules/setGun';
import MO from './modules/movingObject';
import DL from './modules/dataLogger';
import Rail from './modules/rail';
import Util from './modules/utils';
import Syncer from './modules/synchronizer';


import 'bootstrap';

import 'aframe';
import './aframe/components/ortho'
import './three/TransformControls';
import './aframe/components/transformControls';
import './aframe/components/textLabel'


// start here;
let sceneEl = null;
let readyCount = 0;
let me = null;
let myMo = null;

document.addEventListener('onSetGunNode', getReady );
document.addEventListener('gotMe', getReady );

setMe(); // ==> gotMe 이벤트 발생


function getReady(){
    readyCount ++;
    if(readyCount === 2) init();
}

function doBeforeLeaving(){

    // invisible 되는거 실행 안돼!!!!! 헤헤헤헤헤 뭐가 잘못된건지 ^^^^^^^^^^^ 슬퍼요
    window.onbeforeunload = function(e){
        e.preventDefault();

        // invisible
        let obj = G.mo.get( me.name );
        obj.get('visible').put( false );

    };
}

function setMe(){
    jq.ajax({
        url: location.origin + '/api/user/getMe',
        type: 'POST',
        success: async function (data) {
            me = data.user;
            let gotMe = new Event( 'gotMe' );
            document.dispatchEvent( gotMe );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('[getMe] ajax error : ' +jqXHR);
            console.log('[getMe] ajax error : ' +textStatus)
            console.log('[getMe] ajax error : ' +errorThrown);
        }
    });
}

function init(){

    printGreeting( me );
    doBeforeLeaving(); // 이벤트 리스너 등

    // load scene
    sceneEl = document.querySelector('a-scene');
    if (sceneEl.hasLoaded) {
        run();
    } else {
        // 씬 엘리먼트가 로드 된 후 run 실행
        sceneEl.addEventListener('loaded', run);
    }
}

function printGreeting ( user ){
    console.log('Hello! I am ' + user.name );
}

function run () {


    // scene 에서 쓸 리스너들 먼저 쭉 등록
    sceneEl.addEventListener('railsLoaded', createMyMovingObject ); // 레일을 에이프레임 시스템으로 등록시켜도 좋을거같은데말이야.
    // 실행 할 함수들 작성
    createObjects();

    startLogging();
    getReadyTofire();
    startSyncingGun();


    // 이닛을 마치고 나서 건디비 리스너 붙이기옴

}
function createObjects(){
    Rail.createAll();
    // ==> railsLoaded 이벤트 발생 ==> createMyMovingObject ==> bringothers ==> createOtherMo

    // 앞에 온 애들 다 온건지는 알 수가 없구나.
}

function createMyMovingObject(){
    console.log('create my moving object');
    if(!(myMo === null)||(myMo === undefined)) return;

    myMo  = MO.create( me ); // mo means movingObject
    if(myMo === null){
        console.log( 'my no is null')
        return;
    }
    myMo.addEventListener('loaded', doAfterLoadedMyMo() ); // 내 오브젝트 렌더링하고 다른사람꺼 불러오
    sceneEl.appendChild( myMo ); // ==> loaded 이벤트 발생
}

function doAfterLoadedMyMo(){

    MO.putMineInGun( me );
    bringOthers();
}
// 여기서 처음으로 건 사용
function bringOthers(){
    // attributes 를 채워 넣어야 하기 때문에, gun once 로 불러와야 한다.
    // gun once 는 이후에 다른애들이 입장해서 gun에 데이터 집어넣으면 실행 될거야.

    // 왜? 이게 먼저 실행되는거야 ?
    //----------1 ㅇㅣ거랑 2번이랑 사실 같은 코드인데 왜인지 두개다 실행시켜야 정상작동한다 ----------
    G.mo.map().once(function afterGetPreUsers(data, key){
        console.log('bring others');
        console.log(data);

        if(data.id === undefined) return;
        if(data.order === undefined) return;
        let user = {name: data.id, order: data.order}

        if(data.visible === false){
            if(user.name !== me.name){
                MO.remove(user);
                return;
            }
            // user name == me. name
            // 다음 작업을 위해 현재 데이터도 바꿔주고
            // 다른애들에게 전달해주기위해 건디비에도 저장

            data.visible = true;
            this.get('visible').put(true);

        }

        if(data.visible === true){
            let moEl = MO.create(user);
            MO.appendToScene(moEl);
        }


    })
    // ---------222222222222222222-------------------
    G.mo.map().get('visible').once(function receiveVisible(data, key){
        this.back().once(function(data, key){

            // console.log('visible : '+data.id)
        })
        if((data===undefined)||(data==null)) return;

        // 나머지 애들
        if(data === true){
            this.back().once( createOtherMo );
        }else{
            this.back().once(function removeEl(data, key){
                if(data.id === me.name){
                    this.get('visible').put( true );
                    return;
                }
                let notAllowedMo = document.querySelector('#' + data.id);
                if( (notAllowedMo !== null) && (notAllowedMo !== undefined) ){
                    notAllowedMo.remove();
                }
            });
        }
    })
}

function createOtherMo (data, key){
    console.log('create other mo')
    console.log(data);
    if (data.visible === false) return;
    if (data.id === me.name) return;
    if (data.id === undefined) return;
    if ((data.order === undefined)||(data.order === null)) return;
    if(data.id === 'temp') return;

    // for MO.create (user);
    let user = {
        name: data.id,
        order: data.order
    }

    let mo = document.querySelector('#' + user.name);
    // console.log('other mo');
    // console.log(mo)
    if ((mo === null) || (mo === undefined)) {
        // console.log('create other mo');
        // console.log(user);
        mo = MO.create( user );
        if(mo === null){
            console.log( 'mo is null')
            return;
        }
        mo.addEventListener('loaded', printGreeting( user ) );
    }

    // now get and set attributes
    this.get('attributes').get('position').once(function setAttributeFromGunData(data, key) {
        let value = data;
        if (value === undefined) return;
        if (value.hasOwnProperty('_')) {
            delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
        }
        if(value.hasOwnProperty('dataId')){
            delete value['dataId'];
        }
        if (Util.checkEmpty(value)) {
            console.log('[setAttributeFromGunData]: value is empty');
            return;
        }
        mo.setAttribute(key, value);
    });

    sceneEl.appendChild( mo ); // 다 되면 greeting?
    // 아니 생성되었을떄야 아니면 붙었을 떄야 ?

}

function startLogging(){
    let sec = 10;
    console.log( 'start logging');
    setInterval( DL.uploadPubLogs,  sec * 1000);
    setInterval( DL.uploadSubLogs,  sec * 1000);
};

function getReadyTofire() {
    G.fire.on(function isFire(data, key){
        if(data !== true ) return;
        locateByTime();
    })
};

function locateByTime(){
    setInterval( putLocation, Math.ceil(1000 / 30) );
}

function putLocation(){

    // console.log('put location');
    let obj = G.mo.get( me.name );
    let position = Rail.getRailPosition( me.order );
    let axis = Rail.axis;
    position[axis] = getValueByTime();

    // add information data id for distinguish data for experiment
    let dataId = Util.generateUUID(); // for checking data id
    let x = position[axis];
    obj.get('attributes').get('position').put({x: x, dataId: dataId  });

    let logData = { name: me.name, position: position, dataId: dataId }
    DL.addPubLog(logData )
}
function getValueByTime(){
    return (Rail.width * getRateByTime()) - (Rail.width/2);
}
function getRateByTime(){
    let interval = 5;
    return (G.getTime() % (1000 * interval)) / (1000* interval);
}
function startSyncingGun(){
    Syncer.MoVisible();
    Syncer.MoPosition();

}
