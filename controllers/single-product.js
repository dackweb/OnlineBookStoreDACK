var express = require('express');

var db=require('../models/index')
var router = express.Router();

/* GET users listing. */
router.get('/:id',  async function (req, res) {

var result = await db.getID(req,res);
        
        res.render('single-product', { title:result[0].name,name:result[0].name,img:result[0].img,author:result[0].author,type:result[0].type,price:result[0].price,description:result[0].description });
});
module.exports = router;