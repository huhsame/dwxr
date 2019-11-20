const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PubLogSchema = new Schema({
    dataId: String,
    transmittedAt: String, // 이거 컨트롤러에서 숫자로 바꿔서 저장하자.
    publisher: String,
    // data: {
    //     id: String,
    //     position: {
    //         x: Number,
    //         y: Number,
    //         z: Number
    //     }
    // },
    data: Number,
});

module.exports = mongoose.model('pubLog', PubLogSchema);
