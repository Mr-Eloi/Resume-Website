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
