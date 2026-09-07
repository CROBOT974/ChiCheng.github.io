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

const observerOptions = { root: null, threshold: 0.45 };
const sectionObserver = new IntersectionObserver(function (entries) {
  const visibleEntries = entries.filter((entry) => entry.isIntersecting);

  if (!visibleEntries.length) return;

  const mostVisible = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  const targetId = mostVisible.target.id;
  const activeLink = document.querySelector(`[data-target="${targetId}"]`);

  if (activeLink) {
    setActiveNavLink(activeLink);
  }
}, observerOptions);

pages.forEach((page) => {
  sectionObserver.observe(page);
});
