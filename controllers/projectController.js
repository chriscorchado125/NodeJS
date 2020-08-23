var Project = require('../models/project');
var async = require('async');

exports.index = function (req, res, next) {
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
        company_name: search,
      },
      {
        technology: search,
      },
      {
        screenshots: search,
      },
    ],
  };

  Project.find(
    queryParams,
    'screenshots name description company_name videos technology project_date'
  )
    .sort({ _id: 1, project_date: 1, name: 1, created: 1 })
    .exec(function (err, data) {
      if (err) return next(err);

      res.render('project', {
        title: 'Chris Corchado - Projects - Portfolio and Resume',
        data: data,
        count: data.length,
        searched: req.query.q,
        page_name: 'project',
        needs_lighbox: true,
        utility: {
          highlightSearch,
        },
      });
    });
};
