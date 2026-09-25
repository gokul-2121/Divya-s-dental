/**
 * Dr. Divya's Multispeciality Dental Clinic
 * Interactive JavaScript Application
 * Features:
 * - Dynamic Service Rendering with Doctor Action Pictures
 * - Client Photo Management System (Upload, URL, Presets, LocalStorage persistence)
 * - Customer Reviews System (Google review styling, filtering, user submission)
 * - WhatsApp Appointment Generator
 * - Location Navigation & Directions
 */

// ==========================================
// 1. Initial State & Data Registries
// ==========================================

const DEFAULT_PHOTOS = {
  hero: 'assets/images/google_equipment.jpg',
  exterior: 'assets/images/google_clinic_exterior.jpg',
  reception: 'assets/images/google_reception.jpg',
  operatory: 'assets/images/google_treatment_room.jpg',
  rct: 'assets/images/root-canal-action.jpg',
  implant: 'assets/images/implant-surgery.jpg',
  ortho: 'assets/images/orthodontics-action.jpg',
  whitening: 'assets/images/teeth-whitening-action.jpg',
  pediatric: 'assets/images/pediatric-action.jpg',
  scanner: 'assets/images/digital-scan-action.jpg'
};

const PRESET_GALLERY = [
  { name: 'Doctor Treating Patient (Google)', src: 'assets/images/google_equipment.jpg' },
  { name: 'Clinic Signboard & Exterior (Google)', src: 'assets/images/google_clinic_exterior.jpg' },
  { name: 'Reception & Doctors Board (Google)', src: 'assets/images/google_reception.jpg' },
  { name: 'Treatment Operatory Room (Google)', src: 'assets/images/google_treatment_room.jpg' },
  { name: 'Microscope RCT Treatment', src: 'assets/images/root-canal-action.jpg' },
  { name: 'Dental Implant Surgery', src: 'assets/images/implant-surgery.jpg' },
  { name: 'Braces Alignment Procedure', src: 'assets/images/orthodontics-action.jpg' },
  { name: 'Laser Teeth Whitening', src: 'assets/images/teeth-whitening-action.jpg' },
  { name: 'Gentle Kids Dental Care', src: 'assets/images/pediatric-action.jpg' },
  { name: '3D Intraoral Digital Scan', src: 'assets/images/digital-scan-action.jpg' }
];

