// Mobile menu toggle (shared)
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;
  const nowHidden = mobileMenu.classList.toggle('hidden');
  const btn = document.querySelector('nav .md:hidden button');
  if (btn) btn.setAttribute('aria-expanded', String(!nowHidden));
  mobileMenu.setAttribute('aria-hidden', String(nowHidden));
  document.body.classList.toggle('overflow-hidden', !nowHidden);
}

// Back to Top button (home page safe-guard)
(function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible');
      backToTopButton.classList.remove('opacity-100', 'visible');
    }
  });
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Utility: show empty state message in a container
function showEmptyState(container, message) {
  if (!container) return;
  let el = container.querySelector('.empty-state');
  if (!el) {
    el = document.createElement('div');
    el.className = 'empty-state text-slate-400 text-center text-sm mt-2';
    container.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('show'));
}

function hideEmptyState(container) {
  if (!container) return;
  const el = container.querySelector('.empty-state');
  if (el) el.classList.remove('show');
}

// Search helpers: apply filter and show validation if no results
function applySearch({ queryInputId, cardsSelector, resultCountId, paginationElId, itemsPerPage = 6, containerForEmptyState, allLabel = 'Menampilkan semua item', foundLabel = (n) => `Ditemukan ${n} item` }) {
  const input = document.getElementById(queryInputId);
  const cards = Array.from(document.querySelectorAll(cardsSelector));
  const resultCount = resultCountId ? document.getElementById(resultCountId) : null;
  const paginationEl = paginationElId ? document.getElementById(paginationElId) : null;
  if (!input || cards.length === 0) return;

  let filtered = cards.slice();
  let currentPage = 1;

  function render() {
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    cards.forEach(c => c.classList.add('hidden'));
    const start = (currentPage - 1) * itemsPerPage;
    filtered.slice(start, start + itemsPerPage).forEach(c => c.classList.remove('hidden'));

    if (resultCount) {
      resultCount.textContent = filtered.length === cards.length ? allLabel : foundLabel(filtered.length);
    }

    if (containerForEmptyState) {
      if (filtered.length === 0) {
        showEmptyState(containerForEmptyState, 'Tidak ada data yang cocok');
      } else {
        hideEmptyState(containerForEmptyState);
      }
    }

    if (paginationEl) {
      paginationEl.innerHTML = '';
      const makeBtn = (label, page, disabled, active) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = `px-3 py-2 rounded-lg text-sm ${disabled ? 'opacity-40 cursor-not-allowed' : 'bg-slate-800 border border-slate-700 text-slate-200 hover:border-emerald-500'} ${active ? 'ring-2 ring-emerald-500' : ''}`;
        if (!disabled) btn.addEventListener('click', () => { currentPage = page; render(); });
        return btn;
      };
      paginationEl.appendChild(makeBtn('Prev', Math.max(1, currentPage - 1), currentPage === 1, false));
      for (let p = 1; p <= totalPages; p++) paginationEl.appendChild(makeBtn(String(p), p, false, p === currentPage));
      paginationEl.appendChild(makeBtn('Next', Math.min(totalPages, currentPage + 1), currentPage === totalPages, false));
    }
  }

  function doSearch() {
    const q = (input.value || '').trim().toLowerCase();
    filtered = cards.filter(card => {
      const datasetValues = Object.values(card.dataset || {}).join(' ').toLowerCase();
      const text = card.innerText.toLowerCase();
      return !q || datasetValues.includes(q) || text.includes(q);
    });
    currentPage = 1;
    render();
  }

  input.addEventListener('input', doSearch);
  render();
}

// Particles (home)
function createParticles() {
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize common behaviors per page
document.addEventListener('DOMContentLoaded', () => {
  // Auto activate global searches if the elements exist
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    applySearch({
      queryInputId: 'searchInput',
      cardsSelector: '#projectsGrid .project-card',
      resultCountId: 'resultCount',
      paginationElId: 'pagination',
      itemsPerPage: 6,
      containerForEmptyState: projectsGrid.parentElement,
      allLabel: 'Menampilkan semua proyek',
      foundLabel: (n) => `Ditemukan ${n} proyek`
    });
  }

  const achievementsGrid = document.getElementById('achievementsGrid');
  if (achievementsGrid) {
    applySearch({
      queryInputId: 'searchInput',
      cardsSelector: '#achievementsGrid .achievement-card',
      resultCountId: 'resultCount',
      paginationElId: 'pagination',
      itemsPerPage: 3,
      containerForEmptyState: achievementsGrid.parentElement,
      allLabel: 'Menampilkan semua item',
      foundLabel: (n) => `Ditemukan ${n} item`
    });
  }

  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    initGalleryPage();
  }

  // Initialize home page components
  const homeCarousels = document.querySelectorAll('.carousel-container');
  if (homeCarousels.length > 0) {
    initHomeCarousel();
  }

  // Initialize filter buttons if present (used on home)
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    initHomeGalleryFilter();
  }

  // Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('fade-in'); });
  }, observerOptions);
  document.querySelectorAll('.info-card, .achievement-card, .gallery-card').forEach(el => observer.observe(el));
});

