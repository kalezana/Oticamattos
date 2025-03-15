document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const menuIcon = document.getElementById('menu-icon');
    const searchIcon = document.getElementById('search-icon');
    const menu = document.getElementById('menu');
    const searchBar = document.getElementById('search-bar');
    const header = document.querySelector('header');

    // Função para fechar o menu e a barra de pesquisa
    function closeAll() {
        menu.style.display = 'none';
        searchBar.style.display = 'none';
    }

    // Abrir/Fechar Menu
    menuIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
            searchBar.style.display = 'none';
        }
    });

    // Abrir/Fechar Barra de Pesquisa
    searchIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        if (searchBar.style.display === 'block') {
            searchBar.style.display = 'none';
        } else {
            searchBar.style.display = 'block';
            menu.style.display = 'none';
        }
    });

    // Fechar o menu e a barra de pesquisa ao clicar fora
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !searchBar.contains(event.target)) {
            closeAll();
        }
    });

    // Lógica para alterar o cabeçalho ao fazer scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Função para inicializar o carrossel infinito
    function initInfiniteCarousel(carousel) {
        const carouselImages = carousel.querySelector('.carousel-images');
        const images = carousel.querySelectorAll('.carousel-images a');
        const totalImages = images.length;

        // Clona as imagens para criar o efeito infinito
        images.forEach(image => carouselImages.appendChild(image.cloneNode(true)));

        let currentIndex = 0;
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselImages.style.transform = `translateX(${offset}%)`;

            // Verifica se chegou ao final das imagens clonadas
            if (currentIndex >= totalImages) {
                currentIndex = 0;
                carouselImages.style.transition = 'none';
                carouselImages.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    carouselImages.style.transition = 'transform 0.5s ease-in-out';
                }, 0);
            } else if (currentIndex < 0) {
                currentIndex = totalImages - 1;
                carouselImages.style.transition = 'none';
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
                setTimeout(() => {
                    carouselImages.style.transition = 'transform 0.5s ease-in-out';
                }, 0);
            }
        }

        function nextImage() {
            currentIndex++;
            updateCarousel();
        }

        function prevImage() {
            currentIndex--;
            updateCarousel();
        }

        prevButton.addEventListener('click', prevImage);
        nextButton.addEventListener('click', nextImage);

        updateCarousel(); // Inicializa o carrossel
    }

    // Inicializa TODOS os carrosséis da página
    document.querySelectorAll('.carousel').forEach(carousel => initInfiniteCarousel(carousel));
});

const firebaseConfig = {
       apiKey: "SUA_API_KEY",
       authDomain: "SEU_AUTH_DOMAIN",
       projectId: "SEU_PROJECT_ID",
       storageBucket: "SEU_STORAGE_BUCKET",
       messagingSenderId: "SEU_MESSAGING_SENDER_ID",
       appId: "SEU_APP_ID"
     };

     // Inicialize o Firebase
     const app = firebase.initializeApp(firebaseConfig);
     const db = firebase.firestore();

     // Função para salvar o e-mail no Firestore
     function salvarEmail(email) {
       db.collection("newsletter").add({
         email: email,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
       })
       .then(() => {
         alert("E-mail cadastrado com sucesso!");
       })
       .catch((error) => {
         console.error("Erro ao salvar e-mail: ", error);
       });
     }

     // Adicionar evento ao formulário
     document.querySelector(".newsletter-form").addEventListener("submit", function(event) {
       event.preventDefault(); // Evita o recarregamento da página
       const email = document.querySelector(".newsletter-form input[type='email']").value;
       salvarEmail(email);
     });


// Importação e inicialização do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID"
};

// Inicializar Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência ao formulário
const form = document.getElementById("newsletter-form");
const message = document.getElementById("message");
const newsletterCollection = collection(db, "newsletter");

// Adicionar evento de envio ao formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário

  const email = document.getElementById("email").value;

  try {
    // Adicionar e-mail à coleção no Firestore
    await addDoc(newsletterCollection, { email: email });
    message.textContent = "E-mail cadastrado com sucesso!";
    message.style.color = "green";
    form.reset(); // Limpa o formulário após o envio
  } catch (error) {
    console.error("Erro ao cadastrar e-mail: ", error);
    message.textContent = "Erro ao cadastrar o e-mail. Tente novamente!";
    message.style.color = "red";
  }
});