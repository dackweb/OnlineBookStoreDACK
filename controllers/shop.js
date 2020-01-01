var express = require('express');
var db = require('../models/db');
var db2 = require('../models/index');

var router = express.Router();


/* GET users listing. */
router.get('/',   async function (req, res, next) {

    console.log('can I get here?');
    var result = await db2.test(req,res);
    console.log('can I get here?');
    res.render('shop', { results: result.results,pagination:{
        page:result.pagination.current,
        pageCount:result.sumPage
    }});
 });

    

module.exports = router;