// Expose utilities globally if needed
window.toggleMobileMenu = toggleMobileMenu;
window.applySearch = applySearch;

// ---------- Projects page: build Swiper carousels with GLightbox ----------
function initProjectsPage() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid || typeof Swiper === 'undefined') return;
  if (projectsGrid.dataset.initProjects === '1') return;
  projectsGrid.dataset.initProjects = '1';

  function slugify(text) {
    return (text || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  const imagesByProject = {
    'e-commerce-platform': [
      { src: 'https://images.unsplash.com/photo-1515165562835-c3b8c4e31b53?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1515165562835-c3b8c4e31b53?q=80&w=600&auto=format&fit=crop', alt: 'E-Commerce product grid' },
      { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop', alt: 'Checkout page' },
      { src: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=600&auto=format&fit=crop', alt: 'Payment success' }
    ],
    'realtime-chat-app': [
      { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop', alt: 'Chat interface' },
      { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop', alt: 'Dark chat theme' },
      { src: 'https://images.unsplash.com/photo-1516166328577-2bd8f2f1f6af?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1516166328577-2bd8f2f1f6af?q=80&w=600&auto=format&fit=crop', alt: 'Notifications' }
    ],
  };

  const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));

  function createProjectSwiper(card) {
    const title = card.dataset.title || 'Project';
    const slug = slugify(title);
    const images = imagesByProject[slug] || [
      { src: 'https://images.unsplash.com/photo-1556157382-97eda2f9e9b3?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1556157382-97eda2f9e9b3?q=80&w=600&auto=format&fit=crop', alt: `${title} screenshot 1` },
      { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop', alt: `${title} screenshot 2` }
    ];
    const wrapper = document.createElement('div');
    wrapper.className = 'relative rounded-xl overflow-hidden mb-4 border border-slate-700/50';
    const swiperEl = document.createElement('div');
    swiperEl.className = 'swiper project-swiper';
    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';
    const groupName = `project-${slug}`;
    images.forEach(img => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      const a = document.createElement('a');
      a.href = img.src;
      a.className = 'glightbox';
      a.setAttribute('data-gallery', groupName);
      const image = document.createElement('img');
      image.src = img.thumb;
      image.alt = img.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.className = 'w-full h-48 md:h-56 object-cover';
      a.appendChild(image);
      slide.appendChild(a);
      swiperWrapper.appendChild(slide);
    });
    swiperEl.appendChild(swiperWrapper);
    const pag = document.createElement('div');
    pag.className = 'swiper-pagination';
    const prev = document.createElement('div');
    prev.className = 'swiper-button-prev';
    const next = document.createElement('div');
    next.className = 'swiper-button-next';
    swiperEl.appendChild(pag);
    swiperEl.appendChild(prev);
    swiperEl.appendChild(next);
    wrapper.appendChild(swiperEl);
    card.insertBefore(wrapper, card.firstChild);
  }

  cards.forEach(createProjectSwiper);
  document.querySelectorAll('.project-swiper').forEach(swiperEl => {
    new Swiper(swiperEl, {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 12,
      grabCursor: true,
      keyboard: { enabled: true },
      a11y: { enabled: true },
      watchOverflow: true,
      pagination: { el: swiperEl.querySelector('.swiper-pagination'), clickable: true, dynamicBullets: true },
      navigation: { nextEl: swiperEl.querySelector('.swiper-button-next'), prevEl: swiperEl.querySelector('.swiper-button-prev') },
      breakpoints: { 640: { spaceBetween: 12 }, 768: { spaceBetween: 16 }, 1024: { spaceBetween: 20 } }
    });
  });

  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.project-card .glightbox', touchNavigation: true, loop: true });
  }
}

// ---------- Gallery page: filters, search, pagination, and Swiper + GLightbox ----------
function initGalleryPage() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  // Search + filter + pagination (run once)
  if (grid.dataset.initGalleryList !== '1') {
    grid.dataset.initGalleryList = '1';
  }

  const searchInput = document.getElementById('searchInput');
  const filterBtns = Array.from(document.querySelectorAll('#filters .filter-btn'));
  const cards = Array.from(grid.querySelectorAll('.gallery-card'));
  const paginationEl = document.getElementById('pagination');
  let activeFilter = 'all';
  let currentPage = 1;
  const itemsPerPage = 4;

  function getFiltered() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    return cards.filter(card => {
      const cat = card.dataset.category || '';
      const title = (card.dataset.title || '').toLowerCase();
      const text = card.innerText.toLowerCase();
      const passFilter = activeFilter === 'all' || cat === activeFilter;
      const passSearch = !q || title.includes(q) || text.includes(q);
      return passFilter && passSearch;
    });
  }

  function render() {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    cards.forEach(c => c.classList.add('hidden'));
    const start = (currentPage - 1) * itemsPerPage;
    filtered.slice(start, start + itemsPerPage).forEach(c => c.classList.remove('hidden'));

    // Empty state
    if (filtered.length === 0) {
      showEmptyState(grid.parentElement, 'Tidak ada data yang cocok');
    } else {
      hideEmptyState(grid.parentElement);
    }

    // Pagination controls
    if (paginationEl) {
      paginationEl.innerHTML = '';
      const makeBtn = (label, page, disabled, active) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = `px-3 py-2 rounded-lg text-sm ${disabled ? 'opacity-40 cursor-not-allowed' : 'bg-slate-800 border border-slate-700 text-slate-200 hover:border-emerald-500'} ${active ? 'ring-2 ring-emerald-500' : ''}`;
        if (!disabled) btn.addEventListener('click', () => { currentPage = page; render(); });
        return btn;
      };
      paginationEl.appendChild(makeBtn('Prev', Math.max(1, currentPage - 1), currentPage === 1, false));
      for (let p = 1; p <= totalPages; p++) paginationEl.appendChild(makeBtn(String(p), p, false, p === currentPage));
      paginationEl.appendChild(makeBtn('Next', Math.min(totalPages, currentPage + 1), currentPage === totalPages, false));
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => { currentPage = 1; render(); });
  }
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('border-emerald-400', 'text-emerald-400'));
    btn.classList.add('border-emerald-400', 'text-emerald-400');
    activeFilter = btn.dataset.filter;
    currentPage = 1;
    render();
  }));
  const allBtn = filterBtns.find(b => b.dataset.filter === 'all');
  if (allBtn) allBtn.classList.add('border-emerald-400', 'text-emerald-400');

  render();

  // Swiper + GLightbox for each gallery card
  if (typeof Swiper === 'undefined') return;
  if (grid.dataset.initGallerySwiper === '1') return;
  grid.dataset.initGallerySwiper = '1';

  function slugify(text) { return (text || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
  const imagesByCategory = {
    nature: [
      { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop', alt: 'Mountain sunrise' },
      { src: 'https://images.unsplash.com/photo-1501785888041-173b4e0b2597?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1501785888041-173b4e0b2597?q=80&w=600&auto=format&fit=crop', alt: 'Forest path' },
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', alt: 'Ocean waves' }
    ],
    architecture: [
      { src: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=600&auto=format&fit=crop', alt: 'Skyscraper' },
      { src: 'https://images.unsplash.com/photo-1466853817435-05b43fe45b39?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1466853817435-05b43fe45b39?q=80&w=600&auto=format&fit=crop', alt: 'Modern building' },
      { src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=600&auto=format&fit=crop', alt: 'Classic architecture' }
    ],
    travel: [
      { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop', alt: 'City travel' },
      { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600&auto=format&fit=crop', alt: 'Street photography' },
      { src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop', alt: 'Memorable moments' }
    ],
    portrait: [
      { src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600&auto=format&fit=crop', alt: 'Studio light' },
      { src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop', alt: 'Outdoor vibes' },
      { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', alt: 'Portrait story' }
    ]
  };

  const cards = Array.from(document.querySelectorAll('#galleryGrid .gallery-card'));
  cards.forEach((card, idx) => {
    const cat = card.getAttribute('data-category') || 'nature';
    const title = card.getAttribute('data-title') || `Gallery ${idx + 1}`;
    const slug = slugify(title);
    const images = imagesByCategory[cat] || imagesByCategory['nature'];
    const wrapper = document.createElement('div');
    wrapper.className = 'relative rounded-xl overflow-hidden';
    const swiperEl = document.createElement('div');
    swiperEl.className = 'swiper gallery-swiper';
    const inner = document.createElement('div');
    inner.className = 'swiper-wrapper';
    images.forEach(img => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      const a = document.createElement('a');
      a.href = img.src;
      a.className = 'glightbox';
      a.setAttribute('data-gallery', `gallery-${slug}`);
      const image = document.createElement('img');
      image.src = img.thumb;
      image.alt = img.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.className = 'w-full h-56 md:h-64 object-cover';
      a.appendChild(image);
      slide.appendChild(a);
      inner.appendChild(slide);
    });
    swiperEl.appendChild(inner);
    const pag = document.createElement('div');
    pag.className = 'swiper-pagination';
    const prev = document.createElement('div');
    prev.className = 'swiper-button-prev';
    const next = document.createElement('div');
    next.className = 'swiper-button-next';
    swiperEl.appendChild(pag);
    swiperEl.appendChild(prev);
    swiperEl.appendChild(next);
    wrapper.appendChild(swiperEl);
    const firstChild = card.firstChild;
    card.insertBefore(wrapper, firstChild);
  });
  document.querySelectorAll('.gallery-swiper').forEach(swiperEl => new Swiper(swiperEl, {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 12,
    grabCursor: true,
    keyboard: { enabled: true },
    a11y: { enabled: true },
    watchOverflow: true,
    pagination: { el: swiperEl.querySelector('.swiper-pagination'), clickable: true, dynamicBullets: true },
    navigation: { nextEl: swiperEl.querySelector('.swiper-button-next'), prevEl: swiperEl.querySelector('.swiper-button-prev') },
    breakpoints: { 640: { spaceBetween: 12 }, 768: { spaceBetween: 16 }, 1024: { spaceBetween: 20 } }
  }));

  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.gallery-card .glightbox', touchNavigation: true, loop: true });
  }
}

// ---------- Home page: custom carousel and filter buttons ----------
function initHomeCarousel() {
  class HomeCarousel {
    constructor(container) {
      this.container = container;
      this.track = container.querySelector('.carousel-track');
      this.slides = container.querySelectorAll('.carousel-slide');
      this.prevBtn = container.querySelector('.carousel-nav.prev');
      this.nextBtn = container.querySelector('.carousel-nav.next');
      this.dots = container.querySelectorAll('.carousel-dot');
      this.currentSlideSpan = container.querySelector('.current-slide');
      this.totalSlidesSpan = container.querySelector('.total-slides');
      this.currentSlide = 0;
      this.totalSlides = this.slides.length;
      this.autoPlayInterval = null;
      this.isAutoPlaying = false;
      this.init();
    }
    init() {
      if (this.totalSlidesSpan) this.totalSlidesSpan.textContent = this.totalSlides;
      if (this.prevBtn) this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.prevSlide(); });
      if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.nextSlide(); });
      this.dots.forEach((dot, index) => dot.addEventListener('click', (e) => { e.stopPropagation(); this.goToSlide(index); }));
      this.container.addEventListener('mouseenter', () => { this.startAutoPlay(); });
      this.container.addEventListener('mouseleave', () => { this.stopAutoPlay(); });
      this.addTouchSupport();
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); this.prevSlide(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); this.nextSlide(); }
      });
      this.container.setAttribute('tabindex', '0');
    }
    addTouchSupport() {
      let startX = 0; let currentX = 0; let isDragging = false;
      this.track?.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; this.stopAutoPlay(); });
      this.track?.addEventListener('touchmove', (e) => { if (!isDragging) return; currentX = e.touches[0].clientX; e.preventDefault(); });
      this.track?.addEventListener('touchend', () => {
        if (!isDragging) return; isDragging = false;
        const diffX = startX - currentX; const threshold = 50;
        if (Math.abs(diffX) > threshold) { if (diffX > 0) this.nextSlide(); else this.prevSlide(); }
      });
    }
    startAutoPlay() { if (this.isAutoPlaying) return; this.isAutoPlaying = true; this.autoPlayInterval = setInterval(() => { this.nextSlide(); }, 3000); }
    stopAutoPlay() { if (!this.isAutoPlaying) return; this.isAutoPlaying = false; clearInterval(this.autoPlayInterval); }
    updateSlide() {
      const translateX = -this.currentSlide * 100; if (this.track) this.track.style.transform = `translateX(${translateX}%)`;
      if (this.currentSlideSpan) this.currentSlideSpan.textContent = this.currentSlide + 1;
      this.dots.forEach((dot, index) => { dot.classList.toggle('active', index === this.currentSlide); });
    }
    nextSlide() { this.currentSlide = (this.currentSlide + 1) % this.totalSlides; this.updateSlide(); }
    prevSlide() { this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides; this.updateSlide(); }
    goToSlide(index) { this.currentSlide = index; this.updateSlide(); }
  }
  document.querySelectorAll('.carousel-container').forEach(container => { new HomeCarousel(container); });
}

function initHomeGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  if (filterButtons.length === 0 || galleryCards.length === 0) return;
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active', 'border-emerald-400', 'bg-emerald-400/20', 'text-emerald-400');
        btn.classList.add('border-slate-600', 'text-slate-400');
      });
      button.classList.add('active', 'border-emerald-400', 'bg-emerald-400/20', 'text-emerald-400');
      button.classList.remove('border-slate-600', 'text-slate-400');
      const filterCategory = button.textContent.toLowerCase().trim();
      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(-20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// Initialize Projects and Gallery specific widgets once libs are loaded
window.addEventListener('load', () => {
  if (document.getElementById('projectsGrid')) initProjectsPage();
  if (document.getElementById('galleryGrid')) initGalleryPage();
  // Home particles
  createParticles();
});
