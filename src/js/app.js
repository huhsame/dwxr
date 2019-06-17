// src/js/main.js
import "@babel/polyfill";
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

    var opt = {};
    opt.store = RindexedDB(opt);
    opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
    opt.peers = ['https://d.wxr.onl/gun'];
    // opt.peers = ['http://localhost:3000/gun'];
    S.gun = Gun(opt);

    S.app = S.gun.get('root/test03');
    S.user = S.gun.user();
    S.user.recall({sessionStorage: true});

    S.tell = (what, n) => {
        let e = jq('#tell');
        jq('#tell').find('.modal-body').text( what );
        // console.log(jq('#tell').find('.modal-body'));
        e.modal('show');
        clearTimeout(S.tell.to);
        S.tell.to = setTimeout(() => { e.modal('hide') }, n || 2500);
        return what;
    }

    S.generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 3 | 8);
            return v.toString(16);
        });
    }
})();

