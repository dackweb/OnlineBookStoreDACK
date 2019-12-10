var express = require('express');
//var singleProductController = require('./routes/single-product');
var db=require('../models/index')
var router = express.Router();

/* GET users listing. */

router.get('/:id',  async function (req, res) {
res.render('type', { results:await db.getType(req,res)});
       
});
module.exports = router;