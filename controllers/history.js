var express = require('express');

var local = require('../models/Storage');
var con = require('../models/index');
var router = express.Router();


/* GET users listing. */
router.get('/',   async function (req, res, next) {

    if(req.isAuthenticated())
    {
        //await local.TransferHistory(req,res);
        //await con.updateBuys();
       ;
    res.render('history',{results: await con.viewHistory(req,res)});
    

    }
    else{
        res.redirect('login');
    }
 });
 router.get('/orderDetail/:id',   async function (req, res, next) {

    if(req.isAuthenticated())
    {
        //await local.TransferHistory(req,res);
        //await con.updateBuys();
       var sum = await local.sumDetail(req,res); 
    res.render('orderDetail',{results: await con.viewOrderDetail(req,res),totalPrice:sum});
    

    }
    else{
        res.redirect('login');
    }
 });


    

module.exports = router;