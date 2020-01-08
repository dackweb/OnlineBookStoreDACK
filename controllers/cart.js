var con  = require('../models/index.js');
var express = require('express');
var local = require('../models/Storage.js');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res,) {
  //local.addAnoMyous(req,res);
 
 
  if(req.isAuthenticated())
  {
    console.log(req.user.id);
    await local.addOrder(req,res);
    console.log(req.user.id);
  var result = await local.transferOrder(req,res);
    //res.redirect('/');
    console.log(req.user.id);
    var sum = await local.sum(req,res);
    res.render('cart', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated(),results:result,totalPrice:sum} );
  }
  else
  res.redirect('/login');
  });
  router.get('/:id',async function(req, res,) {
    local.addAnoMyous(req,res);
   await local.addOrder(req,res);
    var result = await local.transferOrder(req,res);
   
    if(req.isAuthenticated())
    {
      //res.redirect('/');
      var sum = await local.sum();
      res.render('cart', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated(),results:result,totalPrice:sum} );
    }
    else
    res.redirect('/login');
    });
  module.exports = router;