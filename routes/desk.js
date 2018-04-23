var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin/desk', { 
        title: '一元化工作台'
    });
});
module.exports = router;