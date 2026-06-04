(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Page loader */
  var loader = document.createElement("div");
  loader.className = "page-loader";
  loader.setAttribute("aria-hidden", "true");
  loader.innerHTML =
    '<p class="page-loader__logo">Oxygen <span>Gym</span></p>';
  document.body.classList.add("is-loading");
  document.body.prepend(loader);

  function finishLoader() {
    document.body.classList.remove("is-loading");
    loader.classList.add("is-done");
    setTimeout(function () {
      loader.remove();
    }, 600);
  }

  if (document.readyState === "complete") {
    finishLoader();
  } else {
    window.addEventListener("load", finishLoader);
  }

  /* Scroll progress */
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = '<div class="scroll-progress__bar"></div>';
  document.body.prepend(progress);
  var progressBar = progress.querySelector(".scroll-progress__bar");

  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* Stagger grid items */
  document
    .querySelectorAll(".grid-3, .member-stories-grid, .pricing-grid")
    .forEach(function (grid) {
      Array.from(grid.children).forEach(function (child, i) {
        child.classList.add("stagger-item");
        child.style.setProperty("--stagger-i", String(i));
      });
    });

  /* Animated counters */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1800;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-counter]").forEach(function (el) {
    counterObserver.observe(el);
  });

  var statsRow = document.querySelector(".social-proof__stats");
  if (statsRow) {
    statsRow.querySelectorAll(".social-proof__stat").forEach(function (stat, i) {
      stat.classList.add("stagger-item");
      stat.style.setProperty("--stagger-i", String(i));
    });
  }

  /* Subtle hero parallax */
  var heroBg = document.querySelector(".hero__bg");
  if (heroBg && !reducedMotion) {
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          heroBg.style.transform =
            "scale(1.08) translateY(" + y * 0.28 + "px)";
        }
      },
      { passive: true }
    );
  }

  /* Accordion panel — wrap content for smooth height */
  document.querySelectorAll(".accordion__panel").forEach(function (panel) {
    if (!panel.querySelector(".accordion__panel-inner")) {
      var inner = document.createElement("div");
      inner.className = "accordion__panel-inner";
      while (panel.firstChild) {
        inner.appendChild(panel.firstChild);
      }
      panel.appendChild(inner);
    }
  });
})();
