var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/web3d', function(req, res, next) {
  res.redirect('/space/a13519ea-7f88-45e1-8668-8748ca93ae9c');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'DWXR' });
});

module.exports = router;
