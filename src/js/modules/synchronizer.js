// require('@babel/polyfill');

// 건디비는 아래에서 감지 했으면 바로 윗레벨로 올라가서 코드 작성해야 안정적임

const Util = require ("../utils");

// const Rail = require('./rail');
const DL = require('./dataLogger');
const MO = require('./movingObject');

function Synchronizer(){
    let syncer = function(){};

    syncer.log = DL.mode;


    // gun에서 this 를 써야하니까 function 으로 선언
    syncer.position = function ( data, key ){
        let el = document.querySelector('#'+key);

        // 포지션값이 왔을때, 없는 오브젝트라면 생성해야할까 ?
        // 그러면 피어리스트에 영향을 미치지 않을까? 그럼 검사하면 되잖아.
        // 아 그래서 내가 user manager 를 만든거였나.
        // visible 검사하는거 ?
        // 일단 생략하고

        if(el){
            let object = el.object3D;
            if( object !== undefined ) {
                this.get('attributes').get('position').once(function (data) {
                    // console.log(data);
                    if(data !== undefined){
                        if(data.hasOwnProperty('dataId')){
                            delete data['dataId'];
                        }
                        object.position.copy(data);
                    }
                });
            }
        }
    }
    syncer.material = function ( data, key) {
        let el = document.querySelector('#'+key);
        if(el){
            let value = data;
            if(value === undefined) return;
            if(value.hasOwnProperty('_')){
                delete value['_']; // 건디비 데이터에 삽입되어있는 _ 메타데이터 제거
            }
            if(Util.checkEmpty(value)){
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

    // 이 아래로 특정한 애들 (건디비 경로별로 )을 싱크하기전에 전처리 함수
    // 전처리(경로설정 + 어쩌구) ==> 싱크 함수 호출

    syncer.MoPosition = () => {
        G.mo.map().get('attributes').get('position').on( function afterGetPosition(data, key){

            // 전처리 및 싱크
            if(data === undefined) return;

            this.back(2).once( syncer.position );


            // 싱크 실행 ?? 위에서 한건 뭔데 ?
            // if(el){
            //     let object = el.object3D;
            //     if( object !== undefined ) {
            //         if(data.hasOwnProperty('dataId')){
            //             delete data['dataId'];
            //         }
            //         object.position.copy(data);
            //     }
            // }

            // 로그수집하는 경우에만 로그정보 수집 및 전달
            if(!syncer.log) return;
            this.back(2).once( syncer.logging );



            // let id = subLog.publisher;
            // let el = document.querySelector('#'+id);
            // if(el === null || el === undefined){
            //     this.back(2).once( createMine );
            // }


            // if(el){
            //     let object = el.object3D;
            //     if( object !== undefined ) {
            //         if(data.hasOwnProperty('dataId')){
            //             delete data['dataId'];
            //         }
            //         object.position.copy(data);
            //     }
            // }



        });
    }

    // for position.x
    syncer.logging = function ( data, key ) {

        let logData ={ name: key, position:{} };
        this.get('attributes').get('position').once(function (data) {
            // console.log(data);
            if(data !== undefined){
                if(data.hasOwnProperty('dataId')){
                    logData.dataId = data.dataId;
                    delete data['dataId'];
                }
                // object.position.copy(data);
                // console.log('sub syncer.logging data');
                // console.log(data);
                logData.position.x = data.x;

                DL.addSubLog( logData );
            }
        });



        // let subLog = testLog.getSubLog( data );

        // 데이터 아이디가 있어서 굳이 퍼블리셔가 누구인지 알 필요가 없긴한데..
        // this.back(2).once(function pushSubLog(data, key) {
        //     subLog.publisher = key;
        // });
        // L.subLogs.push(subLog);
    }

    syncer.MoMaterial = () => {

        G.mine.map().get('attributes').get('material').on(function afterGetMaterial(data, key){
            // console.log(data, key);
            this.back(2).once( syncer.material );

        })
    }

    syncer.MoVisible = ()=>{
        G.mo.map().get('visible').on( syncer.afterGetVisible );
    }

    syncer.afterGetVisible = function(data, key){
        console.log('after get visible');
        console.log(data);

        this.back().once( function afterVisibleUser(data, key){
            console.log(data);
            if(data.id === undefined) return;
            if(data.order === undefined) return;
            if(data.visible === undefined) return;

            let user = {};
            user.name = data.id;
            user.order = data.order;

            if(data.visible === true){
                let mo = MO.create(user);
                MO.appendToScene(mo);
                return;
            }

            if(data.visible === false){
                console.log('hey');
                MO.remove( user );
            }
        });

        //
        // if(data === true){
        //     this.back().once( function afterGetNewUser(data, key){
        //         if(data.id === undefined) return;
        //         if(data.order === undefined) return;
        //
        //
        //         let user = {}
        //         user.name = data.id;
        //         user.order = data.order;
        //         // console.log('syncer');
        //         // console.log(user);
        //         let mo = MO.create(user);
        //         if(mo === null){
        //             console.log( '[syncer] MO('+ user.name +') is null' );
        //             return;
        //         }
        //         let sceneEl = document.querySelector('a-scene');
        //         sceneEl.append( mo);
        //
        //     } );
        // }else{
        //     console.log(' heyyyyy visible false');
        //
        //     이상하게 이거 실행 안돼 허허참 건디비 언제까지 이럴거야?
        //     this.back().once(function afterGetOutUser(data, key){
        //         console.log('after get out user');
        //         // if(data.id === me){
        //         //     this.get('visible').put( true );
        //         //     return;
        //         // }
        //         MO.remove( data.id );
        //
        //     });
        // }
    }




    return syncer;
}


module.exports = Synchronizer();
