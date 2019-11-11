var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
  res.render('peer-manager.js', { userid: req.params.userid });
});

module.exports = router;
