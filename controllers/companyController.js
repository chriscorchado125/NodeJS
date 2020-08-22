var Company = require('../models/company');
var async = require('async');

exports.index = function (req, res, next) {
  const getMonthYear = require('../public/js/getMonthYear');
  const highlightSearch = require('../public/js/highlightSearch');

  let search = { $regex: new RegExp(req.query.q, 'i') };

  let queryParams = {
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
  };

  Company.find(queryParams, 'name description screenshots job_title start_date end_date')
    .sort({ _id: 1, end_date: 1, name: 1, created: 1 })
    .exec(function (err, data) {
      if (err) return next(err);

      res.render('company', {
        title: 'Chris Corchado - History - Online Portfolio and Resume',
        data: data,
        count: data.length,
        searched: req.query.q,
        utility: {
          getMonthYear,
          highlightSearch,
        },
      });
    });
};
