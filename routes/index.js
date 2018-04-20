var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { 
    title: '登录',
    copyright:'Copyright  ©  2012-2018 LANYOU 深圳联友 版权所有 粤ICP备11069161-21' 
  });
});

module.exports = router;