// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  // === MENU MOBILE ===
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    // Toggle menu mobile
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Fechar menu ao clicar em link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  // === SCROLL SUAVE ===
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // === HEADER TRANSPARENTE ===
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
      }
    });
  }

  // === ANIMAÇÃO CONTADOR ===
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent =
        Math.floor(current) + (element.textContent.includes("%") ? "%" : "+");
    }, 20);
  }

  // Iniciar contador quando seção aparecer
  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) {
    let animated = false;

    function checkStats() {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !animated) {
        animated = true;
        const counters = statsSection.querySelectorAll(".stat-item h3");
        counters.forEach((counter) => {
          const target = parseInt(counter.textContent);
          counter.textContent =
            "0" + (counter.textContent.includes("%") ? "%" : "+");
          animateCounter(counter, target);
        });
      }
    }

    window.addEventListener("scroll", checkStats);
    checkStats(); // Verificar na carga inicial
  }

  // === FORMULÁRIO DE CONTATO ===
  const contactForm = document.querySelector(".form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const phone = contactForm.querySelector("#phone").value.trim();
      const service = contactForm.querySelector("#service").value;
      const message = contactForm.querySelector("#message").value.trim();

      // Validação básica
      if (!name || !email || !service) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
      }

      // Preparar mensagem para WhatsApp
      let whatsappMessage = `Olá! Meu nome é ${name}.\n\n`;
      whatsappMessage += `Serviço de interesse: ${service}\n`;
      whatsappMessage += `Email: ${email}\n`;
      if (phone) whatsappMessage += `Telefone: ${phone}\n`;
      whatsappMessage += `\nMensagem: ${
        message || "Gostaria de saber mais sobre os serviços."
      }`;

      // Simular envio
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Mensagem enviada! Redirecionando para WhatsApp...");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Abrir WhatsApp
        const whatsappUrl = `https://wa.me/5554967666619?text=${encodeURIComponent(
          whatsappMessage
        )}`;
        window.open(whatsappUrl, "_blank");
      }, 1500);
    });
  }

  // === ANIMAÇÕES SIMPLES ===
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .benefit-item, .member, .hero-card"
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        element.classList.add("animate-in");
      }
    });
  }

  // Configurar elementos para animação
  const animatedElements = document.querySelectorAll(
    ".service-card, .benefit-item, .member, .hero-card"
  );
  animatedElements.forEach((element) => {
    element.classList.add("animate-prepare");
  });

  // Executar animações
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Verificar na carga inicial

  // === MENU ATIVO ===
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Remove ativo de todos
        navLinks.forEach((link) => link.classList.remove("active"));

        // Adiciona ativo ao link atual
        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Verificar na carga inicial

  console.log("Site carregado com sucesso!");
});

// === CSS PARA LINKS ATIVOS E ANIMAÇÕES ===
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    
    /* Animações de entrada que preservam hover */
    .animate-prepare {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Garantir que hover funciona mesmo com animate-in */
    .service-card.animate-in:hover {
        transform: translateY(-10px) !important;
    }
    
    .benefit-item.animate-in:hover {
        transform: translateY(-10px) !important;
    }
    
    .hero-card.animate-in:hover {
        transform: translateY(-10px) !important;
    }
    
    .member.animate-in:hover {
        transform: translateY(-5px) !important;
    }
`;
document.head.appendChild(style);
