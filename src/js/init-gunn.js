module.exports = function G(){
    let opt = {};
    opt.store = RindexedDB(opt);
    opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
    opt.peers = ['https://d.wxr.onl/gun'];

    this.gun = Gun(opt);
    let node = 'root/test0910';
    this.app = this.gun.get(node);
    console.log('initiating gun instance is completed.');

    return this;
};
