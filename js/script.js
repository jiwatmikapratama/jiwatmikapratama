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

// Back to Top button
(function backToTopSetup(){
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.classList.remove('opacity-0', 'invisible');
      btn.classList.add('opacity-100', 'visible');
    } else {
      btn.classList.add('opacity-0', 'invisible');
      btn.classList.remove('opacity-100', 'visible');
    }
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Shared search helpers
function attachListSearch({ input, cards, countEl, emptyContainerId }) {
  const inputEl = typeof input === 'string' ? document.getElementById(input) : input;
  const cardEls = Array.from(typeof cards === 'string' ? document.querySelectorAll(cards) : cards);
  const count = typeof countEl === 'string' ? document.getElementById(countEl) : countEl;

  const emptyId = emptyContainerId || 'emptyState';
  let emptyEl = document.getElementById(emptyId);
  if (!emptyEl) {
    emptyEl = document.createElement('div');
    emptyEl.id = emptyId;
    emptyEl.className = 'empty-state hidden';
    emptyEl.innerHTML = '<i class="fas fa-circle-info mr-2"></i>Tidak ada data yang cocok';
    inputEl?.parentElement?.after(emptyEl);
  }

  function updateVisible(list) {
    cardEls.forEach(el => el.classList.add('hidden'));
    list.forEach(el => el.classList.remove('hidden'));
  }

  function onSearch() {
    const q = (inputEl?.value || '').trim().toLowerCase();
    const filtered = cardEls.filter(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      const cat = (card.dataset.category || '').toLowerCase();
      const text = card.innerText.toLowerCase();
      return !q || title.includes(q) || tags.includes(q) || cat.includes(q) || text.includes(q);
    });

    updateVisible(filtered);

    if (count) {
      if (!q || filtered.length === cardEls.length) {
        count.textContent = 'Menampilkan semua item';
      } else if (filtered.length === 0) {
        count.textContent = 'Tidak ada data yang cocok';
      } else {
        count.textContent = `Ditemukan ${filtered.length} item`;
      }
    }

    if (filtered.length === 0) {
      emptyEl.classList.remove('hidden');
    } else {
      emptyEl.classList.add('hidden');
    }

    return filtered;
  }

  inputEl?.addEventListener('input', onSearch);
  onSearch();
  return { onSearch };
}

// Project page carousel builder (arrows already styled via CSS)
function initProjectSwipers() {
  if (typeof Swiper === 'undefined') return;
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
}

function ensureSwiperArrowsInjected(scopeSelector) {
  document.querySelectorAll(scopeSelector).forEach(swiperEl => {
    if (!swiperEl.querySelector('.swiper-button-prev')) {
      const prev = document.createElement('div');
      prev.className = 'swiper-button-prev';
      swiperEl.appendChild(prev);
    }
    if (!swiperEl.querySelector('.swiper-button-next')) {
      const next = document.createElement('div');
      next.className = 'swiper-button-next';
      swiperEl.appendChild(next);
    }
  });
}

// Gallery Swiper init
function initGallerySwipers() {
  if (typeof Swiper === 'undefined') return;
  ensureSwiperArrowsInjected('.gallery-swiper');
  document.querySelectorAll('.gallery-swiper').forEach(swiperEl => {
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
}

// Theme-smoothen gallery card reveal
function smoothReveal(selector) {
  const els = document.querySelectorAll(selector);
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'all .4s ease';
  });
  requestAnimationFrame(() => {
    els.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

// Auto init when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Unify hover for all cards (if classes exist on page)
  // No-op here because CSS handles hover; just optional reveal
  smoothReveal('.project-card, .gallery-card, .achievement-card, .info-card');

  // Gallery page: search + filter + pagination + empty state
  const galleryGrid = document.getElementById('galleryGrid');
  const gallerySearch = document.getElementById('searchInput');
  const galleryFiltersWrap = document.getElementById('filters');
  const galleryPagination = document.getElementById('pagination');
  if (galleryGrid && gallerySearch && galleryFiltersWrap && galleryPagination) {
    const cards = Array.from(galleryGrid.querySelectorAll('.gallery-card'));
    const filterBtns = Array.from(galleryFiltersWrap.querySelectorAll('.filter-btn'));
    let activeFilter = 'all';
    let currentPage = 1;
    const itemsPerPage = 4;

    // empty state element
    let emptyEl = document.getElementById('emptyGallery');
    if (!emptyEl) {
      emptyEl = document.createElement('div');
      emptyEl.id = 'emptyGallery';
      emptyEl.className = 'empty-state hidden mt-6';
      emptyEl.innerHTML = '<i class="fas fa-circle-info mr-2"></i>Tidak ada data yang cocok';
      galleryGrid.after(emptyEl);
    }

    function getFiltered() {
      const q = (gallerySearch.value || '').trim().toLowerCase();
      return cards.filter(card => {
        const cat = (card.dataset.category || '').toLowerCase();
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

      // empty state
      if (filtered.length === 0) emptyEl.classList.remove('hidden');
      else emptyEl.classList.add('hidden');

      // pagination controls
      galleryPagination.innerHTML = '';
      const makeBtn = (label, page, disabled, active) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = `px-3 py-2 rounded-lg text-sm ${disabled ? 'opacity-40 cursor-not-allowed' : 'bg-slate-800 border border-slate-700 text-slate-200 hover:border-emerald-500'} ${active ? 'ring-2 ring-emerald-500' : ''}`;
        if (!disabled) btn.addEventListener('click', () => { currentPage = page; render(); });
        return btn;
      };
      galleryPagination.appendChild(makeBtn('Prev', Math.max(1, currentPage - 1), currentPage === 1, false));
      for (let p = 1; p <= totalPages; p++) galleryPagination.appendChild(makeBtn(String(p), p, false, p === currentPage));
      galleryPagination.appendChild(makeBtn('Next', Math.min(totalPages, currentPage + 1), currentPage === totalPages, false));
    }

    gallerySearch.addEventListener('input', () => { currentPage = 1; render(); });
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('border-emerald-400', 'text-emerald-400'));
      btn.classList.add('border-emerald-400', 'text-emerald-400');
      activeFilter = btn.dataset.filter || 'all';
      currentPage = 1;
      render();
    }));
    // default filter
    const allBtn = filterBtns.find(b => (b.dataset.filter || '') === 'all');
    if (allBtn) allBtn.classList.add('border-emerald-400', 'text-emerald-400');
    render();
  }
});
