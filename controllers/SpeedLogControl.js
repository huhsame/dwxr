const SpeedLogModel = require('../models/SpeedLogModel');


module.exports = {
    create: (req, res) => {

        let time = new Date();
        let timeKR = moment.tz(time, "Asia/Seoul").format();
        let name
        if(req.session.user){
            name = req.session.user.name;
        }else{
            name = 'unknown';
        }
        let isp = req.body.isp;
        let loc = isp.loc.split(',');
        isp.loc = {};
        isp.loc.lat = parseFloat(loc[0]);
        isp.loc.long = parseFloat(loc[1]);

        let speedLog = new SpeedLogModel({
            user: name,
            timestamp: time,
            timestampKR: timeKR,
            userAgent: req.header('user-agent'),
            isp: req.body.isp,
            speed: {
                dl: parseFloat(req.body.speed.dl),
                ul: parseFloat(req.body.speed.ul),
                ping: parseFloat(req.body.speed.ping),
                jitter: parseFloat(req.body.speed.jitter),
            }
        });

        speedLog.save()
            .then(result => {
                res.json({ success: true, result: result});
            })
            .catch( err => {
                res.json({ success: false, result: err});
            });
    },
};
