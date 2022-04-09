/**
 * Get the current page name
 * @return {string} - page name
 */
export const getCurrentPage = () => {
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
 * Show message
 * @param {string} msg - message
 */
export const showMessage = (
  msg: string
): void => {
  const userMsg = document.getElementById('user-message') as HTMLElement
  userMsg.innerHTML = msg
}

/**
 * Clear message
 */
export const clearMessage = (): void => {
  const userMsg = document.getElementById('user-message') as HTMLElement
  userMsg.innerHTML = ''
}

/**
 * Add PDF and Word resume links
 * @param {string} id - ID of element to insert into
 */
export const addResumes = (): void => {
  if (document.getElementById('profiles')) {
    const docEl = document.getElementById('profiles')! as HTMLInputElement
    docEl.innerHTML = `
    <div class='icon' id='pdf-resume'>
      <a href='https://chriscorchado.com/resume/Chris-Corchado.pdf' target='_blank' rel='noopener' title='Opening a new window'>
        <img alt='Link to PDF Resume' src='https://chriscorchado.com/images/pdfIcon.jpg' />
        <span>PDF</span>
      </a>
    </div>

    <div class='icon' id='word-resume'>
      <a href='https://chriscorchado.com/resume/Chris-Corchado.docx' title='File will download'>
        <img alt='Link to MS Word Resume' src='https://chriscorchado.com/images/wordIcon.jpg' />
        <span>Word</span>
      </a>
    </div>`
  }
}

/**
 * Add profile links
 * @param {string} id - ID of element to insert into
 */
export const addProfiles = (id: string) => {
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

    <!--a href='https://chriscorchado.com/resume/ChrisCorchadoIT-2736_microsoft-en-us-users.pdf' target='_blank' rel='noopener' title='Opening a new window'>
    <img alt='Azure Icon' title='Link to Azure Profile PDF' src='https://chriscorchado.com/images/azureIcon.png' />
    <span>Azure</span>
  </!--a>
  </div>`
}

/**
 * Animate logo as a way to show loading, paging or any other processing
 * @param {string} logoID - ID of the HTML image tag
 * @param {string} animationID - options [spin, spin-reverse, breath] or empty string '' to disable
 */
export const animateLogo = (logoID: string, animationID: string): void => {
  const logoElement = document.getElementById(logoID) as HTMLElement

  const checkExist = setInterval(function () {
    if (logoElement) {
      if (animationID) {
        logoElement.setAttribute('src', `https://chriscorchado.com/images/chriscorchado-initials-logo-animated-${animationID}.gif`)
      } else {
        logoElement.setAttribute('src', 'https://chriscorchado.com/images/chriscorchado-initials-logo.png')
      }

      clearInterval(checkExist)
    }
  }, 100)
}
