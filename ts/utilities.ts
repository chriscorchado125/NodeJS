/**
 * Animate logo as a way to show loading, paging or any other processing
 * @param {string} logoID - ID of the HTML image tag
 * @param {string} animationID - options [spin, spin-reverse, breath] or empty string '' to disable
 */
const animateLogo = (logoID: string, animationID: string): void => {
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

const MAX_ITEMS_PER_PAGE = 50;
