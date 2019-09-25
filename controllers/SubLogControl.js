const SubLogModel = require('../models/SubLogModel');

module.exports = {
    create: (req, res) => {
        let user = req.session.user? req.session.user.name: 'unknown';

        let subLog = new SubLogModel({
            receivedAt: req.body.receivedAt,
            subscriber: user,
            data: {
                id: req.body.data.id,
                position: {
                    x: req.body.data.position.x,
                    y: req.body.data.position.y,
                    z: req.body.data.position.z
                }
            },
        });

        subLog.save()
            .then(result => {
                res.json({ success: true, result: result});
            })
            .catch( err => {
                res.json({ success: false, result: err});
            });

    },

    insertMany: (req, res) => {

        let logs = req.body.logs;

        SubLogModel.insertMany(logs)
            .then(result => {
                res.json({success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            });
    }
};
