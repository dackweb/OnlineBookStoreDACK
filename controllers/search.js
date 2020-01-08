var express = require('express');
//var singleProductController = require('./routes/single-product');
var local = require('../models/Storage')
var db=require('../models/index')
var router = express.Router();

  
/* GET users listing. */
/*router.get('/', async function(req, res,) {
 
    var result = await con.test(req,res);
    res.render('type', { results:result.results,author:req.query.author,type:req.query.type,price:req.query.price});
    //res.render('testSelect');
     
    });*/
    router.get('/', async function(req, res) {
  
  
        console.log('begin');
        var result = await db.filter(req,res);
      
        res.render('type', {x:req.query, results: result.results,author:req.query.author,type: req.query.type,price:req.query.price,pagination:{
          page:result.pagination.current,
          pageCount:result.sumPage,
          
        },length:local.getStorageLength()})
         
        }); 
router.get('/type/:id',  async function (req, res) {
res.render('type', {pagination:{
    page:1,
    pageCount:10
    
  }, results:await db.getType(req,res)});
       
});
router.get('/author/:id',  async function (req, res) {
    console.log('ya');
    res.render('type', { results:await db.getAuthor(req,res)});
           
    });
    router.get('/searchName',  async function (req, res) {
      console.log('ya');
      var result = await db.searchName(req,res);
      console.log(result);
      res.render('simpleSearch',{x:req.query,results: result.results,pagination:{
        page:result.pagination.current,
        pageCount:result.sumPage
    },length:local.getStorageLength()
             
      })
    })
      
    
module.exports = router;