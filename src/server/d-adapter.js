// node_modules/gun 에 있는 wire에서 함수 호출

let peerManager = require('./peer-manager');
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// eventEmitter.on('dconnection', function () {
//     console.log('dconnection');
//
// });

function DAdapter(){
    let dAdapter = function(){};

    // 이벤트로 에밋안하고 그냥 호출하는거면..
    dAdapter.emitConnection = function(peer){

        peerManager.onConnection(peer.id);
        // send data through socket
        let data ={};
        data.type = 'user';
        data.pid = peer.id;

        peer.send(JSON.stringify(data));
    }

    dAdapter.emitClose = (pid) =>{

        // eventEmitter.emit('dclose', pid)
        peerManager.onClose(pid);
    }



    return dAdapter;
}

module.exports = DAdapter();
