const express = require('express')
const router = express.Router()

const recordController = require('../controllers/recordController')
const homeController = require('../controllers/homeController')
const companyController = require('../controllers/companyController')
const courseController = require('../controllers/courseController')
const projectController = require('../controllers/projectController')
const contactController = require('../controllers/contactController')
const resumeController = require('../controllers/resumeController')

router.get('/', homeController.index)
router.get('/index', homeController.index)
router.get('/companies', companyController.index)
router.get('/courses', courseController.index)
router.get('/projects', projectController.index)
router.get('/contact', contactController.index)
router.get('/resume', resumeController.index)
router.get('/recordcount', recordController.record_count)

module.exports = router
