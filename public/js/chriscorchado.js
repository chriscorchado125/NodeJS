'use strict';
fetch('./includes/nav.html')
    .then((response) => {
    return response.text();
})
    .then((data) => {
    document.getElementById('navigation').innerHTML = data;
});
fetch('./includes/footer.html')
    .then((response) => {
    return response.text();
})
    .then((data) => {
    document.getElementById('footer').innerHTML = data;
});
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
                pageIsSearchable = false;
                pageHasGallery = false;
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
            document.getElementById('profiles').style.display = 'none';
        }
    }, 50);
}
window.onload = nodePage;
