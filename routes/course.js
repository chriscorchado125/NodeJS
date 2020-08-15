var express = require('express');
var router = express.Router();

var course_controller = require('../controllers/courseController');

router.get('/courses', function (req, res, next) {
  res.render('course', { title: course_controller.index });
});

module.exports = router;
