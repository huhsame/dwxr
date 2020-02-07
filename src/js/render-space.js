import util from './utils';

function setAttributeFromGunData(data, key){
    let value = data;
    delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
    if(util.checkEmpty(value)){
        console.log('value is empty');
        return;
    }
    // console.log(key);
    el.setAttribute(key, value);
};
// callbacks of gun

export function createMine(data, key){
    if (data.visible === false) return;
    if (data.id === L.user.id) return;
    if (data.id === undefined) return;
    if ((data.order === undefined)||(data.order === null)) return;
    if(data.id === 'temp') return;

    // create moving object
    let el = document.querySelector('#' + data.id);

    if ((el === null) || (el === undefined)) {
        el = document.createElement('a-entity');
        el.setAttribute('id', data.id);
        el.setAttribute('mixin', 'plane adjust');
        this.get('attributes').get('position').once(function setAttributeFromGunData(data, key) {
            let value = data;
            if (value === undefined) return;
            if (value.hasOwnProperty('_')) {
                delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
            }
            if(value.hasOwnProperty('dataId')){
                delete value['dataId'];
            }
            if (util.checkEmpty(value)) {
                console.log('value is empty');
                return;
            }
            // console.log(key);
            el.setAttribute(key, value);
        });
        document.querySelector('a-scene').appendChild(el);
    }
    // update rail information
    // ajax
    let name = data.id;
    let order = data.order;
    console.log(order);
    jq.ajax({
        url: location.origin + '/api/user/getUser',
        type: 'POST',
        data: {name: name},
        success: async function (data) {
            let user = data.user;
            // console.log(user);
            let text = '[' + user.name + ']  Down: ' + user.speed.dl + '  Up:' + user.speed.ul;
            let myRailEl = await document.querySelector('#rail-' + order);
            myRailEl.setAttribute('text-label', {text: text});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('[getUser] ajax error : ' +jqXHR);
            console.log('[getUser] ajax error : ' +textStatus)
            console.log('[getUser] ajax error : ' +errorThrown);
        }
    });


}

export async function createEl(data, key) {
    if (data.visible === false) return;
    if (data.id === L.user.id) return;
    if (data.id === undefined) return;

    let el = document.querySelector('#' + data.id);
    // if there is no dom element, create it.
    if ((el === null) || (el === undefined)) {
        console.log(data.id);
        if (data.tagName === 'a-marker') {
            el = document.createElement('a-entity');
        } else {
            el = document.createElement(data.tagName);
        }
        if (data.tagName === 'a-asset-item') {
            el.setAttribute('src', 'default');
        }

        el.setAttribute('id', data.id);
        // el.setAttribute('geometry', {primitive: 'cone'});
        // el.setAttribute('material', {color: 'green'});
        // el.setAttribute('scale', '0.5 0.5 0.5');

        this.get('attributes').map(function (data, key) {
            if (key !== 'position')
                if(data.hasOwnProperty('dataId')){
                    delete data['dataId'];
                }
                return data;
            return undefined;
        }).on(function setAttributeFromGunData(data, key) {
            let value = data;
            if (value.hasOwnProperty('_')) {
                delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
            }
            if (util.checkEmpty(value)) {
                console.log('value is empty');
                return;
            }
            // console.log(key);
            el.setAttribute(key, value);
        });

        this.get('attributes').get('position').once(function setAttributeFromGunData(data, key) {
            let value = data;
            if (value === undefined) return;
            if (value.hasOwnProperty('_')) {
                delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
            }
            if(value.hasOwnProperty('dataId')){
                delete value['dataId'];
            }
            if (util.checkEmpty(value)) {
                console.log('value is empty');
                return;
            }
            // console.log(key);
            el.setAttribute(key, value);
        });

        if (data.parent === undefined || data.parent === null || data.parent === '' || data.parent === 'scene') {
            let sceneEl = await document.querySelector('a-scene')
            let count = document.querySelectorAll('#' + data.id).length;
            if(count === 0){
                sceneEl.appendChild(el);
                console.log(data.id +' is appended.')
            }else{
                // el.remove();
            }
            if (el.getAttribute('id') === L.user.name) {
                // events.dispatchLoadMyobject();
            }
        } else {
            let parentEl = document.querySelector('#' + data.parent);
            let count = document.querySelectorAll('#' + data.id).length;
            if(count === 0){
                parentEl.appendChild(el);
                console.log(data.id +' is appended.')
            }else{
                // el.remove();
            }
        }
    }
};

let initAssets= function(){
    G.assets.map().once( createEl );
};
let initObjects = function(){
    console.log('start rendering scene objects');
    // G.scene.get('children').map().once( initChildren );
    G.scene.get('children').map().on( initChildren );
};

// recursive
let initChildren = function(data, key){
    this.once( createEl );
    if(data.children !== undefined){
        // this.get('children').map().once( initChildren )
        this.get('children').map().on( initChildren )
    }
};

// event 'onuser' from gun.js
// There is another listener for it at test-space.js
window.addEventListener('onuser', function(){

    G.mine.map().get('visible').once(function receiveVisible(data, key){
        if((data===undefined)||(data==null)) return;
        console.log('[render-space] ' + data.id);

        if(data.id === L.user.id){
            this.put( true );
        }

        if(data === true){
            this.back().once( createMine );
        }else{
            this.back().once(function removeEl(data, key){
                let el = document.querySelector('#' + data.id);
                if( (el !== null) && (el !== undefined) ){
                    el.remove();
                }
            });
        }

    });
});
//
// G.mine.map().get('visible').on(function receiveVisible(data, key){
//     if((data===undefined)||(data==null)) return;
//     console.log('[render-space] ' + data.id);
//
//     if(data.id === L.user.id){
//         this.put( true );
//     }
//
//     if(data === true){
//         this.back().once( createMine );
//     }else{
//         this.back().once(function removeEl(data, key){
//             let el = document.querySelector('#' + data.id);
//             if( (el !== null) && (el !== undefined) ){
//                 el.remove();
//             }
//         });
//     }
//
// });


