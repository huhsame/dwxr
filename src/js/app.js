// src/js/main.js
import "@babel/polyfill";
import 'bootstrap';
import '../scss/app.scss';

import Gun from 'gun';
import 'gun/sea';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed'

    ;(() => {
    function S(){};
    window.S = S;
    try{localStorage.clear();//sessionStorage.clear();
    }catch(e){}

    var opt = {};
    opt.store = RindexedDB(opt);
    opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
    opt.peers = ['http://192.168.1.111:3000/gun'];
    S.gun = Gun(opt);

    S.app = S.gun.get('root/test');
    S.user = S.gun.user();

    // this.S = S;
})();



S.gun.get('root').once(console.log);
// gun.get('root').get('where').put('here');

