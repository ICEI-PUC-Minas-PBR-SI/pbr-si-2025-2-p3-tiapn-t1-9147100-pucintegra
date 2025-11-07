document.addEventListener('DOMContentLoaded', () => {

    // --- Função genérica para Carrosséis de Conteúdo (FAQ e Notícias) ---
    // Controla a navegação card-por-card (usando currentIndex) e loop, com suporte a dots.
    const setupContentCarousel = (sectionSelector, containerSelector, itemSelector) => {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const container = section.querySelector(containerSelector);
        const items = section.querySelectorAll(itemSelector);
        if (!container || items.length === 0) return;

        const leftArrow = section.querySelector('.carousel-arrow.left');
        const rightArrow = section.querySelector('.carousel-arrow.right');
        const dotsContainer = section.querySelector('.carousel-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        
        let currentIndex = 0;

        const updateDots = () => {
            if (dots.length === 0) return;
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        };

        const updateCarousel = () => {
            if (items.length === 0) return;
            
            const firstItem = items[0];
            const itemStyle = getComputedStyle(firstItem);
            // Calcula a largura total do item + margens para o passo de rolagem
            const itemWidth = firstItem.offsetWidth + 
                              parseFloat(itemStyle.marginRight) + 
                              parseFloat(itemStyle.marginLeft);
                              
            container.scroll({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });

            updateDots();
        };
        
        // --- Eventos das Setas (Looping) ---
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                // Loop: Vai para o próximo ou volta para o 0 se estiver no último
                currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0; 
                updateCarousel();
            });
        }

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                // Loop: Vai para o anterior ou para o último se estiver no 0
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1; 
                updateCarousel();
            });
        }

        // --- Eventos dos Pontos ---
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        window.addEventListener('resize', updateCarousel);
        
        // Inicializa os dots
        updateDots(); 
    };

    
    // --- Lógica Corrigida para Carrossel de Categorias (AGORA COM LOOP) ---
    const setupCategoryCarouselLoop = (sectionSelector) => {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const categoryCarousel = section.querySelector('.categories-carousel');
        const categoryItems = section.querySelectorAll('.category-item');
        const categoryLeftArrow = section.querySelector('.carousel-arrow.left');
        const categoryRightArrow = section.querySelector('.carousel-arrow.right');

        if (!categoryCarousel || categoryItems.length === 0) return;

        let currentIndex = 0;

        const updateActiveState = () => {
             // Lógica para manter o estado ativo da categoria (apenas visual, não afeta o loop)
             categoryItems.forEach((item, index) => {
                item.classList.remove('active');
                // Nota: Esta parte do design é mais complexa, pois a rolagem é contínua e a ativação
                // de categorias é geralmente por clique. Aqui, estamos apenas ativando o item no índice atual.
                if (index === currentIndex) {
                    item.classList.add('active');
                }
             });
        }

        const updateCarousel = () => {
            const firstItem = categoryItems[0];
            const itemStyle = getComputedStyle(firstItem);
            const itemWidth = firstItem.offsetWidth + parseFloat(itemStyle.marginRight); 

            // Rola para a posição do item baseado no índice
            categoryCarousel.scroll({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });

            updateActiveState();
        };

        // --- Eventos de Setas para Loop Circular ---
        if (categoryRightArrow) {
            categoryRightArrow.addEventListener('click', () => {
                // Loop: Se não for o último, avança; se for, volta para o 0
                currentIndex = (currentIndex < categoryItems.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }

        if (categoryLeftArrow) {
            categoryLeftArrow.addEventListener('click', () => {
                // Loop: Se não for o primeiro, retrocede; se for, vai para o último
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : categoryItems.length - 1;
                updateCarousel();
            });
        }

        // Garante que o carrossel se ajuste ao redimensionar a tela
        window.addEventListener('resize', updateCarousel);
        
        // Inicializa o estado ativo
        updateActiveState();
    };

    // --- Inicialização de Todos os Carrosséis ---
    
    // 1. Carrossel de Categorias (agora com loop e controle de índice)
    setupCategoryCarouselLoop('.categories-section'); 
    
    // 2. Carrossel de FAQ
    setupContentCarousel('.faq-section', '.faq-carousel', '.faq-card');
    
    // 3. Carrossel de Notícias
    setupContentCarousel('.news-section', '.news-carousel', '.news-card');

});