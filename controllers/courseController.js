var Course = require('../models/course');
var async = require('async');

exports.index = function (req, res, next) {
  const getMonthYear = require('../public/js/getMonthYear');

  Course.find({}, 'name certificate_pdf certificate_image track_image course_date').exec(
    function (err, data) {
      if (err) return next(err);

      res.render('course', {
        title: 'Chris Corchado - Courses - Online Portfolio and Resume',
        data: data,
        utility: { getMonthYear },
      });
    }
  );
};
