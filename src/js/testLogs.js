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
        pubLog.publisher = L.user.name;
        pubLog.uuid = util.generateUUID();
        pubLog.data = data.x;
        // pubLog.data.position = {x: data.x, y: data.y, z: data.z};

        return pubLog;
    },

    getSubLog: function (data) {
        let receivedAt = G.getTime()
        let subLog = {};
        subLog.receivedAt = receivedAt;
        subLog.subscriber = L.user.name;
        subLog.data = data.x;
        // subLog.data.position = {x: data.x, y: data.y, z: data.z};

        return subLog;
    },

    sendLogs: function (array, kind, count){

        let length = array.length;
        let loop = Math.ceil(length / count);

        for (let i = 0; i < loop; i++) {
            let start = i*count;
            let end = start + count;
            let logs = array.slice( start, end);
            // console.log(logs)
            // array.splice(start, count);

            // 그래서 데이터가 자꾸 늘어나느거였나? 이거랑 상관이 있는건가 인덱스드 디비랑? // slice 해도 원본은 변하지 않더군요
            // 성공하고나면 splice 해줘야해

            // 어차피 시간순으로 정렬할거아니야 ?
            // 그래 그럼 그냥 다시 원래 어레이에 붙여버려 ㅋㅋ
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

                    if (kind === 'sub') {
                        L.subLogs = L.subLogs.concat(logs);
                    }
                    else if(kind === 'pub') {
                        L.pubLogs = L.pubLogs.concat(logs)
                    }
                    let total =L.subLogs.length + L.pubLogs.length;
                    console.log(total+' left.');

                }
            });
        }
    },
    uploadLogs: function (){
        console.log('-----------------------------------------');
        let subLogs = L.subLogs.slice();
        L.subLogs.splice(0,subLogs.length);

        let pubLogs = L.pubLogs.slice();
        L.pubLogs.splice(0,pubLogs.length);

        let count = 100;

        // 아 너무 내스타일이다

        let rSubStart = parseInt(subLogs.length / count)*count;
        let rPubStart = parseInt(pubLogs.length / count)*count;
        let rSubCount = subLogs.length % count;
        let rPubCount = pubLogs.length % count;
        let subRemainder = subLogs.slice(rSubStart,rSubStart + rSubCount);
        let pubRemainder = pubLogs.slice(rPubStart,rPubStart + rPubCount);
        subLogs.splice(rSubStart, rSubCount);
        pubLogs.splice(rPubStart, rPubCount);

        L.total = subLogs.length + pubLogs.length + subRemainder.length + pubRemainder.length;
        L.completed = 0;
        console.log('total: ' + L.total);

        this.sendLogs(subLogs, 'sub', count);
        this.sendLogs(subRemainder, 'sub', subRemainder.length);
        this.sendLogs(pubLogs, 'pub', count);
        this.sendLogs(pubRemainder, 'pub', pubRemainder.length);


    }
};
