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

import 'bootstrap';

    ;(() => {
    function S(){};
    window.S = S;
    try{localStorage.clear(); // sessionStorage.clear();
    }catch(e){}

    var opt = {};
    opt.store = RindexedDB(opt);
    opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
    opt.peers = ['http://localhost:3000/gun'];
    S.gun = Gun(opt);

    S.app = S.gun.get('root/test');
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

    // S.tell = (what, n) => {
    //     let e = jq('#exampleModal');
    //     e.modal('show').text(what);
    //     clearTimeout(S.tell.to);
    //     S.tell.to = setTimeout(() => { e.modal('hide') }, n || 1000);
    //     return what;
    // }

    // this.S = S;
})();



// S.gun.get('root').once(console.log);
// gun.get('root').get('where').put('here');

