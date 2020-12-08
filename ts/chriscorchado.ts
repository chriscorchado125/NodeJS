import * as utilityJS from './utilities.js'
import * as searchJS from './search.js'

/**
 * Get the current page name
 * @return {string} - page name
 */
const getCurrentPage = () => {
  const thisPage = window.location.pathname
    .split('/')
    .filter(function (pathnamePieces) {
      return pathnamePieces.length
    })
    .pop()

  let pageName = 'about'

  if (thisPage) pageName = thisPage.split('.')[0]

  if (pageName === 'index' || pageName === 'nodejs') pageName = 'about'

  return pageName
}

/**
 * After the contact form is submitted set a thank you message
 * with a countdown that then forwards to the homepage
 * @param {number} second - number of seconds to count down
 */
const formSubmitted = (seconds: number) => {
  const countDown = document.createElement('div')
  countDown.style.padding = '50px'

  let theseSeconds = seconds

  countDown.innerHTML = `<h2>Thanks For Your Submission</h2>
    <h4>Redirecting to the homepage in <span id="secondCountDown">${theseSeconds}</span> seconds</h4>
    <img id="timer" src="https://chriscorchado.com/images/timer.gif" />`

  document.getElementsByClassName('container')[0].append(countDown)

  const updateCountDown = setInterval(function () {
    theseSeconds--
    const secondCountDown = document.getElementById('secondCountDown') as HTMLElement
    secondCountDown.innerHTML = theseSeconds.toString()

    if (theseSeconds === 0) {
      clearInterval(updateCountDown)
      window.location.replace(
        // use replace instead of assign for the sake of history
        location.href.substring(0, location.href.lastIndexOf('/') + 1) // get the base site URL including sub-folder
      )
    }
  }, 1000)
}

/**
 * Add profile links
 * @param {string} id - ID of element to insert into
 */
const addProfiles = (id: string) => {
  const baseDir = window.location.toString().toLocaleLowerCase().indexOf('/nodejs') !== -1 ? '/nodejs' : ''
  let docEl:any = HTMLInputElement
  if (document.getElementById(id)) {
    docEl = document.getElementById(id)! as HTMLInputElement
  }
  docEl.innerHTML = `
  <div class='icon' id='html-resume'>
    <a href='${baseDir}/resume'>
      <img alt='Link to HTML Resume with PDF and Word options' src='https://chriscorchado.com/images/htmlIcon.jpg' />
      <span>Resume</span>
    </a>
  </div>

  <div class='icon' id='profile-linkedin'>
    <a href='https://www.linkedin.com/in/chriscorchado/' target='_blank' rel='noopener' title='Opening a new window'>
      <img alt='LinkedIn Icon' title='Link to LinkedIn Profile' src='https://chriscorchado.com/images/linkedInIcon.jpg' />
      <span>LinkedIn</span>
    </a>
  </div>

  <div class='icon' id='profile-azure'>
    <a href='https://docs.microsoft.com/en-us/users/corchadochrisit-2736/' target='_blank' rel='noopener' title='Opening a new window'>
      <img alt='Azure Icon' title='Link to Azure Profile' src='https://chriscorchado.com/images/azureIcon.png' />
      <span>Azure</span>
    </a>
  </div>`
}

/**
 * Add PDF and Word resume links
 * @param {string} id - ID of element to insert into
 */
const addResumes = (): void => {
  if (document.getElementById('profiles')) {
    const docEl = document.getElementById('profiles')! as HTMLInputElement
    docEl.innerHTML = `
    <div class='icon' id='pdf-resume'>
      <a href='https://chriscorchado.com/resume/Chris-Corchado-resume-2020.pdf' target='_blank' rel='noopener' title='Opening a new window'>
        <img alt='Link to PDF Resume' src='https://chriscorchado.com/images/pdfIcon.jpg' />
        <span>PDF</span>
      </a>
    </div>

    <div class='icon' id='word-resume'>
      <a href='https://chriscorchado.com/resume/Chris-Corchado-resume-2020.docx' title='File will download'>
        <img alt='Link to MS Word Resume' src='https://chriscorchado.com/images/wordIcon.jpg' />
        <span>Word</span>
      </a>
    </div>`
  }
}

