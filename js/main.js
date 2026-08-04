(() => {
  "use strict";

  /* ---------- Header: scroll ile katılaşma ---------- */
  const header = document.getElementById("site-header");
  const heroScroll = document.getElementById("hero-scroll");
  const onScroll = () => {
    header.classList.toggle("is-solid", window.scrollY > 40);
    if (heroScroll) heroScroll.classList.toggle("is-hidden", window.scrollY > 60);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobil menü ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Dil değişimi (TR / EN) ---------- */
  const STORAGE_KEY = "lavantavadi-lang";
  const langButtons = document.querySelectorAll("[data-lang]");
  const translatable = document.querySelectorAll("[data-tr][data-en]");

  function applyLang(lang) {
    document.documentElement.lang = lang;
    translatable.forEach((el) => {
      el.textContent = lang === "en" ? el.dataset.en : el.dataset.tr;
    });
    langButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
    if (heroScroll) {
      heroScroll.setAttribute(
        "aria-label",
        lang === "en" ? heroScroll.dataset.labelEn : heroScroll.dataset.labelTr
      );
    }
    localStorage.setItem(STORAGE_KEY, lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  const savedLang = localStorage.getItem(STORAGE_KEY);
  if (savedLang === "en") applyLang("en");

  /* ---------- Footer yılı ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
