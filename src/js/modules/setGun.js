require('@babel/polyfill');
let $ = require('jquery');
let jq = $.noConflict();
window.jq = jq;
let Gun = require('gun');

require('gun/nts');
require('gun/sea');
require('gun/lib/webrtc');
require('gun/lib/radix');
require('gun/lib/radisk');
require('gun/lib/store');
require('gun/lib/rindexed');
require('gun/lib/open');
require('gun/lib/unset');


(()=>{
    function G(){};
    window.G = G;

    let opt = {};
    opt.store = RindexedDB(opt);
    opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
    opt.peers = ['https://d.wxr.onl/gun'];
    // opt.peers = ['http://localhost:3000/gun'];
    G.gun = Gun(opt);
    G.node = 'default';

    G.getTime = () => Gun.state();

    G.peers = ()=> G.gun.back('opt.peers');
    G.setSpace = ( ) => {
        G.space = G.gun.get( G.node );
        G.scene = G.space.get('scene');
        G.assets = G.space.get('assets');
        G.objects = G.space.get('objects');
        G.mo = G.space.get('movingObject');
        G.fire = G.space.get('fire');

        console.log('set space completed');
        let onSetGunNode = new Event('onSetGunNode');
        document.dispatchEvent( onSetGunNode );
    };

})();

