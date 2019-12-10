
var express = require('express');
var con = require('../models/index')
var router = express.Router();

router.get('/', async function(req, res,) {
 
  var result = await con.test(req,res);
  res.render('type', { results:result.results});
  //res.render('testSelect');
   
  });
  module.exports = router;