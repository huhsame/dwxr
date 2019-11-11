const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PidSchema = new Schema({
    userId: String,
    peerId: String
});

module.exports = mongoose.model('pid', PidSchema);
