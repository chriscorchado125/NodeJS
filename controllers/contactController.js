var async = require('async');

exports.index = function (req, res, next) {
  res.render('course', {
    title: ' Chris Corchado - Contact - Online Portfolio and Resume',
    titlePage: 'Contact Coming Soon',
  });
};
