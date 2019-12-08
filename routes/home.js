var con  = require('../models/index.js');
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,) {
  
  res.render('home', { title: 'Express',user:req.user,isAuthenticate:req.isAuthenticated()} );
 
});
/*router.get('/test', function (req, res) {
  var numRows;
  
  var numPerPage = parseInt(req.query.npp, 3) || 1;
  var page = parseInt(req.query.page, 2) || 0;
  var numPages;
  var skip = page * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query
  var limit = skip + ',' + numPerPage;
  queryAsync('SELECT count(*) as numRows FROM product')
  .then(function(results) {
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
    console.log('number of pages:', numPages);
  })
  .then(() => queryAsync('SELECT * FROM product ORDER BY ID DESC LIMIT ' + limit))
  .then(function(results) {
    var responsePayload = {
      results: results
    };
    if (page < numPages) {
      responsePayload.pagination = {
        current: page,
        perPage: numPerPage,
        previous: page > 0 ? page - 1 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined
      }
    }
    else responsePayload.pagination = {
      err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
    }
    res.json(responsePayload);
  })
  .catch(function(err) {
    console.error(err);
    res.json({ err: err });
  });
});*/
router.get('/confirmation/:id', function(req, res,) {
  
  con.UpdateConfirmStatus(req,res);
  res.redirect('../login');
});

router.get('/shiping', function(req, res,) {
  res.render('shiping', { title: 'Express' });
});
router.get('/faq', function(req, res,) {
  res.render('faq', { title: 'Express' });
});
router.get('/about', function(req, res,) {
  res.render('about', { title: 'Express' });
 
});
module.exports = router;
