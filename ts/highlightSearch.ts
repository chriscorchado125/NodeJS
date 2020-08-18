/**
 * Highlight search term within a string
 * @param {string} itemToHighlight - string to search
 * @param {string} searchedFor - string to search for
 * @return {string} - search result with/without highlight
 */
const highlightSearch = (itemToHighlight: string, searchedFor: string) => {
  let dataToReturn = '';

  if (searchedFor) {
    let searchTerm = new RegExp(searchedFor, 'gi');
    let results = '';

    let searchString = '';
    let searchStringArray = [];

    if (itemToHighlight && +itemToHighlight !== -1) {
      searchString = itemToHighlight.replace('&amp;', '&').replace('&#039;', "'");
    }

    /* check for HTML
     * TODO: use entities within Drupal to avoid adding body content with HTML
     */
    if (searchString.indexOf('<ul>') !== -1) {
      let listItem = '';

      let searchWithHTML = searchString.replace('<ul>', '').replace('</ul>', ''); // remove ul tags
      searchStringArray = searchWithHTML.split('<li>'); // break the li items into an array

      searchStringArray.forEach((element) => {
        if (element.length > 3) {
          searchString = element.slice(0, element.lastIndexOf('<')); // remove closing li tag

          if (searchString.match(searchTerm)) {
            results = searchString.replace(
              searchTerm,
              (match) => `<span class="highlightSearchText">${match}</span>`
            );

            listItem += `<li>${results}</li>`;
          } else {
            listItem += `<li>${searchString}</li>`;
          }
        }
      });

      dataToReturn = `<ul>${listItem}</ul>`;
    } else {
      if (searchString.match(searchTerm)) {
        results = searchString.replace(
          searchTerm,
          (match) => `<span class="highlightSearchText">${match}</span>`
        );

        dataToReturn += results;
      } else {
        dataToReturn += searchString;
      }
    }
  }

  return dataToReturn || itemToHighlight;
};

module.exports = highlightSearch;
