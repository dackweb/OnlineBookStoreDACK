var express = require('express');
var passport = require('passport');
var router = express.Router();
var indexController = require('../controllers/home');
var shopController = require('../controllers/shop');
//var typeController = require('../controllers/type');
var searchController = require('../controllers/search');
//var singleProductController = require('../controllers/single-product');
//var addController = require('../controllers/add');

var BuyController = require('../controllers/buy');
var cartController = require('../controllers/cart');
var crudController = require('../controllers/crud');
var historyController = require('../controllers/history');
require('../controllers/users')(router,passport);

router.use('/', indexController);
router.use('/shop', shopController);
router.use('/search',searchController);


//router.use('/search',searchController);
//router.use('/single-product',singleProductController);
//router.use('/add',addController);
router.use('/crud',crudController);
router.use('/cart',cartController);
router.use('/buy',BuyController);
router.use('/history',historyController);
module.exports = router;