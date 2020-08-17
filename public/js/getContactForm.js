var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getContactForm = (url) => __awaiter(this, void 0, void 0, function* () {
    const axios = require('axios');
    try {
        const response = yield axios.get(url);
        let data = response.data.replace(/\/drupal8/g, 'https://chriscorchado.com/drupal8');
        let form = data.substr(data.indexOf('<form'), data.indexOf('</form>'));
        form = form.substr(0, form.indexOf('</form>') + 8);
        form = form.replace('Your email address', 'Email');
        let script = data.substr(data.indexOf('<script type="application/json" data-drupal-selector="drupal-settings-json">'), data.indexOf('></script>'));
        script = script.substr(0, script.indexOf('</script>') + 9);
        return `${form} ${script}`;
    }
    catch (error) {
        return `Could not get the form`;
    }
});
module.exports = getContactForm;
