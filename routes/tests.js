var express = require('express');
var router = express.Router();
// require('../src/js/users/users');
const UserControl = require('../controllers/UserControl');

let node = 'node-' + Date.now();
console.log('::--- gun root node : '+node +' ---::');

// router.get('/', UserControl.create );
router.get('/', function(req, res, next){
  res.render('test-login'); // => setting
});
// 테스트 로그인 페이지 하나 만들고, 거기서 아이디나 속도정보를 받아서도
// 폼으로 보내고

router.post('/setting', UserControl.getset );



router.get('/speed', function(req, res, next) {
  res.render('test-speed', { name: req.session.user.name });
});

router.get('/space', function(req, res, next) {
  let user = req.session.user
  global.me = user; // to use at peer-manager
  // 예외 처리
  if((user === undefined) || (user.order === -1)){
    res.redirect('/test');
    return;
  }
  let data = user;
  data.node = node;
  res.render('experiment', data );
});

router.get('/survey', function(req, res, next) {
  let user = req.session.user;
  // console.log(user);
  if(user){
    if(user.auto){
      res.redirect('/test/space' );
      return;
    }
    res.render('test-survey', { name: user.name});
  }
  else{
    res.redirect('/test' );
  }
});

router.get('/random', function(req, res, next) {
  // let user = req.session.user;
  // if(user){
  //
  // }else{
  //   let user = {
  //     name: createName(),
  //     auto: false,
  //     local: false
  //   };
  //   req.session.user = user;
  // }
  //
  // res.render('test-space-random', {  name: user.name});

});

router.get('/completed', function(req, res){
  let user = req.session.user;
  req.session.destroy(function(err){
    if(err) console.log(err)
    else console.log(user.name +' is removed in session.');
  });
  res.render('completed', user);
});



router.post('/resetUsers', function(req, res){
  res.json({ success: true, result: 'need to delete: resetUser'});
});

router.post('/removeUser', function(req, res){

  res.json({ success: true, result: 'need to delete: removeUser'});

});

router.get('/color-ball', function(req, res, next) {
  // let user = req.session.user
  // global.me = user; // to use at peer-manager
  // // 예외 처리
  // if((user === undefined) || (user.order === -1)){
  //   res.redirect('/test');
  //   return;
  // }
  let data = {};
  data.node = node;
  res.render('usability-colorBall', data );
});



module.exports = router;
