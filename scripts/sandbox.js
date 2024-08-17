const scrollTopBtn = document.querySelector('.scroll-top-btn')

const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active')
    } else {
        scrollTopBtn.classList.remove('active')
    }
};

window.addEventListener('scroll', toggleVisibility);