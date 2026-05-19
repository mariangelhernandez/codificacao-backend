const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const cards = Array.from(track.children);

let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width + 20; // largura + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    // Calcula quantos cards cabem na tela para não "passar do branco"
    const visibleCards = window.innerWidth > 768 ? 3 : 1;
    if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        updateCarousel();
    } else {
        currentIndex = 0; // Loop opcional
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Ajusta o carrossel se a janela for redimensionada
window.addEventListener('resize', updateCarousel);