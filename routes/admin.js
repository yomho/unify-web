var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('home');
});
router.get('/home', function(req, res, next) {
    res.render('admin/home', { 
        title: '一元化中心'
    });
});
module.exports = router;