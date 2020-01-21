require('@babel/polyfill');
import I from "initGun";

function G(){
    let g = function(){};
    g.gun = I.gun;

    g.app = ( node ) => {
        return this.gun.get(node);
    };
    g.getTime = () => this.gun.state();

    return g;
}

// window.G = G();
module.exports = G();
