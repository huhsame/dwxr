let loadscene = new Event('loadscene'); //
let loaduser = new Event('loaduser'); //
let loadmyobject = new Event('loadmyobject'); // in render-space



module.exports = {
    dispatchLoadscene: window.dispatchEvent(loadscene),
    dispatchLoaduser: window.dispatchEvent(loaduser),
    dispatchLoadMyobject: window.dispatchEvent(loadmyobject),
};

