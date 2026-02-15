/**
 * Anil Pol & Associates - Interactive Slider Script
 * This script enables "Click and Drag" for Desktop and "Touch Swipe" for Mobile.
 */

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.netflix-slider');
    
    // Safety check: only run if the slider exists on the page
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // --- DESKTOP MOUSE EVENTS ---
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active'); // Helpful for CSS styling when dragging
        slider.style.cursor = 'grabbing';
        slider.style.userSelect = 'none';
        
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'default';
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab'; // Returns to open hand
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Only run if mouse is clicked
        e.preventDefault();
        
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Increase number to scroll faster
        slider.scrollLeft = scrollLeft - walk;
    });


    // --- MOBILE TOUCH EVENTS ---

    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        // e.touches[0] ensures we track the first finger that touches the screen
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    }, { passive: true });
});