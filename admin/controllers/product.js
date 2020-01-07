var con  = require('../models/index.js');
var express = require('express');

var router = express.Router();

router.get('/', async function(req, res,) {
  
   res.render('product',{ results:await con.getAllProduct(req,res)});
  
 });
 module.exports = router;
  