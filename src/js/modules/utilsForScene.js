// 음 조금 귀찮은데

function UtilsForScene(){
    let us = function(){};

    us.sceneEl = null;
    us.setSceneEl = ()=>{
        us.sceneEl = document.querySelector('a-scene');
        console.log(us.sceneEl);
    };
    us.append = function(el){
        if(el === null){
            console.log('[us.append] el is null')
            return;
        }
        us.sceneEl.appendChild(el);
    }


    return us;
}

module.exports = UtilsForScene();

