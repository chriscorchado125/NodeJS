import * as utilityJS from './utilities.js';
export const MAX_ITEMS_PER_PAGE = 50;
export const params = new URLSearchParams(window.location.search);
export const searchBox = document.getElementById('search-site');
export const searchSubmit = document.getElementById('search-submit');
export const searchClear = document.getElementById('search-clear-btn');
export const search = () => {
    if (!searchBox.value) {
    }
    else {
        utilityJS.animateLogo('logo-image', 'spin');
        window.location.href = `${window.location.href.split('?')[0]}?q=${searchBox.value.replace(/[^\w\s]/gi, '')}`;
        searchBox.select();
        utilityJS.animateLogo('logo-image', '');
    }
};
export const noRecordsFound = (noRecordID, searchedFor, appendToID, msg) => {
    const notFound = document.createElement('div');
    notFound.id = noRecordID;
    notFound.innerHTML = `${msg} '${searchedFor}'`;
    const appendToEL = document.getElementById(appendToID);
    appendToEL.appendChild(notFound);
};
export const searchFilter = (event) => {
    const allowOnlyLettersAndSpace = /[A-Za-z\s]/;
    return allowOnlyLettersAndSpace.test(event.key);
};
export const manageURL = (action, value) => {
    var _a;
    const thisURL = window.location.href.split('?');
    let searched = '';
    utilityJS.animateLogo('logo-image', 'spin');
    let pageNumber = 2;
    if (params.get('page')) {
        pageNumber = params.get('page') || 2;
    }
    let searchedFor = params.get('q');
    if (searchedFor) {
        const re = /[A-Za-z\s]gi/;
        searchedFor = searchedFor.replace(re, '').replace('20', ' ');
    }
    switch (action) {
        case 'clearSearch':
            (_a = document.getElementById('no-records')) === null || _a === void 0 ? void 0 : _a.remove();
            window.location.href = `${thisURL[0]}?clear`;
            searchBox.focus();
            break;
        case 'sync':
            if (params && params.get('q') !== null) {
                searchBox.value = searchedFor;
                searchBox.select();
            }
            break;
        case 'paging':
            if (params.get('q'))
                searched = `q=${params.get('q')}&`;
            pageNumber = parseInt(pageNumber, 10);
            if (value === 'prev') {
                if (params.get('page'))
                    pageNumber -= 1;
            }
            if (value === 'next') {
                if (params.get('page'))
                    pageNumber += 1;
            }
            window.location.href =
                `${thisURL[0].replace('#', '')}?page=${pageNumber}${searched}&dir=${value}`;
            break;
        default:
    }
    const currentItems = document.getElementById('paging-info');
    if ((currentItems === null || currentItems === void 0 ? void 0 : currentItems.innerText) === '0 Items') {
        noRecordsFound('no-records', searchedFor, 'navigation', 'No matches found for');
    }
    utilityJS.animateLogo('logo-image', '');
};
