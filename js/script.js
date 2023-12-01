const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const slideElems = document.querySelectorAll('.has-slide');
const loader = document.querySelector('.loader'); // Select the loader element
const animatedElements = document.querySelectorAll('.loader__ptext > *');
const circularTextContainer = document.getElementById('circularTextContainer');
const stickySections = [...document.querySelectorAll('.sticky')];

btnHamburger.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default link behavior

  if (header.classList.contains('open')) {
    // Close menu
    body.classList.remove('noscroll');
    header.classList.remove('open');
    slideElems.forEach(function (element) {
      element.classList.remove('curvedSlideIn');
      element.classList.add('curvedSlideOut');
    });
  } else {
    // Open hamburger menu
    body.classList.add('noscroll');
    header.classList.add('open');
    slideElems.forEach(function (element) {
      element.classList.remove('curvedSlideOut');
      element.classList.add('curvedSlideIn');
    });
  }
});

function removeLoader() {
  // Delayed loader removal
  setTimeout(function () {
    loader.style.transform = 'translateY(-100%)';
    loader.style.borderBottomLeftRadius = '40%';
    loader.style.borderBottomRightRadius = '40%';

    // GSAP animations for the hero section
    gsap.timeline()
      .from('.hero__image', { x: '100%', duration: 1.5 })
      .from('.hero__logoN img', { opacity: 0, duration: 2 }, "-=1.5")
      .from('.hero__text p', { y: '100%', opacity: 0, duration: 1.5 }, "-=1");
  }, 1300); // Adjust the delay time (6000 milliseconds = 6 seconds)
}

// Add animationend event listener to each animated element
animatedElements.forEach((element, index) => {
  element.addEventListener('animationend', () => {
    if (index === animatedElements.length - 1) {
      removeLoader();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const words = [
    'UI/UX designer.',
    'Web Developer.',
    'App Developer.',
    'Blockchain Developer.',
    'Cybersecurity Professional.',
    'Frontend & Backend Developer.',
    'AGI Researcher.',
    'Creative Professional.',
    'Technologist.',
    'Strategist.'
  ];
  let index = 0;

  function changeText() {
    changingText.textContent = words[index];
    index = (index + 1) % words.length;
  }

  changeText();
  setInterval(changeText, 5000); // Change text every 5 seconds
});

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}

const sections = document.querySelectorAll('.skill-fill');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

sections.forEach((section) => {
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(section);
});


// Cursor follow effect
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  const innerCircle = cursor.querySelector('::before');

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    innerCircle.style.left = e.clientX + "px";
    innerCircle.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("clicked");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("clicked");
  });

  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("mouseover", () => {
      cursor.classList.add("hovered");
    });

    link.addEventListener("mouseout", () => {
      cursor.classList.remove("hovered");
    });
});
});


document.querySelectorAll('.zoom-pan-image').forEach((image) => {
  image.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    const xPercentage = (offsetX / clientWidth) * 100;
    const yPercentage = (offsetY / clientHeight) * 100;

    target.style.transformOrigin = `${xPercentage}% ${yPercentage}%`;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname; // Get the current page path
  const navLinks = document.querySelectorAll('.header__menu a');
  const logoLink = document.querySelector('.header__logo a');
  const blogLinks = document.querySelectorAll('.blog-post .read-more');
  const aboutLinks = document.querySelectorAll('.about-section .c-button');
  const contactButton = document.querySelector('.contact-button');

  // Add click event listener to logo link
  logoLink.addEventListener('click', function () {
    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Remove the active link from localStorage
    localStorage.removeItem('activeLink');
  });

  // Add click event listener to menu links
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function () {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add active class to the clicked link
      navLink.classList.add('active');

      // Store the active link in localStorage
      localStorage.setItem('activeLink', navLink.getAttribute('href'));
    });
  });

  // Add click event listener to blog post links
  blogLinks.forEach(blogLink => {
    blogLink.addEventListener('click', function () {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add active class to the Blog link
      document.querySelector('.header__menu a[href="/blog.html"]').classList.add('active');

      // Store the active link in localStorage
      localStorage.setItem('activeLink', '/blog.html');
    });
  });

  // Add click event listener to About links
  aboutLinks.forEach(aboutLink => {
    aboutLink.addEventListener('click', function () {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add active class to the About link in the navigation
      document.querySelector('.header__menu a[href="/about.html"]').classList.add('active');

      // Store the active link in localStorage
      localStorage.setItem('activeLink', '/about.html');
    });
  });

  // Add click event listener to Contact button
  contactButton.addEventListener('click', function () {
    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to the Contact link in the navigation
    document.querySelector('.header__menu a[href="/contact.html"]').classList.add('active');

    // Store the active link in localStorage
    localStorage.setItem('activeLink', '/contact.html');
  });

  // Check if there's an active link in localStorage and not on the home page
  const activeLink = localStorage.getItem('activeLink');
  if (activeLink && currentPage !== '/index.html') {
    // Add active class to the stored active link
    document.querySelector(`.header__menu a[href="${activeLink}"]`).classList.add('active');
  }
});
