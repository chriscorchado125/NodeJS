export const getCurrentPage = () => {
    const thisPage = window.location.pathname
        .split('/')
        .filter(function (pathnamePieces) {
        return pathnamePieces.length;
    })
        .pop();
    let pageName = 'about';
    if (thisPage)
        pageName = thisPage.split('.')[0];
    if (pageName === 'index' || pageName === 'nodejs')
        pageName = 'about';
    return pageName;
};
export const showMessage = (msg) => {
    const userMsg = document.getElementById('user-message');
    userMsg.innerHTML = msg;
};
export const clearMessage = () => {
    const userMsg = document.getElementById('user-message');
    userMsg.innerHTML = '';
};
export const addResumes = () => {
    if (document.getElementById('profiles')) {
        const docEl = document.getElementById('profiles');
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
    </div>`;
    }
};
export const addProfiles = (id) => {
    const baseDir = window.location.toString().toLocaleLowerCase().indexOf('/nodejs') !== -1 ? '/nodejs' : '';
    let docEl = HTMLInputElement;
    if (document.getElementById(id)) {
        docEl = document.getElementById(id);
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
  </div>`;
};
export const animateLogo = (logoID, animationID) => {
    const logoElement = document.getElementById(logoID);
    const checkExist = setInterval(function () {
        if (logoElement) {
            if (animationID) {
                logoElement.setAttribute('src', `https://chriscorchado.com/images/chriscorchado-initials-logo-animated-${animationID}.gif`);
            }
            else {
                logoElement.setAttribute('src', 'https://chriscorchado.com/images/chriscorchado-initials-logo.png');
            }
            clearInterval(checkExist);
        }
    }, 100);
};
