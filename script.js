
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card');


  const hero = document.querySelector('.hero');
  const heroOverlay = document.querySelector('.hero-overlay');


  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  const sectionObserverOpts = {
    root: null,
    threshold: 0.2
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href').substring(1) === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, sectionObserverOpts);

  sections.forEach(section => sectionObserver.observe(section));


  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target); 
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  cards.forEach(card => cardObserver.observe(card));


  function handleScroll() {
    const scrollY = window.scrollY;
 
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (hero) {
  
      hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
    }
   
    if (heroOverlay) {
      const maxFade = 300;
      const fadeVal = Math.max(0, Math.min(1, 1 - scrollY / maxFade));
      heroOverlay.style.opacity = fadeVal.toString();
      heroOverlay.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  }
  window.addEventListener('scroll', handleScroll);
});