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
// document.addEventListener("DOMContentLoaded", function () {
//   emailjs.init("XJKJRWg2WkOl_pSGE"); // Replace with actual public key

//   const form = document.getElementById("contact-form");
//   const submitBtn = form.querySelector("input[type='submit']");
//   const originalBtnText = submitBtn.value;

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     submitBtn.disabled = true;
//     submitBtn.value = "Sending...";

//     emailjs
//       .sendForm("service_g7hjz78", "template_8zg1r45", form)
//       .then(() => {
//         alert("Message sent successfully!");
//         form.reset();
//       })
//       .catch((error) => {
//         console.error("FAILED...", error);
//         alert("Failed to send message. Please try again.");
//       })
//       .finally(() => {
//         submitBtn.disabled = false;
//         submitBtn.value = originalBtnText;
//       });
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);

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
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
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