// TODO check attributes inside pug = div([innerHtml]="example")
function nodePage () {
  let currentNavItem = ''
  let pageIsSearchable = false

  utilityJS.animateLogo('logo-image', 'spin')

  const docLogo = document.getElementById('logo')! as HTMLInputElement

  const params = new URLSearchParams(window.location.search)

  setTimeout(function () {
    switch (getCurrentPage()) {
      case '/':
      case 'about': // Homepage
        currentNavItem = 'about-link'

        // Add a border to the site logo
        docLogo.getElementsByTagName('img')[0].style.border = '1px dashed #7399EA'

        addProfiles('profiles')
        break
      case 'companies':
        currentNavItem = 'companies-link'
        pageIsSearchable = true
        break
      case 'courses':
        currentNavItem = 'courses-link'
        pageIsSearchable = true
        break
      case 'projects':
        currentNavItem = 'projects-link'
        pageIsSearchable = true
        break
      case 'contact':
        currentNavItem = 'contact-link'

        addProfiles('profiles')

        if (params.get('submitted') === 'true') {
          formSubmitted(5) // set 5 second countdown
        } else {
          const checkExist = setInterval(function () {
            if (document.getElementById('edit-field-site-0-value')) {
              // show the form and capture the current site URL
              const webLocation = document.getElementById(
                'edit-field-site-0-value'
              )! as HTMLInputElement
              webLocation.value = location.toString()

              const docEditMail = document.getElementById('edit-mail')! as HTMLInputElement
              docEditMail.focus()

              clearInterval(checkExist)
            }
          }, 100)
        }
        break
      case 'resume':
        addResumes()
        break
      default:
    }

    if (getCurrentPage() !== 'about' && getCurrentPage() !== 'resume') {
      const docCurrentNavItem = document.getElementById(currentNavItem)! as HTMLInputElement
      docCurrentNavItem.className += ' nav-item-active'
    }

    if (pageIsSearchable) {
      const docSearchContainer = document.getElementById('search-container')! as HTMLInputElement
      docSearchContainer.style.display = 'block'

      if (params.get('clear') !== null) {
        searchJS.searchBox.focus()
        history.pushState(null, '', `${window.location.protocol}//${window.location.host}${window.location.pathname}`)
      }

      // only allow the alphabet and spaces when searching
      const re = /[a-zA-Z s]/

      searchJS.searchBox.addEventListener('keydown', (event): boolean => {
        if (re.exec(event.key) == null) {
          event.preventDefault()
          return false
        }
        return true
      })

      searchJS.searchSubmit.addEventListener('click', (event) => {
        event.preventDefault()
        searchJS.search()
      })

      searchJS.searchClear.addEventListener('click', (event) => {
        searchJS.manageURL('clearSearch')
        event.preventDefault()
      })

      // setup record counts
      let recordCount = 0

      if (document.getElementById('recordCount')) {
        const test = document.getElementById('recordCount')
        if (test) {
          recordCount = parseInt(test.innerText, 10)
        }
      } else {
        recordCount = 0
      }

      const currentPageNumber = params.get('page') as any

      let recordText = 'Items'
      if (recordCount === 1) recordText = 'Item'

      let firstNumberRange

      if (currentPageNumber > 1) {
        firstNumberRange = ((currentPageNumber - 1) * searchJS.MAX_ITEMS_PER_PAGE) + 1
      } else {
        firstNumberRange = 1
      }

      const currentRecords = currentPageNumber * recordCount
      const pagingText = document.getElementById('paging-info')

      // paging with prev and next
      if (
        document.getElementById('nextLink') ||
        currentRecords >= searchJS.MAX_ITEMS_PER_PAGE ||
        currentPageNumber > 1
      ) {
        if (pagingText && recordCount !== 1) {
          pagingText.innerHTML = `Items ${firstNumberRange}-${
            (firstNumberRange + recordCount) - 1
          }`
        }
      } else {
        // no paging
        if (pagingText) {
          pagingText.innerHTML = `${recordCount} ${recordText}`
        }
      }

      document.getElementById('prevLink')?.addEventListener('click', () => searchJS.manageURL('paging', 'prev'))
      document.getElementById('nextLink')?.addEventListener('click', () => searchJS.manageURL('paging', 'next'))

      searchJS.manageURL('sync')
    }

    // Delay is needed to help animation not flicker
    setTimeout(function () { utilityJS.animateLogo('logo-image', '') }, 1000)
  }, 125)
}

window.onload = nodePage
