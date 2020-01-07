
var express = require('express');
var Handlebars = require('handlebars');
var con = require('../models/index')
var router = express.Router();

Handlebars.registerHelper('filter', function(res) {
 
  return 'search?author='+res.author+ '&type='+res.type+'&price='+res.price+'&value=1';
 });
 Handlebars.registerHelper('cmt', function(res) {
 
  return 'cmt?id='+res;
 });
router.get('/', async function(req, res) {
  
  
  console.log('begin');
  var result = await con.filter(req,res);

  res.render('type', {x:req.query, results: result.results,author:req.query.author,type: req.query.type,price:req.query.price,pagination:{
    page:result.pagination.current,
    pageCount:result.sumPage,
    
  }})
   
  });
  module.exports = router;