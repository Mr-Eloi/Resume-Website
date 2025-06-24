// Toggle mobile nav
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.onclick = () => {
  navLinks.classList.toggle("show");
};

// Close nav on link click
document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

//close nav on outside click
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return;
  }

  alert("Message sent! Thank you.");
  this.reset();
});

// Fetch and Render projects in Cards
async function loadProjects() {
  const container = document.getElementById("project-list");
  container.textContent = "Loading projects...";

  try {
    const res = await fetch(
      "https://projects-list-api.onrender.com/api/projects"
    );
    const data = (await res.json()) || [];
    console.log("Fetching projects from API...", data);
    container.innerHTML = data
      .map(
        (p) => `
      <div class="project-card">
        <img src="${p.img || "/logo.png"}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.url}" target="_blank">View Project</a>
      </div>
    `
      )
      .join("");
  } catch (err) {
    container.textContent = "Failed to load projects.";
    console.error("Error loading TRPC projects:", err);
  }
}

loadProjects();

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";
} else {
  document.documentElement.setAttribute("data-theme", "dark"); // default
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
});

// Activate link on scroll
const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-link");

function activateLinkOnScroll() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinksList.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active-link");
        }
      });
    }
    else if (sectionId === "contact" && scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
      navLinksList.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active-link");
        }
      });
    }
  });
}

window.addEventListener("scroll", activateLinkOnScroll);
