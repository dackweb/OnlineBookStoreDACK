var con  = require('../models/index.js');
var express = require('express');
var db = require('../models/db.js')

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res,) {
  
  res.render('index',{ results:await con.getAllUser(req,res),count:await con.getNumberOfUser(req,res)});
 
});

router.get('/delete/:id', async function(req, res) {
  
  res.render('ab',{ results:await con.deleteUser(req.params.id,req,res)});
  
});

router.get('/lock/:id', async function(req, res) {
  
  res.render('ab',{ results:await con.lockUser(req.params.id,req,res)});
  
});

router.get('/unlock/:id', async function(req, res) {
  
  res.render('ab',{ results:await con.unlockUser(req.params.id,req,res)});
  
});


module.exports = router;