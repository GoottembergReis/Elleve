const elements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 100);
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => fadeObserver.observe(el));


// ===== WHATSAPP AUTO HIDE =====
const whatsappBtn = document.querySelector('.whatsapp-float');
const contactSection = document.querySelector('#contato');

const whatsappObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            whatsappBtn.style.opacity = '0';
            whatsappBtn.style.pointerEvents = 'none';
            whatsappBtn.style.transform = 'scale(0.8)';
        } else {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.pointerEvents = 'auto';
            whatsappBtn.style.transform = 'scale(1)';
        }
    });
}, {
    threshold: 0.3
});

whatsappObserver.observe(contactSection);