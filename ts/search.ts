const params = new URLSearchParams(window.location.search);
const searchBox = document.getElementById("search-site")! as HTMLInputElement;
const searchSubmit = document.getElementById("search-submit")! as HTMLInputElement;
const searchClear = document.getElementById("search-clear-btn")! as HTMLInputElement;

/**
 * Triggered search
 */
const search = () => {
  animateLogo('logo-image', 'spin')
  window.location.href = window.location.href.split("?")[0] + "?q=" + searchBox.value.replace(/[^\w\s]/gi, "");
  animateLogo('logo-image', '')
}

/**
 * Manage the URL for search and paging
 * @param {string} action - to take
 * @param {string} [value] - next or prev
 */
const manageURL = (action: string, value?: string) => {
  let thisURL = window.location.href.split("?");
  animateLogo('logo-image', 'spin')
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
  animateLogo('logo-image', '')
};


