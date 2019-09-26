import util from "./utils";

let testLog = require('./testLogs');

let spaceID = (function setSpaceID(){
    if(location.pathname.startsWith('/test')){
        return 'test' + '0915';
    }
    let paths = location.pathname.split('/');
    return paths[paths.length -1];
})();
// 함수 정의와 동시에 실행시키면서 리턴값 저장

(function setPath(){
    G.space = G.app.get('spaces').get( spaceID );
    G.scene = G.space.get('scene');
    G.assets = G.space.get('assets');
    G.objects = G.space.get('objects');
})();


let syncPosition = function ( data, key ){
    let el = document.querySelector('#'+key);
    if(el){
        let object = el.object3D;
        if( object !== undefined ) {
            this.get('attributes').get('position').once(function (data) {
                // console.log(data);
                if(data !== undefined){
                    object.position.copy(data);
                }
            });
        }
    }
}

let syncMaterial = function ( data, key ){
    let el = document.querySelector('#'+key);
    if(el){
        let value = data;
        if(value === undefined) return;
        if(value.hasOwnProperty('_')){
            delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
        }
        if(util.checkEmpty(value)){
            // console.log('value is empty');
            return;
        }
        // console.log(key, value);
        // material 이 왜 업데이트가 안되냐...
        // object 차원에서 해야하나

        el.setAttribute(key, value);
        // let object = el.object3D;
        // if( object !== undefined ) {
        //     this.get('attributes').get('material').once(function (data) {
        //         // console.log(data);
        //         if(data !== undefined){
        //             console.log(object.material);
        //         }
        //     });
        // }
    }
}



// 그리고 이게 초기화단계인지  아니면 그냥 인터랙션하느 단계인지 표시해주고싶다.

// subscribe
G.objects.map().get('attributes').get('material').on(function receiveMaterial(data, key){
    console.log(data, key);
    this.back(2).once( syncMaterial );

})

G.objects.map().get('attributes').get('position').on( function receivePosition(data, key){

    if(!location.pathname.startsWith('/test')){
        this.back(2).once( syncPosition );
        return;
    }

    let subLog = testLog.getSubLog( data );
    this.back(2).once(function pushSubLog(data, key) {
        subLog.publisher = key;
    });
    let id = subLog.publisher;
    let el = document.querySelector('#'+id);
    if(el){
        let object = el.object3D;
        if( object !== undefined ) {
                object.position.copy(data);
        }
    }

    // this.back(2).once( syncPosition );

    L.subLogs.push(subLog);

});
