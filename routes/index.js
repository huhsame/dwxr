var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/web3d', function(req, res, next) {
  res.redirect('/space/web3d');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'DWXR' });
});

module.exports = router;
