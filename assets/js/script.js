'use strict';


const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const applyTheme = function (theme) {
  body.setAttribute("data-theme", theme);
  const isLight = theme === "light";
  themeToggle.innerHTML = isLight
    ? '<ion-icon name="sunny-outline"></ion-icon>'
    : '<ion-icon name="moon-outline"></ion-icon>';
  localStorage.setItem("theme", theme);
};

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", function () {
  const currentTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(currentTheme);
});


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    const itemCategories = filterItems[i].dataset.category
      .split(",")
      .map((category) => category.trim());

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (itemCategories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const setActiveNavLink = function (activeLink) {
  navigationLinks.forEach((link) => {
    link.classList.toggle("active", link === activeLink);
  });
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetId = this.dataset.target;
    const targetPage = document.getElementById(targetId);

    if (targetPage) {
      setActiveNavLink(this);
      targetPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

const navbar = document.querySelector(".navbar");
let scrollTicking = false;

/*
 * Keep the active link tied to the section whose top has reached the
 * navigation area. This works for long sections as well as short ones,
 * unlike an IntersectionObserver threshold based on visible percentage.
 */
const updateActiveNavLink = function () {
  if (!pages.length) return;

  const navbarRect = navbar ? navbar.getBoundingClientRect() : null;
  const navbarPosition = navbar ? window.getComputedStyle(navbar).position : "";
  const isBottomNavbar = navbarPosition === "fixed" && navbarRect &&
    navbarRect.top > window.innerHeight / 2;

  // On mobile the navbar is fixed at the bottom; on desktop it is sticky at the top.
  const activationLine = isBottomNavbar
    ? navbarRect.top - 16
    : (navbarRect ? navbarRect.bottom + 16 : 90);

  let currentPage = pages[0];

  pages.forEach((page) => {
    if (page.getBoundingClientRect().top <= activationLine) {
      currentPage = page;
    }
  });

  const activeLink = document.querySelector(`[data-target="${currentPage.id}"]`);

  if (activeLink) {
    setActiveNavLink(activeLink);
  }
};

const handleScroll = function () {
  if (scrollTicking) return;

  scrollTicking = true;
  window.requestAnimationFrame(function () {
    updateActiveNavLink();
    scrollTicking = false;
  });
};

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", updateActiveNavLink);
updateActiveNavLink();
