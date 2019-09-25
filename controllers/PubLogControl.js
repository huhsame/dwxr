const PubLogModel = require('../models/PubLogModel');

module.exports = {
    create: (req, res) => {

        let user = req.session.user? req.session.user.name: 'unknown';
        let pubLog = new PubLogModel({
            transmittedAt: req.body.transmittedAt,
            publisher: user,
            data: {
                id: req.body.data.id,
                position: {
                    x: req.body.data.position.x,
                    y: req.body.data.position.y,
                    z: req.body.data.position.z
                }
            },
        });

        pubLog.save()
            .then(result => {
                res.json({ success: true, result: result});
            })
            .catch( err => {
                res.json({ success: false, result: err});
            });

    },

    insertMany: (req, res) => {

        let logs = req.body.logs;

        PubLogModel.insertMany(logs)
            .then(result => {
                res.json({ success: true, result: result});
            })
            .catch( err => {
                res.json({ success: false, result: err});
            });
    }

    // update: (req, res)=>{
    //     UserModel.update({_id: req.body._id}, req.body)
    //         .then(user => {
    //             if(!user) res.json({ success: false, result: "User does not exist"});
    //
    //             res.json(user);
    //         })
    //         .catch( err => {
    //             res.json({ success: false, result: err});
    //         });
    // },
    // retrieve : (req, res) => {
    //     UserModel.find()
    //         .then(result => {
    //             if(!result) res.json({success: false, result: "No results found"})
    //
    //             res.json({success: true, result: result});
    //         })
    //         .catch( err => {
    //             res.json({ success: false, result: err});
    //         });
    // },
    // delete: (req, res) => {
    //     UserModel.remove({_id: req.body._id})
    //         .then(result => {
    //             if(!result) res.json({success: false, result: "No user found with the ID"})
    //
    //             res.json({success: true, result: result});
    //         })
    //         .catch( err => {
    //             res.json({ success: false, result: err});
    //         });
    // }
};