const SERVICES_DATA = [
  {
    id: 'rct',
    title: 'Advanced Root Canal Treatment (RCT)',
    category: 'endodontics',
    categoryLabel: 'Endodontics',
    badge: 'Microscope Assisted',
    actionTag: 'Doctor in Action: Precision Endodontics',
    photoKey: 'rct',
    description: 'Painless, single-sitting root canal therapy using high-magnification dental microscopes and rotary apex locators to save badly decayed or infected teeth.',
    highlights: [
      'Painless computer-controlled local anesthesia',
      'High-precision optical microscope magnification',
      'Same-day or single-visit treatment options'
    ],
    duration: '45 - 60 mins',
    specialist: 'Endodontist Specialist'
  },
  {
    id: 'implant',
    title: 'Dental Implants & Oral Surgery',
    category: 'surgery',
    categoryLabel: 'Implantology',
    badge: 'Permanent Teeth Replacement',
    actionTag: 'Doctor in Action: Surgical Implant Placement',
    photoKey: 'implant',
    description: 'State-of-the-art titanium and zirconia dental implants to permanently replace missing teeth with natural chewing strength and aesthetic finish.',
    highlights: [
      '3D CBCT guided surgical precision',
      'Lifetime warranty implant fixtures',
      'Immediate loading & full arch rehabilitation'
    ],
    duration: '60 mins',
    specialist: 'Oral & Maxillofacial Surgeon'
  },
  {
    id: 'ortho',
    title: 'Orthodontics & Clear Aligners',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics',
    badge: 'Invisible & Ceramic',
    actionTag: 'Doctor in Action: Wire & Aligner Adjustment',
    photoKey: 'ortho',
    description: 'Transform misaligned teeth, gaps, and overbites with advanced clear aligners and subtle ceramic braces tailored for teens and working adults.',
    highlights: [
      'Custom 3D treatment smile simulation',
      'Virtually invisible removable clear trays',
      'Fast, predictable tooth movement'
    ],
    duration: '30 mins checkups',
    specialist: 'Orthodontist Specialist'
  },
  {
    id: 'whitening',
    title: 'Laser Teeth Whitening & Smile Makeover',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Dentistry',
    badge: 'Instant 6-8 Shades Lighter',
    actionTag: 'Doctor in Action: Blue Laser Activation',
    photoKey: 'whitening',
    description: 'Professional chairside dental laser bleaching that safely lifts deep stains from coffee, tea, and age while keeping tooth enamel protected.',
    highlights: [
      'Non-invasive, fast 45-minute procedure',
      'Enamel-safe desensitizing formulation',
      'Long-lasting radiant white smile'
    ],
    duration: '45 mins',
    specialist: 'Cosmetic Dental Specialist'
  },
  {
    id: 'pediatric',
    title: 'Gentle Pediatric Dentistry (Kids Care)',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    badge: 'Kid-Friendly & Fear-Free',
    actionTag: 'Doctor in Action: Gentle Child Checkup',
    photoKey: 'pediatric',
    description: 'Compassionate, anxiety-free dental care for children of all ages, including cavity prevention, fluoride treatments, pit sealants, and gentle fillings.',
    highlights: [
      'Welcoming, fear-free clinic atmosphere',
      'Preventive pit & fissure fluoride sealants',
      'Interactive habit counseling for young kids'
    ],
    duration: '30 mins',
    specialist: 'Pedodontist / Child Specialist'
  },
  {
    id: 'scanner',
    title: '3D Digital Intraoral Scanning & Crowns',
    category: 'digital',
    categoryLabel: 'Digital Dentistry',
    badge: 'No Messy Paste Impressions',
    actionTag: 'Doctor in Action: Handheld 3D Digital Scan',
    photoKey: 'scanner',
    description: 'Say goodbye to gag-inducing impression trays. Our handheld intraoral digital scanner captures 1,000s of 3D snapshots for high-precision zirconia crowns.',
    highlights: [
      'Instant color 3D digital model of your teeth',
      'Zero gag-reflex impression experience',
      'Precision CAD/CAM computer-milled crowns'
    ],
    duration: '20 mins scan',
    specialist: 'Prosthodontist Specialist'
  }
];

const INITIAL_REVIEWS = [
  {
    name: 'Ananthakrishnan Nair',
    tag: 'Kazhakkoottam Resident',
    treatment: 'Root Canal & Zirconia Crown',
    treatmentCategory: 'rct',
    rating: 5,
    date: '2 weeks ago',
    text: 'I was terrified of getting a root canal done, but Dr. Divya and her team made it completely painless. The clinic has top modern equipment and their clinic near AJ Hospital Kazhakkoottam is very neat and hygienic. Highly recommend!'
  },
  {
    name: 'Meera S. Pillai',
    tag: 'Technopark IT Professional',
    treatment: 'Clear Aligners & Teeth Cleaning',
    treatmentCategory: 'ortho',
    rating: 5,
    date: '1 month ago',
    text: 'Working in Technopark, finding flexible evening timings was crucial for me. Dr. Divya’s clinic is just 5 minutes away and is open till 8 PM. Got my aligners and teeth cleaning done smoothly. Very polite and patient doctor.'
  },
  {
    name: 'Rajesh K. Varma',
    tag: 'Trivandrum',
    treatment: 'Dental Implant Surgery',
    treatmentCategory: 'implant',
    rating: 5,
    date: '3 weeks ago',
    text: 'Replaced two missing molars with dental implants here. The doctor explained every step clearly and showed the 3D scans before starting. The procedure was smooth and recovery was very quick. Very genuine pricing with no hidden charges.'
  },
  {
    name: 'Devika & Family',
    tag: 'Parent of 7yo',
    treatment: 'Pediatric Dental Filling & Polish',
    treatmentCategory: 'pediatric',
    rating: 5,
    date: '2 months ago',
    text: 'My daughter was crying and refused to open her mouth at another clinic. Here Dr. Divya spoke to her so affectionately and made her feel at home! The cavity was filled in minutes without any pain. Best dental clinic for kids in Trivandrum.'
  },
  {
    name: 'Suhail Mohammed',
    tag: 'Karyavattom',
    treatment: 'Laser Teeth Whitening',
    treatmentCategory: 'cosmetic',
    rating: 5,
    date: '3 weeks ago',
    text: 'Took laser teeth whitening before my wedding reception. The difference was night and day — teeth looked so clean and bright without any sensitivity. Exceptional service and friendly staff!'
  },
  {
    name: 'Geetha Kumari',
    tag: 'Kazhakkoottam',
    treatment: 'Full Mouth Checkup & Gum Care',
    treatmentCategory: 'general',
    rating: 5,
    date: 'Just recently',
    text: 'Visited Dr. Divya for bleeding gums. The ultrasonic cleaning was very gentle and thorough. They gave very helpful home dental hygiene advice. Very pleasant ambiance and good parking space near the clinic.'
  }
];

