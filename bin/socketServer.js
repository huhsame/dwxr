
let debug = require('debug')('dwxr:server');
let Server = require('http').Server;
let string = require('../strings');
let util = require('util');
let manager = require('../src/js/manager');

let io = require('socket.io');

function open (server) {

    if (!server) { // https is not instance of http, so be more relaxed in our check.
        server = new Server();
    }
    //
    /** Handle /panic.js route. */
    // server.on('request', serve);

    /** Upgrade with socket.io */
    io(server).on('connection', upgrade);

    return server;
}

module.exports = open;
