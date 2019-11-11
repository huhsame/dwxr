
function Rail(){
    let rail = function(){};

    rail.total = 20;
    const origin =  { x: 0, y: 0, z: 0};
    rail.width = 10;
    rail.axis = 'x';

    rail.setAttributes = function ( el, attributes ){
        for( let key in attributes){
            el.setAttribute( key, attributes[key])
        }
        return el;
    }
    rail.getLine = function (i){
        return Math.ceil(i/2)
    }
    rail.directionZ = function (i){
        return i%2 ? -1 : 1 ; // odd : -
    }
    rail.getRailPosition = function (i) {
        // 0 1 2 3 4
        // 0 1 1 2 2
        let position ={};
        position.x = origin.x;
        position.y = origin.y;

        position.z = origin.z + parseInt(this.getLine(i) * this.directionZ(i));

        return position;
    };

    rail.createRails = function( number ){
        if(!number){
            number = rail.total;
        }
        let sceneEl = document.querySelector('a-scene');

        // let number = 5;
        let interval = 1;
        let space = 0.1;

        let attributes = {};
        attributes.color = 'grey';
        attributes.width = this.width;
        attributes.height = interval - space;
        attributes.rotation = {x: -90, y:0, z:0};

        for(let i = 0; i < number; i++){
            let railEl = document.createElement('a-plane');
            railEl = this.setAttributes(railEl, attributes);
            railEl.setAttribute('id', 'rail-'+i);
            railEl.setAttribute('position', this.getRailPosition(i));
            sceneEl.appendChild(railEl);
        }
    }


    return rail;
}

module.exports = Rail();
