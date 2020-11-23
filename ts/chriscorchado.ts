"use strict";

const MAX_ITEMS_PER_PAGE = 50;

const params = new URLSearchParams(window.location.search);
const searchBox = document.getElementById("searchSite")! as HTMLInputElement;
const searchSubmit = document.getElementById("searchSubmit")! as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn")! as HTMLElement;

/**
 * Get the current page name
 * @return {string} - page name
 */
const getCurrentPage = () => {
  let thisPage = window.location.pathname
    .split("/")
    .filter(function (pathnamePieces) {
      return pathnamePieces.length;
    })
    .pop();

  let pageName = "about";

  if (thisPage) pageName = thisPage.split(".")[0];

  if (pageName == "index" || pageName == "nodejs") pageName = "about";

  return pageName;
};

/**
 * After the contact form is submitted set a thank you message
 * with a countdown that then forwards to the homepage
 * @param {number} second - number of seconds to count down
 */
const formSubmitted = (seconds: number) => {
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
      window.location.replace(
        // use replace instead of assign for the sake of history
        location.href.substring(0, location.href.lastIndexOf("/") + 1) // get the base site URL including sub-folder
      );
    }
  }, 1000);
};

/**
 * Triggered search
 */
const search = () => {
  window.location.href = window.location.href.split("?")[0] + "?q=" + searchBox.value.replace(/[^\w\s]/gi, "");
}

/**
 * Manage the URL for search and paging
 * @param {string} action - to take
 * @param {string} [value] - next or prev
 */
const manageURL = (action: string, value?: string) => {
  let thisURL = window.location.href.split("?");

  switch (action) {
    case "clearSearch":
      window.location.href = thisURL[0] + "?clear";
      break;
    case "sync":
      // sync querystring and search input box values while searching
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
      if (params.get("q")) searched = "q=" + params.get("q") + "&";

      // hidden field which holds the first and last record ids
      let pageID = document.querySelector("#paging")! as HTMLElement;

      let pageNumber = 2;
      if (params.get("page")) pageNumber = parseInt(params.get("page")) - 1;

      if (value === "next") {
        if (params.get("page")) pageNumber = parseInt(params.get("page")) + 1;
      }

      window.location.href =
        thisURL[0].replace("#", "") + "?page=" + pageNumber + searched + "&dir=" + value;
      break;
  }
};

/**
 * Add profile links
 * @param {string} id - ID of element to insert into
 */
const addProfiles = (id: string) => {
  document.getElementById(id).innerHTML = `
  <div class="icon" id="pdf-resume">
    <a href="https://chriscorchado.com/resume/Chris-Corchado-resume-2020.pdf" target="_blank" rel="noopener" title="Opening a new window">
      <img alt="Link to PDF Resume" src="https://chriscorchado.com/images/pdfIcon.jpg" title="Link to PDF Resume" />
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

// TODO check attributes inside pug = div([innerHtml]="example")
function nodePage() {
  let currentNavItem = "";
  let pageIsSearchable = false;

  setTimeout(function () {
    switch (getCurrentPage()) {
      case "/":
      case "about": // homepage
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
          formSubmitted(5); // set 5 second countdown
        } else {
          // show the form and capture the current site URL
          const webLocation = document.getElementById(
            "edit-field-site-0-value"
          )! as HTMLInputElement;

          webLocation.value = location.toString();

          document.getElementById("edit-mail").focus();
        }
        break;
    }

    // the home/about link is an image and not text
    if (getCurrentPage() !== "about") {
      document.getElementById(currentNavItem).className += " nav-item-active";
    }

    if (pageIsSearchable) {
      document.getElementById("search-container").style.display = "block";

      if (params.get("clear") !== null) {
        searchBox.focus();
        history.pushState(null, null, window.location.protocol + "//" + window.location.host + window.location.pathname);
      }

      // only allow the alphabet and spaces when searching
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

      // setup record counts
      let recordCount;

      if (document.getElementById("recordCount")) {
        recordCount = parseInt(document.getElementById("recordCount").innerText);
      } else {
        recordCount = 0;
      }

      let currentPageNumber = parseInt(params.get("page")) || 1;

      let recordText = "Items";
      if (recordCount === 1) recordText = "Item";

      let firstNumberRange;

      if (currentPageNumber > 1) {
        firstNumberRange = ((currentPageNumber - 1) * MAX_ITEMS_PER_PAGE) + 1;
      } else {
        firstNumberRange = 1;
      }

      let currentRecords = currentPageNumber * recordCount;
      let pagingText = document.getElementById("paging-info");

      // paging with prev and next
      if (
        document.getElementById("nextLink") ||
        currentRecords >= MAX_ITEMS_PER_PAGE ||
        currentPageNumber > 1
      ) {
        if (recordCount < currentRecords) {
          // handle the last page counts
          if (recordCount === 1) {
            pagingText.innerHTML = `Item ${firstNumberRange + recordCount}-${
              firstNumberRange + recordCount
            }`;
          } else {
            pagingText.innerHTML = `Items ${firstNumberRange}-${
              (firstNumberRange + recordCount) - 1
            }`;
          }
        } else {
          pagingText.innerHTML = `Items ${firstNumberRange}-${currentRecords}`;
        }
      } else {
        // no paging
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
