/* Navegação mobile */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* Header + barra de progresso */
const header = document.querySelector(".site-header");
const progress = document.querySelector(".progress");

function updateScrollUI() {
  header?.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

/* Animações de entrada */
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Ano automático */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* Modal das demonstrações */
const modal = document.getElementById("demo-modal");
const modalTitle = document.getElementById("demo-title");
const modalDescription = document.getElementById("demo-description");

const demoDescriptions = {
  Restaurante: "Demonstração fictícia de uma página para restaurante, com destaque visual, menu, localização e contato.",
  Barbearia: "Demonstração fictícia de uma página para barbearia, com serviços, identidade visual e chamada para agendamento.",
  Academia: "Demonstração fictícia de uma página para academia, com modalidades, planos e informações de atendimento.",
  Oficina: "Demonstração fictícia de uma página para oficina, com serviços, orçamento, localização e contato.",
  Clínica: "Demonstração fictícia de uma página institucional para clínica, com informações organizadas e canais de atendimento.",
  Loja: "Demonstração fictícia de uma vitrine digital para loja, com apresentação de produtos e direcionamento para compra."
};

function openModal(name) {
  modalTitle.textContent = name;
  modalDescription.textContent = demoDescriptions[name] || "Demonstração fictícia criada para apresentar possibilidades.";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".demo-button").forEach(button => {
  button.addEventListener("click", () => openModal(button.dataset.demo));
});
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
