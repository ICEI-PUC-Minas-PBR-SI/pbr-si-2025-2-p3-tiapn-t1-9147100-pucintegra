// VARIÁVEIS GLOBAIS PARA O CARROSSEL
let currentSlide = 0;
const carouselListId = 'faq-list-full';
const indicatorsContainerId = 'carousel-indicators';

// --- FUNÇÕES DE CARROSSEL ---

/**
 * Move o carrossel para o slide anterior ou próximo (Com loop infinito).
 * @param {number} direction - -1 para Anterior, 1 para Próximo.
 */
function moveCarousel(direction) {
    const listElement = document.getElementById(carouselListId);
    if (!listElement) return;

    const totalSlides = listElement.children.length;
    
    // Calcula o novo índice
    let newSlide = currentSlide + direction;

    // Lógica para LOOP INFINITO:
    
    // 1. Se avançar além do último slide, volta para o primeiro (índice 0)
    if (newSlide >= totalSlides) {
        newSlide = 0;
    }
    
    // 2. Se voltar antes do primeiro slide, vai para o último
    if (newSlide < 0) {
        newSlide = totalSlides - 1;
    }

    currentSlide = newSlide;
    updateCarousel();
}


/**
 * Atualiza a posição do carrossel e os indicadores.
 */
function updateCarousel() {
    const listElement = document.getElementById(carouselListId);
    const cardElement = listElement.children[0];
    if (!listElement || !cardElement) return;

    // CORRIGIDO: Calcula a largura da translação dinamicamente: 
    // Largura do Card (offsetWidth) + 20px (margin-right)
    const cardOuterWidth = cardElement.offsetWidth + 20; 
    
    const transformValue = `translateX(${-currentSlide * cardOuterWidth}px)`;
    listElement.style.transform = transformValue;
    
    updateIndicators(); 
}


// --- FUNÇÕES DE INDICADORES (DOTS) ---

/**
 * Gera os indicadores visuais (bolinhas) com base no número de cards.
 */
function setupIndicators() {
    const listElement = document.getElementById(carouselListId);
    const indicatorsContainer = document.getElementById(indicatorsContainerId);
    
    if (!listElement || !indicatorsContainer) return;

    indicatorsContainer.innerHTML = ''; // Limpa indicadores existentes

    const totalSlides = listElement.children.length;

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator-dot');
        
        // Adiciona um listener para navegação direta ao clicar na bolinha
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
        });
        
        indicatorsContainer.appendChild(dot);
    }
    updateIndicators(); // Define o estado inicial
}

/**
 * Atualiza a classe 'active' nos indicadores visuais.
 */
function updateIndicators() {
    const indicatorsContainer = document.getElementById(indicatorsContainerId);
    if (!indicatorsContainer) return;
    
    const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
    
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}


// --- FUNÇÃO RICH TEXT (MANTIDA) ---

/**
 * Executa o comando de formatação no texto selecionado na área de descrição.
 */
