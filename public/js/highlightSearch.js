const highlightSearch = (itemToHighlight, searchedFor) => {
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
module.exports = highlightSearch;
