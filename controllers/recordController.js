var Home = require('../models/home');
var Company = require('../models/company');

var async = require('async');

exports.record_count = function (req, res) {
  async.parallel(
    {
      company_count: function (callback) {
        Company.countDocuments({}, callback);
      },

      home_count: function (callback) {
        Home.countDocuments({}, callback);
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
