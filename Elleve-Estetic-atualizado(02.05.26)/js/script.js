document.addEventListener("DOMContentLoaded", () => {

  // ================= MENU =================
  const menu = document.getElementById("navMenu");
  const toggle = document.getElementById("mobileToggle");
  const overlay = document.getElementById("overlay");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      if (overlay) overlay.classList.toggle("active");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      menu.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  // ================= CARROSSEL PROFISSIONAL =================
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");

  if (track && nextBtn && prevBtn) {

    let index = 0;
    let startX = 0;
    let isDragging = false;

    const cards = Array.from(track.children);

    // 🔥 RESPONSIVO
    function getVisible() {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    }

    let visible = getVisible();

    // 🔥 CLONES (INFINITO REAL)
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });

    cards.slice().reverse().forEach(card => {
      track.insertBefore(card.cloneNode(true), track.firstChild);
    });

    index = cards.length;

    function getSize() {
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      return track.children[0].offsetWidth + gap;
    }

    function move(animate = true) {
      track.style.transition = animate ? "transform 0.5s ease" : "none";
      track.style.transform = `translateX(-${index * getSize()}px)`;
    }

    function next() {
      index += visible;
      move();

      if (index >= cards.length * 2) {
        setTimeout(() => {
          index = cards.length;
          move(false);
        }, 600);
      }
    }

    function prev() {
      index -= visible;
      move();

      if (index <= 0) {
        setTimeout(() => {
          index = cards.length;
          move(false);
        }, 600);
      }
    }

    // BOTÕES
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // AUTOPLAY
    let auto = setInterval(next, 3000);

    track.addEventListener("mouseenter", () => clearInterval(auto));
    track.addEventListener("mouseleave", () => {
      auto = setInterval(next, 3000);
    });

    // 🔥 SWIPE (MOUSE + TOUCH)
    track.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX;
      track.style.transition = "none";
    });

    track.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      let diff = e.pageX - startX;

      if (diff > 50) prev();
      else if (diff < -50) next();

      isDragging = false;
    });

    track.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
      let diff = e.changedTouches[0].clientX - startX;

      if (diff > 50) prev();
      else if (diff < -50) next();
    });

    // RESPONSIVO AO REDIMENSIONAR
    window.addEventListener("resize", () => {
      visible = getVisible();
      move(false);
    });

    move(false);
  }

  // ================= HERO CAROUSEL =================
  const slides = document.querySelectorAll('.hero-slide');
  const heroPrev = document.querySelector('.hero-btn.prev');
  const heroNext = document.querySelector('.hero-btn.next');

  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  let heroAuto = setInterval(nextSlide, 4000);

  function resetAuto() {
    clearInterval(heroAuto);
    heroAuto = setInterval(nextSlide, 4000);
  }

  if (heroNext) {
    heroNext.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
      resetAuto();
    });
  }

  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
      resetAuto();
    });
  }
document.getElementById("whatsForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const message = `Olá! Meu nome é ${name}. ${phone ? "Telefone: " + phone + "." : ""} Vi o site e gostaria de agendar uma avaliação.`;

  const number = "5583998858437"; // seu número

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});});
;