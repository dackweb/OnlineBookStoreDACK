var express = require('express');
var router = express.Router();
var updateController = require('../controllers/updateuser')



/* GET home page. */
router.use('/',updateController);

module.exports = router;
