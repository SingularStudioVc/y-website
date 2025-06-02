const supportedLanguages = ['fr', 'en'];
let currentLanguage = localStorage.getItem('language') || 'fr'; // Default to French
let translations = {};

async function loadTranslations(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang}.json: ${response.statusText}`);
    }
    translations = await response.json();
    console.log(`Translations loaded for ${lang}:`, translations);
  } catch (error) {
    console.error('Error loading translations:', error);
    // Fallback to default language or handle error appropriately
    if (lang !== 'fr') { // Avoid infinite loop if fr.json also fails
        await loadTranslations('fr');
    }
  }
}

function translatePage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-translate-key]').forEach(element => {
    const key = element.getAttribute('data-translate-key');
    const translation = translations[key];
    if (translation) {
      if (element.hasAttribute('data-translate-html')) {
        // Use innerHTML if the key indicates it contains HTML (e.g., for links in paragraphs)
        element.innerHTML = translation; 
      } else {
        element.textContent = translation;
      }
    } else {
      console.warn(`No translation found for key: ${key} in ${currentLanguage}`);
    }
  });
}

async function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) {
    console.warn(`Unsupported language: ${lang}. Defaulting to ${currentLanguage}.`);
    return;
  }
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  await loadTranslations(lang);
  translatePage();
  updateLanguageSwitcherUI();
  updateVideoSource(lang);
}

function updateLanguageSwitcherUI() {
  const buttons = document.querySelectorAll('#language-switcher .lang-button');
  buttons.forEach(button => {
    if (button.getAttribute('data-lang') === currentLanguage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function updateVideoSource(lang) {
  const videoSourceElement = document.getElementById('promo-video-source');
  const videoElement = document.getElementById('promo-video');
  if (videoSourceElement && videoElement) {
    if (lang === 'en') {
      videoSourceElement.setAttribute('src', '/video_promo_en.MOV');
    } else {
      videoSourceElement.setAttribute('src', '/video_promo_fr.MOV'); // Default to French video
    }
    videoElement.load(); // Reload the video to apply the new source
    // videoElement.play(); // Optional: attempt to play after source change, browser might block if not muted
  } else {
    console.warn('Promo video element or source element not found.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.addEventListener('click', (event) => {
      const targetButton = event.target.closest('.lang-button');
      if (targetButton && targetButton.dataset.lang) {
        setLanguage(targetButton.dataset.lang);
      }
    });
  }

  // Initial load
  setLanguage(currentLanguage);
});

// Expose setLanguage globally if needed for other scripts, or keep it modular.
// window.setLanguage = setLanguage; 