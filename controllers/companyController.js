var Company = require('../models/company');
var async = require('async');

exports.index = function (req, res, next) {
  const getMonthYear = require('../public/js/getMonthYear');

  let search = { $regex: new RegExp(req.query.q, 'i') };

  if (req.query.q) {
    Company.find(
      {
        $or: [
          {
            name: search,
          },
          {
            description: search,
          },
          {
            job_title: search,
          },
        ],
      },
      'name description screenshots job_title start_date end_date'
    ).exec(function (err, data) {
      if (err) return next(err);

      res.render('company', {
        title: 'Chris Corchado - History - Online Portfolio and Resume',
        data: data,
        count: data.length,
        utility: { getMonthYear },
      });
    });
  } else {
    Company.find({}, 'name description screenshots job_title start_date end_date').exec(
      function (err, data) {
        if (err) return next(err);

        res.render('company', {
          title: 'Chris Corchado - History - Online Portfolio and Resume',
          data: data,
          count: data.length,
          utility: { getMonthYear },
        });
      }
    );
  }
};
