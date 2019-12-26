const SpeedLogModel = require('../models/SurveyModel');


module.exports = {
    create: (req, res) => {

        console.log(req.body);
        let data = req.body;
        res.send(JSON.stringify(data));
        // TODO 결과페이지나 끝났다는 페이지로 리다이렉트

        // let time = new Date();
        // let timeKR = moment.tz(time, "Asia/Seoul").format();
        // let name
        // if(req.session.user){
        //     name = req.session.user.name;
        // }else{
        //     name = 'unknown';
        // }
        // let isp = req.body.isp;
        // let loc = isp.loc.split(',');
        // isp.loc = {};
        // isp.loc.lat = parseFloat(loc[0]);
        // isp.loc.long = parseFloat(loc[1]);
        //
        // let survey = new SpeedLogModel({
        //     user: name,
        //     timestamp: time,
        //     timestampKR: timeKR,
        //     userAgent: req.header('user-agent'),
        //     isp: req.body.isp,
        //     speed: {
        //         dl: parseFloat(req.body.speed.dl),
        //         ul: parseFloat(req.body.speed.ul),
        //         ping: parseFloat(req.body.speed.ping),
        //         jitter: parseFloat(req.body.speed.jitter),
        //     }
        // });

        // survey.save()
        //     .then(result => {
        //         res.json({ success: true, result: result});
        //     })
        //     .catch( err => {
        //         res.json({ success: false, result: err});
        //     });
    },
};