// ==========================================
// 2. Photo Storage & Management Helper
// ==========================================

const PhotoManager = {
  getStorageKey(key) {
    return `drdivya_photo_${key}`;
  },

  getPhoto(key) {
    const saved = localStorage.getItem(this.getStorageKey(key));
    if (saved) return saved;
    return DEFAULT_PHOTOS[key] || 'assets/images/hero-action.jpg';
  },

  setPhoto(key, dataUrlOrPath) {
    try {
      localStorage.setItem(this.getStorageKey(key), dataUrlOrPath);
      return true;
    } catch (e) {
      console.error('Storage quota exceeded or error:', e);
      return false;
    }
  },

  resetPhoto(key) {
    localStorage.removeItem(this.getStorageKey(key));
  },

  resetAll() {
    Object.keys(DEFAULT_PHOTOS).forEach(k => {
      localStorage.removeItem(this.getStorageKey(k));
    });
  },

  getAllCurrentPhotos() {
    const current = {};
    Object.keys(DEFAULT_PHOTOS).forEach(k => {
      current[k] = this.getPhoto(k);
    });
    return current;
  }
};

// ==========================================
// 3. Application Controller
// ==========================================

class DentalApp {
  constructor() {
    this.currentEditingKey = null;
    this.currentModalSelectedPhoto = null;
    this.activeServiceCategory = 'all';
    this.activeReviewCategory = 'all';
    this.reviews = this.loadReviews();

    this.init();
  }

  init() {
    this.renderHeroPhoto();
    this.renderServices();
    this.renderReviews();
    this.setupEventListeners();
    this.checkAdminModeUrl();
  }

  loadReviews() {
    try {
      const stored = localStorage.getItem('drdivya_custom_reviews');
      if (stored) {
        const custom = JSON.parse(stored);
        return [...custom, ...INITIAL_REVIEWS];
      }
    } catch (e) {
      console.warn('Could not parse saved reviews', e);
    }
    return [...INITIAL_REVIEWS];
  }

  saveReviews(newReview) {
    try {
      const stored = localStorage.getItem('drdivya_custom_reviews');
      let custom = stored ? JSON.parse(stored) : [];
      custom.unshift(newReview);
      localStorage.setItem('drdivya_custom_reviews', JSON.stringify(custom));
      this.reviews.unshift(newReview);
      this.renderReviews();
    } catch (e) {
      console.error('Could not save review', e);
    }
  }

  // Render Hero
  renderHeroPhoto() {
    const heroImgEl = document.getElementById('hero-action-img');
    if (heroImgEl) {
      heroImgEl.src = PhotoManager.getPhoto('hero');
    }
  }

