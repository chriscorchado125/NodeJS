var Project = require('../models/project');
var async = require('async');

exports.index = function (req, res, next) {
  res.render('project', {
    title: ' Chris Corchado - Projects - Online Portfolio and Resume',
    titlePage: 'Projects Coming Soon',
  });
};
