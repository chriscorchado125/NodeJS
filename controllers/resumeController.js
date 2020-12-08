var Resume = require("../models/resume");
var async = require("async");

exports.index = function (req, res, next) {
  Resume.find({}).exec(function (err, data) {
    if (err) return next(err);
    res.render("index", {
      title: "Resume | Chris Corchado",
      titlePage: "Resume",
      page_title: "Resume",
      count: 1,
      data: data,
      page_name: "resume",
      needs_lighbox: false
    });
  });
};
