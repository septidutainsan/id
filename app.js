// app.js — safer, DOM-ready version

(function () {
  function init() {
    // Simple slider (safe)
    (function () {
      const slides = Array.from(document.querySelectorAll('.slider img'));
      if (!slides.length) return; // nothing to do
      let idx = 0;
      function show(i) {
        slides.forEach((s, j) => s.classList.toggle('active', j === i));
      }
      function next() {
        idx = (idx + 1) % slides.length;
        show(idx);
      }
      // auto rotate
      let rot = setInterval(next, 4000);
      // pause on hover (guard slider exists)
      const slider = document.querySelector('.slider');
      if (slider) {
        slider.addEventListener('mouseover', () => clearInterval(rot));
        slider.addEventListener('mouseleave', () => {
          clearInterval(rot);
          rot = setInterval(next, 4000);
        });
      }
    })();

    // Navigation reveal + smooth scroll (safe)
    (function () {
      const showSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        // Reveal the section (remove 'hidden' if present) and scroll to it
        el.classList.remove('hidden');
        el.classList.add('visible');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      const navMap = ['nav-destinations', 'nav-services', 'nav-contact', 'nav-home'].map(id => document.getElementById(id));
      const [navDest, navServ, navContact, navHome] = navMap;
      if (navDest) navDest.addEventListener('click', (e) => { e.preventDefault(); showSection('destinations'); });
      if (navServ) navServ.addEventListener('click', (e) => { e.preventDefault(); showSection('services'); });
      if (navContact) navContact.addEventListener('click', (e) => { e.preventDefault(); showSection('contact'); });
      if (navHome) navHome.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });

      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('hidden');
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.08 });
        sections.forEach(s => observer.observe(s));
      } else {
        // Fallback: reveal all sections
        sections.forEach(s => s.classList.remove('hidden'));
      }
    })();

    // WhatsApp open helper (exposed globally because markup uses onclick="openWA(...)")
    window.openWA = function openWA(topic) {
      const phone = '6287885611431';
      const text = encodeURIComponent('Inquiry for ' + topic);
      // use noopener,noreferrer for safety/privacy
      window.open('https://wa.me/' + phone + '?text=' + text, '_blank', 'noopener,noreferrer');
    };

    // Language toggle (ID <-> EN) simple client-side translations (safe)
    (function () {
      const translations = {
        en: {
          navHome: 'Home', navDest: 'Destinations', navServ: 'Services', navContact: 'Contact',
          homeTitle: 'Welcome to SEPTI DUTA INSAN Tour & Travel',
          whyTitle: 'Why Choose SEPTI DUTA INSAN TOUR & TRAVEL?',
          whyDesc: 'We are a trusted travel partner in Indonesia with over 10 years of experience. Our flexible services handle groups large and small, corporate and private tours. With custom itineraries or ready-made packages, we ensure your trip is safe, comfortable
