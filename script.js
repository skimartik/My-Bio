// =====================
// 1. DARK MODE TOGGLE
// =====================

const toggleBtn = document.getElementById("dark-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


// =====================
// 2. BACK TO TOP BUTTON
// =====================

const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// =============================
// 3. FADE-IN ANIMATION ON SCROLL
// =============================

const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
  
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});



// =====================
// 4. DYNAMIC YEAR
// =====================
document.getElementById("year").textContent = new Date().getFullYear();

