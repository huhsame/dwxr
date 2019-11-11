// server
// 피어 리스트 관리
// 피어아이디를 기준으로 관리하는 이유는 현재 페이지에 접속중인 사용자를 판단하기 위해서.
// 피어 아이디 리스트가 있고
// 그 피어 아이디를 가지고 pid 디비에서 쿼리해서 유저 아이디 받아올것
// 그러면 컨트롤러에서 해야하는 건가 ?
// 그러게 ? 흠.. 그렇겠네

const UserModel = require('../../models/UserModel');


function PeerManager(){
    let peerManager = function(){};
    peerManager.peers = [];
    peerManager.onConnection = function(pid){
        this.peers.push(pid);
        this.log(this.peers);
    };

    peerManager.onClose = function(pid){
        let index = peers.indexOf(pid);
        if(index === -1) return;
        this.peers.splice(index, 1);
        this.log(this.peers)
        this.log(pid + ' is disconnected.');
    };

    peerManager.log = function(data){
        console.log(':Peer Manager: ' + JSON.stringify(data))
    };
    return peerManager;

}

module.exports  = PeerManager();


