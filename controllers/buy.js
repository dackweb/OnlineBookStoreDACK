var express = require('express');

var local = require('../models/Storage');
var con = require('../models/index');
var router = express.Router();


/* GET users listing. */
router.get('/:id',   async function (req, res, next) {

    if(req.isAuthenticated())
    {
        //await local.TransferHistory(req,res);
        //await con.updateBuys();
        await local.buySuccess(req,res);
    res.redirect('/');
    

    }
    else{
        res.redirect('login');
    }
 });


    

module.exports = router;