const UserModel = require('../../models/UserModel');

// 서버에서 찍어야하는데 흠..
function PeerManager(){
    let peerManager = function(){};
    peerManager.peers = {};

    peerManager.add = function(peer){

        this.peers[peer.id] = peer;
        this.log(peer.id + ' is connected.');
        this.log(this.peers, 'PEER LIST'); // 키 리스트만 뽀ㅃ아내려면 어떻게 할지 검쇼ㅐㄱ해서 넣기
         };

    peerManager.delete = function( wire){

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
    };

    peerManager.log = function(data, msg){
        let label = '-------- :Peer Manager: ';
        if(msg !==null || msg !== undefined) label = label + msg;

        console.log( label );
        console.log( data );
    };

    peerManager.gunPeers = function(){
        peerManager.gunpeers = global.gun.back('opt.peers');
        this.log( Object.keys(this.gunpeers), 'gun peer list' );
    }

    return peerManager;

}

module.exports  = PeerManager();


