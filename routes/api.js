var express = require('express');
var router = express.Router();


// controllors
const SpeedLogControl = require('../controllers/SpeedLogControl');
const SubLogControl = require('../controllers/SubLogControl');
const PubLogControl = require('../controllers/PubLogControl');
const SurveyControl = require('../controllers/SurveyControl');


/* GET spaces listing. */

router.post('/speedLog/create', SpeedLogControl.create);

router.post('/pubLog/create', PubLogControl.create);
router.post('/subLog/create', SubLogControl.create);

router.post('/pubLog/insertMany', PubLogControl.insertMany);
router.post('/subLog/insertMany', SubLogControl.insertMany);

router.post('/survey/create', SurveyControl.create);

module.exports = router;
