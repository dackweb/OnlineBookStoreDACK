var express = require('express');
var db = require('../models/db');
var db2 = require('../models/index');
var router = express.Router();


/* GET users listing. */
router.get('/',   async function (req, res, next) {

   
   
    res.render('shop', { results: await db2.getAllValue()});
 });

    

module.exports = router;