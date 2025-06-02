// Import main CSS
import './style.css';

// Import AOS library (make sure it's installed via npm/yarn if not using CDN)
// Since we added AOS via CDN in HTML, we don't strictly need to import it here for Vite
// but if we managed it via npm, the import would be here.
// We *do* need to import our custom JS modules:
import './menu.js';
import './animations.js';
import './i18n.js'; // Import the new i18n module
import './scrollToTop.js'; // Import the scroll to top module

// You could add other setup code here if needed
console.log('Main script loaded.'); 