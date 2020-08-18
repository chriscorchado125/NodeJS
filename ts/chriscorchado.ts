'use strict';

/**
 * Get the current page name
 * @return {string} - page name
 */
const getCurrentPage = () => {
  let thisPage = window.location.pathname
    .split('/')
    .filter(function (pathnamePieces) {
      return pathnamePieces.length;
    })
    .pop();

  let pageName = 'about';

  if (thisPage) {
    pageName = thisPage.split('.')[0];
  }
  if (pageName == 'index' || pageName == 'nodejs') pageName = 'about';

  return pageName;
};

/**
 * After the contact form is submitted set a thank you message
 * with a countdown that then forwards to the homepage
 * @param {number} second - number of seconds to count down
 */
const formSubmitted = (seconds: number) => {
  let countDown = document.createElement('div');
  countDown.style.padding = '50px';

  countDown.innerHTML = `<h2>Thanks For Your Submission</h2>
    <h4>Redirecting to the homepage in <span id="secondCountDown">${seconds}</span> seconds</h4>
    <img id="timer" src="https://chriscorchado.com/images/timer.gif" />`;

  document.getElementsByClassName('container')[0].append(countDown);

  let updateCountDown = setInterval(function () {
    seconds--;
    document.getElementById('secondCountDown').innerHTML = seconds.toString();

    if (seconds === 0) {
      clearInterval(updateCountDown);
      window.location.replace(
        // use replace instead of assign for the sake of history
        location.href.substring(0, location.href.lastIndexOf('/') + 1) // get the base site URL including sub-folder
      );
    }
  }, 1000);
};

/**
 * Debounce search requests in order to improve performance
 * @param {any} function
 * @param {number} wait - time to wait in milliseconds before invoking search
 * @return {function} - as long as it continues to be invoked the function will not be triggered.
 */
const searchBox = document.getElementById('searchSite')! as HTMLInputElement;
const searchBtn = document.getElementById('searchBtn')! as HTMLInputElement;

const debounce = (func: any, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    // callback to be executed
    const later = () => {
      timeout = null; // indicate the debounce ended
      func(...args); // execute the callback
    };

    clearTimeout(timeout); // on every function execution
    timeout = setTimeout(later, wait); // restart the waiting period timeout
  };
};

/**
 * Triggered on the keyup event within search input box
 */
const debounceMe = debounce(() => {
  // filter search values and update the URL to fire off the search
  window.location.href =
    window.location.href.split('?')[0] + '?q=' + searchBox.value.replace(/[^\w\s]/gi, '');
}, 500);

/**
 * Clear current search by removing the querysting
 */
const searchClear = () => {
  window.location.href = window.location.href.split('?')[0];
};

// TODO check attributes inside pug = div([innerHtml]="example")
function nodePage() {
  let currentNavItem = '';
  let pageIsSearchable = false;
  let pageHasGallery = false;

  setTimeout(function () {
    switch (getCurrentPage()) {
      case '/':
      case 'about': // homepage
        currentNavItem = 'about-link';
        document.getElementById('logo').getElementsByTagName('img')[0].style.border =
          '1px dashed #7399EA';

        document.getElementById('profiles').innerHTML = `
          <div class="icon" id="pdf-resume">
            <a href="https://chriscorchado.com/resume/Chris-Corchado-resume-2020.pdf" target="_blank">
              <img alt="Link to PDF Resume" src="https://chriscorchado.com/images/pdfIcon.jpg" title="Link to PDF Resume" />
              <span>Resume</span>
            </a>
          </div>

          <div class="icon" id="profile-linkedin">
            <a href="https://www.linkedin.com/in/chriscorchado/" target="_blank">
              <img alt="Link to LinkedIn Profile" title="Link to LinkedIn Profile" src="https://chriscorchado.com/images/linkedInIcon.jpg" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div class="icon" id="profile-azure">
            <a href="https://docs.microsoft.com/en-us/users/corchadochrisit-2736/" target="_blank">
              <img alt="Link to Azure Profile" title="Link to Azure Profile" src="https://chriscorchado.com/images/azureIcon.png" />
              <span>Azure</span>
            </a>
          </div>`;
        break;
      case 'companies':
        currentNavItem = 'companies-link';
        pageIsSearchable = true;
        break;
      case 'courses':
        currentNavItem = 'courses-link';
        pageIsSearchable = true;
        pageHasGallery = true;
        break;
      case 'projects':
        currentNavItem = 'projects-link';
        pageIsSearchable = true;
        pageHasGallery = true;
        break;
      case 'contact':
        currentNavItem = 'contact-link';

        const params = new URLSearchParams(window.location.search);

        if (params.get('submitted') === 'true') {
          formSubmitted(5); // set 5 second countdown
        } else {
          // show the form and capture the current site URL
          const webLocation = document.getElementById(
            'edit-field-site-0-value'
          )! as HTMLInputElement;

          webLocation.value = location.toString();

          document.getElementById('edit-mail').focus();
        }
        break;
    }

    // the home/about link is an image and not text
    if (getCurrentPage() !== 'about') {
      document.getElementById(currentNavItem).className += ' nav-item-active';
    }

    if (pageIsSearchable) {
      document.getElementById('search-container').style.display = 'block';

      // wait for user to pause typing before initiating a search
      searchBox.addEventListener('keyup', (event) => debounceMe());
      searchBtn.addEventListener('click', (event) => searchClear());

      // setup record counts
      let currentRecordCount = document.getElementById('page-item-count').innerText;

      let recordText = 'Items';
      if (parseInt(currentRecordCount) === 1) recordText = 'Item';

      // update header with the record count
      document.getElementById(
        'searchCount'
      ).innerHTML = `${currentRecordCount} ${recordText}`;

      // if searching keep the querystring and search input box values synced
      if (window.location.href.split('?')[1]) {
        searchBox.value = window.location.href
          .split('?')[1]
          .slice(2)
          .replace(/[^\w\s]/gi, '')
          .replace('20', ' ');

        //show the clear search button
        document.getElementById('searchBtn').style.visibility = 'visible';

        searchBox.focus();
      }
    }
  }, 125);
}

window.onload = nodePage;
