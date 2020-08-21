var async = require('async');

exports.index = function (req, res, next) {
  const getContactForm = require('../public/js/getContactForm');

  getContactForm('https://chriscorchado.com/drupal8/contact/feedback').then((data) => {
    res.render('contact', {
      title: ' Chris Corchado - Contact - Online Portfolio and Resume',
      titlePage: 'Contact',
      count: 1,
      data: data,
      submitted: req.query.submitted,
    });
  });
};
