var Project = require('../models/project');
var async = require('async');

exports.index = function (req, res, next) {
  const highlightSearch = require('../public/js/highlightSearch');

  if (!req.query.q) {
    Project.find(
      {},
      'screenshots name description company_name videos technology project_date'
    ).exec(function (err, data) {
      if (err) return next(err);

      res.render('project', {
        title: 'Chris Corchado - Projects - Online Portfolio and Resume',
        data: data,
        count: data.length,
        utility: {
          highlightSearch,
        },
      });
    });
  } else {
    let search = { $regex: new RegExp(req.query.q, 'i') };

    Project.find(
      {
        $or: [
          {
            name: search,
          },
          {
            description: search,
          },
          {
            company_name: search,
          },
          {
            technology: search,
          },
          {
            screenshots: search,
          },
        ],
      },
      'screenshots name description company_name videos technology project_date'
    ).exec(function (err, data) {
      if (err) return next(err);

      res.render('project', {
        title: 'Chris Corchado - Projects - Online Portfolio and Resume',
        data: data,
        count: data.length,
        searchValue: req.query.q,
        utility: {
          highlightSearch,
        },
      });
    });
  }
};
