var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:this.name,s1:this.name,image:'/images/sao14.jpg' });
});

module.exports = router;
