var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chi-tiet-san-pham', { title: 'Express' });
});

module.exports = router;
