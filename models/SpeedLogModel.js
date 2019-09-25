const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeedLogSchema = new Schema({
    user: String,
    timestamp: Date,
    timestampKR: String,
    userAgent: String,
    isp: {
        ip: String,
        org: String,
        city: String,
        region: String,
        country: String,
        postal: String,
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

module.exports = mongoose.model('speedLog', SpeedLogSchema);
