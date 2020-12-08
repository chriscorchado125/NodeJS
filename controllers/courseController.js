var Course = require("../models/course");
var async = require("async");

ObjectID = require("mongodb").ObjectID;

const MAX_ITEMS_PER_PAGE = 50;

exports.index = function (req, res, next) {
  const getMonthYear = require("../public/js/getMonthYear");
  const highlightSearch = require("../public/js/highlightSearch");

  let pageNum = parseInt(req.cookies.pageNum);
  if (!req.query.page) pageNum = 1;

  let pageDir = "";
  if (req.query.dir == "prev" || req.query.dir == "next") pageDir = req.query.dir;

  let paging;
  if (pageDir == "next") {
    pageNum++;
    paging = { _id: { $gt: ObjectID(req.cookies.lastIDcookie) } };
  }
  if (pageDir == "prev") {
    pageNum--;
    paging = { _id: { $lt: ObjectID(req.cookies.firstIDcookie) } };
  }

  // set query
  let search;
  let queryParams = {};

  if (req.query.q) {
    search = { $regex: new RegExp(req.query.q, "i") };
    queryParams = { name: search };
  }

  if (paging) queryParams = paging;

  if (paging && req.query.q) {
    queryParams = {
      $and: [paging, queryParams]
    };
  }

  let recordsToSkip = 0;
  if (parseInt(req.query.page) > 1 && req.query.dir == "prev") {
    recordsToSkip = parseInt(req.query.page - 1) * MAX_ITEMS_PER_PAGE;
  }

  Course.find(
    queryParams,
    "name certificate_pdf certificate_image track_image course_date"
  )
    .sort({ _id: 1, course_date: 1 })
    .skip(recordsToSkip)
    // the max is 50 but we use 51 in order to check for more records and be able to set the 'Next' pagination link
    .limit(MAX_ITEMS_PER_PAGE + 1)
    .exec(function (err, data) {
      if (err) return next(err);
      let firstID;
      let lastID;
      let nextLink = "";

      if (data.length > 0) {
        if (data.length > MAX_ITEMS_PER_PAGE) {
          res.cookie("nextLink", true);
          data.pop();
        } else {
          res.cookie("nextLink", false);
        }

        firstID = Object.values(data)[0]._id;
        lastID = Object.values(data)[Object.keys(data).length - 1]._id;

        res.cookie("firstIDcookie", firstID);
        res.cookie("lastIDcookie", lastID);
      }
      res.cookie("dir", pageDir);
      res.cookie("pageNum", pageNum);
      res.cookie("recordCount", data.length);

      res.render("course", {
        title: "Courses and Awards | Chris Corchado",
        data: data,
        count: data.length,
        first: firstID,
        last: lastID,
        page: pageNum,
        maxItemsPerPage: MAX_ITEMS_PER_PAGE,
        searched: req.query.q,
        showPager: nextLink,
        page_name: "course",
        page_title: "Courses and Awards",
        needs_lighbox: true,
        utility: {
          getMonthYear,
          highlightSearch
        }
      });
    });
};
