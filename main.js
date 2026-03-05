// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
function animateRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.transform='translate(-50%,-50%) scale(2)'; ring.style.transform='translate(-50%,-50%) scale(1.5)'; ring.style.opacity='1'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1)'; ring.style.transform='translate(-50%,-50%) scale(1)'; ring.style.opacity='.5'; });
});

// ── NAV SCROLL ──
const nav = document.querySelector('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── ACTIVE NAV LINK ──
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  const href = a.getAttribute('href');
  if(href === path || (path==='' && href==='index.html')) a.classList.add('active');
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:0.1});
reveals.forEach(el=>observer.observe(el));

// ── FAQ ──
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      o.classList.remove('open');
      o.querySelector('.faq-answer').style.maxHeight='0';
    });
    if(!isOpen){ item.classList.add('open'); answer.style.maxHeight=answer.scrollHeight+'px'; }
  });
});

// ── COUNTER ANIMATION ──
function animateCounter(el){
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target/duration*16;
  let current=0;
  const timer = setInterval(()=>{
    current+=step;
    if(current>=target){ current=target; clearInterval(timer); }
    el.textContent = Math.floor(current)+(el.dataset.suffix||'');
  },16);
}
const counterObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('[data-target]').forEach(el=>counterObserver.observe(el));
