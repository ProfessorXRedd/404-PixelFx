/* ==========================================================================
   404 PixelFx — Shared Site Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Sticky navbar shadow on scroll ---- */
  var navbar = document.querySelector('.navbar-fx');
  if (navbar) {
    var toggleNavScroll = function () {
      navbar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    toggleNavScroll();
    window.addEventListener('scroll', toggleNavScroll, { passive: true });
  }

  /* ---- Scroll progress bar + hero parallax + back-to-top ----
     Single rAF-driven loop keeps all scroll-linked transforms smooth. */
  var progressBar = document.querySelector('.scroll-progress-fx');
  var heroMeshes = document.querySelectorAll('.hero-mesh');
  var backToTop = document.querySelector('.back-to-top-fx');
  var ticking = false;

  function updateOnScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = pct + '%';

    heroMeshes.forEach(function (mesh) {
      var offset = scrollTop * 0.18;
      mesh.style.transform = 'translate3d(0,' + offset + 'px,0)';
    });

    if (backToTop) backToTop.classList.toggle('show-fx', scrollTop > 480);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }, { passive: true });
  updateOnScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile nav toggle ---- */
  var navToggler = document.querySelector('.navbar-toggler-fx');
  var navLinks = document.querySelector('.nav-links-fx');
  if (navToggler && navLinks) {
    navToggler.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggler.setAttribute('aria-expanded', isOpen);
      navToggler.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggler.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  }

  /* ---- Nav dropdown (Resources): click/tap toggle + hover-intent + outside-click close ---- */
  var desktopQuery = window.matchMedia('(min-width: 992px)');
  document.querySelectorAll('.nav-dropdown-fx').forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    var closeTimer = null;

    function openDropdown() {
      clearTimeout(closeTimer);
      dropdown.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.querySelectorAll('.nav-dropdown-fx').forEach(function (other) {
        if (other !== dropdown) closeDropdown(other, true);
      });
    }
    function closeDropdown(target, immediate) {
      var d = target || dropdown;
      var t = d.querySelector('.nav-dropdown-toggle');
      d.classList.remove('is-open');
      if (t) t.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dropdown.classList.contains('is-open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    /* Hover-intent for desktop pointers: opens immediately, but closing waits
       a beat so the cursor has time to travel from the toggle into the menu
       (this is what was causing it to vanish before it could be reached). */
    dropdown.addEventListener('mouseenter', function () {
      if (!desktopQuery.matches) return;
      clearTimeout(closeTimer);
      openDropdown();
    });
    dropdown.addEventListener('mouseleave', function () {
      if (!desktopQuery.matches) return;
      closeTimer = setTimeout(function () { closeDropdown(); }, 300);
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-dropdown-fx.is-open').forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        var t = dropdown.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown-fx.is-open').forEach(function (dropdown) {
        dropdown.classList.remove('is-open');
        var t = dropdown.querySelector('.nav-dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ---- Active nav link highlighting ---- */
  var currentFile = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links-fx a[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === currentFile) {
      link.classList.add('active');
      var parentDropdown = link.closest('.nav-dropdown-fx');
      if (parentDropdown) {
        var parentToggle = parentDropdown.querySelector('.nav-dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('active');
      }
    }
  });

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Hero glitch → fix text effect ---- */
  var glitchTargets = document.querySelectorAll('[data-glitch]');
  var glitchChars = '#%&$01_/\\';
  glitchTargets.forEach(function (el) {
    var finalText = el.getAttribute('data-glitch');
    var frame = 0;
    var maxFrames = 14;
    var interval = setInterval(function () {
      frame++;
      var out = '';
      for (var i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') { out += ' '; continue; }
        if (frame >= maxFrames || Math.random() > (frame / maxFrames)) {
          out += (frame >= maxFrames) ? finalText[i] : glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          out += finalText[i];
        }
      }
      el.textContent = out;
      if (frame >= maxFrames) {
        el.textContent = finalText;
        clearInterval(interval);
      }
    }, 45);
  });

  /* ---- Contact form (client-side demo submission) ---- */
  var contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      showToast('Message sent — we\'ll get back to you within 24 hours.');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  /* ---- Quotation request form ---- */
  var quoteForm = document.querySelector('#quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!quoteForm.checkValidity()) {
        quoteForm.classList.add('was-validated');
        return;
      }
      showToast('Quotation request received — expect a reply shortly.');
      quoteForm.reset();
      quoteForm.classList.remove('was-validated');
    });
  }

  /* ---- Toast helper ---- */
  function showToast(message) {
    var toast = document.querySelector('.toast-fx');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-fx';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="bi bi-check-circle-fill"></i><span>' + message + '</span>';
    requestAnimationFrame(function () { toast.classList.add('show-fx'); });
    clearTimeout(window.__fxToastTimer);
    window.__fxToastTimer = setTimeout(function () {
      toast.classList.remove('show-fx');
    }, 3800);
  }

  /* ---- Star rating render for review cards with data-rating ---- */
  document.querySelectorAll('[data-rating]').forEach(function (el) {
    var rating = parseInt(el.getAttribute('data-rating'), 10) || 5;
    var out = '';
    for (var i = 1; i <= 5; i++) {
      out += '<i class="bi ' + (i <= rating ? 'bi-star-fill' : 'bi-star') + '"></i> ';
    }
    el.innerHTML = out;
  });

});
