var con  = require('../models/index.js');
var express = require('express');
var bodyParser = require('body-parser')
var jsosParser = bodyParser.json();
var urlenuncodedParser = bodyParser.urlencoded({extended:false})
var db = require('../models/db.js')

var router = express.Router();




router.get('/:id', async function(req, res) {
    console.log(''+ req.params.id);
    res.render('updateuser',{ results:await con.getUser(req.params.id,req,res),id:req.params.id});

});

router.post('/:id',urlenuncodedParser,async function(req, res) {
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin = req.body.quyen;
    res.render('ab',{ results:await con.updateUser(id,username,password,isAdmin,req,res)});
  });

module.exports = router;