var con  = require('../models/index.js');
var express = require('express');
var bodyParser = require('body-parser')
var jsosParser = bodyParser.json();
var urlenuncodedParser = bodyParser.urlencoded({extended:false})

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  
  res.render('adduser');

});

router.post('/',urlenuncodedParser,async function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin = req.body.quyen;
    res.render('ab',{ results:await con.addUser(username,password,isAdmin,req,res)});
  });

module.exports = router;