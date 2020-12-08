const Company = require('../models/company')

exports.index = function (req, res, next) {
  const getMonthYear = require('../public/js/getMonthYear')
  const highlightSearch = require('../public/js/highlightSearch')

  const search = { $regex: new RegExp(req.query.q, 'i') }

  const queryParams = {
    $or: [
      {
        name: search
      },
      {
        description: search
      },
      {
        job_title: search
      }
    ]
  }

  Company.find(queryParams, 'name description screenshots job_title start_date end_date')
    .sort({ _id: 1, created: 1, end_date: 1, name: -1 })
    .exec(function (err, data) {
      if (err) return next(err)

      res.render('company', {
        title: 'Work History | Chris Corchado',
        data: data,
        count: data.length,
        searched: req.query.q,
        page_name: 'company',
        page_title: 'Work History',
        needs_lighbox: false,
        utility: {
          getMonthYear,
          highlightSearch
        }
      })
    })
}
