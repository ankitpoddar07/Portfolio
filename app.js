const hamburgerMenu = document.querySelector('#navigation .nav-icon');
const navContent = document.querySelector('#nav-content');
const closeNavButton = document.querySelector('#nav-content .close-btn');
const navLinks = document.querySelectorAll('#nav-content nav ul li a');
const scrollButton = document.querySelector(".scroll-top");

// scroll TOP Button Events

if (scrollButton) {
    window.addEventListener('scroll', () => {
        if (pageYOffset > (window.innerHeight * 1.2)) {
            scrollButton.style.display = "flex";
        } else {
            scrollButton.style.display = "none";
        }
    });
    scrollButton.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });
}

// Hamburger Menu events
hamburgerMenu.addEventListener('click', () => {
    navContent.classList.add('show');
    document.body.style.overflow = "hidden";
});
closeNavButton.addEventListener('click', () => {
    navContent.classList.remove('show');
    document.body.style.overflow = "initial";
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navContent.classList.remove('show');
        document.body.style.overflow = "initial";
    })
})

// Certificate Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    let currentIndex = 0;

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slider-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.slider-indicator');

    function updateSlider() {
        slider.scrollTo({
            left: slides[currentIndex].offsetLeft,
            behavior: 'smooth'
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Auto-advance (optional)
    // setInterval(goToNext, 5000);

    // Handle swipe on touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) goToNext();
        if (touchEndX > touchStartX + 50) goToPrev();
    }
});