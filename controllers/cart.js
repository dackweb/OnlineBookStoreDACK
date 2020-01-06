var con  = require('../models/index.js');
var express = require('express');
var local = require('../models/localStorage.js');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res,) {
 await local.addOrder(req,res);
  var result = await local.transferOrder(req,res);
 
  if(req.isAuthenticated())
  {
    //res.redirect('/');
    res.render('cart', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated(),results:result} );
  }
  else
  res.redirect('/login');
  });
  module.exports = router;