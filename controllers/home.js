var con  = require('../models/index.js');
var express = require('express');
var local = require('../models/localStorage.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {
  
  res.render('home', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated()} );
 
});

router.get('/confirmation/:id', function(req, res) {
  
  con.UpdateConfirmStatus(req,res);
  res.redirect('/login');
});

router.get('/shiping', function(req, res) {
  res.render('shiping', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
/*router.get('/search',async function(req, res) {
  
 //con.filter(req,res);
 // console.log(strUser);
 //res.render('type', { results:await con.filter(req,res)});
 var result = await con.filter(req,res);

 res.render('shop', { results: result.results,author:req.query.author,type: req.query.type,price:req.query.price,pagination:{
  page:result.pagination.current,
  pageCount:result.sumPage,
  
}});
});*/
router.get('/searchName',async function(req, res) {
  
  //con.filter(req,res);
  // console.log(strUser);
  res.render('type', { results:await con.getName(req,res)});
 });
router.get('/faq', function(req, res) {
  res.render('faq', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
router.get('/add', function(req, res) {
  res.send(req.params.id);
});
router.get('/filter', function(req, res) {
  res.render('filter', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'Express',isAuthenticate:req.isAuthenticated() });
 
});
router.get('/single-product/:id',  async function (req, res) {

  var result = await con.getID(req,res);
          
          res.render('single-product', {userid:req.user.id,cmtid:req.params.id,result:result,results:await con.getType2(result[0].type) });
  });
module.exports = router;
