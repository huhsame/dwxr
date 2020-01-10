var express = require('express');
var router = express.Router();


// controllors
const SpeedLogControl = require('../controllers/UserControl');
const SubLogControl = require('../controllers/SubLogControl');
const PubLogControl = require('../controllers/PubLogControl');
const SurveyControl = require('../controllers/SurveyControl');
const PidControl = require('../controllers/PidControl');
const UserControl = require('../controllers/UserControl');



router.post('/userLog/create', SpeedLogControl.create);
router.post('/userLog/create', SpeedLogControl.create);

router.post('/pubLog/create', PubLogControl.create);
router.post('/subLog/create', SubLogControl.create);

router.post('/pubLog/insertMany', PubLogControl.insertMany);
router.post('/subLog/insertMany', SubLogControl.insertMany);

router.post('/survey/create', SurveyControl.create);

router.post('/pid/create', PidControl.create);
router.post('/user/update', UserControl.update);

// to show speed at rail
router.post('/user/getSpeed', UserControl.getSpeed);


module.exports = router;
