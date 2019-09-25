var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DWXR' });
});
//
// router.get('/speed', function(req, res) {
//   res.render('speed');
//   // res.render('test-index');
// });


/* GET home page. */
// router.get('/tests', function(req, res) {
//   res.render('speed');
//   // res.render('test-index');
// });

module.exports = router;
