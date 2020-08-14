var express = require('express');
var router = express.Router();

var company_controller = require('../controllers/companyController');

router.get('/companies', function (req, res, next) {
  res.render('company', { title: company_controller.index });
});

module.exports = router;
