var express = require('express');
var passport = require('passport');
var router = express.Router();
var indexController = require('../controllers/home');
var shopController = require('../controllers/shop');
//var typeController = require('../controllers/type');
var searchController = require('../controllers/search');
//var singleProductController = require('../controllers/single-product');
var addController = require('../controllers/add');
var filterController = require('../controllers/searchpage');
var BuyController = require('../controllers/buy');
require('../controllers/users')(router,passport);

router.use('/', indexController);
router.use('/shop', shopController);
router.use('/search',filterController);

//router.use('/author',authorController);
//router.use('/search',searchController);
//router.use('/single-product',singleProductController);
router.use('/addCart',addController);
router.use('/buy',BuyController);
module.exports = router;