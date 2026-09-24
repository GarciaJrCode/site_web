// CURSOR
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
});
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12; trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px'; cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px'; cursor.style.height = '16px';
    cursorTrail.style.width = '50px'; cursorTrail.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    cursorTrail.style.width = '30px'; cursorTrail.style.height = '30px';
  });
});

// MOBILE MENU
const burger = document.getElementById('navBurger');
const menu   = document.getElementById('mobileMenu');
let open = false;
burger.addEventListener('click', () => {
  open = !open;
  menu.classList.toggle('open', open);
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// EMAIL & PHONE — encodés en base64, jamais dans le HTML
const _contact = {
  email: atob('Z2FyY2lhZ2FyY2lhMjkzQGdtYWlsLmNvbQ=='),
  phone: atob('KzMzNzU5Njk3MDU2')
};

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('aboutEmail').textContent = _contact.email;
    document.getElementById('aboutPhone').textContent = _contact.phone.replace(
      /(\+\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
      '$1 $2 $3 $4 $5 $6'
    );
  }, 800);
});