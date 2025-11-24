document.addEventListener('DOMContentLoaded', () => {
    
    // ======================================================
    // 1. VERIFICAÇÃO DE SEGURANÇA (LOGIN)
    // ======================================================
    const userMatricula = localStorage.getItem('userMatricula');
    if (!userMatricula) {
        alert("Sessão expirada ou não iniciada. Por favor, faça login novamente.");
        window.location.href = '/html/autenticacao.html#login';
        return; // Para a execução do script aqui.
    }

    // Configura o botão de logout do cabeçalho
    document.getElementById('btn-logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/html/autenticacao.html#login';
    });


    // ======================================================
    // 2. CONFIGURAÇÃO DO EDITOR DE TEXTO (TOOLBAR)
    // ======================================================
    const toolbarBtns = document.querySelectorAll('.editor-toolbar button[data-cmd]');
    
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            const val = btn.getAttribute('data-val') || null;
            document.execCommand(cmd, false, val);
            document.getElementById('descricao-editor').focus(); // Devolve o foco ao editor
        });
    });

    // Botão de Link (tratamento especial pois exige input do usuário)
    document.getElementById('btnInsertLink').addEventListener('click', () => {
        const url = prompt("Digite a URL do link (ex: https://google.com):");
        if (url && url.trim() !== "") {
            document.execCommand('createLink', false, url);
        }
    });


    // ======================================================
    // 3. GERENCIAMENTO DE TAGS (PALAVRAS-CHAVE)
    // ======================================================
    const tagInput = document.getElementById('tag-input');
    const tagsListEl = document.getElementById('tags-list');
    const hiddenTagsInput = document.getElementById('hidden-tags');
    let tags = [];
    const MAX_TAGS = 5;

    // Função para renderizar as tags visuais e atualizar o input oculto
    function renderTags() {
        tagsListEl.innerHTML = ''; // Limpa a lista visual
        tags.forEach((tag, index) => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag-pill';
            tagEl.innerHTML = `${tag} <span class="close-tag" data-index="${index}">&times;</span>`;
            tagsListEl.appendChild(tagEl);
        });
        
        // Atualiza o input oculto que será enviado no formulário
        hiddenTagsInput.value = tags.join(',');

        // Desabilita o input se atingir o limite
        tagInput.disabled = tags.length >= MAX_TAGS;
        tagInput.placeholder = tags.length >= MAX_TAGS ? "Limite de tags atingido" : "Digite e tecle Enter ou vírgula...";
    }

    // Evento para adicionar tag (Enter ou Vírgula)
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.value.trim().replace(',', ''); // Remove vírgula se houver
            
            if (newTag && !tags.includes(newTag) && tags.length < MAX_TAGS) {
                tags.push(newTag);
                renderTags();
                tagInput.value = '';
            }
        }
    });
    // Adiciona também ao perder o foco (blur)
    tagInput.addEventListener('blur', () => {
        const newTag = tagInput.value.trim().replace(',', '');
        if (newTag && !tags.includes(newTag) && tags.length < MAX_TAGS) {
            tags.push(newTag);
            renderTags();
            tagInput.value = '';
        }
    });

    // Evento para remover tag (clique no 'x')
    tagsListEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-tag')) {
            const index = e.target.getAttribute('data-index');
            tags.splice(index, 1);
            renderTags();
        }
    });


    // ======================================================
    // 4. SUBMISSÃO DO FORMULÁRIO (O CORAÇÃO DA PÁGINA)
    // ======================================================
    const form = document.getElementById('question-form');
    const submitBtn = document.getElementById('btn-submit-publish');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Feedback visual imediato
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Publicando...';
        submitBtn.disabled = true;

        // Coleta de dados
        const titulo = document.getElementById('titulo').value.trim();
        const disciplinaId = document.getElementById('disciplina').value;
        // Pega o HTML do editor contenteditable
        const conteudoHtml = document.getElementById('descricao-editor').innerHTML;
        // Pega o valor do input oculto de tags
        const tagsString = hiddenTagsInput.value;

        // Validação Básica no Front-end (Redundância de segurança)
        if (!titulo || !disciplinaId || !conteudoHtml || conteudoHtml === '<br>') {
            alert("Por favor, preencha todos os campos obrigatórios, incluindo a descrição.");
            resetBtnState();
            return;
        }

        // Monta o objeto para envio (Payload)
        const questionData = {
            matricula_aluno: userMatricula, // Pega do localStorage verificado acima
            id_disciplina: disciplinaId,
            titulo: titulo,
            conteudo: conteudoHtml,
            palavras_chave: tagsString,
            visibilidade: 'Aberta'
        };

        try {
            // Envio para o Back-end
            const response = await fetch('http://localhost:3000/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionData)
            });

            const result = await response.json();

            if (response.ok) {
                // Sucesso!
                alert(`Pergunta publicada com sucesso! ID: ${result.id}`);
                form.reset(); // Limpa os inputs padrões
                document.getElementById('descricao-editor').innerHTML = ''; // Limpa o editor
                tags = []; // Limpa o array de tags
                renderTags(); // Atualiza a visualização das tags
                // Opcional: Redirecionar para a home ou para a página da pergunta
                // window.location.href = '/html/homepage.html';
            } else {
                // Erro retornado pela API
                throw new Error(result.message || "Erro desconhecido ao publicar.");
            }

        } catch (error) {
            console.error("Erro na publicação:", error);
            alert(`Falha ao publicar: ${error.message}`);
        } finally {
            resetBtnState();
        }

        function resetBtnState() {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});