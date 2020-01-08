var express = require('express');
//var singleProductController = require('./routes/single-product');
var Handlebars = require('handlebars');
var db=require('../models/index')
var router = express.Router();
Handlebars.registerHelper('filter', function(res) {
 
    return 'search?author='+res.author+ '&type='+res.type+'&price='+res.price+'&value='+res.value;
   });
   Handlebars.registerHelper('cmt', function(res) {
   
    return 'cmt?id='+res;
   });
   Handlebars.registerHelper('search', function(res) {
   
   if(res.author !=undefined)
   {
       return 'search?author='+res.author;
   }
   else if(res.type!=undefined)
   {
    '/type/author='+res.author;
   }
   
   });
  
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
          
        }})
         
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
    
module.exports = router;