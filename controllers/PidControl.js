const PidModel = require('../models/PidModel');

module.exports = {
    create: (req, res) => {
        console.log('pid controls');
        if(! req.session.user){
            res.json({success: false, msg: 'no user in session.'})
            return;
        }
        let user = req.session.user;
        user.pid = req.body.pid;
        // let peerId = req.body.pid;
        // console.log(peerId);
        let pid = new PidModel({
            userId: user.name,
            peerId: user.pid
        });

        pid.save()
            .then(result => {
                res.json({ success: true, result: result, user: user});
            })
            .catch( err => {
                res.json({ success: false, msg: err});
            });



        // res.json('sdfsdf');
    },
};
