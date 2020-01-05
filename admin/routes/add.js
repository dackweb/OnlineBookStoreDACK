var express = require('express');
var router = express.Router();
var addController = require('../controllers/add')



/* GET home page. */
router.use('/',addController);

module.exports = router;
