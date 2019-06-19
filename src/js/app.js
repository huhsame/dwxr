// src/js/main.js
import "@babel/polyfill";
import path from 'path'; // ㅋ...
// import * as path from 'path';
// const path = require('path');
import $ from 'jquery';
let jq = $.noConflict();
window.jq = jq;

import Gun from 'gun';
import 'gun/sea';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/lib/open';


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
    // opt.peers = ['https://d.wxr.onl/gun'];
    opt.peers = ['http://localhost:3000/gun'];
    S.gun = Gun(opt);

    S.app = S.gun.get('root/test03');
    S.user = S.gun.user();

    // for session login
    let sslogin = new Event('sslogin');
    S.user.recall({sessionStorage: true},()=>{
        console.log(S.user.is.alias +' is here!');
        document.dispatchEvent(sslogin);
    });
    document.addEventListener('sslogin', function(){
        let alias = S.getMyName();
        let navUser = jq('#nav-user');
        navUser.html(
            '<div class="dropdown">' +
            '        <a class="dropdown-toggle" href="#" rid="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '        </a>' +
            '        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
            '            <a class="dropdown-item" href="#">My spaces</a>' +
            '            <a class="dropdown-item" href="#">Setting</a>' +
            '            <div class="dropdown-divider"></div>' +
            '            <a class="dropdown-item" href="#">Sign out</a>' +
            '        </div>' +
            '    </div>'
        );
        navUser.find('.dropdown-toggle').text( alias );
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

    S.getMyName = () => {
        return S.user.is.alias;
    }
})();



