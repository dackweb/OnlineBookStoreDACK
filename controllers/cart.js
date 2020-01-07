var con  = require('../models/index.js');
var express = require('express');
var local = require('../models/localStorage.js');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res,) {
  //local.addAnoMyous(req,res);
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