let peerManager = require('./peer-manager'); // manage the peer list at server

function PeerBridge(){
    let peerBridge = function(){};

    // called from gun/wire.js
    peerBridge.emitConnection = function(peer){

        // for the peer list at server
        peerManager.onConnection(peer.id);

        // for every clients by socket ==> event: onuser [gun.js]
        let data ={};
        data.type = 'user';
        data.pid = peer.id;
        peer.send(JSON.stringify(data));
    }

    peerBridge.emitClose = (pid) =>{

        // eventEmitter.emit('dclose', pid)
        peerManager.onClose(pid);
    }

    return peerBridge;
}

module.exports = PeerBridge();
