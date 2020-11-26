"use strict";
const MAX_ITEMS_PER_PAGE = 50;
const params = new URLSearchParams(window.location.search);
const searchBox = document.getElementById("searchSite");
const searchSubmit = document.getElementById("searchSubmit");
const searchBtn = document.getElementById("searchBtn");
const getCurrentPage = () => {
    let thisPage = window.location.pathname
        .split("/")
        .filter(function (pathnamePieces) {
        return pathnamePieces.length;
    })
        .pop();
    let pageName = "about";
    if (thisPage)
        pageName = thisPage.split(".")[0];
    if (pageName == "index" || pageName == "nodejs")
        pageName = "about";
    return pageName;
};
const formSubmitted = (seconds) => {
    let countDown = document.createElement("div");
    countDown.style.padding = "50px";
    countDown.innerHTML = `<h2>Thanks For Your Submission</h2>
    <h4>Redirecting to the homepage in <span id="secondCountDown">${seconds}</span> seconds</h4>
    <img id="timer" src="https://chriscorchado.com/images/timer.gif" />`;
    document.getElementsByClassName("container")[0].append(countDown);
    let updateCountDown = setInterval(function () {
        seconds--;
        document.getElementById("secondCountDown").innerHTML = seconds.toString();
        if (seconds === 0) {
            clearInterval(updateCountDown);
            window.location.replace(location.href.substring(0, location.href.lastIndexOf("/") + 1));
        }
    }, 1000);
};
const search = () => {
    window.location.href = window.location.href.split("?")[0] + "?q=" + searchBox.value.replace(/[^\w\s]/gi, "");
};
const manageURL = (action, value) => {
    let thisURL = window.location.href.split("?");
    switch (action) {
        case "clearSearch":
            window.location.href = thisURL[0] + "?clear";
            break;
        case "sync":
            if (params.get("q") !== null) {
                searchBox.value = params
                    .get("q")
                    .replace(/[^\w\s]/gi, "")
                    .replace("20", " ");
                searchBox.focus();
                searchBtn.style.visibility = "visible";
            }
            break;
        case "paging":
            let searched = "";
            if (params.get("q"))
                searched = "q=" + params.get("q") + "&";
            let pageID = document.querySelector("#paging");
            let pageNumber = 2;
            if (params.get("page"))
                pageNumber = parseInt(params.get("page")) - 1;
            if (value === "next") {
                if (params.get("page"))
                    pageNumber = parseInt(params.get("page")) + 1;
            }
            window.location.href =
                thisURL[0].replace("#", "") + "?page=" + pageNumber + searched + "&dir=" + value;
            break;
    }
};
const addProfiles = (id) => {
    document.getElementById(id).innerHTML = `
  <div class="icon" id="html-resume">
    <a href="/resume">
      <img alt="Link to HTML Resume with PDF and Word options" src="https://chriscorchado.com/images/htmlIcon.jpg" />
      <span>Resume</span>
    </a>
  </div>

  <div class="icon" id="profile-linkedin">
    <a href="https://www.linkedin.com/in/chriscorchado/" target="_blank" rel="noopener" title="Opening a new window">
      <img alt="Link to LinkedIn Profile" title="Link to LinkedIn Profile" src="https://chriscorchado.com/images/linkedInIcon.jpg" />
      <span>LinkedIn</span>
    </a>
  </div>

  <div class="icon" id="profile-azure">
    <a href="https://docs.microsoft.com/en-us/users/corchadochrisit-2736/" target="_blank" rel="noopener" title="Opening a new window">
      <img alt="Link to Azure Profile" title="Link to Azure Profile" src="https://chriscorchado.com/images/azureIcon.png" />
      <span>Azure</span>
    </a>
  </div>`;
};
const addResumes = (id) => {
    document.getElementById(id).innerHTML = `
  <div class="icon" id="pdf-resume">
    <a href="https://chriscorchado.com/resume/Chris-Corchado-resume-2020.pdf" target="_blank" rel="noopener" title="Opening a new window">
      <img alt="Link to PDF Resume" src="https://chriscorchado.com/images/pdfIcon.jpg" />
      <span>PDF</span>
    </a>
  </div>

  <div class="icon" id="word-resume">
    <a href="https://chriscorchado.com/resume/Chris-Corchado-resume-2020.docx" title="File will download">
      <img alt="Link to MS Word Resume" src="https://chriscorchado.com/images/wordIcon.jpg" />
      <span>Word</span>
    </a>
  </div>
`;
};
function nodePage() {
    let currentNavItem = "";
    let pageIsSearchable = false;
    setTimeout(function () {
        switch (getCurrentPage()) {
            case "/":
            case "about":
                currentNavItem = "about-link";
                document.getElementById("logo").getElementsByTagName("img")[0].style.border =
                    "1px dashed #7399EA";
                addProfiles("profiles");
                document.getElementById("nodeJS").setAttribute("class", "shadow-version noLink");
                document.getElementById("nodeJS-here").style.display = "block";
                break;
            case "companies":
                currentNavItem = "companies-link";
                pageIsSearchable = true;
                break;
            case "courses":
                currentNavItem = "courses-link";
                pageIsSearchable = true;
                break;
            case "projects":
                currentNavItem = "projects-link";
                pageIsSearchable = true;
                break;
            case "contact":
                currentNavItem = "contact-link";
                addProfiles("profiles");
                if (params.get("submitted") === "true") {
                    formSubmitted(5);
                }
                else {
                    const webLocation = document.getElementById("edit-field-site-0-value");
                    webLocation.value = location.toString();
                    document.getElementById("edit-mail").focus();
                }
                break;
            case "resume":
                addResumes("profiles");
                break;
        }
        if (getCurrentPage() !== "about" && getCurrentPage() !== "resume") {
            document.getElementById(currentNavItem).className += " nav-item-active";
        }
        if (pageIsSearchable) {
            document.getElementById("search-container").style.display = "block";
            if (params.get("clear") !== null) {
                searchBox.focus();
                history.pushState(null, null, window.location.protocol + "//" + window.location.host + window.location.pathname);
            }
            const re = new RegExp(('[a-zA-Z \s]'));
            searchBox.addEventListener("keydown", (event) => {
                if (re.exec(event.key) == null) {
                    event.preventDefault();
                    return false;
                }
            });
            searchSubmit.addEventListener("click", (event) => {
                event.preventDefault();
                search();
            });
            searchBtn.addEventListener("click", (event) => {
                event.preventDefault();
                manageURL("clearSearch");
            });
            let recordCount;
            if (document.getElementById("recordCount")) {
                recordCount = parseInt(document.getElementById("recordCount").innerText);
            }
            else {
                recordCount = 0;
            }
            let currentPageNumber = parseInt(params.get("page")) || 1;
            let recordText = "Items";
            if (recordCount === 1)
                recordText = "Item";
            let firstNumberRange;
            if (currentPageNumber > 1) {
                firstNumberRange = ((currentPageNumber - 1) * MAX_ITEMS_PER_PAGE) + 1;
            }
            else {
                firstNumberRange = 1;
            }
            let currentRecords = currentPageNumber * recordCount;
            let pagingText = document.getElementById("paging-info");
            if (document.getElementById("nextLink") ||
                currentRecords >= MAX_ITEMS_PER_PAGE ||
                currentPageNumber > 1) {
                if (recordCount < currentRecords) {
                    if (recordCount === 1) {
                        pagingText.innerHTML = `Item ${firstNumberRange + recordCount}-${firstNumberRange + recordCount}`;
                    }
                    else {
                        pagingText.innerHTML = `Items ${firstNumberRange}-${(firstNumberRange + recordCount) - 1}`;
                    }
                }
                else {
                    pagingText.innerHTML = `Items ${firstNumberRange}-${currentRecords}`;
                }
            }
            else {
                pagingText.innerHTML = `${recordCount} ${recordText}`;
            }
            if (document.getElementById("prevLink")) {
                document
                    .getElementById("prevLink")
                    .addEventListener("click", (event) => manageURL("paging", "prev"));
            }
            if (document.getElementById("nextLink")) {
                document
                    .getElementById("nextLink")
                    .addEventListener("click", (event) => manageURL("paging", "next"));
            }
            manageURL("sync");
        }
        document.getElementById("preloadContainer").style.display = "none";
    }, 125);
}
window.onload = nodePage;
