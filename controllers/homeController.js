var Home = require('../models/home');
var async = require('async');

exports.index = function (req, res, next) {
  Home.find({}, 'name description resume linkedin azure').exec(function (err, data) {
    if (err) return next(err);

    res.render('index', {
      title: 'Chris Corchado - Homepage',
      titlePage: 'About Me',
      count: 1,
      data: data,
    });
  });
};
