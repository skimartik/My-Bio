console.log("JS loaded ✔️");


// =====================
// LOADER
// =====================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("main-content");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.8s ease";

    setTimeout(() => {
      loader.style.display = "none";
      content.style.opacity = "1";
    }, 800);
  }, 0);
});


// =====================
// Merged DOMcontentloaded listener 4 typing effect+ skillcard reveal
// =====================
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready ✅")
  
  // --- Typing Effect ---
  const typed = document.getElementById("typed");
  const phrases = ["Web Developer", "Learner", "Problem Solver", "Future Software Engineer"];
  let word = 0, letter = 0, deleting = false, lastTime = 0;
  const speed = 110, delSpeed = 55, hold = 900;

  function typeEffect(timestamp) {
    if (timestamp - lastTime < (deleting ? delSpeed : speed)) {
      requestAnimationFrame(typeEffect);
      return;
    }
    lastTime = timestamp;
    const current = phrases[word];

    if (!deleting) {
      letter++;
      typed.textContent = current.substring(0, letter);
      if (letter === current.length) {
        deleting = true;
        setTimeout(() => requestAnimationFrame(typeEffect), hold);
        return;
      }
    } else {
      letter--;
      typed.textContent = current.substring(0, letter);
      if (letter === 0) {
        deleting = false;
        word = (word + 1) % phrases.length;
      }
    }
    requestAnimationFrame(typeEffect);
  }
  requestAnimationFrame(typeEffect);

  // --- Skill Cards Reveal ---

  
  const skillCards = document.querySelectorAll(".skill-card");
  
  const revealSkills = () => {
    console.log("Revealing skill cards");
    skillCards.forEach((card, i) => {
      card.style.transition = `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`;
      card.classList.add("visible");
    });
  };

  // Wait until loader is finished 
  const waitForLoader = () => {
    const content =document.getElementById("main-content");
  
  if (window.getComputedStyle(content).opacity === "1") {
    revealSkills();
  } else {
    setTimeout(waitForLoader, 50);
    }
  };

  waitForLoader();
});

// =============================
// TILT EFFECT
// =============================
document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 10;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

// =============================
// SKILL BAR PROGRESS ANIMATION
// =============================
// =============================
// SKILL BAR: reveal, fill, and count (single robust observer)
// =============================
(function () {
  const skillBars = document.querySelectorAll(".skill-bar");

  if (!skillBars.length) return;

  const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      const fill = bar.querySelector(".fill");
      const percentLabel = bar.querySelector(".percent");

      // defensive checks
      if (!fill) { observer.unobserve(bar); return; }
      if (!percentLabel) { observer.unobserve(bar); return; }

      // normalize dataset value and parse integer
      let raw = (fill.dataset.width || "").toString().trim();
      if (!raw.endsWith("%")) raw = raw + "%";
      const finalWidth = parseInt(raw, 10) || 0;

      // reveal row (fade + slide)
      bar.classList.add("visible");

      // animate fill width (CSS transition should be present)
      // ensure it's a valid CSS value
      fill.style.width = finalWidth + "%";

      // animated count using requestAnimationFrame for smoothness
      let start = 0;
      const duration = 1200; // ms for the count
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * finalWidth);
        percentLabel.textContent = current + "%";
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          percentLabel.textContent = finalWidth + "%";
        }
      }

      requestAnimationFrame(step);

      // done with this bar
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  // observe each bar row
  skillBars.forEach(bar => barObserver.observe(bar));
})();

// =============================
// DARK MODE
// =============================
// =============================
// DARK MODE TOGGLE + ANIMATION
// =============================
const toggleBtn = document.getElementById("dark-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// =============================
// BACK TO TOP
// =============================
const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// =============================
// FADE-IN ON SCROLL
// =============================
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => appearOnScroll.observe(fader));


// =============================
// CONTACT MODAL
// =============================
const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  contactModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  contactModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.style.display = "none";
  }
});

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  contactForm.style.display = "none";
  successMessage.style.display = "block";

  setTimeout(() => successMessage.classList.add("show"), 10);

  setTimeout(() => {
    contactModal.style.display = "none";
    contactForm.reset();
    contactForm.style.display = "block";
    successMessage.classList.remove("show");
    successMessage.style.display = "none";
  }, 1000);
});


// =============================
// YEAR
// =============================
document.getElementById("year").textContent = new Date().getFullYear();
