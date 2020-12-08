const Project = require('../models/project')

exports.index = function (req, res, next) {
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
        company_name: search
      },
      {
        technology: search
      },
      {
        screenshots: search
      }
    ]
  }

  Project.find(
    queryParams,
    'screenshots name description company_name videos technology project_date'
  )
    .sort({ _id: 1, project_date: 1, name: 1, created: 1 })
    .exec(function (err, data) {
      if (err) return next(err)

      const checkSearch = RegExp(req.query.q, 'i')
      let newData = {}
      const objArr = []
      let screenshotText = ''
      let addRecord
      let screenshotArr

      data.forEach((item, count) => {
        addRecord = false
        screenshotArr = []

        // need to filter the data for records which match a screenshot image path including the name
        if (item.screenshots.length > 0) {
          item.screenshots.forEach((item, count) => {
            screenshotText = item.split(',')

            if (checkSearch.test(screenshotText[0])) addRecord = true

            screenshotArr.push(`${screenshotText[0]}, ${screenshotText[1]}`)
          })

          if (
            checkSearch.test(item.name) ||
            checkSearch.test(item.description) ||
            checkSearch.test(item.company_name) ||
            checkSearch.test(item.technology)
          ) {
            addRecord = true
          }

          if (addRecord) {
            newData = {
              screenshots: screenshotArr,
              _id: item.id,
              name: item.name,
              description: item.description,
              company_name: item.company_name,
              video: item.videos || '',
              technology: item.technology,
              project_date: item.project_date
            }
            objArr.push(newData)
          }
        }
      })

      res.render('project', {
        title: 'Project Samples | Chris Corchado',
        data: objArr,
        count: objArr.length,
        searched: req.query.q,
        page_name: 'project',
        page_title: 'Project Samples',
        needs_lighbox: true,
        utility: {
          highlightSearch
        }
      })
    })
}
