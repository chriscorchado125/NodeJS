'use strict';
const getCurrentPage = () => {
    let thisPage = window.location.pathname
        .split('/')
        .filter(function (pathnamePieces) {
        return pathnamePieces.length;
    })
        .pop();
    let pageName = thisPage.split('.')[0];
    if (pageName == 'index' || pageName == 'nodejs')
        pageName = 'about';
    return pageName;
};
const formSubmitted = (seconds) => {
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
            window.location.replace(location.href.substring(0, location.href.lastIndexOf('/') + 1));
        }
    }, 1000);
};
function nodePage() {
    let currentNavItem = '';
    let pageIsSearchable = false;
    let pageHasGallery = false;
    setTimeout(function () {
        switch (getCurrentPage()) {
            case 'about':
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
                    formSubmitted(5);
                }
                else {
                    const webLocation = document.getElementById('edit-field-site-0-value');
                    webLocation.value = location.toString();
                    document.getElementById('edit-mail').focus();
                }
                break;
        }
        if (getCurrentPage() !== 'about') {
            document.getElementById(currentNavItem).className += ' nav-item-active';
        }
        if (pageIsSearchable) {
            document.getElementById('search-container').style.display = 'block';
            const searchBox = document.getElementById('searchSite');
            searchBox.addEventListener('keyup', (event) => {
                searchBox.value = searchBox.value.replace(/[^\w\s]/gi, '');
                document.getElementById('searchText').innerText = searchBox.value;
                window.location.href =
                    window.location.href.split('?')[0] + '?q=' + searchBox.value;
            });
            let currentRecordCount = document.getElementById('page-item-count').innerText;
            let recordText = 'Items';
            if (parseInt(currentRecordCount) === 1)
                recordText = 'Item';
            document.getElementById('searchCount').innerHTML = `${currentRecordCount} ${recordText}`;
            if (window.location.href.split('?')[1]) {
                searchBox.value = window.location.href.split('?')[1].slice(2);
                searchBox.focus();
            }
        }
    }, 100);
}
window.onload = nodePage;
