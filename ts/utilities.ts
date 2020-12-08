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
