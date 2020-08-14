var express = require('express');
var router = express.Router();

var record_controller = require('../controllers/recordController');
var home_controller = require('../controllers/homeController');
var company_controller = require('../controllers/companyController');
var course_controller = require('../controllers/courseController');
var project_controller = require('../controllers/projectController');
var contact_controller = require('../controllers/contactController');

router.get('/', home_controller.index);
router.get('/index', home_controller.index);
router.get('/companies', company_controller.index);
router.get('/courses', course_controller.index);
router.get('/projects', project_controller.index);
router.get('/contact', contact_controller.index);
router.get('/recordcount', record_controller.record_count);

module.exports = router;
