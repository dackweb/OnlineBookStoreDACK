var express = require('express');
var router = express.Router();
var productController = require('../controllers/product')



/* GET home page. */
router.use('/',productController);

module.exports = router;
