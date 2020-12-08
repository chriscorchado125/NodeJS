var Home = require("../models/home");
var async = require("async");

exports.index = function (req, res, next) {
  Home.find({}, "name description resume linkedin azure").exec(function (err, data) {
    if (err) return next(err);
    res.render("index", {
      title: "About Me | Chris Corchado",
      titlePage: "About Me",
      page_title: "About Me",
      count: 1,
      data: data,
      page_name: "home",
      needs_lighbox: false
    });
  });
};
