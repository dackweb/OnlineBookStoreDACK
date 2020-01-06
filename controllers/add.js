var express = require('express');

var db=require('../models/index')
var local=require('../models/localStorage');
var router = express.Router();

/* GET users listing. */

router.get('cart/:id',  async function (req, res) {
  
//await db.addOrder(req,res);

   
     local.addAnoMyous(req,res);
     local.seeCart(req,res);
   //res.redirect('back');



       
});
router.get('/getCMT/:id',async function(req,res)
{
var result = await db.getAllCmt(req.params.id);
  return res.json({res:result});
})

router.post('/user/cmt',  async function (req, res) {
  
  //await db.addOrder(req,res);


  if(req.body.userid==''){
   
     res.render('login');
     //res.redirect('back');
  }
  else
  {
  
      db.addCMT(req,res);
      res.render('single-product'+req.body.cmtid);
      
      //res.redirect('back');
      
     
  }
  
         
  });
module.exports = router;