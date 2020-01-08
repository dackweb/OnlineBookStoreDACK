var express = require('express');
var index = require('../models/index')
var local = require('../models/Storage');

var router = express.Router();


/* GET users listing. */
router.get('/remove/cart/:id',   async function (req, res, next) {

    
    await local.removeCartItem(req,res);
  
    res.status(200).send('OK');
 });
 
 
 router.get('/add/cart/:id',  async function (req, res) {
  
    //await db.addOrder(req,res);
    
       
         local.addAnoMyous(req,res);
         local.seeCart(req,res);
         res.status(200).send('OK');
       //res.redirect('back');
    
    
    
           
    });

    router.get('/add/cart2',  async function (req, res) {
      var sum = await local.updateCart(req,res);
     console.log('ok');
          res.send(''+sum);
           
      });
      router.get('/add/sum',  async function (req, res) {
        
          res.send(result);
    });
    router.get('/add/getCMT/:id',async function(req,res)
    {
    var result = await local.getCmt(req.params.id);
    res.render('type', {x:req.params.id, results: result.results,author:req.query.author,type: req.query.type,price:req.query.price,pagination:{
      page:result.pagination.current,
      pageCount:result.sumPage,
      
    }})
    })
    
    router.post('/add/user/cmt',  async function (req, res) {
      
      //await db.addOrder(req,res);
    
    
      if(!req.isAuthenticated()){
       console.log('should I login?')
         res.redirect('/login');
         //res.redirect('back');
      }
      else
      {
      
          index.addCMT(req,res);
          res.sendStatus(200).send('OK');
         // res.render('single-product'+req.body.cmtid);
          
          //res.redirect('back');
          
         
      }
      
             
      });
    
 module.exports = router