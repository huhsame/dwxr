
window.G = function(){};
let sceneEl = document.querySelector('a-scene');
let loadscene = new Event('loadscene');
window.dispatchEvent(loadscene);

let assetsEl = document.createElement('a-assets');


let getSpaceID = function() {
    // return path.basename(location.pathname);
    return location.pathname.substring('/space/'.length);
};

// callbacks of gun
let createElInit = function (data, key) {
    let el;
    if (data === undefined) return;
    // if there is no dom element, create it.
    if (document.querySelector('#' + data.id) === null) {
        if(data.tagName === 'a-marker'){
            el = document.createElement('a-entity');
        }else{
            el = document.createElement(data.tagName);
        }
        if(data.tagName === 'a-asset-item'){
            el.setAttribute('src','default');
        }
        el.setAttribute('id', data.id);
        this.get('attributes').once().map().once((data, key) => {
            el.setAttribute(key, data);
        });

        if (data.parent === undefined || data.parent === null || data.parent === '' || data.parent === 'scene') {
            document.querySelector('a-scene').appendChild(el);
        } else {
            let parentEl = document.querySelector('#' + data.parent);
            parentEl.appendChild(el);
        }
    }
};

let displayCurrentUser = function(data, key){
    if(data.alias === undefined) return;
    let el = document.querySelector('#'+'nav-' + data.alias);
    if(el === null) {
        el = document.createElement('i');
        el.setAttribute('id', 'nav-' + data.alias);
        el.classList.add('fas');
        el.setAttribute('data-toggle', 'tooltip')
        el.setAttribute('data-placement','bottom')
        el.setAttribute('title',data.alias);
        this.get(getSpaceID()).once(function(data){
            el.classList.add('fa-' + data.animal);
            el.classList.add('text-' + data.color);
        });
        document.querySelector('#nav-current').appendChild(el);
        jq('#nav-'+data.alias).tooltip();
    }
};

let animalCurrentUser = function(data, key){
    let animal = data;
    if(animal === false) return;
    this.back(2).once(function(data, key){
        if(data.alias === undefined) return;
        let el = document.querySelector('#'+'nav-' + data.alias);
        if(el === null){
            this.once(displayCurrentUser);
        }else{
            el.classList.add('fa-' + animal);
        }
    })
};

let colorCurrentUser = function(data, key){
    let color = data;
    if(color === false) return;
    this.back(2).once(function(data, key){
        if(data.alias === undefined) return;
        let el = document.querySelector('#'+'nav-' + data.alias);
        if(el === null){
            this.once(displayCurrentUser);
        }else{
            el.classList.add('text-' + color);
        }
    });
};
// Initialize space
function testJsonToGun(){
    let obj = {
        id: 'gift2',
        tagName: 'a-box',
        parent: 'scene',
        attributes:{
            position: {x:1, y:2, z:-3},
            rotation: {x:0, y:45, z:45},
            scale: {x:1, y:1, z:1},
            color: 'blue',
            'transform-controls' : { activated: false },
        }
    };

    // <a-box id='gift' position="x:0; y:0; z:0" rotation="x:0; y:45; z:45" scale="x:1; y:1; z:1" color=red" transform-controls={activated: false}>

    G.objects.get( obj.id ).put(obj);
    G.scene.get('children').set( G.objects.get( obj.id ) );
}


