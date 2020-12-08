const Company = require('../models/company')
const Course = require('../models/course')
const Project = require('../models/project')

const async = require('async')

exports.record_count = function (req, res, next) {
  async.parallel(
    {
      company_count: function (callback) {
        Company.countDocuments({}, callback)
      },

      course_count: function (callback) {
        Course.countDocuments({}, callback)
      },

      project_count: function (callback) {
        Project.countDocuments({}, callback)
      }
    },

    function (err, data) {
      if (err) return next(err)

      res.render('record_count', {
        title: 'Record Counts',
        data: data
      })
    }
  )
}
