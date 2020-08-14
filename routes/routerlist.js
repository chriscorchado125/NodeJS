var express = require('express');
var router = express.Router();

var record_controller = require('../controllers/recordController');
var home_controller = require('../controllers/homeController');
var company_controller = require('../controllers/companyController');

router.get('/', home_controller.index);
router.get('/index', home_controller.index);
router.get('/companies', company_controller.index);

router.get('/recordcount', record_controller.record_count);

module.exports = router;
