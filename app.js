// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle navbar appearance on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Handle Sign Up Button Click
document.addEventListener('DOMContentLoaded', function() {
    const signUpBtn = document.querySelector('.sign-up-btn');
    const signInBtn = document.querySelector('.sign-in-btn');
    const signUpModal = new bootstrap.Modal(document.getElementById('signUpModal'));
    const signInModal = new bootstrap.Modal(document.getElementById('signInModal'));

    signUpBtn.addEventListener('click', function() {
        signUpModal.show();
    });

    signInBtn.addEventListener('click', function() {
        signInModal.show();
    });

    // Handle form submissions
    const signUpForm = document.querySelector('#signUpModal form');
    const signInForm = document.querySelector('#signInModal form');

    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Sign Up form submitted');
            signUpModal.hide();
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Sign In form submitted');
            signInModal.hide();
        });
    }
});