function formatText(command, value = null) {
    const editor = document.getElementById('descricao');
    if (editor) {
        editor.focus();
        document.execCommand(command, false, value);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    // === Seletores e Variáveis ===
    const keywordsSelect = document.getElementById('keyword-select'); 
    const keywordTagsContainer = document.getElementById('selected-tags-container'); 
    const keywordCountSpan = document.getElementById('keyword-count-span');
    const attachmentsList = document.getElementById('attachments-list-container');
    
    // NOVO SELETOR PARA A CONTAGEM DE ANEXOS VISÍVEL
    const attachmentCountDisplay = document.getElementById('attachment-count-display'); 
    
    const descricaoEditor = document.getElementById('descricao'); 
    const charCountSpan = document.querySelector('.attachments-info .char-count');
    const attachLink = document.getElementById('attach-link-text'); // Ícone/Link clicável
    const toolbarButtons = document.querySelectorAll('.toolbar button');
    
    
    const maxChars = 2500;
    const maxKeywords = 6;
    let currentKeywordCount = keywordTagsContainer ? keywordTagsContainer.children.length : 0; 
    
    // Variável que armazena o limite de anexos (Baseado no número inicial de boxes)
    const maxAttachments = 3; 
    let currentAttachmentCount = attachmentsList ? attachmentsList.children.length : 0;


    // CORREÇÃO ESSENCIAL: Impede que os botões de formatação tirem o foco da área de edição
    toolbarButtons.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
        });
    });


    // 1. Contador de Caracteres (MANTIDO)
    if (descricaoEditor && charCountSpan) {
        
        descricaoEditor.addEventListener('input', () => { 
            const currentLength = descricaoEditor.textContent.length; 
            charCountSpan.textContent = `${currentLength}/${maxChars}`;

            if (currentLength > maxChars) {
                charCountSpan.style.color = 'red';
            } else {
                charCountSpan.style.color = 'initial';
            }
        });
        
        // CORREÇÃO: Força a limpeza do HTML interno e zera o contador ao sair do campo vazio.
        descricaoEditor.addEventListener('blur', () => {
            if (!descricaoEditor.textContent.trim().length) {
                descricaoEditor.innerHTML = '';
                charCountSpan.textContent = `0/${maxChars}`;
            }
        });
    }


    // 2. Adicionar/Remover Palavras-Chave (MANTIDO)
    function updateKeywordCount() {
        currentKeywordCount = keywordTagsContainer ? keywordTagsContainer.children.length : 0;
        
        if (keywordCountSpan) {
            keywordCountSpan.textContent = `${currentKeywordCount}/${maxKeywords}`;
        }
        
        if (keywordsSelect) {
            keywordsSelect.disabled = currentKeywordCount >= maxKeywords;
            const firstOption = keywordsSelect.querySelector('option:first-child');
            if (firstOption) {
                 firstOption.textContent = currentKeywordCount >= maxKeywords 
                    ? 'Limite Atingido' : 'Selecionar Palavras-Chave';
            }
        }
    }

    function removeTag(button) {
        const tag = button.closest('.tag');
        if (tag) {
            tag.remove();
            updateKeywordCount();
        }
    }

    // Listener para Adicionar e Remover Tags (Simplificado para o bloco)
    if (keywordsSelect) {
        keywordsSelect.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            if (selectedValue && selectedValue !== 'Selecionar Palavras-Chave' && currentKeywordCount < maxKeywords) {
                const existingTags = Array.from(keywordTagsContainer.querySelectorAll('.tag')).map(tag => tag.textContent.trim().replace(/\s*×$/, ''));
                if (existingTags.includes(selectedValue)) {
                    alert(`A palavra-chave "${selectedValue}" já foi adicionada.`);
                    e.target.value = e.target.querySelector('option:first-child').value;
                    return;
                }
                const newTag = document.createElement('span');
                newTag.className = 'tag';
                newTag.innerHTML = `${selectedValue} <button type="button">&times;</button>`;
                keywordTagsContainer.appendChild(newTag);
                e.target.value = e.target.querySelector('option:first-child').value;
                updateKeywordCount();
            }
        });
    }

    if (keywordTagsContainer) {
        keywordTagsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && e.target.closest('.tag')) {
                removeTag(e.target);
            }
        });
    }

    // 3. Simulação de Anexos (CORRIGIDO PARA O NOVO SPAN)
    
    function updateAttachmentCountDisplay() {
        currentAttachmentCount = attachmentsList ? attachmentsList.children.length : 0;
        if (attachmentCountDisplay) {
            // Atualiza apenas o número de anexos / limite
            attachmentCountDisplay.textContent = `${currentAttachmentCount}/${maxAttachments}`;
        }
    }

    // Remove anexo
    if (attachmentsList) {
        attachmentsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-attachment')) {
                e.target.closest('.attachment-box').remove();
                updateAttachmentCountDisplay();
            }
        });
    }

    // Adiciona anexo (simulação)
    if (attachLink && attachmentsList) {
        attachLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            if (currentAttachmentCount < maxAttachments) {
                const newAttachment = document.createElement('div');
                newAttachment.className = 'attachment-box';
                newAttachment.innerHTML = `
                    <i class="far fa-square"></i>
                    <button type="button" class="remove-attachment">&times;</button>
                `;
                attachmentsList.appendChild(newAttachment);
                updateAttachmentCountDisplay(); // Atualiza a contagem após adicionar
            } else {
                alert(`Você atingiu o limite de ${maxAttachments} anexos.`);
            }
        });
    }
    
    // Bloco de Inicialização
    updateKeywordCount();
    updateAttachmentCountDisplay(); // Inicializa a contagem de anexos corretamente
    
    // Inicialização do Carrossel e Indicadores
    setupIndicators(); 
    updateCarousel(); 
    
    // Correção: Garantir que o contador de caracteres comece em 0
    if (descricaoEditor && charCountSpan) {
        if (!descricaoEditor.textContent.trim().length) {
             charCountSpan.textContent = `0/${maxChars}`;
        } else {
             charCountSpan.textContent = `${descricaoEditor.textContent.length}/${maxChars}`;
        }
    }
});