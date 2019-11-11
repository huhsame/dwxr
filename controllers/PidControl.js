const PidModel = require('../models/PidModel');

module.exports = {
    create: (req, res) => {
        console.log('pid controls');
        // res.json('test');

        let userId = req.session.user? req.session.user.name: 'unknown';
        console.log(userId);
        let peerId = req.body.pid;
        console.log(peerId);
        let pid = new PidModel({
            userId: userId,
            peerId: peerId
        });

        pid.save()
            .then(result => {
                res.json({ success: true, result: result, pid: peerId});
            })
            .catch( err => {
                res.json({ success: false, result: err});
            });



        // res.json('sdfsdf');
    },
};
