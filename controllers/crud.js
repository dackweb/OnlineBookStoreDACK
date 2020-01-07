var express = require('express');

var db = require('../models/localStorage');

var router = express.Router();


/* GET users listing. */
router.get('/remove/cart/:id',   async function (req, res, next) {

    
    await db.removeCartItem(req,res);
  
    res.status(200).send('OK');
 });
 module.exports = router;