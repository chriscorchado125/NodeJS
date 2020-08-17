/**
 * Get the contact form HTML and JS
 * @param {string} url - url of contact form
 * @return {string} - HTML and JS of contact form page
 */
const getContactForm = async (url: string) => {
  const axios = require('axios');

  try {
    const response = await axios.get(url);
    let data = response.data.replace(/\/drupal8/g, 'https://chriscorchado.com/drupal8'); // update the HTML URLs from relative to absolute

    // get the contact form HTML
    let form = data.substr(data.indexOf('<form'), data.indexOf('</form>'));
    form = form.substr(0, form.indexOf('</form>') + 8);

    form = form.replace('Your email address', 'Email');

    // get the contact form JavaScript
    let script = data.substr(
      data.indexOf(
        '<script type="application/json" data-drupal-selector="drupal-settings-json">'
      ),
      data.indexOf('></script>')
    );
    script = script.substr(0, script.indexOf('</script>') + 9);

    return `${form} ${script}`;
  } catch (error) {
    return `Could not get the form`;
  }
};

module.exports = getContactForm;
