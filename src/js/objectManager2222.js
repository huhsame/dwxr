// import testLog from "./testLogs";
let Rail = require("./rail");


function ObjectManager(){
    let objectManager = function(){};

    // objectManager.getRateByTime = function (){
    //     let time = 2;
    //     return (G.getTime() % (1000 * time)) / (1000* time);
    // }
    // objectManager.getValueByTime= function(){
    //     return (Rail.width * this.getRateByTime()) - (Rail.width/2);
    // }
    //
    // objectManager.putLocation = function(){
    //     let obj = G.objects.get( L.user.name );
    //     let position = Rail.getRailPosition(L.user.order);
    //     position[axis] = this.getValueByTime();
    //     obj.get('attributes').get('position').get(axis).put(position[axis]);
    //
    //     let pubLog = testLog.getPubLog( poition );
    //     L.pubLogs.push(pubLog);
    // }
    //
    // objectManager.locateByTime= function(){
    //     console.log('start')
    //     setInterval(this.putLocation, Math.ceil(1000 / 30));
    // }
    //
    objectManager.putObject = function( object){
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
    };


    objectManager.createMyObject = function ( i ){
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
        let position = Rail.getRailPosition(i);
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



        this.putObject(myObject);


        // if(L.user.auto === true){
        // this.locateByTime();
        // }

    };


    objectManager.test = function(){
        console.log('test')
    }
    return objectManager;

}

module.exports  = ObjectManager();


