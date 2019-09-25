function L(){};
window.L = L;

L.pubLogs = [];
L.subLogs = [];

window.addEventListener('getuser', function(){
    L.getName = function(){
        return L.user.name;
    }
});

// G를 건디비를 쓰는 애들로 해놓은건데.. ㅋㅋㅋ
// L 은 프로그램 상에서 다 쓰는 전역변수로 하자.


module.exports = {
    getSubLog: function( data ){
        let receivedAt = Date.now(); // 시간서버 교체해야해
        let subLog ={};
        subLog.receivedAt = receivedAt;
        subLog.subscriber = L.getName;
        subLog.data ={};
        subLog.data.position = {x: data.x, y: data.y, z: data.z};

        return subLog;
    },

    logsUpload: function (array, kind){

        let length = array.length;
        let count = 100;
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
                    if(i === loop-1) {
                        location.href = location.href.replace('space', 'survey')
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("POST Failed: " + textStatus + ": " + errorThrown);
                }
            });
        }
    }
};
