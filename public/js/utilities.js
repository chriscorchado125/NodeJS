const animateLogo = (logoID, animationID) => {
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
const MAX_ITEMS_PER_PAGE = 50;
