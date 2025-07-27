/*====================== scroll section active link ====================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let scrollTopButton = document.getElementById("scroll-top-btn");
let header = document.querySelector("header");
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

const typed = new Typed(".multiple-text", {
  strings: ["Senior Software Engineer", "AI/ML Enthusiast"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

/*====================== toggle icon navbar ====================*/
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  scrollTopButton.classList.toggle("active", window.scrollY > 300);

  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*====================== Sticky Nav Bar ====================*/
  header.classList.toggle("sticky", window.scrollY > 100);

  /*====================== toggle icon navbar when scrolling ====================*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*====================== Scroll Reveal ====================*/
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .portfolio-box, .work-exp-container, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/*====================== EmailJS Set-up ====================*/
document.addEventListener("DOMContentLoaded", function () {
  const pubKey = "XJKJRWg2WkOl_pSGE";
  const serviceId = "service_g7hjz78";
  const templateId = "template_8zg1r45";

  if (!pubKey || !serviceId || !templateId) {
    console.warn("EmailJS environment variables are missing.");
    return;
  }

  emailjs.init(pubKey);

  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector("input[type='submit']");
  const toast = document.getElementById("toast");

  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.background = isError ? "#ff4d4d" : "var(--main-color)";
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.classList.add("loading");

    emailjs
      .sendForm(serviceId, templateId, form)
      .then(() => {
        showToast("Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        showToast("Failed to send message. Please try again.", true);
      })
      .finally(() => {
        submitBtn.classList.remove("loading");
      });
  });
});

