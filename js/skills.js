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

// Animate skill bars on intersection
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(fill => {
        const level = fill.closest('.skill-bar').getAttribute('data-level');
        fill.style.width = level + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => barObserver.observe(g));