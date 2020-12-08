import * as utilityJS from './utilities.js';
import * as searchJS from './search.js';
const getCurrentPage = () => {
    const thisPage = window.location.pathname
        .split('/')
        .filter(function (pathnamePieces) {
        return pathnamePieces.length;
    })
        .pop();
    let pageName = 'about';
    if (thisPage)
        pageName = thisPage.split('.')[0];
    if (pageName === 'index' || pageName === 'nodejs')
        pageName = 'about';
    return pageName;
};
const formSubmitted = (seconds) => {
    const countDown = document.createElement('div');
    countDown.style.padding = '50px';
    let theseSeconds = seconds;
    countDown.innerHTML = `<h2>Thanks For Your Submission</h2>
    <h4>Redirecting to the homepage in <span id="secondCountDown">${theseSeconds}</span> seconds</h4>
    <img id="timer" src="https://chriscorchado.com/images/timer.gif" />`;
    document.getElementsByClassName('container')[0].append(countDown);
    const updateCountDown = setInterval(function () {
        theseSeconds--;
        const secondCountDown = document.getElementById('secondCountDown');
        secondCountDown.innerHTML = theseSeconds.toString();
        if (theseSeconds === 0) {
            clearInterval(updateCountDown);
            window.location.replace(location.href.substring(0, location.href.lastIndexOf('/') + 1));
        }
    }, 1000);
};
const addProfiles = (id) => {
    const baseDir = window.location.toString().toLocaleLowerCase().indexOf('/nodejs') !== -1 ? '/nodejs' : '';
    let docEl = HTMLInputElement;
    if (document.getElementById(id)) {
        docEl = document.getElementById(id);
    }
    docEl.innerHTML = `
  <div class='icon' id='html-resume'>
    <a href='${baseDir}/resume'>
      <img alt='Link to HTML Resume with PDF and Word options' src='https://chriscorchado.com/images/htmlIcon.jpg' />
      <span>Resume</span>
    </a>
  </div>

  <div class='icon' id='profile-linkedin'>
    <a href='https://www.linkedin.com/in/chriscorchado/' target='_blank' rel='noopener' title='Opening a new window'>
      <img alt='LinkedIn Icon' title='Link to LinkedIn Profile' src='https://chriscorchado.com/images/linkedInIcon.jpg' />
      <span>LinkedIn</span>
    </a>
  </div>

  <div class='icon' id='profile-azure'>
    <a href='https://docs.microsoft.com/en-us/users/corchadochrisit-2736/' target='_blank' rel='noopener' title='Opening a new window'>
      <img alt='Azure Icon' title='Link to Azure Profile' src='https://chriscorchado.com/images/azureIcon.png' />
      <span>Azure</span>
    </a>
  </div>`;
};
const addResumes = () => {
    if (document.getElementById('profiles')) {
        const docEl = document.getElementById('profiles');
        docEl.innerHTML = `
    <div class='icon' id='pdf-resume'>
      <a href='https://chriscorchado.com/resume/Chris-Corchado-resume-2020.pdf' target='_blank' rel='noopener' title='Opening a new window'>
        <img alt='Link to PDF Resume' src='https://chriscorchado.com/images/pdfIcon.jpg' />
        <span>PDF</span>
      </a>
    </div>

    <div class='icon' id='word-resume'>
      <a href='https://chriscorchado.com/resume/Chris-Corchado-resume-2020.docx' title='File will download'>
        <img alt='Link to MS Word Resume' src='https://chriscorchado.com/images/wordIcon.jpg' />
        <span>Word</span>
      </a>
    </div>`;
    }
};
function nodePage() {
    let currentNavItem = '';
    let pageIsSearchable = false;
    utilityJS.animateLogo('logo-image', 'spin');
    const docLogo = document.getElementById('logo');
    const params = new URLSearchParams(window.location.search);
    setTimeout(function () {
        var _a, _b;
        switch (getCurrentPage()) {
            case '/':
            case 'about':
                currentNavItem = 'about-link';
                docLogo.getElementsByTagName('img')[0].style.border = '1px dashed #7399EA';
                addProfiles('profiles');
                break;
            case 'companies':
                currentNavItem = 'companies-link';
                pageIsSearchable = true;
                break;
            case 'courses':
                currentNavItem = 'courses-link';
                pageIsSearchable = true;
                break;
            case 'projects':
                currentNavItem = 'projects-link';
                pageIsSearchable = true;
                break;
            case 'contact':
                currentNavItem = 'contact-link';
                addProfiles('profiles');
                if (params.get('submitted') === 'true') {
                    formSubmitted(5);
                }
                else {
                    const checkExist = setInterval(function () {
                        if (document.getElementById('edit-field-site-0-value')) {
                            const webLocation = document.getElementById('edit-field-site-0-value');
                            webLocation.value = location.toString();
                            const docEditMail = document.getElementById('edit-mail');
                            docEditMail.focus();
                            clearInterval(checkExist);
                        }
                    }, 100);
                }
                break;
            case 'resume':
                addResumes();
                break;
            default:
        }
        if (getCurrentPage() !== 'about' && getCurrentPage() !== 'resume') {
            const docCurrentNavItem = document.getElementById(currentNavItem);
            docCurrentNavItem.className += ' nav-item-active';
        }
        if (pageIsSearchable) {
            const docSearchContainer = document.getElementById('search-container');
            docSearchContainer.style.display = 'block';
            if (params.get('clear') !== null) {
                searchJS.searchBox.focus();
                history.pushState(null, '', `${window.location.protocol}//${window.location.host}${window.location.pathname}`);
            }
            const re = /[a-zA-Z s]/;
            searchJS.searchBox.addEventListener('keydown', (event) => {
                if (re.exec(event.key) == null) {
                    event.preventDefault();
                    return false;
                }
                return true;
            });
            searchJS.searchSubmit.addEventListener('click', (event) => {
                event.preventDefault();
                searchJS.search();
            });
            searchJS.searchClear.addEventListener('click', (event) => {
                searchJS.manageURL('clearSearch');
                event.preventDefault();
            });
            let recordCount = 0;
            if (document.getElementById('recordCount')) {
                const test = document.getElementById('recordCount');
                if (test) {
                    recordCount = parseInt(test.innerText, 10);
                }
            }
            else {
                recordCount = 0;
            }
            const currentPageNumber = params.get('page');
            let recordText = 'Items';
            if (recordCount === 1)
                recordText = 'Item';
            let firstNumberRange;
            if (currentPageNumber > 1) {
                firstNumberRange = ((currentPageNumber - 1) * searchJS.MAX_ITEMS_PER_PAGE) + 1;
            }
            else {
                firstNumberRange = 1;
            }
            const currentRecords = currentPageNumber * recordCount;
            const pagingText = document.getElementById('paging-info');
            if (document.getElementById('nextLink') ||
                currentRecords >= searchJS.MAX_ITEMS_PER_PAGE ||
                currentPageNumber > 1) {
                if (pagingText && recordCount !== 1) {
                    pagingText.innerHTML = `Items ${firstNumberRange}-${(firstNumberRange + recordCount) - 1}`;
                }
            }
            else {
                if (pagingText) {
                    pagingText.innerHTML = `${recordCount} ${recordText}`;
                }
            }
            (_a = document.getElementById('prevLink')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => searchJS.manageURL('paging', 'prev'));
            (_b = document.getElementById('nextLink')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => searchJS.manageURL('paging', 'next'));
            searchJS.manageURL('sync');
        }
        setTimeout(function () { utilityJS.animateLogo('logo-image', ''); }, 1000);
    }, 125);
}
window.onload = nodePage;
