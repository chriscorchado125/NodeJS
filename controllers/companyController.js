var Company = require('../models/company');

var async = require('async');

exports.index = function (req, res) {
  async.parallel(
    {
      company_count: function (callback) {
        Company.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
    },
    function (err, results) {
      res.render('company', { title: 'Company', error: err, data: results });
    }
  );
};

exports.company_list = function (req, res, next) {
  Company.find({}, 'name description screenshots job_title start_date end_date').exec(
    function (err, list_company) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      console.log(list_company);
      res.render('company_list', { title: 'Company List', company_list: list_company });
    }
  );
};
