var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { 
    title: '登录'
  });
});
router.get('/login', function(req, res, next) {
  res.redirect('/admin');
});
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});
module.exports = router;