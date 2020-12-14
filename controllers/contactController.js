exports.index = async function (req, res, next) {
  const getContactForm = require('../public/js/getContactForm')

  await getContactForm('https://chriscorchado.com/drupal8/contact/feedback').then((data) => {
    res.render('contact', {
      title: 'Chris Corchado - Contact Me',
      titlePage: 'Contact',
      count: 1,
      data: data,
      page_name: 'contact',
      page_title: 'Contact Me',
      needs_lighbox: false,
      submitted: req.query.submitted
    })
  })
}
