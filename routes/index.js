var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');

router.get('/', function (req, res, next) {
  res.render('index', { title: home_controller.index });
});

module.exports = router;
