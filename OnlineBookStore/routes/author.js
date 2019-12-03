var express = require('express');

var db=require('../models/index')
var router = express.Router();

/* GET users listing. */
router.get('/:id',  async function (req, res) {


        res.redirect('shop', { results:await db.getAuthor(req,res)});
       
});
module.exports = router;