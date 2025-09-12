// Verifica se o login-form existe
const login = document.querySelector(".login-form");

// Verifica se o botão de login existe e adiciona evento
const loginBtn = document.querySelector("#login-btn");
if (login && loginBtn) {
    loginBtn.onclick = () => {
        login.classList.toggle('active');

        // Só tenta remover navbar se ela existir
        const navbar = document.querySelector(".header .navbar");
        if (navbar) navbar.classList.remove('active');
    };
}

// Verifica se o botão do menu e a navbar existem
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector(".header .navbar");

if (menuBtn && navbar) {
    menuBtn.onclick = () => {
        if (login) login.classList.remove('active');
        navbar.classList.toggle('active');
    };
}

// Fecha menus ao rolar
window.onscroll = () => {
    if (login) login.classList.remove('active');
    if (navbar) navbar.classList.remove('active');
};

// Verifica se há um slider antes de iniciar o Swiper
if (document.querySelector('.gallery-slider')) {
    const swiper = new Swiper(".gallery-slider", {
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
        }
    });
}

// --- Código para o modal da galeria ---

// Cria o modal
const modal = document.createElement('div');
modal.style.cssText = `
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
`;
document.body.appendChild(modal);

// Cria a imagem dentro do modal
const modalImg = document.createElement('img');
modalImg.style.maxWidth = '90%';
modalImg.style.maxHeight = '90%';
modalImg.style.borderRadius = '16px';
modal.appendChild(modalImg);

// Fecha modal ao clicar fora da imagem
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Seleciona todas as imagens da galeria e adiciona evento de clique
document.querySelectorAll('.gallery-container img').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.style.display = 'flex';
  });
});
