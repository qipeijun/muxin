const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
let menuOpen = false;

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    menuOpen = !menuOpen;
    menuToggle.setAttribute("aria-expanded", String(menuOpen));
    mobileNav.classList.toggle("is-open", menuOpen);
    document.body.classList.toggle("menu-open", menuOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuOpen = false;
      menuToggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((item) => observer.observe(item));
