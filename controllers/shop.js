var express = require('express');
var local = require('../models/Storage');
var index = require('../models/index');

var router = express.Router();


/* GET users listing. */
router.get('/',   async function (req, res, next) {

    console.log('can I get here?');
    var result = await index.shop(req,res);
    console.log('can I get here?');
    res.render('shop', { results: result.results,pagination:{
        page:result.pagination.current,
        pageCount:result.sumPage
    },length:local.getStorageLength()});
 });


    

module.exports = router;