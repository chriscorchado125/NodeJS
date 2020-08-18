var Project = require('../models/project');
var async = require('async');

exports.index = function (req, res, next) {
  Project.find(
    {},
    'screenshots name description company_name videos technology project_date'
  ).exec(function (err, data) {
    if (err) return next(err);

    res.render('project', {
      title: 'Chris Corchado - Projects - Online Portfolio and Resume',
      data: data,
      count: data.length,
    });
  });
};
