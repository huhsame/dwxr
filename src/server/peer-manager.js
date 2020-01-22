const UserModel = require('../../models/UserModel');


function PeerManager(){
    let peerManager = function(){};
    peerManager.peers = {};
    peerManager.onConnection = function(peer){

        this.peers[peer.id] = peer;
        this.log(peer.id + ' is connected.');
        this.log(this.peers);
    };

    peerManager.onClose = function( wire){

        // console.log(peer);

        let peerName = null;
        for(let key in this.peers){
            if(key === undefined) return;
            if(this.peers[key].wire === wire){
                peerName = key;
            }
        }
        delete this.peers[peerName];
        this.log(peerName +' is disconnected');
        this.log(this.peers)

    };

    peerManager.log = function(data){
        console.log( '-------- :Peer Manager: --------' );
        console.log( data );
    };
    return peerManager;

}

module.exports  = PeerManager();


