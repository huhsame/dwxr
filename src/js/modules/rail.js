
function Rail(){
    let rail = function(){};

    rail.colors = ['#FFBAE4',
        '#FFCED0',
        '#FFFECB',
        '#C9FFD9',
        '#CEE3FF',
        '#D4CDFF']; // https://www.schemecolor.com/feminine-rainbow.php

    // not used now
    rail.selectedColors =['#FD5051',
        '#FFA959',
        '#FFF661',
        '#61EF94',
        '#6FBEFB',
        '#9063E9']; // https://www.schemecolor.com/different-rainbow.php

    rail.total = 20;
    rail.count = 0;
    const origin =  { x: 0, y: 0, z: 0};
    rail.width = 15;
    rail.axis = 'x';

    rail.interval = 1; // 레일 + 테두리 위아래
    rail.space = 0.1; // 테두리 두
    // interval - space = rail.width

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

    rail.createAll = function( number ){
        if(!number){
            number = rail.total; // default;
        }
        let sceneEl = document.querySelector('a-scene');

        // let number = 5;


        let attributes = {};
        // attributes.color = 'grey'; // todo: 이거 지우고 밑에 포문에서 i 별로 색상값 매칭;
        attributes.width = this.width;
        attributes.height = this.interval - this.space;
        attributes.rotation = {x: -90, y:0, z:0};

        for(let order = 0; order < number; order++){
            let railEl = document.createElement('a-plane');
            railEl = this.setAttributes(railEl, attributes);
            railEl.setAttribute('id', 'rail-'+order);
            railEl.setAttribute('position', this.getRailPosition(order));
            railEl.setAttribute('color', this.getColor(order));

            sceneEl.appendChild(railEl);
            railEl.addEventListener('loaded', this.countLoaded );

        }
    };

    rail.countLoaded = function(){
        this.count ++;
        if(this.count === this.total){
            let railsLoaded = new Event( 'railsLoaded' );
            sceneEl.dispatchEvent( railsLoaded );
        }
    };

    rail.updateSelectedRail = function( order ){

        // let myRailEl = document.querySelector('#rail-' + order);
        let position = this.getRailPosition(order);
        // let selectedPosition = position.x+" "+position.y - 5 +" "+position.z; //string

        let selectedRailEl = document.createElement('a-plane');

        let attributes = {};
        attributes.id = 'rail-'+order+'-selected';
        attributes.width = this.width + this.space;
        attributes.height = this.interval;
        attributes.rotation = {x: -90, y:0, z:0};
        attributes.position = {x: position.x, y: position.y - 1, z: position.z};
        attributes.color = 'black';

        selectedRailEl = this.setAttributes(selectedRailEl, attributes);



        // selectedRailEl.setAttribute('id', 'rail-'+order+'-selected');
        // selectedRailEl.setAttribute('position', selectedPosition);
        // selectedRailEl.setAttribute('height', this.interval);
        // selectedRailEl.setAttribute('width', this.width + this.space);
        // selectedRailEl.setAttribute('color', 'black');

        let sceneEl = document.querySelector('a-scene');
        sceneEl.appendChild( selectedRailEl );


    }


    return rail;
}

module.exports = Rail();
