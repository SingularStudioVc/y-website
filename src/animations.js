// Initialize Animate On Scroll (AOS)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800, // Animation duration in ms
    once: true, // Whether animation should happen only once
    offset: 100, // Offset (in px) from the original trigger point
    easing: 'ease-in-out', // Default easing
  });
}); 