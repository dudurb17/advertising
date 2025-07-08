// Debug e verificação para produção
function debugProduction() {
  console.log("=== DEBUG E&C SOLUTIONS ===");
  console.log("URL atual:", window.location.href);
  console.log("User Agent:", navigator.userAgent);
  console.log("Timestamp:", new Date().toISOString());

  // Verificar recursos externos
  const externalResources = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
  ];

  externalResources.forEach((url) => {
    fetch(url, { method: "HEAD" })
      .then((response) => {
        console.log(`✅ Recurso externo OK: ${url} (${response.status})`);
      })
      .catch((error) => {
        console.error(`❌ Erro no recurso externo: ${url}`, error);
      });
  });

  // Verificar imagens locais
  const localImages = ["./eduardo-foto.jpeg", "./carlos.jpeg"];
  localImages.forEach((src) => {
    const img = new Image();
    img.onload = () => console.log(`✅ Imagem local OK: ${src}`);
    img.onerror = () => console.error(`❌ Erro na imagem local: ${src}`);
    img.src = src;
  });

  // Verificar CSS e JS
  const localResources = ["./styles.css", "./script.js"];
  localResources.forEach((url) => {
    fetch(url, { method: "HEAD" })
      .then((response) => {
        console.log(`✅ Recurso local OK: ${url} (${response.status})`);
      })
      .catch((error) => {
        console.error(`❌ Erro no recurso local: ${url}`, error);
      });
  });

  console.log("=== FIM DEBUG ===");
}

// Executar debug quando página carrega
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", debugProduction);
} else {
  debugProduction();
}

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

  // === ANIMAÇÕES SIMPLES ===
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .benefit-item, .member, .hero-card, .contact-card, .contact-info, .contact-options"
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
    ".service-card, .benefit-item, .member, .hero-card, .contact-card, .contact-info, .contact-options"
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

  // Image loading optimization for Vercel
  function optimizeImageLoading() {
    const images = document.querySelectorAll(".member-photo");

    images.forEach((img) => {
      // Add loading attribute for better performance
      img.setAttribute("loading", "lazy");

      // Add debug info
      console.log("Loading image:", img.src, "Alt:", img.alt);

      // Add error handling
      img.addEventListener("error", function () {
        console.error("Image failed to load:", this.src);
        console.error("Current location:", window.location.href);

        // Try with different path formats
        const currentSrc = this.src;
        const imageName = currentSrc.split("/").pop();

        // Try absolute path first
        if (!currentSrc.startsWith(window.location.origin)) {
          console.log("Trying absolute path...");
          this.src = window.location.origin + "/" + imageName;
          return;
        }

        // If still fails, create fallback
        const memberName = this.alt;
        const initials = memberName
          .split(" ")
          .map((n) => n[0])
          .join("");

        // Create a canvas fallback
        const canvas = document.createElement("canvas");
        canvas.width = 120;
        canvas.height = 120;
        const ctx = canvas.getContext("2d");

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 120, 120);
        gradient.addColorStop(0, "#667eea");
        gradient.addColorStop(1, "#764ba2");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 120, 120);

        // Draw initials
        ctx.fillStyle = "#fff";
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials, 60, 60);

        // Replace image with canvas
        this.src = canvas.toDataURL();
        this.style.objectFit = "contain";
        console.log("Using fallback for:", memberName);
      });

      // Add load success handler
      img.addEventListener("load", function () {
        console.log("Image loaded successfully:", this.src);
        this.style.opacity = "1";
      });

      // Set initial opacity and timeout fallback
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";

      // Fallback timeout
      setTimeout(() => {
        if (img.style.opacity === "0") {
          console.warn(
            "Image taking too long to load, triggering error handler"
          );
          img.dispatchEvent(new Event("error"));
        }
      }, 5000);
    });
  }

  // Call image optimization when DOM is loaded
  optimizeImageLoading();
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
    
    .contact-card.animate-in:hover {
        transform: translateY(-5px) !important;
    }
    
    .contact-info.animate-in:hover {
        transform: translateY(-3px) !important;
    }
    
    .contact-options.animate-in:hover {
        transform: translateY(-3px) !important;
    }
    
    /* Melhorar visibilidade das imagens */
    .member-photo {
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    /* Estilos para cartões de contato */
    .contact-card {
        animation-delay: 0.1s;
    }
    
    .contact-card:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .contact-card:nth-child(3) {
        animation-delay: 0.3s;
    }
`;
document.head.appendChild(style);
