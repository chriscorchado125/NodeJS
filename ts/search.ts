import * as utilityJS from './utilities.js'

export const MAX_ITEMS_PER_PAGE = 50
export const params = new URLSearchParams(window.location.search)
export const searchBox = document.getElementById('search-site')! as HTMLInputElement
export const searchSubmit = document.getElementById('search-submit')! as HTMLInputElement
export const searchClear = document.getElementById('search-clear-btn')! as HTMLInputElement

/**
 * Triggered search
 */
export const search = () => {
  if (!searchBox.value) {
    // Do nothing
  } else {
    utilityJS.animateLogo('logo-image', 'spin')
    window.location.href = `${window.location.href.split('?')[0]}?q=${searchBox.value.replace(/[^\w\s]/gi, '')}`
    searchBox.select()
    utilityJS.animateLogo('logo-image', '')
  }
}

/**
 * Handle no records
 * @param {string} noRecordID - id of div to create
 * @param {string} searchedFor - searched for text
 * @param {string} appendToID - id of element to append to
 * @param {string} msg - message
 */
export const noRecordsFound = (
  noRecordID: string,
  searchedFor: string,
  appendToID: string,
  msg: string
): void => {
  // Create a div with the error
  const notFound = document.createElement('div')
  notFound.id = noRecordID
  notFound.innerHTML = `${msg} '${searchedFor}'`

  // Add error message
  const appendToEL = document.getElementById(appendToID) as HTMLElement
  appendToEL.appendChild(notFound)
}

/**
 * Filter what a user is allowed to enter in the search field
 * Only allow searching with letters and spaces.  No numbers or special characters
 * @param {KeyboardEvent} event - key event
 * @return {boolean} - true if valid, otherwise false
 */
export const searchFilter = (event: KeyboardEvent): boolean => {
  const allowOnlyLettersAndSpace = /[A-Za-z\s]/
  return allowOnlyLettersAndSpace.test(event.key)
}

/**
 * Manage the URL for search and paging
 * @param {string} action - to take
 * @param {string} [value] - next or prev
 */
export const manageURL = (action: string, value?: string) => {
  const thisURL = window.location.href.split('?')
  let searched = ''
  utilityJS.animateLogo('logo-image', 'spin')

  let pageNumber:any = 2
  if (params.get('page')) {
    pageNumber = params.get('page') || 2
  }

  let searchedFor = params.get('q') as any
  if (searchedFor) {
    // Only allow the alphabet and spaces when searching
    const re = /[A-Za-z\s]gi/
    searchedFor = searchedFor.replace(re, '').replace('20', ' ')
  }

  switch (action) {
    case 'clearSearch':
      document.getElementById('no-records')?.remove()
      window.location.href = `${thisURL[0]}?clear`
      break
    case 'sync':
      // sync querystring and search input box values while searching
      if (params && params.get('q') !== null) {
        searchBox.value = searchedFor
        searchBox.focus()
      }
      break
    case 'paging':

      if (params.get('q')) searched = `q=${params.get('q')}&`

      pageNumber = parseInt(pageNumber, 10)

      if (value === 'prev') {
        if (params.get('page')) pageNumber -= 1
      }

      if (value === 'next') {
        if (params.get('page')) pageNumber += 1
      }

      window.location.href =
        `${thisURL[0].replace('#', '')}?page=${pageNumber}${searched}&dir=${value}`
      break
    default:
  }

  const currentItems = document.getElementById('paging-info')
  if (currentItems?.innerText === '0 Items') {
    noRecordsFound('no-records', searchedFor, 'navigation', 'No matches found for')
  }

  utilityJS.animateLogo('logo-image', '')
}
