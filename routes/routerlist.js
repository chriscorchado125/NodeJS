var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');
var company_controller = require('../controllers/companyController');

router.get('/', home_controller.index);
router.get('/company', company_controller.company_list);
router.get('/companycount', company_controller.index);

module.exports = router;
