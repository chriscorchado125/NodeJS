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
                break;
        }
        if (getCurrentPage() !== 'about') {
            document.getElementById(currentNavItem).className += ' nav-item-active';
            document.getElementById('profiles').style.display = 'none';
        }
    }, 50);
}
window.onload = nodePage;
