const Util = require('./utils');

function DL(){
    let dl = function(){};

    dl.pls = []; // pub logs
    dl.sls = []; // sub logs

    dl.amountAtOnce = 100;

    dl.addPubLog = function ( data ){
        let transmittedAt = G.getTime();
        let pl = {};
        pl.transmittedAt = transmittedAt;
        pl.publisher = data.name;
        pl.dataId = data.dataId;
        pl.data = data.position.x;

        this.pls.push( pl );
    }

    dl.addSubLog = function ( data ){
        let receivedAt = G.getTime();
        let sl = {};
        sl.receivedAt = receivedAt;
        sl.sublisher = data.name;
        sl.dataId = data.dataId;
        sl.data = data.position.x;

        this.sls.push( sl );
    }

    // 시간순으로도 돌려야하고
    // 그때 100개 씩도 잘라서 보내야해
    dl.uploadPubLogs = function(  ){

        let plsAtOnce = [];

        if(dl.pls.length === 0) return;
        let plsByTime = dl.pls.slice(); // 현재까지의 pls 복사해옴
        dl.pls.splice(0, plsByTime.length); // pls 에서 지금 받아온거 삭제.

        // 조금 씩 잘라서 서버에 전달하고 디비에 저
        let loop = Math.ceil(length / dl.amountAtOnce);
        for (let i=0; i< loop; i++){
            let start = dl.amountAtOnce * i;
            plsAtOnce = plsByTime.slice( start, start + dl.amountAtOnce );
        }

        jq.ajax({
            url: location.origin + '/api/pubLog/insertMany',
            type: 'POST',
            data: {logs: plsAtOnce},
            success: function (data) {
                // console.log( plsAtOnce.length +' publogs are stored.');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('[uploadPubLogs] ' + errorThrown);
            }
        });
    };

    dl.uploadSubLogs = function(  ){

        let slsAtOnce = [];
        if(dl.sls.length === 0) return;
        let slsByTime = dl.sls.slice(); // 현재까지의 pls 복사해옴
        dl.sls.splice(0, slsByTime.length); // pls 에서 지금 받아온거 삭제.

        // 조금 씩 잘라서 서버에 전달하고 디비에 저
        let loop = Math.ceil(length / dl.amountAtOnce);
        for (let i=0; i< loop; i++){
            let start = dl.amountAtOnce * i;
            slsAtOnce = slsByTime.slice( start, start + dl.amountAtOnce );
        }

        jq.ajax({
            url: location.origin + '/api/subLog/insertMany',
            type: 'POST',
            data: {logs: slsAtOnce},
            success: function (data) {
                // console.log( slsAtOnce.length +' sublogs are stored.');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('[uploadSubLogs] ' + errorThrown);
            }
        });
    };


    dl.setAttributes = function ( el, attributes ) {
        for (let key in attributes) {
            el.setAttribute(key, attributes[key])
        }
        return el;
    }

    return dl;
}

module.exports = DL();

