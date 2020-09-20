var Course = require("../models/course");
var async = require("async");

const MAX_ITEMS_PER_PAGE = 50;

ObjectID = require("mongodb").ObjectID;

var nextLink = "";

// check if there are items after the last item
const getNext = async (lastID) => {
  await Course.findOne({ _id: { $gt: ObjectID(lastID) } })
    .sort({ _id: 1, created: 1 })
    .exec(function (err, data) {
      if (err) return "ERROR: " + err;
      if (data) nextLink = data._id;
    });
};

exports.index = function (req, res, next) {
  const getMonthYear = require("../public/js/getMonthYear");
  const highlightSearch = require("../public/js/highlightSearch");

  let paging;
  let pageCount = 0;

  if (!req.query.page) {
    pageCount = 1;
  } else {
    if (req.query.dir == "next") {
      pageCount = req.query.page++;
      paging = { _id: { $gt: ObjectID(req.query.last) } };
    } else {
      pageCount = req.query.page--;
      paging = { _id: { $lt: ObjectID(req.query.first) } };
    }
  }

  let search = { $regex: new RegExp(req.query.q, "i") };
  let queryParams = { name: search };

  if (paging) {
    queryParams = {
      $and: [paging, queryParams]
    };
  }

  let recordsToSkip = 0;

  if (parseInt(req.query.page) > 1 && req.query.dir == "prev") {
    recordsToSkip = parseInt(req.query.page) * MAX_ITEMS_PER_PAGE;
  }

  Course.find(
    queryParams,
    "name certificate_pdf certificate_image track_image course_date"
  )
    .limit(MAX_ITEMS_PER_PAGE)
    .skip(recordsToSkip)
    .sort({ _id: 1, created: 1 })
    .then((data) => {
      let firstID;
      let lastID;
      if (data.length > 0) {
        firstID = Object.values(data)[0]._id;
        lastID = Object.values(data)[Object.keys(data).length - 1]._id;
        getNext(lastID); // generate nextLink if there are more records
      }

      res.render("course", {
        title: "Chris Corchado - Courses - Portfolio and Resume",
        data: data,
        count: data.length,
        first: firstID,
        last: lastID,
        page: pageCount,
        maxItemsPerPage: MAX_ITEMS_PER_PAGE,
        searched: req.query.q,
        showPager: nextLink || (pageCount > 1 && data.length == MAX_ITEMS_PER_PAGE),
        page_name: "course",
        page_title: "Courses",
        needs_lighbox: true,
        utility: {
          getMonthYear,
          highlightSearch
        }
      });
    });
};
