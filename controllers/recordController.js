var Company = require('../models/company');
var Course = require('../models/course');
var Project = require('../models/project');

var async = require('async');

exports.record_count = function (req, res) {
  async.parallel(
    {
      company_count: function (callback) {
        Company.countDocuments({}, callback);
      },

      course_count: function (callback) {
        Course.countDocuments({}, callback);
      },

      project_count: function (callback) {
        Project.countDocuments({}, callback);
      },
    },

    function (err, data) {
      if (err) return next(err);
      res.render('record_count', {
        title: 'Record Counts',
        data: data,
      });
    }
  );
};
