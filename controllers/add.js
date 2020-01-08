var express = require('express');

var db=require('../models/index')
var local=require('../models/localStorage');
var router = express.Router();

/* GET users listing. */

router.get('/cart/:id',  async function (req, res) {
  
//await db.addOrder(req,res);

   
     local.addAnoMyous(req,res);
     local.seeCart(req,res);
     res.status(200).send('OK');
   //res.redirect('back');



       
});
router.get('/cart2',  async function (req, res) {
  var sum = await local.updateCart(req,res);
 
      res.send(''+sum);
       
  });
  router.get('/sum',  async function (req, res) {
    
      res.send(result);
});
router.get('/getCMT/:id',async function(req,res)
{
var result = await db.getCmt(req.params.id);
res.render('type', {x:req.params.id, results: result.results,author:req.query.author,type: req.query.type,price:req.query.price,pagination:{
  page:result.pagination.current,
  pageCount:result.sumPage,
  
}})
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
      res.sendStatus(200).send('OK');
     // res.render('single-product'+req.body.cmtid);
      
      //res.redirect('back');
      
     
  }
  
         
  });
module.exports = router;