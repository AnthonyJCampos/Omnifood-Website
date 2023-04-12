///////////////////////////////////////////////////////////

// MOBILE NAV

const mobileNavMediaQuery = window.matchMedia("(max-width: 59em)");

const mobileMenuEvent = function (event) {
  const header = document.querySelector(".header");

  if (!header) {
    return;
  }

  header.classList.toggle("nav-open");
}; // end mobileMenuEvent

const mobileChange = function (mediaQuery) {
  const navBtn = document.querySelector(".btn-mobile-nav");

  if (!navBtn) {
    return;
  }
  if (mediaQuery.matches) {
    navBtn.addEventListener("click", mobileMenuEvent);
  }

  if (!mediaQuery.matches) {
    navBtn.removeEventListener("click", mobileMenuEvent);
  }
};

// initial load up
mobileChange(mobileNavMediaQuery);
mobileNavMediaQuery.addEventListener("change", mobileChange);

// SMOOTH SCROLLING

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const href = link.getAttribute("href");

    // Scroll Back to Top
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close Mobile Nav

    if (link.classList.contains("main-nav-link")) {
      document.querySelector(".header")?.classList.toggle("nav-open");
    }
  });
});

// STICKY NAV

const sectionHeroElement = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      document.querySelector("body").classList.add("sticky");
    }

    if (entry.isIntersecting) {
      document.querySelector("body").classList.remove("sticky");
    }
  },
  {
    // In the viewport window
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroElement);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
