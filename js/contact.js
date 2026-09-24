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

// Copy email on click
const emailItem = document.querySelector('a[href^="mailto"]');
if (emailItem) {
  emailItem.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText('garciagarcia293@gmail.com').then(() => {
      const val = emailItem.querySelector('.contact-value');
      const original = val.textContent;
      val.textContent = 'Copied to clipboard!';
      val.style.color = 'var(--gold)';
      setTimeout(() => { val.textContent = original; val.style.color = ''; }, 2000);
    }).catch(() => { window.location.href = 'mailto:garciagarcia293@gmail.com'; });
  });
}

// SOCIAL LINKS — encodés en base64 (pas dans le HTML)
const _s = {
  li: atob('aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2dhcmNpYWpvc2lhc2RpeWVtYQ=='),
  gh: 'https://github.com/GarciaJrCode',
  md: atob('aHR0cHM6Ly9tZWRpdW0uY29tL0BnYXJjaWFnYXJjaWEyOTMvYWJvdXQ=')
};

document.getElementById('btnLinkedIn').addEventListener('click', () => {
  window.open(_s.li, '_blank', 'noopener,noreferrer');
});
document.getElementById('btnGitHub').addEventListener('click', () => {
  window.open(_s.gh, '_blank', 'noopener,noreferrer');
});
document.getElementById('btnMedium').addEventListener('click', () => {
  window.open(_s.md, '_blank', 'noopener,noreferrer');
});

// CODING PLATFORMS — encodés en base64
const _c = {
  lc: atob('aHR0cHM6Ly9sZWV0Y29kZS5jb20vdS9nYXJjaWFnYXJjaWEyOTMv'),
  hr: atob('aHR0cHM6Ly93d3cuaGFja2VycmFuay5jb20vcHJvZmlsZS9nYXJjaWFnYXJjaWEyOTM='),
  kg: atob('aHR0cHM6Ly93d3cua2FnZ2xlLmNvbS9yZW5tb3VyYW1ib3VkaXllbWE=')
};

document.getElementById('btnLeetCode').addEventListener('click', () => {
  window.open(_c.lc, '_blank', 'noopener,noreferrer');
});
document.getElementById('btnHackerRank').addEventListener('click', () => {
  window.open(_c.hr, '_blank', 'noopener,noreferrer');
});
document.getElementById('btnKaggle').addEventListener('click', () => {
  window.open(_c.kg, '_blank', 'noopener,noreferrer');
});

// EMAIL & PHONE — encodés en base64, jamais dans le HTML
const _contact = {
  email: atob('Z2FyY2lhZ2FyY2lhMjkzQGdtYWlsLmNvbQ=='),
  phone: atob('KzMzNzU5Njk3MDU2'),
  phoneTel: atob('KzMzNzU5Njk3MDU2')
};

// Affichage progressif au chargement (anti-scraping)
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('emailValue').textContent = _contact.email;
    document.getElementById('phoneValue').textContent = _contact.phone.replace(
      /(\+\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
      '$1 $2 $3 $4 $5 $6'
    );
  }, 800);
});

// Clics
document.getElementById('btnEmail').addEventListener('click', () => {
  window.location.href = 'mailto:' + _contact.email;
});
document.getElementById('btnPhone').addEventListener('click', () => {
  window.location.href = 'tel:' + _contact.phoneTel;
});