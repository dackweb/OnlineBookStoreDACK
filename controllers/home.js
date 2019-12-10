var con  = require('../models/index.js');
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {
  
  res.render('home', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated()} );
 
});

router.get('/confirmation/:id', function(req, res) {
  
  con.UpdateConfirmStatus(req,res);
  res.redirect('../login');
});

router.get('/shiping', function(req, res) {
  res.render('shiping', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
router.get('/tests',async function(req, res) {
  
 //con.filter(req,res);
 // console.log(strUser);
 res.render('type', { results:await con.filter(req,res)});
});
router.get('/searchName',async function(req, res) {
  
  //con.filter(req,res);
  // console.log(strUser);
  res.render('type', { results:await con.getName(req,res)});
 });
router.get('/faq', function(req, res) {
  res.render('faq', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
router.get('/filter', function(req, res) {
  res.render('filter', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'Express',isAuthenticate:req.isAuthenticated() });
 
});
module.exports = router;
