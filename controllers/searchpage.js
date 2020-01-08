
var express = require('express');
var Handlebars = require('handlebars');
var con = require('../models/index')
var router = express.Router();

Handlebars.registerHelper('filter', function(res) {
 
  return 'search?author='+res.author+ '&type='+res.type+'&price='+res.price+'&value='+res.value;
 });
 Handlebars.registerHelper('cmt', function(res) {
 
  return 'cmt?id='+res;
 });
 Handlebars.registerHelper('y', function(res) {
 
  return 'cmt?idxd='+res;
 });

  module.exports = router;