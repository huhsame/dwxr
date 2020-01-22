let peerManager = require('./peer-manager'); // manage the peer list at server

function PeerBridge(){
    let peerBridge = function(){};

    // called from gun/wire.js
    peerBridge.emitConnection = function(peer){

        // peer의 id 를 user name 으로 설정한뒤 wire 정보 저장
        if(!peer.id){
            if(global.me === undefined) global.me = {name: 'default'};
            peer.id = peer.id || global.me.name;
        }

        // for the peer list at server
        peerManager.onConnection(peer);

        // for every clients by socket ==> event: onuser [gun.js]
        let data ={};
        data.type = 'user';
        data.pid = peer.id;
        peer.wire.send(JSON.stringify(data));
    }

    peerBridge.emitClose = (pid) =>{

        // eventEmitter.emit('dclose', pid)
        peerManager.onClose(pid);
    }

    return peerBridge;
}

module.exports = PeerBridge();
