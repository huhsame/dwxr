var express = require('express');
var router = express.Router();

/* GET spaces listing. */

router.get('/ar/:spaceid', function(req, res, next) {
  res.render('ar', { spaceid: req.params.spaceid });
});

router.get('/:spaceid', function(req, res, next) {
  res.render('space', { spaceid: req.params.spaceid });
});

module.exports = router;
