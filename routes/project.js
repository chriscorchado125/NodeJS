var express = require('express');
var router = express.Router();

var project_controller = require('../controllers/projectController');

router.get('/projects', function (req, res, next) {
  res.render('project', { title: project_controller.index });
});

module.exports = router;
