var express = require('express');
var router = express.Router();

/* GET spaces listing. */
router.get('/space/:spaceid', function(req, res, next) {
  res.render('space', { spaceid: req.params.spaceid });
});

module.exports = router;
