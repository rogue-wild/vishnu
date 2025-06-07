// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Navbar background on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  // Animate hamburger menu
  const spans = mobileMenu.querySelectorAll("span");
  if (navLinks.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "rotate(0) translate(0, 0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0) translate(0, 0)";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    const spans = mobileMenu.querySelectorAll("span");
    spans[0].style.transform = "rotate(0) translate(0, 0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0) translate(0, 0)";
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    const spans = mobileMenu.querySelectorAll("span");
    spans[0].style.transform = "rotate(0) translate(0, 0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0) translate(0, 0)";
  }
});

// Enhanced Form Handling with Multiple Options
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Show loading state
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
  submitBtn.disabled = true;

  // Create mailto link with form data
  const mailtoLink = `mailto:vishnu.bhagwat007@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  // Attempt to open email client
  setTimeout(() => {
    window.location.href = mailtoLink;
    showSuccessMessage();
    contactForm.reset();
    resetButton();
  }, 1000);

  function showSuccessMessage() {
    const successMsg = document.createElement("div");
    successMsg.innerHTML = `
                    <div style="background: #10b981; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
                        <i class="fas fa-check-circle"></i> Message sent successfully! I'll get back to you soon.
                    </div>
                `;
    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
    setTimeout(() => successMsg.remove(), 5000);
  }

  function showErrorMessage() {
    const errorMsg = document.createElement("div");
    errorMsg.innerHTML = `
                    <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
                        <i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try the direct email link below.
                    </div>
                `;
    contactForm.parentNode.insertBefore(errorMsg, contactForm.nextSibling);
    setTimeout(() => errorMsg.remove(), 5000);
  }

  function resetButton() {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Add some interactive hover effects
document
  .querySelectorAll(".project-card, .skill-category, .experience-item")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector(".hero .subtitle");
const text = subtitle.textContent;
subtitle.textContent = "";

let i = 0;
function typeWriter() {
  if (i < text.length) {
    subtitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect after page loads
window.addEventListener("load", function () {
  setTimeout(typeWriter, 1000);
});
