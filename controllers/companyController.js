var Company = require('../models/company');
var async = require('async');

exports.index = function (req, res, next) {
  const getMonthYear = require('../public/js/getMonthYear');

  Company.find({}, 'name description screenshots job_title start_date end_date').exec(
    function (err, data) {
      if (err) return next(err);

      res.render('company', {
        title: 'Chris Corchado - History - Online Portfolio and Resume',
        data: data,
        utility: { getMonthYear },
      });
    }
  );
};
