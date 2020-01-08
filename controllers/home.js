var con  = require('../models/index.js');
var express = require('express');
var local = require('../models/localStorage.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {
  
  res.render('home', { title: 'bookstore',user:req.user,isAuthenticate:req.isAuthenticated()} );
 
});

router.get('/confirmation/:id', function(req, res) {
  
  con.UpdateConfirmStatus(req,res);
  res.redirect('/login');
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
  res.render('type', { results:await con.filter(req,res)});
 });
router.get('/faq', function(req, res) {
  res.render('faq', { title: 'faq',isAuthenticate:req.isAuthenticated() });
});

router.get('/filter', function(req, res) {
  res.render('filter', { title: 'Tìm kiếm nâng cao',isAuthenticate:req.isAuthenticated() });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'Về chúng tôi',isAuthenticate:req.isAuthenticated() });
 
});
router.get('/single-product/cmt',  async function (req, res) {

  var result = await con.getID(req.query.id);
  var cmtResult = await con.getCmt(req);
  //console.log(req.params.id+' '+userid)
  var userid = '';
          if(req.user!=undefined)
            userid = req.user.id;
          res.render('single-product', {title:'chi-tiết-sản-phẩm',x:req.query.id,userid:userid,cmtid:req.params.id,
            result:result,results:await con.getType2(result[0].type),
            isAuthenticate:req.isAuthenticated(),cmt:cmtResult.results, pagination:{
              page:cmtResult.pagination.current,
              pageCount:cmtResult.sumPage,
              
            }});
           

  

  });
router.get('/single-product/:id',  async function (req, res) {

  var result = await con.getID(req.params.id);
  var views = await con.updateViews(req,res);
  var cmtResult = await con.getCmt2(req);
  //console.log(req.params.id+' '+userid)
  var userid = '';
          if(req.user!=undefined)
            userid = req.user.id;
          res.render('single-product', {x:req.params.id,userid:userid,cmtid:req.params.id,
            result:result,results:await con.getType2(result[0].type),
            isAuthenticate:req.isAuthenticated(),cmt:cmtResult.results, pagination:{
              page:cmtResult.pagination.current,
              pageCount:cmtResult.sumPage,
              
            }});
           

  

  });
module.exports = router;
