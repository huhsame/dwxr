// 음 조금 귀찮은데
const US = require('./utilsForScene');
const CB = require('./colorBall');


function CustomEvents(){
    let ce = function(){};

    ce.railsLoaded = 'railsLoaded';
    ce.platesLoaded = 'platesLoaded';
    ce.ballsLoaded = 'ballsLoaded';

    // rails
    let railsLoadedEvent = new Event( ce.railsLoaded );
    ce.dispatchRailsLoaded = () => {
        US.sceneEl.dispatchEvent( railsLoadedEvent );
    };

    // plates
    let platesLoadedEvent = new Event( ce.platesLoaded );
    ce.dispatchPlatesLoaded = function(){
        US.sceneEl.dispatchEvent( platesLoadedEvent );
    };


    // balls
    let ballsLoadedEvent = new Event( ce.ballsLoaded );
    ce.dispatchBallsLoaded = function(){
        console.log('dispatch balls');
        US.sceneEl.dispatchEvent( ballsLoadedEvent );
    };


    return ce;
}

module.exports = CustomEvents();

