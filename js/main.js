(function () {
  "use strict";

  /* Mobile navigation */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("nav-open", !expanded);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* Active nav link */
  var pathParts = window.location.pathname.split("/");
  var currentPage = pathParts.pop() || "index.html";
  if (!currentPage || currentPage === "") currentPage = "index.html";
  document.querySelectorAll("[data-nav]").forEach(function (link) {
    var href = link.getAttribute("href");
    var isHome =
      (currentPage === "index.html" || currentPage === "") &&
      (href === "index.html" || href === "/" || href === "./");
    if (href === currentPage || isHome) {
      link.classList.add("site-nav__link--active", "mobile-nav__link--active");
    }
  });

  /* Accordions */
  document.querySelectorAll(".accordion__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const panel = trigger.nextElementSibling;

      document.querySelectorAll(".accordion__trigger").forEach(function (t) {
        if (t !== trigger) {
          t.setAttribute("aria-expanded", "false");
          const p = t.nextElementSibling;
          if (p) p.classList.remove("is-open");
        }
      });

      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.classList.toggle("is-open", !expanded);
    });
  });

  /* Testimonial slider */
  const slider = document.querySelector(".testimonial-slider");
  if (slider) {
    const track = slider.querySelector(".testimonial-slider__track");
    const slides = slider.querySelectorAll(".testimonial-slide");
    const dots = slider.querySelectorAll(".testimonial-slider__dot");
    let current = 0;
    let intervalId;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
        dot.setAttribute("aria-selected", i === current ? "true" : "false");
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        resetInterval();
      });
    });

    function resetInterval() {
      clearInterval(intervalId);
      intervalId = setInterval(function () {
        goTo(current + 1);
      }, 6000);
    }

    slider.addEventListener("mouseenter", function () {
      clearInterval(intervalId);
    });

    slider.addEventListener("mouseleave", resetInterval);

    resetInterval();
  }

  /* Pre-select plan when clicking pricing CTAs on homepage */
  var trialPlanInput = document.getElementById("trial-plan");
  document.querySelectorAll("[data-plan]").forEach(function (link) {
    link.addEventListener("click", function () {
      var plan = link.getAttribute("data-plan");
      if (trialPlanInput && plan) trialPlanInput.value = plan;
    });
  });

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* CTA tracking placeholder — wire to GA4 when ID is set */
  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () {
      const event = el.getAttribute("data-track");
      if (typeof gtag === "function") {
        gtag("event", event, { event_category: "cta" });
      }
    });
  });
})();
