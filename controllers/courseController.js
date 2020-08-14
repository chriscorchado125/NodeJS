var Course = require('../models/course');
var async = require('async');

exports.index = function (req, res, next) {
  res.render('course', {
    title: ' Chris Corchado - Courses - Online Portfolio and Resume',
    titlePage: 'Courses Coming Soon',
  });
};