  // Quick Switch Hero Image
  swapHeroImage(src, tagText, btnElement) {
    const heroImgEl = document.getElementById('hero-action-img');
    const tagEl = document.getElementById('hero-action-tag-text');
    if (heroImgEl) {
      heroImgEl.style.opacity = '0.4';
      setTimeout(() => {
        heroImgEl.src = src;
        heroImgEl.style.opacity = '1';
      }, 150);
    }
    if (tagEl && tagText) {
      tagEl.textContent = tagText;
    }
    if (btnElement) {
      document.querySelectorAll('.hero-switch-btn').forEach(b => b.classList.remove('active'));
      btnElement.classList.add('active');
    }
  }

  // Render Services
  renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    const filtered = this.activeServiceCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter(s => s.category === this.activeServiceCategory);

    grid.innerHTML = filtered.map(service => {
      const photoSrc = PhotoManager.getPhoto(service.photoKey);
      return `
        <article class="service-card" data-category="${service.category}">
          <div class="service-img-wrapper">
            <img id="service-img-${service.photoKey}" src="${photoSrc}" alt="${service.title}" loading="lazy">
            <span class="service-category-badge">${service.categoryLabel}</span>
            <span class="service-pill-tag">
              <i class="fas fa-stethoscope"></i> ${service.badge}
            </span>
            <button class="change-photo-btn" onclick="app.openPhotoModal('${service.photoKey}', '${service.title}')" title="Change this procedure photo">
              <i class="fas fa-camera"></i> Change Photo
            </button>
          </div>
          <div class="service-content">
            <div class="service-title-row">
              <h3 class="service-title">${service.title}</h3>
              <div class="service-action-icon">
                <i class="fas fa-tooth"></i>
              </div>
            </div>
            <p class="service-desc">${service.description}</p>
            <ul class="service-highlights">
              ${service.highlights.map(h => `<li><i class="fas fa-check-circle"></i> ${h}</li>`).join('')}
            </ul>
            <div class="service-card-footer">
              <div class="service-meta-info">
                <span class="meta-label">Est. Time</span>
                <span class="meta-val">${service.duration}</span>
              </div>
              <button class="btn-book-service" onclick="app.selectServiceForBooking('${service.title}')">
                <i class="fas fa-calendar-check"></i> Book Treatment
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Reviews
  renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    const filtered = this.activeReviewCategory === 'all'
      ? this.reviews
      : this.reviews.filter(r => r.treatmentCategory === this.activeReviewCategory);

    grid.innerHTML = filtered.map(review => {
      const initial = review.name ? review.name.charAt(0).toUpperCase() : 'P';
      return `
        <div class="review-card">
          <div class="review-card-header">
            <div class="reviewer-meta">
              <div class="reviewer-avatar">${initial}</div>
              <div>
                <h4 class="reviewer-name">${review.name}</h4>
                <span class="reviewer-tag">
                  <i class="fas fa-map-marker-alt"></i> ${review.tag || 'Verified Patient'}
                </span>
              </div>
            </div>
            <svg class="google-icon-badge" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>
          <div class="stars mb-2">
            ${'<i class="fas fa-star"></i>'.repeat(review.rating || 5)}
          </div>
          <span class="review-treatment-badge">
            <i class="fas fa-tooth"></i> ${review.treatment}
          </span>
          <p class="review-text">"${review.text}"</p>
          <span class="review-date">${review.date}</span>
        </div>
      `;
    }).join('');
  }

  // Setup Event Listeners
  setupEventListeners() {
    // Service Filter Buttons
    document.querySelectorAll('.service-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.service-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeServiceCategory = e.currentTarget.dataset.filter;
        this.renderServices();
      });
    });

    // Review Filter Buttons
    document.querySelectorAll('.review-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeReviewCategory = e.currentTarget.dataset.filter;
        this.renderReviews();
      });
    });

    // Mobile Hamburger
    const toggle = document.getElementById('mobile-toggle-btn');
    const drawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close-btn');

    if (toggle && drawer) {
      toggle.addEventListener('click', () => drawer.classList.add('open'));
    }
    if (drawerClose && drawer) {
      drawerClose.addEventListener('click', () => drawer.classList.remove('open'));
    }
    document.querySelectorAll('.mobile-nav-list a').forEach(link => {
      link.addEventListener('click', () => drawer && drawer.classList.remove('open'));
    });

    // Appointment Form
    const bookingForm = document.getElementById('appointment-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => this.handleBookingSubmit(e));
    }

    // Write Review Form
    const reviewForm = document.getElementById('write-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => this.handleReviewSubmit(e));
    }

    // Photo Upload File Input Handler
    const fileInput = document.getElementById('photo-file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
    }

    // Photo URL Input Handler
    const urlInput = document.getElementById('photo-url-input');
    if (urlInput) {
      urlInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val) {
          this.setModalPreview(val);
        }
      });
    }
  }

  // Admin Mode Toggle
  toggleAdminMode() {
    const isEditMode = document.body.classList.toggle('admin-edit-mode');
    const banner = document.getElementById('photo-manager-banner');
    const pill = document.getElementById('admin-pill');
    
    if (banner) {
      banner.classList.toggle('hidden', !isEditMode);
    }
    if (pill) {
      pill.classList.toggle('active', isEditMode);
      pill.innerHTML = isEditMode
        ? '<i class="fas fa-check-circle"></i> Edit Mode: ON'
        : '<i class="fas fa-cog"></i> Client Photo Manager';
    }

    this.showToast(isEditMode ? 'Doctor Edit Mode Active! Click "Change Photo" on any service.' : 'Doctor Edit Mode Closed.');
  }

  checkAdminModeUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === 'true' || params.get('admin') === 'true') {
      this.toggleAdminMode();
    }
  }

  // Photo Management Modal
  openPhotoModal(photoKey, title = 'Photo') {
    this.currentEditingKey = photoKey;
    const modal = document.getElementById('photo-modal');
    const modalTitle = document.getElementById('modal-photo-title');
    const previewImg = document.getElementById('modal-preview-img');
    const urlInput = document.getElementById('photo-url-input');
    const fileInput = document.getElementById('photo-file-input');

    if (modalTitle) modalTitle.textContent = `Replace Photo for: ${title}`;
    const currentSrc = PhotoManager.getPhoto(photoKey);
    this.setModalPreview(currentSrc);

    if (urlInput) urlInput.value = currentSrc.startsWith('data:') ? '' : currentSrc;
    if (fileInput) fileInput.value = '';

    // Render Presets
    const presetsContainer = document.getElementById('modal-presets');
    if (presetsContainer) {
      presetsContainer.innerHTML = PRESET_GALLERY.map(item => `
        <div class="preset-photo-item ${item.src === currentSrc ? 'selected' : ''}" onclick="app.selectPresetPhoto('${item.src}')" title="${item.name}">
          <img src="${item.src}" alt="${item.name}">
        </div>
      `).join('');
    }

    if (modal) modal.classList.add('active');
  }

  closePhotoModal() {
    const modal = document.getElementById('photo-modal');
    if (modal) modal.classList.remove('active');
    this.currentEditingKey = null;
    this.currentModalSelectedPhoto = null;
  }

  setModalPreview(src) {
    this.currentModalSelectedPhoto = src;
    const previewImg = document.getElementById('modal-preview-img');
    if (previewImg) previewImg.src = src;
  }

  selectPresetPhoto(src) {
    this.setModalPreview(src);
    document.querySelectorAll('.preset-photo-item').forEach(el => {
      el.classList.toggle('selected', el.querySelector('img').getAttribute('src') === src);
    });
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check size limit (keep within ~2.5MB for localStorage)
    if (file.size > 3.5 * 1024 * 1024) {
      alert('Photo is too large! Please choose an image under 3.5MB for fast loading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.setModalPreview(e.target.result);
      const urlInput = document.getElementById('photo-url-input');
      if (urlInput) urlInput.value = '';
    };
    reader.readAsDataURL(file);
  }

  savePhotoChange() {
    if (!this.currentEditingKey || !this.currentModalSelectedPhoto) {
      this.closePhotoModal();
      return;
    }

    const ok = PhotoManager.setPhoto(this.currentEditingKey, this.currentModalSelectedPhoto);
    if (!ok) {
      alert('Could not save photo. Local storage capacity may be exceeded. Try pasting a direct web image link instead.');
      return;
    }

    // Refresh UI
    if (this.currentEditingKey === 'hero') {
      this.renderHeroPhoto();
    } else {
      this.renderServices();
    }

    this.closePhotoModal();
    this.showToast('✅ Photo updated successfully! It is now live on the site.');
  }

  resetCurrentPhoto() {
    if (!this.currentEditingKey) return;
    PhotoManager.resetPhoto(this.currentEditingKey);
    if (this.currentEditingKey === 'hero') {
      this.renderHeroPhoto();
    } else {
      this.renderServices();
    }
    this.closePhotoModal();
    this.showToast('Photo reset to clinic default procedure image.');
  }

  resetAllPhotosToDefault() {
    if (confirm('Are you sure you want to reset all photos back to the default clinical action photos?')) {
      PhotoManager.resetAll();
      this.renderHeroPhoto();
      this.renderServices();
      this.showToast('All photos have been reset to clinic defaults.');
    }
  }

  exportPhotoConfig() {
    const current = PhotoManager.getAllCurrentPhotos();
    const jsonStr = JSON.stringify(current, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      this.showToast('📋 Photo configuration copied to clipboard!');
    }).catch(() => {
      prompt('Copy this Photo Config JSON:', jsonStr);
    });
  }

  // Booking Form & WhatsApp Direct Connect
  selectServiceForBooking(serviceTitle) {
    const select = document.getElementById('book-service');
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(serviceTitle) || select.options[i].value.includes(serviceTitle)) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    const section = document.getElementById('booking');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleBookingSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('book-name').value.trim();
    const phone = document.getElementById('book-phone').value.trim();
    const service = document.getElementById('book-service').value;
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    const notes = document.getElementById('book-notes').value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // Format WhatsApp Message
    const clinicPhone = '918593824501';
    let msg = `*Appointment Request - Dr. Divya's Dental Clinic*\n`;
    msg += `--------------------------------------\n`;
    msg += `👤 *Patient Name:* ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `🦷 *Treatment:* ${service}\n`;
    if (date) msg += `📅 *Preferred Date:* ${date}\n`;
    if (time) msg += `⏰ *Preferred Slot:* ${time}\n`;
    if (notes) msg += `📝 *Notes/Concern:* ${notes}\n`;
    msg += `--------------------------------------\n`;
    msg += `Location: Kazhakkoottam, Trivandrum`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${clinicPhone}?text=${encoded}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
    this.showToast('Opening WhatsApp to confirm your appointment!');
    e.target.reset();
  }

  // Review Submission
  openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) modal.classList.add('active');
  }

  closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) modal.classList.remove('active');
  }

  handleReviewSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('review-author').value.trim();
    const tag = document.getElementById('review-locality').value.trim() || 'Trivandrum Patient';
    const treatment = document.getElementById('review-service-name').value.trim() || 'General Consultation';
    const rating = parseInt(document.getElementById('review-rating').value, 10) || 5;
    const text = document.getElementById('review-message').value.trim();

    if (!name || !text) {
      alert('Please enter your name and a brief review.');
      return;
    }

    const newRev = {
      name,
      tag,
      treatment,
      treatmentCategory: 'general',
      rating,
      date: 'Just now',
      text
    };

    this.saveReviews(newRev);
    this.closeReviewModal();
    this.showToast('Thank you! Your review has been added.');
    e.target.reset();
  }

  // Toast System
  showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

// Global initialization
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new DentalApp();
  window.app = app;
});
