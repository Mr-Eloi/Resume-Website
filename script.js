// Toggle mobile nav
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.onclick = () => {
  navLinks.classList.toggle("show");
};

// Close nav on link click
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
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

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return;
  }

  alert("Message sent! Thank you.");
  this.reset();
});

//Projects
const projects = [
  {
    title: "Endlesss Runner",
    description: "A 3D endless runner game with obstacles.",
    link: "https://eloxpro.itch.io/3d-runner-demo"
  },
  {
    title: "Team Showcase",
    description: "A portfolio site for showcasing group projects and skills.",
    link: "https://teamshowcase.example.com"
  },
  {
    title: "Mini E-commerce",
    description: "A basic online store using MERN stack with cart and checkout.",
    link: "https://ecom-mini.example.com"
  },
  {
    title: "GameHub",
    description: "A multiplayer game room with real-time leaderboard.",
    link: "https://gamehub.example.com"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing dev and design skills.",
    link: "https://elox.vercel.app"
  },
  {
    title: "AI Chat UI",
    description: "Frontend clone of ChatGPT interface using Next.js & Tailwind.",
    link: "https://aichatui.example.com"
  },
  {
    title: "3D Interactive Landing Page",
    description: "Three.js-powered landing page with scroll animations.",
    link: "https://3dlanding.example.com"
  }
];

// Render project cards
function loadProjects() {
  const container = document.getElementById("project-list");

  container.innerHTML = projects
    .map(
      (p) => `
      <div class="project-card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">View Project</a>
      </div>
    `
    )
    .join("");
}

loadProjects();
