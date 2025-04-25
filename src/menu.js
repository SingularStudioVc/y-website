document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNavLinks = document.getElementById('main-nav-links');

  if (menuToggle && mainNavLinks) {
    menuToggle.addEventListener('click', () => {
      // Toggle the 'open' class on the button for styling the hamburger lines
      menuToggle.classList.toggle('open');
      // Toggle the 'nav-open' class on the ul to show/hide the menu
      mainNavLinks.classList.toggle('nav-open');

      // Toggle aria-expanded attribute for accessibility
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Optional: Close menu when a link is clicked
    mainNavLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNavLinks.classList.contains('nav-open')) {
          menuToggle.classList.remove('open');
          mainNavLinks.classList.remove('nav-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}); 