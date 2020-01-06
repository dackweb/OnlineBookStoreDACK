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

router.get('/filter', function(req, res) {
  res.render('filter', { title: 'Express',isAuthenticate:req.isAuthenticated() });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'Express',isAuthenticate:req.isAuthenticated() });
 
});
router.get('/single-product/:id',  async function (req, res) {
console.log('bla bla bla');
  var result = await con.getID(req,res);
  var cmtResult = await con.getAllCmt(req.params.id);
  //console.log(req.params.id+' '+userid)
  var userid = '';
          if(req.user!=undefined)
            userid = req.user.id;
          res.render('single-product', {userid:userid,cmtid:req.params.id,
            result:result,results:await con.getType2(result[0].type),
            isAuthenticate:req.isAuthenticated(),cmt:cmtResult });
  });
module.exports = router;
