var async = require('async');

exports.index = function (req, res, next) {
  const getContactForm = require('../public/js/getContactForm');

  getContactForm('https://chriscorchado.com/drupal8/contact/feedback').then((data) => {
    res.render('contact', {
      title: 'Contact Me | Chris Corchado',
      titlePage: 'Contact',
      count: 1,
      data: data,
      page_name: 'contact',
      page_title: 'Contact Me',
      needs_lighbox: false,
      submitted: req.query.submitted,
    });
  });
};
