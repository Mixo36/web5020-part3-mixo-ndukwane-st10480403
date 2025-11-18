// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript loaded ✅");

  // ===== UTILITY: Typewriter Effect =====
  function typewriterEffect(elementId, text, speed = 100) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let index = 0;
    function type() {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // ===== Typewriter Texts =====
  const typewriterData = [
    { id: "welcome-title", text: "☁️☁️Welcome to Morning Cloud Café☁️☁️" },
    { id: "menu-title", text: "☕ Morning Cloud Café Menu ☕" },
    { id: "our-services", text: "☁️ Our Services ☁️" },
    { id: "enquiry-title", text: "Enquire with Morning Cloud Café ☁️" },
    { id: "contact-title", text: "How To Contact Morning Cloud Café ☁️" }
  ];

  typewriterData.forEach(item => typewriterEffect(item.id, item.text));

  // ===== Scroll-Up Button =====
  const scrollUpBtn = document.getElementById("scrollUpBtn");
  if (scrollUpBtn) {
    window.addEventListener("scroll", () => {
      scrollUpBtn.style.display = window.scrollY > 100 ? "block" : "none";
    });

    scrollUpBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== LIGHTBOX =====
  const galleryImages = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (galleryImages.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.style.display === "flex") {
        lightbox.style.display = "none";
      }
    });
  }

  // ===== SEARCH FILTER =====
  const searchBox = document.getElementById("search-box");
  const listItems = document.querySelectorAll("#services-list li");
  const serviceCards = document.querySelectorAll(".service-card");
  const galleryItems = document.querySelectorAll(".gallery-img");

  if (searchBox) {
    searchBox.addEventListener("keyup", () => {
      let filter = searchBox.value.toLowerCase();

      listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "block" : "none";
      });

      serviceCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        card.style.display = cardText.includes(filter) ? "block" : "none";
      });

      galleryItems.forEach(img => {
        const altText = img.alt.toLowerCase();
        img.style.display = altText.includes(filter) ? "inline-block" : "none";
      });
    });
  }

  // ===== ENQUIRY FORM =====
  const enquiryForm = document.getElementById("enquiry-form");
  const enquiryResponse = document.getElementById("response");

  if (enquiryForm && enquiryResponse) {
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const quantity = document.getElementById("quantity").value;

      enquiryResponse.textContent = `Thank you, ${name}. Your enquiry for ${quantity} item(s) has been received! We will contact you soon.`;
      enquiryResponse.style.cssText = "margin-top:20px; font-weight:bold; color:green;";

      enquiryForm.reset();
    });

    ["name", "quantity"].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", () => { enquiryResponse.textContent = ""; });
      }
    });
  }

  // ===== CONTACT FORM (Formspree Optimized) =====
  const contactForm = document.getElementById("contact-form");
  const contactResponse = document.getElementById("contact-response");

  if (contactForm && contactResponse) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          contactResponse.textContent = "✅ Your message has been sent successfully!";
          contactResponse.style.color = "green";
          contactForm.reset();
        } else {
          contactResponse.textContent = "❌ Something went wrong. Please try again.";
          contactResponse.style.color = "red";
        }
      } catch (err) {
        contactResponse.textContent = "⚠️ Network error. Please try again later.";
        contactResponse.style.color = "red";
      }

      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";

      // Clear message after 5 seconds
      setTimeout(() => { contactResponse.textContent = ""; }, 5000);
    });
  }

});
