var express = require('express');

var local = require('../models/localStorage');

var router = express.Router();


/* GET users listing. */
router.get('/',   async function (req, res, next) {

    if(req.isAuthenticated())
    {
   local.addOrder(req,res);
    res.redirect('/');
    

    }
    else{
        res.redirect('login');
    }
 });


    

module.exports = router;