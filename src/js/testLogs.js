const util = require('./utils');
function L(){};
window.L = L;

L.pubLogs = [];
L.subLogs = [];

window.addEventListener('getuser', function(){
    L.getName = L.user.name;
});

// G를 건디비를 쓰는 애들로 해놓은건데.. ㅋㅋㅋ
// L 은 프로그램 상에서 다 쓰는 전역변수로 하자.


module.exports = {
    getPubLog: function (data) {
        let transmittedAt = G.getTime();
        let pubLog = {};
        pubLog.transmittedAt = transmittedAt;
        pubLog.publisher = L.getName;
        pubLog.uuid = util.generateUUID();
        pubLog.data = {};
        pubLog.data.id = L.getName;
        pubLog.data.position = {x: data.x, y: data.y, z: data.z};

        return pubLog;
    },

    getSubLog: function (data) {
        let receivedAt = G.getTime()
        let subLog = {};
        subLog.receivedAt = receivedAt;
        subLog.subscriber = L.getName;
        subLog.data = {};
        subLog.data.position = {x: data.x, y: data.y, z: data.z};

        return subLog;
    },

    sendLogs: function (array, kind, count){

        let length = array.length;
        let loop = Math.ceil(length / count);

        for (let i = 0; i < loop; i++) {
            let start = i*count;
            let end = start + count;
            let logs = array.slice( start, end);
            jq.ajax({
                url: location.origin + '/api/'+kind+'Log/insertMany',
                type: 'POST',
                data: {logs: logs},
                success: function (data) {

                    L.completed += count;
                    let rate = parseInt((L.completed / L.total) * 100);
                    document.querySelector('.complete-task').innerHTML =
                        `<H2>`+rate+`%  </H2>`
                    // if(i === loop-1) {
                    //     location.href = location.href.replace('space', 'survey')
                    // }
                    if(rate === 100){
                        document.querySelector('.complete-task').innerHTML =
                            `<H2> logging ...  </H2>`
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("POST Failed: " + textStatus + ": " + errorThrown);
                }
            });
        }
    },
    uploadLogs: function (){
        let subLogs = L.subLogs.slice();
        L.subLogs = [];
        let pubLogs = L.pubLogs.slice();
        L.pubLogs = [];

        let count = 100;

        subLogs.splice(parseInt(subLogs.length / count)*count ,subLogs.length % count);
        pubLogs.splice(parseInt(pubLogs.length / count)*count ,pubLogs.length % count);
        L.total = subLogs.length + pubLogs.length;
        L.completed = 0;

        this.sendLogs(subLogs, 'sub', count);
        this.sendLogs(pubLogs, 'pub', count);

    }
};
