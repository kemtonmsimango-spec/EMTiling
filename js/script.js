document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const menuItems = document.querySelectorAll('.menu a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // --- Header Background on Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(6, 27, 43, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--bg-navy)';
            header.style.backdropFilter = 'none';
        }
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const suffix = counter.getAttribute('data-suffix');
                        const count = +counter.innerText.replace(/\D/g, ''); // Extract only numbers
                        
                        // Lower increment divisor means faster animation
                        const inc = target / 40;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc) + suffix;
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCount();
                });
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // --- Review Slider Logic ---
    const track = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.review-slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const maxIndex = slides.length - 1;

    const updateSlider = () => {
        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

});