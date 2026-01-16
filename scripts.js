/* ============================================
   SAVE THE KING'S ARMS - Campaign Scripts
   ============================================ */

// ============================================
// CONFIGURATION
// Set these values to customise the campaign
// ============================================

const CONFIG = {
  // Countdown target date (format: 'YYYY-MM-DDTHH:MM:SS')
  // Change this to your campaign deadline
  countdownTargetDate: '2026-01-20T19:00:00',

  // Form submission endpoint (optional)
  // Replace with your actual endpoint or leave as null for console logging
  formEndpoint: null, // e.g., '/api/submit-support' or 'https://api.example.com/submit'
};

// ============================================
// COUNTDOWN TIMER
// ============================================

function initCountdown() {
  const targetDate = new Date(CONFIG.countdownTargetDate).getTime();

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    console.warn('Countdown elements not found');
    return;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      // Countdown has ended
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Pad with leading zeros
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

function initForm() {
  const form = document.getElementById('supportForm');
  const successMessage = document.getElementById('form-success');

  if (!form) {
    console.warn('Support form not found');
    return;
  }

  // Field references
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Error message references
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  // Validation helpers
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(input, errorEl) {
    input.classList.add('error');
    errorEl.classList.add('visible');
  }

  function hideError(input, errorEl) {
    input.classList.remove('error');
    errorEl.classList.remove('visible');
  }

  function validateField(input, errorEl, validationFn) {
    const isValid = validationFn(input.value);
    if (isValid) {
      hideError(input, errorEl);
    } else {
      showError(input, errorEl);
    }
    return isValid;
  }

  // Real-time validation on blur
  nameInput.addEventListener('blur', () => {
    validateField(nameInput, nameError, (value) => value.trim().length > 0);
  });

  emailInput.addEventListener('blur', () => {
    validateField(emailInput, emailError, (value) => isValidEmail(value.trim()));
  });

  messageInput.addEventListener('blur', () => {
    validateField(messageInput, messageError, (value) => value.trim().length > 0);
  });

  // Clear errors on input
  nameInput.addEventListener('input', () => hideError(nameInput, nameError));
  emailInput.addEventListener('input', () => hideError(emailInput, emailError));
  messageInput.addEventListener('input', () => hideError(messageInput, messageError));

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const isNameValid = validateField(nameInput, nameError, (value) => value.trim().length > 0);
    const isEmailValid = validateField(emailInput, emailError, (value) => isValidEmail(value.trim()));
    const isMessageValid = validateField(messageInput, messageError, (value) => value.trim().length > 0);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      // Focus first invalid field
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isMessageValid) messageInput.focus();
      return;
    }

    // Gather form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      postcode: formData.get('postcode') || '',
      message: formData.get('message'),
      consent: formData.get('consent') === 'on',
      hasPhoto: formData.get('photo')?.size > 0,
    };

    // Submit form
    try {
      if (CONFIG.formEndpoint) {
        // Submit to configured endpoint
        const response = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }
      } else {
        // Log to console for development
        console.log('Form submitted:', data);
        console.log('Full FormData:', Object.fromEntries(formData));
      }

      // Show success message
      form.style.display = 'none';
      successMessage.hidden = false;

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your support. Please try again.');
    }
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.split-feature, .campaign-grid__block, .cta-band__container, .support-form__card, .press-card__article'
  );

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// ============================================
// HERO VIDEO FALLBACK
// ============================================

function initHeroVideo() {
  const video = document.querySelector('.hero__video');

  if (!video) return;

  // Check if video has a source
  const hasSource = video.querySelector('source')?.src || video.src;

  if (!hasSource) {
    // No video source, show poster image via CSS
    video.style.display = 'none';

    // Create fallback image from poster
    const posterUrl = video.getAttribute('poster');
    if (posterUrl) {
      const heroMedia = video.parentElement;
      heroMedia.style.backgroundImage = `url(${posterUrl})`;
      heroMedia.style.backgroundSize = 'cover';
      heroMedia.style.backgroundPosition = 'center';
    }
  }

  // Handle video load error
  video.addEventListener('error', () => {
    const posterUrl = video.getAttribute('poster');
    if (posterUrl) {
      const heroMedia = video.parentElement;
      video.style.display = 'none';
      heroMedia.style.backgroundImage = `url(${posterUrl})`;
      heroMedia.style.backgroundSize = 'cover';
      heroMedia.style.backgroundPosition = 'center';
    }
  });
}

// ============================================
// GALLERY
// ============================================

function initGallery() {
  const mainImg = document.getElementById('gallery-main');
  const thumbs = document.querySelectorAll('.gallery__thumb');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const container = document.querySelector('.gallery__main');

  if (!mainImg || !thumbs.length) return;

  let currentIndex = 0;

  function setActive(index) {
    currentIndex = index;
    const btn = thumbs[index];
    const src = btn.getAttribute('data-src');
    const alt = btn.getAttribute('data-alt') || '';
    mainImg.src = src;
    mainImg.alt = alt;
    thumbs.forEach((t) => t.classList.remove('is-active'));
    btn.classList.add('is-active');
    btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  thumbs.forEach((btn, i) => {
    btn.addEventListener('click', () => setActive(i));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const i = (currentIndex - 1 + thumbs.length) % thumbs.length;
      setActive(i);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const i = (currentIndex + 1) % thumbs.length;
      setActive(i);
    });
  }

  // Keyboard navigation
  container?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const i = (currentIndex - 1 + thumbs.length) % thumbs.length;
      setActive(i);
    } else if (e.key === 'ArrowRight') {
      const i = (currentIndex + 1) % thumbs.length;
      setActive(i);
    }
  });

  setActive(0);
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initForm();
  initSmoothScroll();
  initScrollAnimations();
  initHeroVideo();
  initGallery();
});
