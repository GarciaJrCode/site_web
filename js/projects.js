const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
});
(function animateTrail() {
  trailX += (mouseX - trailX) * 0.12; trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px'; cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='16px';cursor.style.height='16px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='10px';cursor.style.height='10px'; });
});

const burger = document.getElementById('navBurger');
const menu   = document.getElementById('mobileMenu');
let open = false;
burger.addEventListener('click', () => {
  open = !open; menu.classList.toggle('open', open);
  const s = burger.querySelectorAll('span');
  if (open) { s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)'; }
  else { s.forEach(x=>{x.style.transform='';x.style.opacity='';}); }
});

// Staggered reveal on scroll
const cards = document.querySelectorAll('.project-card');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 100);
    }
  });
}, { threshold: 0.1 });
cards.forEach(c => obs.observe(c));

const _projects = {
  p01: 'https://github.com/GarciaJrCode/exotic_derivatives_autocallable_pricing_hedging_and_model_risk',
  p02: 'https://github.com/GarciaJrCode/rough_volatility_calibration_and_monte_carlo_pricing_under_rough_bergomi',
  p03: 'https://github.com/GarciaJrCode/portfolio_risk_engine_extreme_value_theory_copulas_and_expected_shortfall',
};

document.querySelectorAll('.view-project-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const url = _projects[btn.getAttribute('data-id')];
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  });
});

const _allProjects = 'https://github.com/GarciaJrCode';

document.getElementById('btnAllProjects').addEventListener('click', () => {
  window.open(_allProjects, '_blank', 'noopener,noreferrer');
});

// PREVIEW MODAL
const modal      = document.getElementById('previewModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImgs  = [
  document.getElementById('modalImg1'),
  document.getElementById('modalImg2'),
  document.getElementById('modalImg3'),
  document.getElementById('modalImg4'),
];

const projectTitles = {
  '01': 'Exotic Derivatives: Autocallable Pricing, Hedging and Model Risk',
  '02': 'Rough Volatility: Calibration and Monte Carlo Pricing under Rough Bergomi',
  '03': 'Portfolio Risk Engine: Extreme Value Theory, Copulas and Expected Shortfall',
};

document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id = btn.getAttribute('data-project');
    const folder = `images/project_${id}/`;

    modalTitle.textContent = `Project ${id} — ${projectTitles[id] || ''}`;
    modalImgs.forEach((img, i) => {
      img.src = `${folder}image_${i + 1}.png`;
      img.onerror = () => { img.src = `${folder}image_${i + 1}.jpg`; };
    });

    modal.classList.add('open');
    /*document.body.style.overflow = 'hidden';*/
    if (!isTouchDevice()) document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  /*document.body.style.overflow = '';*/
  if (!isTouchDevice()) document.body.style.overflow = '';
  modalImgs.forEach(img => { img.src = ''; });
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// IMAGE ZOOM ON HOVER 
const zoomOverlay = document.getElementById('zoomOverlay');
const zoomFullImg = document.getElementById('zoomFullImg');

const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

modalImgs.forEach(img => {
  // DESKTOP
  img.addEventListener('mouseenter', () => {
    if (isTouchDevice()) return;
    zoomFullImg.src = img.src;
    zoomOverlay.classList.add('open');
  });
});

// DESKTOP 
zoomOverlay.addEventListener('mouseleave', () => {
  if (isTouchDevice()) return;
  zoomOverlay.classList.remove('open');
  zoomFullImg.src = '';
});