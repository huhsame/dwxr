// require('@babel/polyfill');
const Rail = require('./rail');
// import G from './setGun';

function MO(){
    let mo = function(){};

    mo.r = 0.5; // 반지름 (첫 위치를 세팅할때 엑스 값 오프)
    mo.scale = {x:0.1, y:0.1, z:0.1};
    mo.rotation = {x:0, y:90, z:0};

    mo.create = ( user ) => {

        if(user.name === undefined) return null;
        if(user.order === undefined) return null;
        let object = document.querySelector('#'+user.name);
        if(object !== null) return null;

        object = document.createElement('a-entity');
        object.setAttribute('id', user.name);
        object.setAttribute('mixin', 'airplane');
        object.setAttribute('scale', mo.scale);
        object.setAttribute('rotation', mo.rotation);
        object.setAttribute('position',  mo.getPosition( Rail.getRailPosition(user.order) ));

        let rail = Rail.get( user );
        rail.setAttribute('text-label', mo.getInfo(user.name) );

        return object;
    }

    // 내가 들어왔다고 다른 피어들에게 알림
    mo.putMineInGun = ( user )=>{
        let position = mo.getPosition( Rail.getRailPosition(user.order) );

        let mine = {
            id: user.name,
            order: user.order,
            parent: 'scene',
            tagName: 'a-entity',
            visible: true,
            attributes: {
                position: position
            },
        }

        // let mine = {
        //     [user.name] : {
        //         id: user.name,
        //         order: user.order,
        //         parent: 'scene',
        //         tagName: 'a-entity',
        //         visible: true,
        //         attributes: {
        //             position: position
        //             }
        //         }
        // };


        let gunObj = G.mo.get( mine.id ).put( {temp : 'temp'} ) // gun trigger 를 속이면서 오브젝트 만 받아옴
        // mine  정보를 한번에 넣지 않고 따로따로 넣는게 유리
        gunObj.get('id').put(mine.id);
        gunObj.get('attributes').get('position').put(mine.attributes.position);
        gunObj.get('order').put(mine.order);
        gunObj.get('id').put(mine.id); // 마지막에 확인차 한번 더해줘?
        gunObj.get('visible').put(mine.visible);
        // G.mo.open(console.log);
        G.scene.get('children').set( gunObj ); // scene 에 칠드런으로 등록해야 렌더링을 시켜줌?

    }

    // rp = rail position by order
    mo.getPosition = ( rp )=>{
        return {
            x: mo.r - (Rail.width / 2),
            y: rp.y + mo.r / 2,
            z: rp.z
        }
    }

    mo.getInfo = ( name ) =>{
        let info = name;
        jq.ajax({
            url: location.origin + '/api/user/getUser',
            type: 'POST',
            data: {name: name},
            success: async function (data) {
                let user = data.user;
                // console.log(user);
                info = '[' + user.name + ']  Down: ' + user.speed.dl + '  Up:' + user.speed.ul;
                return info;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('[getSpeed] ajax error : ' +jqXHR);
                console.log('[getSpeed] ajax error : ' +textStatus)
                console.log('[getSpeed] ajax error : ' +errorThrown);
                return 'failed';
            }

        });
    };

    mo.remove = ( user ) =>{
        let El = document.querySelector('#' + user.name);
        if(El !== null){
            console.log('remove ' + user.name);
            El.remove();
        }
    }

    mo.appendToScene = ( el ) => {
        if( el === null) return;
        let sceneEl = document.querySelector('a-scene');
        sceneEl.appendChild( el );
    }





    return mo;
}


module.exports = MO();
