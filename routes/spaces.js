var express = require('express');
var router = express.Router();

/* GET spaces listing. */

// a13519ea-7f88-45e1-8668-8748ca93ae9c

router.get('/web3d', function(req, res, next) {
  res.render('space', { spaceid: 'a13519ea-7f88-45e1-8668-8748ca93ae9c' });
});

router.get('/ar/:spaceid', function(req, res, next) {
  res.render('ar', { spaceid: req.params.spaceid });
});

router.get('/:spaceid', function(req, res, next) {
  res.render('space', { spaceid: req.params.spaceid });
});

module.exports = router;
