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

const faders = document.querySelectorAll(".fadeIn");


function checkFade() {
  const triggerBottom = window.innerHeight * 0.9;

  faders.forEach(element => {
    const boxTop = element.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkFade);
checkFade();


// =====================
// 4. DYNAMIC YEAR
// =====================
document.getElementById("year").textContent = new Date().getFullYear();

