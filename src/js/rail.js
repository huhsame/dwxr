
function Rail(){
    let rail = function(){};

    rail.colors = ['#FFBAE4',
        '#FFCED0',
        '#FFFECB',
        '#C9FFD9',
        '#CEE3FF',
        '#D4CDFF']; // https://www.schemecolor.com/feminine-rainbow.php

    rail.selectedColors =['#FD5051',
        '#FFA959',
        '#FFF661',
        '#61EF94',
        '#6FBEFB',
        '#9063E9']; // https://www.schemecolor.com/different-rainbow.php

    rail.total = 20;
    const origin =  { x: 0, y: 0, z: 0};
    rail.width = 15;
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

    rail.getColor = function(order){
        return this.colors[ Math.ceil(order/2) % this.colors.length ];
    };
    rail.getSelectedColor = function(order){
        return this.selectedColors[ Math.ceil(order/2) % this.selectedColors.length ];
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
        // attributes.color = 'grey'; // todo: 이거 지우고 밑에 포문에서 i 별로 색상값 매칭;
        attributes.width = this.width;
        attributes.height = interval - space;
        attributes.rotation = {x: -90, y:0, z:0};

        for(let order = 0; order < number; order++){
            let railEl = document.createElement('a-plane');
            railEl = this.setAttributes(railEl, attributes);
            railEl.setAttribute('id', 'rail-'+order);
            railEl.setAttribute('position', this.getRailPosition(order));
            railEl.setAttribute('color', this.getColor(order));

            sceneEl.appendChild(railEl);
        }

        let event_onrails = new Event('onrails');
        document.dispatchEvent(event_onrails);

    }


    return rail;
}

module.exports = Rail();
