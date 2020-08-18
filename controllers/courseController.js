var Course = require('../models/course');
var async = require('async');

exports.index = function (req, res, next) {
  const getMonthYear = require('../public/js/getMonthYear');
  const highlightSearch = require('../public/js/highlightSearch');

  if (!req.query.q) {
    Course.find(
      {},
      'name certificate_pdf certificate_image track_image course_date'
    ).exec(function (err, data) {
      if (err) return next(err);

      res.render('course', {
        title: 'Chris Corchado - Courses - Online Portfolio and Resume',
        data: data,
        count: data.length,
        utility: {
          getMonthYear,
          highlightSearch,
        },
      });
    });
  } else {
    let search = { $regex: new RegExp(req.query.q, 'i') };

    Course.find(
      {
        name: search,
      },
      'name certificate_pdf certificate_image track_image course_date'
    ).exec(function (err, data) {
      if (err) return next(err);

      res.render('course', {
        title: 'Chris Corchado - Courses - Online Portfolio and Resume',
        data: data,
        count: data.length,
        utility: {
          getMonthYear,
          highlightSearch,
        },
        searchValue: req.query.q,
      });
    });
  }
};
