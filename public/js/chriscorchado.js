import * as utilityJS from './utilities.js';
import * as searchJS from './search.js';
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
function nodePage() {
    let currentNavItem = '';
    let pageIsSearchable = false;
    utilityJS.animateLogo('logo-image', 'spin');
    const docLogo = document.getElementById('logo');
    const params = new URLSearchParams(window.location.search);
    setTimeout(function () {
        var _a, _b;
        switch (utilityJS.getCurrentPage()) {
            case '/':
            case 'about':
                currentNavItem = 'about-link';
                docLogo.getElementsByTagName('img')[0].style.border = '1px dashed #7399EA';
                utilityJS.addProfiles('profiles');
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
                utilityJS.addProfiles('profiles');
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
                currentNavItem = 'resume-link';
                utilityJS.addResumes();
                break;
            default:
        }
        if (currentNavItem === '') {
            const header = document.createElement('h1');
            const headerText = document.createTextNode('Page not found');
            header.appendChild(headerText);
            const paraText = document.createTextNode('The requested page could not be found');
            const breakLine = document.createElement('br');
            const redirectingText = document.createTextNode('Redirecting Home...');
            const para = document.createElement('p');
            para.appendChild(paraText);
            para.appendChild(breakLine);
            para.appendChild(redirectingText);
            const container = document.createElement('div');
            container.className = 'container';
            container.appendChild(header);
            container.appendChild(para);
            const element = document.getElementById('navigation');
            if (element) {
                element.after(container);
                setTimeout(function () {
                    window.location.href = window.location.origin;
                }, 3000);
            }
        }
        if (utilityJS.getCurrentPage() !== 'about' && utilityJS.getCurrentPage() !== 'resume') {
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
                    pagingText.innerHTML = `Items&nbsp;${firstNumberRange}-${(firstNumberRange + recordCount) - 1}`;
                }
            }
            else {
                if (pagingText) {
                    pagingText.innerHTML = `${recordCount}&nbsp;${recordText}`;
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
