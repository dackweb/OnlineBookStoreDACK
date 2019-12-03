var db = require('../models/db.js');
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {
  
  res.render('home', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated()} );
 
});



router.get('/shiping', function(req, res,) {
  res.render('shiping', { title: 'Express' });
});
router.get('/faq', function(req, res,) {
  res.render('faq', { title: 'Express' });
});
router.get('/about', function(req, res,) {
  res.render('about', { title: 'Express' });
 
});
module.exports = router;
