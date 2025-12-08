// Simple slider
(function(){
    const slides = Array.from(document.querySelectorAll('.slider img'));
    let idx = 0;
    function show(i){
        slides.forEach((s, j) => s.classList.toggle('active', j === i));
    }
    function next(){
        idx = (idx + 1) % slides.length;
        show(idx);
    }
    // auto rotate
    let rot = setInterval(next, 4000);
    // pause on hover
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseover', () => clearInterval(rot));
    slider.addEventListener('mouseleave', () => rot = setInterval(next, 4000));
})();

// Navigation reveal + smooth scroll
(function(){
    const showSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.classList.contains('hidden')) el.classList.remove('hidden');
        el.scrollIntoView({behavior:'smooth', block:'start'});
    };

    document.getElementById('nav-destinations').addEventListener('click', (e) => { e.preventDefault(); showSection('destinations'); });
    document.getElementById('nav-services').addEventListener('click', (e) => { e.preventDefault(); showSection('services'); });
    document.getElementById('nav-contact').addEventListener('click', (e) => { e.preventDefault(); showSection('contact'); });
    document.getElementById('nav-home').addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });

    // reveal sections if user scrolls to them (progressive reveal)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.remove('hidden');
        });
    }, {threshold: 0.08});
    document.querySelectorAll('section').forEach(s => observer.observe(s));
})();

// WhatsApp open helper
function openWA(topic){
    const phone = '6287885611431';
    const text = encodeURIComponent('Inquiry for ' + topic);
    window.open('https://wa.me/' + phone + '?text=' + text, '_blank', 'noopener');
}

