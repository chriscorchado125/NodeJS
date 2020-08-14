'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_BASE = 'https://chriscorchado.com/drupal8';
const MAX_ITEMS_PER_PAGE = 50;
const SITE_SEARCH_ID = 'searchSite';
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
const getPage = (page, search, pagingURL) => __awaiter(void 0, void 0, void 0, function* () {
    let data = null;
    setLoading(true);
    if (search) {
    }
    if (page == 'contact') {
        if (location.toString().indexOf('submitted') == -1) {
            yield fetch(`${API_BASE}/contact/feedback`)
                .then((resp) => {
                return resp.ok ? resp.text() : Promise.reject(resp.statusText);
            })
                .then((page) => {
                data = page.replace(/\/drupal8/g, API_BASE);
                let form = data.substr(data.indexOf('<form'), data.indexOf('</form>'));
                form = form.substr(0, form.indexOf('</form>') + 8);
                form = form.replace('Your email address', 'Email');
                let script = data.substr(data.indexOf('<script type="application/json" data-drupal-selector="drupal-settings-json">'), data.indexOf('></script>'));
                script = script.substr(0, script.indexOf('</script>') + 9);
                data = `<h1>Contact</h1>${form} ${script}`;
            })
                .catch((error) => {
                alert(`Sorry an error has occurred: ${error}`);
            });
        }
        renderPage(data, page);
        setLoading(false);
        return false;
    }
    else {
        if (pagingURL) {
            data = yield getData(pagingURL);
        }
        else {
            switch (page) {
                case 'about':
                    data = yield getData(`${API_BASE}/jsonapi/node/page?fields[node--page]=id,title,body&
              filter[id][operator]=CONTAINS&
              filter[id][value]=ca23f416-ad70-41c2-9228-52ba6577abfe`);
                    break;
                case 'companies':
                    if (search) {
                        data = yield getData(`${API_BASE}/jsonapi/node/company?filter[or-group][group][conjunction]=OR&
                filter[field_company_name][operator]=CONTAINS&
                filter[field_company_name][value]=${search}&
                filter[field_company_name][condition][memberOf]=or-group&
                filter[field_job_title][operator]=CONTAINS&
                filter[field_job_title][value]=${search}&
                filter[field_job_title][condition][memberOf]=or-group&
                filter[body.value][operator]=CONTAINS&
                filter[body.value][value]=${search}&
                filter[body.value][condition][memberOf]=or-group&
                sort=-field_end_date&
                include=field_company_screenshot&
                page[limit]=${MAX_ITEMS_PER_PAGE}`);
                    }
                    else {
                        data = yield getData(`${API_BASE}/jsonapi/node/company?sort=-field_end_date&
                include=field_company_screenshot&
                page[limit]=${MAX_ITEMS_PER_PAGE}`);
                    }
                    break;
                case 'courses':
                    if (search) {
                        data = yield getData(`${API_BASE}/jsonapi/node/awards?filter[or-group][group][conjunction]=OR&
                filter[title][operator]=CONTAINS&
                filter[title][value]=${search}&
                filter[title][condition][memberOf]=or-group&
                filter[field_award_date][operator]=CONTAINS&
                filter[field_award_date][value]=${search}&
                filter[field_award_date][condition][memberOf]=or-group&
                sort=-field_award_date&
                include=field_award_pdf,field_track_image,field_award_images&
                page[limit]=${MAX_ITEMS_PER_PAGE}`);
                    }
                    else {
                        data = yield getData(`${API_BASE}/jsonapi/node/awards?sort=-field_award_date&
                include=field_award_pdf,field_track_image,field_award_images&
                page[limit]=${MAX_ITEMS_PER_PAGE}`);
                    }
                    break;
                case 'projects':
                    if (search) {
                        data = yield getData(`${API_BASE}/jsonapi/node/project?filter[or-group][group][conjunction]=OR&
              filter[title][operator]=CONTAINS&
              filter[title][value]=${search}&
              filter[title][condition][memberOf]=or-group&
              filter[taxonomy_term--tags][path]=field_project_technology.name&
              filter[taxonomy_term--tags][operator]=CONTAINS&
              filter[taxonomy_term--tags][value]=${search}&
              filter[taxonomy_term--tags][condition][memberOf]=or-group&
              filter[field_company.title][operator]=CONTAINS&
              filter[field_company.title][value]=${search}&
              filter[field_company.title][condition][memberOf]=or-group&
              filter[field_screenshot.meta.alt][operator]=CONTAINS&
              filter[field_screenshot.meta.alt][value]=${search}&
              filter[field_screenshot.meta.alt][condition][memberOf]=or-group&
              filter[field_date][operator]=CONTAINS&filter[field_date][value]=${search}&
              filter[field_date][condition][memberOf]=or-group&
              sort=-field_date&
              include=field_project_technology,field_company,field_screenshot&fields[node--company]=field_company_name,field_video_url&
              fields[node--project]=title,body,field_date,field_screenshot,field_project_technology,field_company,field_video_url&
              page[limit]=${MAX_ITEMS_PER_PAGE}`);
                    }
                    else {
                        data = yield getData(`${API_BASE}/jsonapi/node/project?sort=-field_date&
                include=field_project_technology,field_company,field_screenshot&
                fields[node--company]=field_company_name,field_video_url&
                fields[node--project]=title,body,field_date,field_screenshot,field_project_technology,field_company,field_video_url&
                page[limit]=${MAX_ITEMS_PER_PAGE}`);
                    }
                    break;
            }
        }
    }
    let passedInCount = {
        currentCount: document.getElementById('lastCount')
            ? document.getElementById('lastCount').textContent
            : 1,
    };
    data = Object.assign(Object.assign({}, data), { passedInCount });
    if (data.data.length) {
        renderPage(data, page, search, data.links.next, data.links.prev);
    }
    else {
        updateInterface(search);
    }
});
const updateInterface = (search) => {
    noRecordsFound('noRecords', search, 'navigation', 'No matches found for');
};
const cleanURL = (urlToClean) => {
    let fixedURL = '';
    let strings = urlToClean.split(' ');
    strings.forEach((element) => {
        if (element)
            fixedURL += element.replace(/$\n^\s*/gm, '');
    });
    return fixedURL;
};
const getData = (dataURL) => __awaiter(void 0, void 0, void 0, function* () {
    let result = {};
    yield fetch(cleanURL(dataURL))
        .then((response) => response.json())
        .then((data) => (result = data));
    return result;
});
const searchClear = (searchTextBoxID) => {
    const inputSearchBox = document.getElementById(searchTextBoxID);
    inputSearchBox.value = '';
    getPage(getCurrentPage());
    updateInterface();
    document.getElementById('searchBtn').style.visibility = 'hidden';
};
const searchFilter = (event) => {
    let charCode = event.keyCode || event.which;
    return ((charCode >= 65 && charCode <= 122) ||
        (charCode >= 96 && charCode <= 105) ||
        (charCode >= 48 && charCode <= 57) ||
        charCode == 16 ||
        charCode == 32);
};
const itemWithSearchHighlight = (itemToHighlight, searchedFor) => {
    let dataToReturn = '';
    if (searchedFor) {
        let searchTerm = new RegExp(searchedFor, 'gi');
        let results = '';
        let searchString = '';
        let searchStringArray = [];
        if (itemToHighlight && +itemToHighlight !== -1) {
            searchString = itemToHighlight.replace('&amp;', '&').replace('&#039;', "'");
        }
        if (searchString.indexOf('<ul>') !== -1) {
            let listItem = '';
            let searchWithHTML = searchString.replace('<ul>', '').replace('</ul>', '');
            searchStringArray = searchWithHTML.split('<li>');
            searchStringArray.forEach((element) => {
                if (element.length > 3) {
                    searchString = element.slice(0, element.lastIndexOf('<'));
                    if (searchString.match(searchTerm)) {
                        results = searchString.replace(searchTerm, (match) => `<span class="highlightSearchText">${match}</span>`);
                        listItem += `<li>${results}</li>`;
                    }
                    else {
                        listItem += `<li>${searchString}</li>`;
                    }
                }
            });
            dataToReturn = `<ul>${listItem}</ul>`;
        }
        else {
            if (searchString.match(searchTerm)) {
                results = searchString.replace(searchTerm, (match) => `<span class="highlightSearchText">${match}</span>`);
                dataToReturn += results;
            }
            else {
                dataToReturn += searchString;
            }
        }
    }
    return dataToReturn || itemToHighlight;
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
const setPageHTML = (values) => {
    let item = '';
    let page = values[0];
    let data = values[1];
    let itemTitle = values[2];
    let itemJobTitle = values[3];
    let itemBody = values[4];
    let imgPieces = values[5];
    let startDate = values[6];
    let endDate = values[7];
    let itemTrackImage = values[8];
    let itemPDF = values[9];
    let itemDate = values[10];
    let itemCompanyName = values[11];
    let itemTechnology = values[12];
    let searchedFor = values[13];
    let includedTechnologyItem = values[14];
    switch (page) {
        case 'about':
            document.getElementById('search-container').style.display = 'none';
            document.getElementById('logo').getElementsByTagName('img')[0].style.border =
                '1px dashed #7399EA';
            let aboutData = data.attributes.body.value.toString().split('<hr />');
            document.getElementById('profiles').innerHTML = aboutData[1];
            return `<h1>${itemTitle}</h1> ${aboutData[0]}`;
            break;
        case 'contact':
            if (location.toString().indexOf('/contact.html?submitted=true') !== -1) {
                formSubmitted(5);
            }
            else {
                document.getElementsByClassName('container')[0].innerHTML = data.toString();
                document.getElementById('contact-link').className += ' nav-item-active';
                const webLocation = document.getElementById('edit-field-site-0-value');
                webLocation.value = location.toString();
                document.getElementById('edit-mail').focus();
            }
            break;
        case 'companies':
            return `<div class="company-container col shadow">

          <div class="company-name">${itemTitle}</div>
          <div class="company-job-title">${itemJobTitle}</div>
          <div class="body-container">${itemBody}</div>

          <div class="screenshot-container">
            <img loading=lazy src=${getFullUrlByPage(imgPieces[0], page)} 
            class="company-screenshot" 
            alt="${data.attributes.title} Screenshot" 
            title="${data.attributes.title} Screenshot"/>
          </div>

          <div class="employment-dates">${startDate} - ${endDate}</div>
        </div>`;
            break;
        case 'courses':
            item = `<div class="course-box box">
          <h2>${itemTitle}</h2>

          <div>
            <img loading=lazy src="${getFullUrlByPage(imgPieces[0], page)}" 
              alt="${itemTitle.replace(/(<([^>]+)>)/gi, '')}" 
              title="${itemTitle.replace(/(<([^>]+)>)/gi, '')}" />
          </div>

          <div class="course-wrapper">

            <span class="course-date">${itemDate}</span>

            <span class="course-links">
              <a href="${getFullUrlByPage(itemPDF, page)}" target="_blank">
                <img loading=lazy src="https://chriscorchado.com/images/pdfIcon.jpg" height="25" 
                title="View the PDF Certificate" alt="View the PDF Certificate"/>
              </a>
            </span>`;
            if (itemTrackImage) {
                item += `<span class="course-links">
            <a href="${getFullUrlByPage(itemTrackImage, page)}" data-featherlight="image">
              <img loading=lazy src="https://chriscorchado.com/images/linkedIn-track.png" height="25" 
              title="View the Courses in the Track" alt="View the Courses in the Track" />
            </a>
          </span>`;
            }
            return (item += `</div></div>`);
            break;
        case 'projects':
            let imgAltCount = 0;
            item = `<div class="project col">
        <div class="project-title">${itemTitle}</div>
        <div class="project-company">${itemCompanyName} <span class="project-date">(${itemDate})</span></div> 
        <div class="body-container">${itemBody}</div>`;
            if (imgPieces) {
                let itemGridClass = `project-item-grid project-items${data.relationships.field_screenshot.data.length}`;
                let section = `<section data-featherlight-gallery data-featherlight-filter="a" class="${itemGridClass}">`;
                let screenshotAlt = new Array();
                data.relationships.field_screenshot.data.forEach((screenshot) => {
                    screenshotAlt.push(screenshot.meta.alt);
                });
                imgAltCount = 0;
                imgPieces.forEach((img) => {
                    let pieces = img.split(',');
                    pieces.forEach((item) => {
                        let projectImage = getFullUrlByPage(item, page);
                        section += `<div class="project-item shadow" title='${screenshotAlt[imgAltCount]}'>
            
              <a href=${projectImage} class="gallery">
                <div class="project-item-desc">
                  ${itemWithSearchHighlight(screenshotAlt[imgAltCount], searchedFor)}
                </div>

                <img loading=lazy src='${projectImage}' alt='${screenshotAlt[imgAltCount]}' 
                  title='${screenshotAlt[imgAltCount]}' />
              </a>
            </div>`;
                        imgAltCount++;
                    });
                });
                section += `</section>`;
                item += section;
            }
            if (data.attributes.field_video_url) {
                data.attributes.field_video_url.forEach((img) => {
                    item += `<span title="Play Video"><a href="${img}" 
          data-featherlight="iframe" 
          data-featherlight-iframe-frameborder="0" 
          data-featherlight-iframe-allowfullscreen="true" 
          data-featherlight-iframe-allow="autoplay; encrypted-media"
          data-featherlight-iframe-style="display:block;border:none;height:85vh;width:85vw;" class="play-video">
            Play Video <img loading=lazy src="https://chriscorchado.com/images/play_vidoe_icon.png" alt="Play Video" width="20" />
          </a></span>`;
                });
            }
            item += `<div class="project-technology">${itemTechnology.slice(0, -2)}</div>`;
            item += `</div>`;
            return item;
            break;
    }
};
const noRecordsFound = (noRecordID, search, appendToID, msg) => {
    if (document.getElementById(noRecordID)) {
        document.getElementById(noRecordID).remove();
    }
    if (!document.getElementById(noRecordID) && search) {
        document.getElementById('pagination').style.display = 'none';
        document.getElementsByClassName('container')[0].removeAttribute('style');
        let notFound = document.createElement('div');
        notFound.id = noRecordID;
        notFound.innerHTML = `${msg} '${search}'`;
        document.getElementById(appendToID).appendChild(notFound);
        document.getElementById('preloadAnimation').remove();
        document.getElementById('searchCount').innerHTML =
            '<b style="color:red">No match</b>';
    }
    else {
        document.getElementById('pagination').style.display = 'inline-block';
        document.getElementById('searchBtn').style.visibility = 'visible';
    }
};
const getIncludedData = (data) => {
    let includedAssetFilename = [''];
    let includedCompanyName = [''];
    let includedTechnologyName = [''];
    let includedTechnologyIcon = [''];
    data.included.forEach((included_element) => {
        if (included_element.attributes.description) {
            let iconFileNamePath = /"(.*?)"/.exec(included_element.attributes.description.value);
            includedTechnologyIcon[included_element.id] = iconFileNamePath[1];
        }
        if (included_element.attributes.filename) {
            includedAssetFilename[included_element.id] = included_element.attributes.filename;
        }
        if (included_element.attributes.field_company_name) {
            includedCompanyName[included_element.id] =
                included_element.attributes.field_company_name;
        }
        if (included_element.attributes.name) {
            includedTechnologyName[included_element.id] = included_element.attributes.name;
        }
    });
    return [
        includedCompanyName,
        includedAssetFilename,
        includedTechnologyName,
        includedTechnologyIcon,
    ];
};
const getElementRelationships = (element, includedAssetFilename, includedCompanyName, includedTechnologyName, includedTechnologyIcon) => {
    let imgPieces = [];
    let itemPDF = '';
    let itemTrackImage = '';
    let itemCompanyName = '';
    let itemTechnology = '';
    let itemTechnologyIcon = '';
    let includedTechnologyItem = [];
    if (element.relationships.field_award_images &&
        element.relationships.field_award_images.data) {
        imgPieces.push(includedAssetFilename[element.relationships.field_award_images.data[0].id]);
    }
    if (element.relationships.field_award_pdf &&
        element.relationships.field_award_pdf.data) {
        itemPDF = includedAssetFilename[element.relationships.field_award_pdf.data.id];
    }
    if (element.relationships.field_track_image &&
        element.relationships.field_track_image.data) {
        itemTrackImage =
            includedAssetFilename[element.relationships.field_track_image.data.id];
    }
    if (element.relationships.field_company && element.relationships.field_company.data) {
        itemCompanyName = includedCompanyName[element.relationships.field_company.data.id];
    }
    if (element.relationships.field_company_screenshot &&
        element.relationships.field_company_screenshot.data) {
        imgPieces.push(includedAssetFilename[element.relationships.field_company_screenshot.data[0].id]);
    }
    if (element.relationships.field_screenshot &&
        element.relationships.field_screenshot.data) {
        for (let i = 0; i < element.relationships.field_screenshot.data.length; i++) {
            imgPieces.push(includedAssetFilename[element.relationships.field_screenshot.data[i].id]);
        }
    }
    if (element.relationships.field_project_technology &&
        element.relationships.field_project_technology.data) {
        for (let i = 0; i < element.relationships.field_project_technology.data.length; i++) {
            itemTechnology +=
                includedTechnologyName[element.relationships.field_project_technology.data[i].id] + ', ';
            itemTechnologyIcon +=
                includedTechnologyIcon[element.relationships.field_project_technology.data[i].id] + ', ';
            let technologyItem = {
                name: includedTechnologyName[element.relationships.field_project_technology.data[i].id],
                image: includedTechnologyIcon[element.relationships.field_project_technology.data[i].id],
            };
            includedTechnologyItem.push(technologyItem);
        }
    }
    return [
        imgPieces,
        itemPDF,
        itemTrackImage,
        itemCompanyName,
        itemTechnology,
        itemTechnologyIcon,
        includedTechnologyItem,
    ];
};
const renderPage = (data, page, searchedFor, next, prev) => {
    let pageIsSearchable = false;
    if (page == 'contact') {
        setPageHTML([page, data]);
        return;
    }
    let includedCompanyName = [''];
    let includedAssetFilename = [''];
    let includedTechnologyName = [''];
    let includedTechnologyIcon = [''];
    if (data.included) {
        let allIncludedData = getIncludedData(data);
        includedCompanyName = allIncludedData[0];
        includedAssetFilename = allIncludedData[1];
        includedTechnologyName = allIncludedData[2];
        includedTechnologyIcon = allIncludedData[3];
    }
    let item = '', itemBody = '', currentNavItem = '', itemTitle = '', itemDate = '', startDate = '', endDate = '', itemJobTitle = '', itemTechnology = '', itemTechnologyIcon = '', itemCompanyName = '', itemWorkType = '', itemPDF = '', itemTrackImage = '';
    let itemCount = 0;
    let imgPieces = [];
    let includedTechnologyItem = [];
    data.data.forEach((element) => {
        itemTitle = element.attributes.title;
        itemBody = element.attributes.body ? element.attributes.body.value : '';
        itemDate = element.attributes.field_date || element.attributes.field_award_date;
        itemJobTitle = element.attributes.field_job_title;
        startDate = element.attributes.field_start_date;
        endDate = element.attributes.field_end_date;
        itemWorkType = element.attributes.field_type == 'full' ? 'Full-Time' : 'Contract';
        itemTechnology = '';
        itemTrackImage = '';
        imgPieces = [];
        includedTechnologyItem = [];
        if (element.relationships) {
            let relationshipData = getElementRelationships(element, includedAssetFilename, includedCompanyName, includedTechnologyName, includedTechnologyIcon);
            if (!imgPieces.includes(relationshipData[0].toString())) {
                imgPieces.push(relationshipData[0].toString());
            }
            itemPDF = relationshipData[1].toString();
            if (relationshipData[2])
                itemTrackImage = relationshipData[2].toString();
            itemCompanyName = relationshipData[3].toString();
            itemTechnology += relationshipData[4].toString();
            itemTechnologyIcon += relationshipData[5].toString();
            includedTechnologyItem.push(relationshipData[6]);
        }
        if (itemDate) {
            if (page == 'projects')
                itemDate = itemDate.split('-')[0];
            if (page == 'courses')
                itemDate = getMonthYear(itemDate);
        }
        if (startDate)
            startDate = getMonthYear(startDate);
        if (endDate)
            endDate = getMonthYear(endDate);
        itemTitle = itemTitle.replace('&amp;', '&');
        if (searchedFor) {
            itemTitle = itemWithSearchHighlight(itemTitle, searchedFor);
            itemDate = itemWithSearchHighlight(itemDate, searchedFor);
            startDate = itemWithSearchHighlight(startDate, searchedFor);
            endDate = itemWithSearchHighlight(endDate, searchedFor);
            itemBody = itemWithSearchHighlight(itemBody, searchedFor);
            itemJobTitle = itemWithSearchHighlight(itemJobTitle, searchedFor);
            itemTechnology = itemWithSearchHighlight(itemTechnology, searchedFor);
            itemCompanyName = itemWithSearchHighlight(itemCompanyName, searchedFor);
            if (itemWorkType !== 'node-company') {
                itemWorkType = itemWithSearchHighlight(itemWorkType, searchedFor);
            }
        }
        itemCount++;
        const allValues = [
            page,
            element,
            itemTitle,
            itemJobTitle,
            itemBody,
            imgPieces,
            startDate,
            endDate,
            itemTrackImage,
            itemPDF,
            itemDate,
            itemCompanyName,
            itemTechnology,
            searchedFor,
            includedTechnologyItem,
        ];
        switch (page) {
            case 'about':
                item = setPageHTML(allValues);
                break;
            case 'companies':
                item += setPageHTML(allValues);
                break;
            case 'courses':
                item += setPageHTML(allValues);
                break;
            case 'projects':
                item += setPageHTML(allValues);
                break;
        }
    });
    let pageHasGallery = false;
    switch (page) {
        case 'about':
            currentNavItem = 'about-link';
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
    }
    if (page !== 'about') {
        document.getElementById(currentNavItem).className += ' nav-item-active';
    }
    document.getElementsByClassName('container')[0].innerHTML = item;
    if (pageIsSearchable) {
        document.getElementById('search-container').style.display = 'block';
    }
    if (pageHasGallery) {
        $('a.gallery').featherlightGallery({
            previousIcon: '&#9664;',
            nextIcon: '&#9654;',
            galleryFadeIn: 200,
            galleryFadeOut: 300,
        });
    }
    setPagination(itemCount, data.passedInCount.currentCount, prev, next);
    setLoading(false);
};
const getFullUrlByPage = (linkToFix, page) => {
    let pathToResource = 'No Path Found';
    switch (page) {
        case 'companies':
            pathToResource = 'company-screenshot';
            break;
        case 'courses':
            if (linkToFix.indexOf('.pdf') !== -1) {
                pathToResource = 'award-pdf';
            }
            else {
                pathToResource = 'award-images';
            }
            break;
        case 'projects':
            pathToResource = 'project-screenshot';
            break;
    }
    return `${API_BASE}/sites/default/files/${pathToResource}/${linkToFix}`;
};
const getSearchCount = (count, searchCountID) => {
    let searchElement = document.getElementById(SITE_SEARCH_ID);
    if (searchElement.value) {
        if (count <= MAX_ITEMS_PER_PAGE) {
            document.getElementById(searchCountID).innerHTML =
                count + `  ${count == 1 ? 'Item' : 'Items'}`;
        }
        else {
            document.getElementById(searchCountID).innerHTML =
                MAX_ITEMS_PER_PAGE + `  ${+MAX_ITEMS_PER_PAGE == 1 ? 'Item' : 'Items'}`;
        }
        return `${count} ${count == 1 ? 'Item' : 'Items'} `;
    }
};
const getSearchOffset = (link) => {
    let nextURL = link.href.replace(/%2C/g, ',').replace(/%5B/g, '[').replace(/%5D/g, ']');
    return nextURL.substring(nextURL.search('offset') + 8, nextURL.search('limit') - 6);
};
const setPagination = (count, paginationTotal, prev, next) => {
    let dataOffset = 0;
    let prevLink = '';
    let nextLink = '';
    if (next)
        dataOffset = getSearchOffset(next);
    let dataOffsetText = getSearchCount(count, 'searchCount');
    if (!next && !prev) {
        document.getElementById('searchCount').innerHTML = `<span id="totalItems">${count}</span>
   ${count == 1 ? 'Item' : 'Items'}`;
    }
    else {
        let currentCount = +dataOffset / MAX_ITEMS_PER_PAGE;
        if (count == dataOffset) {
            dataOffsetText = `Items 1-<span id="lastCount">${MAX_ITEMS_PER_PAGE}</span>`;
        }
        else {
            if (currentCount !== 0) {
                dataOffsetText = `Items ${currentCount * MAX_ITEMS_PER_PAGE - MAX_ITEMS_PER_PAGE}-<span id="lastCount">${currentCount * MAX_ITEMS_PER_PAGE}</span>`;
            }
            else {
                dataOffsetText = `Items ${paginationTotal}-<span id="lastCount">${+paginationTotal + count}</span>`;
            }
        }
        document.getElementById('searchCount').innerHTML = `<span id="paging-info">${dataOffsetText}</span>`;
        prevLink = prev
            ? `<a href="#" class="pager-navigation" title="View the previous page" 
          onclick="getPage(getCurrentPage(), document.getElementById('${SITE_SEARCH_ID}').value,'${prev.href}')">Prev</a>`
            : `<span class="pager-navigation disabled" title="There is no previous page available">Prev</span>`;
        nextLink = next
            ? `<a href="#" class="pager-navigation" title="View the next page" 
          onclick="getPage(getCurrentPage(), document.getElementById('${SITE_SEARCH_ID}').value,'${next.href}')">Next</a>`
            : `<span class="pager-navigation disabled" title="There is no next page available">Next</span>`;
    }
    let paginationCount = document.getElementById('pagination');
    if (count < MAX_ITEMS_PER_PAGE && paginationTotal === 1) {
        paginationCount.style.display = 'none';
    }
    else {
        paginationCount.style.display = 'inline-block';
        paginationCount.innerHTML = `${prevLink}  ${nextLink}`;
    }
};
const updateMenuPages = (currentPage, targetContainer) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`${API_BASE}/api/menu_items/main?_format=json`)
        .then((resp) => {
        return resp.ok ? resp.json() : Promise.reject(resp.statusText);
    })
        .then((pageData) => {
        let pageName = '';
        let pageLink = '';
        let homepageStyle = '';
        if (currentPage == 'about') {
            homepageStyle = 'border: 1px dashed rgb(115, 153, 234);';
        }
        let generatedPageLinks = `<a href="index.html" class="navbar-brand" id="logo" style="${homepageStyle}">
        <img src="./images/chriscorchado-initials-logo.png" title="Home" alt="Home">
      </a>`;
        for (let page in pageData) {
            pageName = pageData[page].title;
            if (pageName == 'Home' || pageName == 'About' || !pageData[page].enabled) {
                continue;
            }
            let activeNavItem = '';
            if (currentPage == pageName.toLowerCase()) {
                activeNavItem = 'nav-item-active';
            }
            pageLink = pageName;
            if (pageName == 'Companies')
                pageName = 'History';
            generatedPageLinks += `<a href="${pageLink.toLowerCase()}.html" 
        class="nav-item nav-link ${activeNavItem}" 
        title="${pageName}" 
        id="${pageName.toLowerCase()}-link">${pageName}</a>`;
        }
        document.getElementById(targetContainer).innerHTML = generatedPageLinks;
    })
        .catch((error) => {
        alert(`Sorry an error has occurred: ${error}`);
    });
});
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
const debounceMe = debounce(() => {
    const inputSearchBox = document.getElementById(SITE_SEARCH_ID);
    getPage(getCurrentPage(), inputSearchBox.value);
    updateInterface();
}, 500);
window.onload = () => {
};
const getCurrentPage = () => {
    let thisPage = window.location.pathname
        .split('/')
        .filter(function (pathnamePieces) {
        return pathnamePieces.length;
    })
        .pop();
    let pageName = thisPage.split('.')[0];
    if (pageName == 'index' || pageName == 'html5')
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
