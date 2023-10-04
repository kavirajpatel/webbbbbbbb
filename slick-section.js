document.addEventListener("DOMContentLoaded", function () {
    var slides = document.querySelectorAll('.slide');
    var btns = document.querySelectorAll('.btn');
    let currentSlide = 0; // Start from the first slide
    let autoSlideInterval; // To store the interval for auto sliding

    // Function to show a specific slide
    function showSlide(slideIndex) {
        if (slides.length > 0) {
            slides.forEach((slide) => {
                slide.style.display = 'none';
            });
            slides[slideIndex].style.display = 'block';
        }
    }

    // Function to handle manual navigation
    function manualNav(manual) {
        if (slides.length > 0) {
            slides.forEach((slide) => {
                slide.style.display = 'none';
            });
            btns.forEach((btn) => {
                btn.classList.remove('active');
                btn.style.backgroundColor = ''; // Remove background color
            });
            slides[manual].style.display = 'block';
            btns[manual].classList.add('active');
            btns[manual].style.backgroundColor = 'grey'; // Set button color to grey
            currentSlide = manual;
            clearInterval(autoSlideInterval); // Stop auto sliding when manually navigating
        }
    }

    // Function to change slide automatically
    function autoSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
        btns.forEach((btn) => {
            btn.classList.remove('active');
            btn.style.backgroundColor = ''; // Remove background color
        });
        // btns[currentSlide].classList.add('active');
        // btns[currentSlide].style.backgroundColor = 'grey'; // Set button color to grey
    }

    // Event listeners for manual navigation buttons
    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            manualNav(i);
            clearInterval(autoSlideInterval); // Stop auto sliding when manually navigating
        });
    });

    // Start auto sliding
    autoSlideInterval = setInterval(autoSlide, 3000); // Change slide every 3 seconds (adjust as needed)
});