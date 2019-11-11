const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    timestamp: Date,
    timestampKR: String,
    userAgent: String,
    isp: {
        ip: String,
        loc: {
            lat: Number,
            long: Number
        }
    },
    speed:{
        dl: Number,
        ul: Number,
        ping: Number,
        jitter: Number
    }
});

module.exports = mongoose.model('user', UserSchema);
