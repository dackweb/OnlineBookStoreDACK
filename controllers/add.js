var express = require('express');

var db=require('../models/index')
var local=require('../models/localStorage');
var router = express.Router();

/* GET users listing. */

router.get('/:id',  async function (req, res) {
  
//await db.addOrder(req,res);

   
     local.addAnoMyous(req,res);
     local.seeCart(req,res);
   //res.redirect('back');



       
});
router.post('/user/comment',  async function (req, res) {
  
  //await db.addOrder(req,res);
  if(!req.isAuthenticated()){
     
     res.render('login');
     //res.redirect('back');
  }
  else
  {
      
      await local.addOrder(req,res);
  }
  
         
  });
module.exports = router;