// require('@babel/polyfill');
const Util = require('./utils');
const US = require('./utilsForScene');
const Events = require('./customEvents');
// import G from './setGun';

function ColorBall(){
    let cb = function(){};

    cb.offset = 1.7 // for camera

    cb.total = 60;
    cb.interval = 360 / cb.total;


    cb.R = 2;
    cb.r = cb.R*Math.PI / cb.total;

    cb.br = cb.r * 0.9;

    cb.ph = 0.005; // plate height
    cb.pc = 'white'; // plate color
    cb.pr = cb.r  // plate radius;
    cb.py = 0 // plate y;

    cb.ballCount= 0;

    cb.th = 1; // table height
    cb.twd = cb.pr * 2 // table width and depth
    cb.tc = 'grey'; // table color
    cb.tid = 'table'; // table id;





    cb.setTotalAndInterval = ( input ) => {
        let degree = 360 % input;
        cb.interval = Math.round(360 / degree);
        cb.total = 360 / cb.interval;
        console.log('[colorBall] total: '+cb.total+', interval: '+cb.interval);

    };

    cb.getColor = function(degree){
        return 'hsl('+degree+', 100%, 80%)';
    };
    cb.getRPosition = function( degree ){
        let radian = (degree/180) * Math.PI;

        let position = {};
        position.x = cb.R*Math.cos(radian);
        // position.y = cb.offset;
        position.y = 0;
        position.z = cb.R*Math.sin(radian);


        return position;

        // 이렇게 하면 뭐 타입이 안맞는대 ;
        // return {x: cb.r*Math.cos(radian), y: cb.r*Math.sin(radian), z: 0 }
    }
    cb.getPlatePosition = function(degree){
        let position = cb.getRPosition(degree);
        position.y = cb.py;
        return position;
    }

    cb.getBallPosition = function(degree){
        let position = cb.getRPosition(degree);
        position.y = cb.py + cb.r;
        return position;
    }


    cb.checkPlates = function(){
        for(let i =0; i< cb.total; i++){
            cb.checkPlate(i);
        }
    };
    cb.checkPlate = function(index){

        let degree = index * cb.interval;
        let el = document.querySelector('#plate-'+index);
        el.setAttribute('color', cb.getColor( degree ));
    }

    cb.checkBalls = function(){

        // 혹시 볼이 있나 검사 하고 없으면 전체다 만들기
        let el = document.querySelector('#ball-1');
        if(el === null){
            console.log('balls are null');
            return;
        }

        for(let i =0; i< cb.total; i++){
            cb.checkBall(i);
        }
    };
    cb.checkBall = function(index){

        // 이미 공이 가졍되어있다고 가정.
        let degree = index * cb.interval;

        let el = document.querySelector('#ball-'+index);
        if(el === null){
            console.log( 'ball is null');
            return;
        }

        el.setAttribute('position', cb.getBallPosition( degree ));
    }



    cb.createBalls = function(){
        let ballsEl = document.querySelector('#balls');
        for(let i =0; i< cb.total; i++){
            ballsEl.appendChild( cb.createBall(i) );
        }
    };


    cb.createBall = function(index){

        let degree = index * cb.interval;
        let el = document.createElement('a-sphere');
        el.addEventListener('loaded', cb.countBall );
        el.setAttribute('id', 'ball-'+index );
        el.setAttribute('color', cb.getColor( degree ));
        el.setAttribute('radius', cb.br);

        return el;
    }

    cb.countBall = function(){

        cb.ballCount++;
        if(cb.ballCount === cb.total){
            console.log(cb.ballCount);
            Events.dispatchBallsLoaded();
        }
    };

    cb.createPlates = function(){
        let platesEl = document.querySelector('#plates');
        for(let i =0; i< cb.total; i++){
            platesEl.appendChild( createPlate(i) );

        }
    };
    function createPlate(index){

        let degree = index * cb.interval;
        let el = document.createElement('a-cylinder');
        el.setAttribute('id',  'plate-'+index );
        el.setAttribute('radius', cb.pr);
        el.setAttribute('height', cb.ph);
        el.setAttribute('color', cb.pc);


        // no...  처음에 가운데에 있어야하고. 상자안에 담겨있었으면 좋겠는데
        // 하나씩 꺼내는거야
        // 멏개를 좀 기준점을 만들어주고. ㅇㅇㅇㅇ
        // 시간을 정해주고 그때 점수를 정해

        el.setAttribute('position', cb.getPlatePosition( degree ));
        return el;
    }

    cb.getTable = function () {
        let el = document.querySelector('#'+cb.tid);
        if(el === null) {
            el = cb.createTable();
        }
        return el;
    }

    cb.createTable = function(){
        let el = document.createElement('a-box');

        el.setAttribute('color', cb.tc);
        el.setAttribute('position', cb.getTablePosition());
        el.setAttribute('width',cb.twd);
        el.setAttribute('depth', cb.twd);
        el.setAttribute('height', cb.th);

        US.append( el );

        return el;
    };

    cb.getTablePosition = function (){
        let position = {};
        position.x=0;
        position.y= cb.th/2;
        position.z=0;

        return position;
    };










    return cb;
}


module.exports =  ColorBall();
