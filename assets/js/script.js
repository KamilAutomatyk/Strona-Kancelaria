'use strict';

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});


const addEventOnElements = function (elements, eventType, callback) 
{
    for (let i=0, len = elements.length; i<len; i++) 
    {
        elements[i].addEventListener(eventType, callback);
    }
}


const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
});


const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});


const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

    const centerX = this.offsetWidth / 2;
    const centerY = this.offsetHeight / 2;

    const tiltPosY = ((event.offsetX - centerX) / centerX) * 3;
    const tiltPosX = ((event.offsetY - centerY) / centerY) * 3;
     
    this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;

}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
     this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;

});


const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

    if(!(lastActiveTabBtn === this)) {

        lastActiveTabBtn.classList.remove("active");
        lastActiveTabContent.classList.remove("active");

        this.classList.add("active");
        lastActiveTabBtn = this;

        const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);

        currentTabContent.classList.add("active");

        lastActiveTabContent = currentTabContent;

    }

}

addEventOnElements(tabBtns, "click", filterContent);


function scrollWithOffset(e, id) {
  e.preventDefault();
  const yOffset = -105;
  const isMainPage = window.location.pathname === '/';

  if (!isMainPage) {
    sessionStorage.setItem('targetSection', id);
    window.location.href = '/';
    return;
  }

  const targetSection = sessionStorage.getItem('targetSection') || id;
  const element = document.getElementById(targetSection);
  
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    sessionStorage.removeItem('targetSection');
  }
}

window.addEventListener('load', function() {
  const targetSection = sessionStorage.getItem('targetSection');
  
  if (targetSection) {
    const yOffset = -105;
    const element = document.getElementById(targetSection);
    
    if (element) {
      setTimeout(() => {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        sessionStorage.removeItem('targetSection');
      }, 100);
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-list");

  if (!slider) return;

  let isHovered = false;

  const itemWidth = slider.querySelector(".slider-item")?.offsetWidth || 0;

  slider.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  slider.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  window.addEventListener("wheel", (e) => {
    if (!isHovered) return;

    if (e.deltaY !== 0) {
      e.preventDefault();
      const direction = e.deltaY > 0 ? -1 : 1;
      slider.scrollBy({
        left: (itemWidth) * direction,
        behavior: "smooth"
      });
    }
  }, { passive: false });
});


const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"),
                         ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {
    
    const posX = event.clientX;
    const posY = event.clientY;

    cursors[0].style.left = `${posX}px`;
    cursors[0].style.top  = `${posY}px`;

    setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top  = `${posY}px`;
    }, 80);
});


addEventOnElements(hoveredElements, "mouseover", 
    function () {
        for(let i = 0, len = cursors.length; i < len; i++) {
            cursors[i].classList.add("hovered");
        }
    }
)


addEventOnElements(hoveredElements, "mouseout", 
    function () {
        for(let i = 0, len = cursors.length; i < len; i++) {
            cursors[i].classList.remove("hovered");
        }
    }
)


document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  emailjs.sendForm(
    'service_ug4d6v7',
    'template_gn80fmh',
    this
  )
  .then(() => alert('Wiadomość wysłana!'))
  .catch(() => alert('Wystąpił błąd. Spróbuj ponownie.'));
});


function isMobile() {
  return window.innerWidth < 992;
}

//if (isMobile()) {
  const icons = document.querySelectorAll('.toggle-icon');
  const texts = document.querySelectorAll('.section-text');

  const ionicon = document.querySelectorAll('.expand-icon');

  icons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      const isExpanded = texts[index].classList.toggle('expanded');
      icons[index].classList.toggle('up');

      if (isExpanded) {
        texts[index].style.maxHeight = texts[index].scrollHeight + 'px';
      } 
      else {
        texts[index].style.maxHeight = texts[index].scrollHeight + 'px';
        setTimeout(() => {
          texts[index].style.maxHeight = '50px'; }, 10);
      }
    });
  });

    texts.forEach((text, index) => {
    text.addEventListener('click', () => {
      const isExpanded = texts[index].classList.toggle('expanded');
      icons[index].classList.toggle('up');

      if(isExpanded) {
        texts[index].style.maxHeight = texts[index].scrollHeight + 'px';
      } 
      else {
        texts[index].style.maxHeight = text.scrollHeight + 'px';
        setTimeout(() => {
          texts[index].style.maxHeight = '50px'; }, 10);
      }
    });
  });
  
//}



