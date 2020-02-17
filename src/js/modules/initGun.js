
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

// initialized gunDB and return gun instance

let opt = {};
opt.store = RindexedDB(opt);
opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
opt.peers = ['https://d.wxr.onl/gun'];
// opt.peers = ['http://localhost:3000/gun'];

let gun = Gun(opt);

function I(){
    let i = function(){};


    i.gun = gun;

    return i;
}

module.exports = I();
