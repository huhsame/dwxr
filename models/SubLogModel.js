const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubLogSchema = new Schema({
    receivedAt: String,
    subscriber: String,
    publisher: String,
    data: {
        id: String, // publisher
        position: {
            x: Number,
            y: Number,
            z: Number
        }
    },
});

module.exports = mongoose.model('subLog', SubLogSchema);
