var express = require('express');
var passport = require('passport');
var router = express.Router();
var indexController = require('../controllers/home');
var shopController = require('../controllers/shop');
var typeController = require('../controllers/type');
var authorController = require('../controllers/author');
var singleProductController = require('../controllers/single-product');

var filterController = require('../controllers/searchpage');
require('../controllers/users')(router,passport);

router.use('/', indexController);
router.use('/searchpage',filterController);
router.use('/shop',shopController);
router.use('/author',authorController);
router.use('/type',typeController);
router.use('/single-product',singleProductController);
module.exports = router;