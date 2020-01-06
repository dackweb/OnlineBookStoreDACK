var express = require('express');
//var singleProductController = require('./routes/single-product');
var db=require('../models/index')
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res,) {
 
    var result = await con.test(req,res);
    res.render('type', { results:result.results,author:req.query.author,type:req.query.type,price:req.query.price});
    //res.render('testSelect');
     
    });
router.get('/type/:id',  async function (req, res) {
res.render('type', { results:await db.getType(req,res)});
       
});
router.get('/author/:id',  async function (req, res) {
    console.log('ya');
    res.render('type', { results:await db.getAuthor(req,res)});
           
    });
    
module.exports = router;