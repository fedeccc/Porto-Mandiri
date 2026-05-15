(function () {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu.querySelectorAll("a");
  const yearEl = document.getElementById("year");

  yearEl.textContent = new Date().getFullYear();

  /* Mobile menu */
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Header shadow on scroll */
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Active nav link */
  const sections = document.querySelectorAll("section[id]");
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((sec) => observerNav.observe(sec));

  /* Skill bars animation */
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const level = bar.dataset.level;
    bar.style.setProperty("--level", `${level}%`);
    bar.querySelector(".skill-bar-fill").style.width = "0";
  });

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".skill-bar").forEach((bar) => skillObserver.observe(bar));

  /* Scroll reveal */
  const revealTargets = document.querySelectorAll(
    ".section-header, .skill-card, .project-card, .cert-card, .about-text, .bio-list"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
})();