// Language toggle (ID <-> EN) simple client-side translations
(function(){
    const translations = {
        en: {
            navHome: 'Home', navDest: 'Destinations', navServ: 'Services', navContact: 'Contact',
            homeTitle: 'Welcome to SEPTI DUTA INSAN Tour & Travel',
            whyTitle: 'Why Choose SEPTI DUTA INSAN TOUR & TRAVEL?',
            whyDesc: 'We are a trusted travel partner in Indonesia with over 10 years of experience. Our flexible services handle groups large and small, corporate and private tours. With custom itineraries or ready-made packages, we ensure your trip is safe, comfortable, and memorable.',
            destTitle: 'Indonesia Travel Destinations',
            worldTitle: 'Around The World',
            worldDesc: 'For Indonesian clients wanting to travel abroad, we assist with international itineraries.',
            servicesTitle: 'Our Services',
            servicesIntro: 'We offer comprehensive services for different travelers: large groups, small groups, private, corporate, etc. Services can be customized or provided as set packages.',
            service1Title: 'Vehicle Rental', service1Desc: 'Minibus, private cars, Hiace, large buses, Long Elf, Elf, etc.',
            service2Title: 'Transport Tickets', service2Desc: 'Plane, train, bus, ferry for hassle-free travel.',
            service3Title: 'Attraction Tickets', service3Desc: 'Access to attractions, parks, and cultural sites in Indonesia.',
            service4Title: 'Accommodation Vouchers', service4Desc: 'Hotels, villas, homestays, and selected accommodations for every budget.',
            contactTitle: 'Contact Us',
            contactDesc: 'Contact our team for quotes, custom itineraries, or other inquiries.',
            waLabel: 'WhatsApp',
            phoneLabel: '+62 878-8561-1431',
            emailLabel: 'info@septontravel.example'
        },
        id: {
            navHome: 'Home', navDest: 'Destinasi', navServ: 'Layanan', navContact: 'Hubungi Kami',
            homeTitle: 'Selamat Datang di SEPTI DUTA INSAN Tour & Travel',
            whyTitle: 'Kenapa Harus SEPTI DUTA INSAN TOUR & TRAVEL?',
            whyDesc: 'Kami adalah mitra perjalanan terpercaya di Indonesia dengan pengalaman lebih dari 10 tahun. Fleksibilitas layanan kami memungkinkan penanganan grup besar hingga kecil, termasuk perusahaan dan private tours. Dengan itinerary kustom atau paket siap, kami pastikan perjalanan Anda aman, nyaman, dan penuh kenangan. Pilih kami untuk pengalaman travel all-in-one yang tak terlupakan!',
            destTitle: 'Destinasi Wisata Indonesia',
            worldTitle: 'Around The World',
            worldDesc: 'Untuk klien Indonesia yang ingin menjelajah luar negeri, kami siap bantu dengan itinerary internasional.',
            servicesTitle: 'Layanan Kami',
            servicesIntro: 'Kami menawarkan layanan komprehensif untuk berbagai jenis traveler: grup besar, kecil, private, perusahaan, dll. Layanan bisa dikustom sesuai itinerary klien atau dalam paket siap pakai.',
            service1Title: 'Rental Kendaraan', service1Desc: 'Mini bus, mobil pribadi, Hiace, bus besar, Long Elf, Elf, dll. untuk perjalanan nyaman.',
            service2Title: 'Tiket Transportasi', service2Desc: 'Pesawat, kereta api, bus, kapal untuk perjalanan tanpa repot.',
            service3Title: 'Tiket Wisata', service3Desc: 'Akses ke atraksi, taman, dan situs budaya di Indonesia.',
            service4Title: 'Voucher Akomodasi', service4Desc: 'Hotel, villa, homestay, dan akomodasi terpilih untuk semua anggaran.',
            contactTitle: 'Hubungi Kami',
            contactDesc: 'Hubungi tim kami untuk penawaran, kustom itinerary, atau pertanyaan lainnya.',
            waLabel: 'WhatsApp',
            phoneLabel: '+62 878-8561-1431',
            emailLabel: 'info@septontravel.example'
        }
    };

    const elements = {
        navHome: document.getElementById('nav-home'),
        navDest: document.getElementById('nav-destinations'),
        navServ: document.getElementById('nav-services'),
        navContact: document.getElementById('nav-contact'),
        homeTitle: document.getElementById('home-title'),
        whyTitle: document.getElementById('why-title'),
        whyDesc: document.getElementById('why-desc'),
        destTitle: document.getElementById('dest-title'),
        worldTitle: document.getElementById('world-title'),
        worldDesc: document.getElementById('world-desc'),
        servicesTitle: document.getElementById('services-title'),
        servicesIntro: document.getElementById('services-intro'),
        service1Title: document.getElementById('service1-title'),
        service1Desc: document.getElementById('service1-desc'),
        service2Title: document.getElementById('service2-title'),
        service2Desc: document.getElementById('service2-desc'),
        service3Title: document.getElementById('service3-title'),
        service3Desc: document.getElementById('service3-desc'),
        service4Title: document.getElementById('service4-title'),
        service4Desc: document.getElementById('service4-desc'),
        contactTitle: document.getElementById('contact-title'),
        // contact items
        btnWA: document.getElementById('btn-wa'),
        btnPhone: document.getElementById('btn-phone'),
        btnEmail: document.getElementById('btn-email'),
        langBtn: document.getElementById('lang-btn')
    };

    // default language
    let lang = 'id';
    function applyLang(to){
        const t = translations[to];
        elements.navHome.textContent = t.navHome;
        elements.navDest.textContent = t.navDest;
        elements.navServ.textContent = t.navServ;
        elements.navContact.textContent = t.navContact;
        elements.homeTitle.textContent = t.homeTitle;
        elements.whyTitle.textContent = t.whyTitle;
        elements.whyDesc.textContent = t.whyDesc;
        elements.destTitle.textContent = t.destTitle;
        elements.worldTitle.textContent = t.worldTitle;
        elements.worldDesc.textContent = t.worldDesc;
        elements.servicesTitle.textContent = t.servicesTitle;
        elements.servicesIntro.textContent = t.servicesIntro;
        elements.service1Title.textContent = t.service1Title;
        elements.service1Desc.textContent = t.service1Desc;
        elements.service2Title.textContent = t.service2Title;
        elements.service2Desc.textContent = t.service2Desc;
        elements.service3Title.textContent = t.service3Title;
        elements.service3Desc.textContent = t.service3Desc;
        elements.service4Title.textContent = t.service4Title;
        elements.service4Desc.textContent = t.service4Desc;
        elements.contactTitle.textContent = t.contactTitle;
        elements.btnWA.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i> ' + t.waLabel;
        elements.btnPhone.innerHTML = '<i class="fas fa-phone" aria-hidden="true"></i> ' + t.phoneLabel;
        elements.btnEmail.innerHTML = '<i class="fas fa-envelope" aria-hidden="true"></i> ' + t.emailLabel;
        elements.langBtn.textContent = to === 'id' ? 'ID' : 'EN';
        lang = to;
        document.documentElement.lang = to === 'id' ? 'id' : 'en';
    }

    document.getElementById('lang-btn').addEventListener('click', function(){
        applyLang(lang === 'id' ? 'en' : 'id');
        this.setAttribute('aria-pressed', String(lang === 'en'));
    });

    // initialize language (default Indonesian)
    applyLang('id');
})();

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Improve keyboard accessibility for clickable destination divs
(function(){
    document.querySelectorAll('.destination').forEach(d => {
        d.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') d.click();
        });
    });
})();