let subscribe = function(){

    G.objects.map().on(  function createEntity(data, key){

        let el = checkElement(key);
        this.get('attributes').map().once(function updateAttributes(data, key){
            switch (key) {
                case 'geometry': this.once( updateGeometry );
                    break;
                case 'material': this.once( updateMaterial );
                    break;
                case 'transform-controls': this.once( updateTransformControls );
                    break;
                default: el.setAttribute(key, data);
            }
        });
     });


    G.space.get('title').on( function(data){
        jq('#title').text(data);
    });

    G.space.get('participants').map().get(getSpaceID()).get('now').on(function(data){
        if( data ){ // true
            this.back(2).once(displayCurrentUser);
        } else { // exit
            this.back(2).once(function(data, key){
                if(data.alias === undefined) return;
                let el = document.querySelector('#'+'nav-' + data.alias);
                if(el !== null) {
                    this.get(getSpaceID()).get('now').once(function(data){
                        if(data) return;
                        el.remove();
                    })
                }
            })
        }
    });
    G.space.get('participants').map().get(getSpaceID()).get('animal').on( animalCurrentUser );
    G.space.get('participants').map().get(getSpaceID()).get('color').on( colorCurrentUser );

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

    G.objects.map().get('attributes').get('position').on(function(data, key){
        this.back(2).once( syncPosition )
    });



    G.objects.map().get('attributes').get('geometry').on( updateGeometry );
    G.objects.map().get('attributes').get('material').on( updateMaterial );
    G.objects.map().get('attributes').get('transform-controls').on( updateTransformControls );

    function checkElement( id ){
        let el = document.querySelector('#'+id);
        if( el !== null) return el;
        el = document.createElement('a-entity');
        el.setAttribute('id', id);
        sceneEl.appendChild( el );
        return el;
    }

    async function updateGeometry(data, key){
        let primitive = data.primitive;
        let id = await this.back(2).once().get('id').then();
        let el = await checkElement(id);

        // el.setAttribute(key, 'primitive:' + primitive);
        el.setAttribute(key, {primitive: primitive});
        el.components.geometry.flushToDOM();
        // checkAndAppendElement(el);
    }

    async function updateMaterial(data, key){
        let color = data.color;

        let id = await this.back(2).once().get('id').then();
        let el = await checkElement(id);

        el.setAttribute(key, 'color', color);
        el.components.material.flushToDOM();
        // checkAndAppendElement(el);
    }

    async function updateTransformControls(data, key){
        let id = await this.back(2).once().get('id').then();
        let el = await checkElement(id);
        let activated = data.activated;
        el.setAttribute('transform-controls', 'activated', activated);
        // el.components['transform-controls'].flushToDOM();
        // checkAndAppendElement(el);
    }


};

let I = function(){

    let initPath = function(){
        G.space = S.app.get('spaces').get( getSpaceID() );
        G.scene = G.space.get('scene');
        G.assets = G.space.get('assets');
        G.objects = G.space.get('objects');
    };

    let joinSpace = function(){
        console.log(S.myAlias + ' wanna join here!')

        G.space.get('participants').set( S.myData );
        G.space.get('participants').once().map().once( function(data, key){
            if(key === '~' + S.myPair.pub){
                let animals = ['paw', 'hippo', 'dog', 'spider', 'kiwi-bird',
                    'frog', 'fish', 'dragon', 'dove', 'cat'];
                let colors = ['blue', 'indigo', 'purple', 'pink', 'red',
                    'orange', 'yellow', 'green', 'teal', 'cyan'];
                this.get(getSpaceID()).put({
                    'animal': animals[Math.floor(Math.random() * animals.length)],
                    'color': colors[Math.floor(Math.random() * colors.length)],
                });
                this.get(getSpaceID()).get('now').put(true);
                G.me = this;
            }
        });
    };

    let initCurrentParticipants = function () {
        G.space.get('participants').once().map().get(getSpaceID()).get('now').once(function(data){
            if( data ){ // true
                this.back(2).once(displayCurrentUser);
            } else { // exit
                this.back(2).once(function(data, key){
                    if(data.alias === undefined) return;
                    let el = document.querySelector('#'+'nav-' + data.alias);
                    if(el !== null) {
                        this.get(getSpaceID()).get('now').once(function(data){
                            if(data) return;
                            el.remove();
                        })
                    }
                })
            }
        });
    };

    let initTitle = function(){
        let t = jq('#title');
        G.space.once(function(data, key){
            t.text(data.title);
        })
    };
    let createEnterAR = function(){
        let ui = document.createElement('div')
        ui.classList.add('a-enter-ar');
        let btn = document.createElement('button');
        btn.classList.add('a-enter-ar-button');
        btn.setAttribute('title', 'Enter AR mode with a camera')

        ui.appendChild(btn);
        sceneEl.appendChild(ui);

        btn.addEventListener('click',function(){
            window.location.href = window.location.origin + '/space/ar/' + getSpaceID();
        });
    };

    let initAssets= function(){
        G.assets.map().once( createElInit );
    };

    let initObjects = function(){
        G.scene.get('children').once().map().once( initChildren );
    };

    // recursive
    let initChildren = function(data, key){
        this.once( createElInit );
        if(data.children !== undefined){
            this.get('children').once().map().once( initChildren )
        }
    };

    initPath();
    joinSpace();
    initCurrentParticipants();
    initTitle();
    createEnterAR();
    // initAssets();
    // initObjects();
    subscribe();
};


;(()=>{
    // when user leaves this space, remove the user in participants list

    document.addEventListener('sslogin', I );

    S.spaceoff = new Event('spaceoff');
    window.addEventListener('spaceoff', function(){
        G.me.get(getSpaceID()).get('now').put(false);
        G.me.get(getSpaceID()).get('animal').put(false);
        G.me.get(getSpaceID()).get('color').put(false);

    });
    window.onbeforeunload = function(e){
        window.dispatchEvent(S.spaceoff);
    }
})();

