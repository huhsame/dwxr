// src/js/main.js
import "@babel/polyfill";
import path from 'path'; // ㅋ...
// import * as path from 'path';
// const path = require('path');
import $ from 'jquery';
let jq = $.noConflict();
window.jq = jq;


// import 'debugout.js';

import Gun from 'gun';
import 'gun/nts';
import 'gun/sea';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/lib/open';
import 'gun/lib/unset';


import 'bootstrap';



;(() => {
    function S(){};
    window.S = S;
    try{localStorage.clear(); // sessionStorage.clear();
    }catch(e){}

    // create gun instance and make it global
    let opt = {};
    opt.store = RindexedDB(opt);
    opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
    opt.peers = ['https://d.wxr.onl/gun'];
    // opt.peers = ['http://localhost:3000/gun'];
    S.gun = Gun(opt);

    S.app = S.gun.get('root/test03');
    S.user = S.gun.user();

    // for session login
    S.sslogin = new Event('sslogin');
    S.user.recall({sessionStorage: true},()=>{
        console.log(S.user.is.alias +' is here!');
        document.dispatchEvent(S.sslogin);
    });
    document.addEventListener('sslogin', function(){
        S.myAlias = S.user.is.alias;
        S.publicMyself = S.gun.user(S.user.is.pub);
        S.gun.user(S.user.is.pub).once(function (data) {
            S.myData = data;
        });
        S.myPair =  S.user._.sea;

        let navUser = jq('#nav-user');
        navUser.html(
            '<div class="dropdown">' +
            '        <a class="dropdown-toggle" href="#" rid="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '        </a>' +
            '        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
            '            <a class="dropdown-item" href="#">My spaces</a>' +
            '            <a class="dropdown-item" href="#">Setting</a>' +
            '            <div class="dropdown-divider"></div>' +
            '            <div id="out" class="dropdown-item" >Sign out</div>' +
            '        </div>' +
            '    </div>'
        );
        navUser.find('.dropdown-toggle').text( S.myAlias );
        navUser.find('#out').on('click',function(){
            let alias = S.myAlias;
            if(S.spaceoff){
                window.dispatchEvent(S.spaceoff);
            }
            S.user.leave();
            location.reload();
        });
    });

    /* global functions */
    // modal message
    S.tell = (what, n) => {
        let e = jq('#tell');
        jq('#tell').find('.modal-body').text( what );
        e.modal('show');
        clearTimeout(S.tell.to);
        S.tell.to = setTimeout(() => { e.modal('hide') }, n || 2500);
        return what;
    };

    S.generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 3 | 8);
            return v.toString(16);
        });
    };

    S.pubLogs = [];
    S.subLogs = [];
    S.subLogsUpload = () => {
        // TODO: 100개씩 쪼개서 여러번 보내보자
        let length = S.subLogs.length;
        let count = 100
        let loop = parseInt(length / count);
        for (let i = 0; i < loop; i++) {

            let logs = S.subLogs.splice(i, count);
            jq.ajax({
                url: location.origin + '/api/subLog/insertMany',
                type: 'POST',
                data: {logs: logs},
                success: function (data) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("post failed - " + textStatus + ": " + errorThrown);
                }
            });
        }
    }

    S.pubLogsUpload = () => {
        // TODO: 100개씩 쪼개서 여러번 보내보자
        let length = S.pubLogs.length;
        let count = 100;

        let loop = parseInt(length / count);
        for (let i = 0 ; i < loop; i++){
            let logs = S.subLogs.splice(i, count);
            jq.ajax({
                url: location.origin + '/api/pubLog/insertMany',
                type:'POST',
                data: {logs: logs},
                success: function(data){
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log("post failed - " + textStatus + ": " + errorThrown);
                }
            });
        }
    }

})();
