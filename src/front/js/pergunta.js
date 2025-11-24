document.addEventListener('DOMContentLoaded', () => {
    
    // 1. VERIFICAÇÃO DE LOGIN (Corrigida para sessionStorage)
    const userMatricula = sessionStorage.getItem('userMatricula');
    
    if (!userMatricula) {
        alert("Sessão expirada. Redirecionando para login...");
        // Codifica a URL atual para voltar depois
        const currentUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/html/autenticacao.html#login?returnUrl=${currentUrl}`;
        return; 
    }

    // Logout Header
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = '/html/autenticacao.html#login';
        });
    }

    // 2. ANEXOS (Lógica Reescrita)
    const fileInput = document.getElementById('file-input');
    const btnAttach = document.getElementById('btn-attach-trigger');
    const attachmentsPreview = document.getElementById('attachments-preview');
    const fileCountSpan = document.getElementById('file-count');
    let selectedFiles = [];

    // Clique no botão dispara o input escondido
    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', (e) => {
            e.preventDefault(); // Evita submissão acidental
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            
            // Validação de limite
            if (selectedFiles.length + files.length > 3) {
                alert("Máximo de 3 arquivos permitidos.");
                return;
            }

            files.forEach(f => selectedFiles.push(f));
            renderAttachments();
            fileInput.value = ''; // Reseta para permitir selecionar o mesmo arquivo
        });
    }

    function renderAttachments() {
        attachmentsPreview.innerHTML = '';
        fileCountSpan.innerText = selectedFiles.length;

        selectedFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.className = 'attachment-item';
            // Estilo inline simples para garantir visualização
            div.style.cssText = "background:#f0f0f0; padding:8px; margin-bottom:5px; border-radius:4px; display:flex; justify-content:space-between; font-size:0.9rem;";
            div.innerHTML = `
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:80%;">${file.name}</span>
                <button type="button" onclick="removeFile(${index})" style="border:none; background:none; color:red; cursor:pointer; font-weight:bold;">&times;</button>
            `;
            attachmentsPreview.appendChild(div);
        });
    }

    // Função Global para remover (acessível pelo onclick do HTML gerado)
    window.removeFile = (index) => {
        selectedFiles.splice(index, 1);
        renderAttachments();
    };

    // 3. EDITOR DE TEXTO
    const toolbarBtns = document.querySelectorAll('.editor-toolbar button[data-cmd]');
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita submit
            const cmd = btn.getAttribute('data-cmd');
            document.execCommand(cmd, false, null);
        });
    });

    // 4. TAGS
    const tagInput = document.getElementById('tag-input');
    const tagsListEl = document.getElementById('tags-list');
    let tags = [];

    function renderTags() {
        tagsListEl.innerHTML = '';
        tags.forEach((tag, index) => {
            const span = document.createElement('span');
            span.className = 'tag-pill';
            span.innerHTML = `${tag} <span class="close-tag" onclick="removeTag(${index})">&times;</span>`;
            tagsListEl.appendChild(span);
        });
    }

    window.removeTag = (index) => {
        tags.splice(index, 1);
        renderTags();
    };

    if (tagInput) {
        tagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const val = tagInput.value.trim().replace(',', '');
                if (val && !tags.includes(val) && tags.length < 5) {
                    tags.push(val);
                    renderTags();
                    tagInput.value = '';
                }
            }
        });
    }

    // 5. SUBMISSÃO FINAL
    const form = document.getElementById('question-form');
    const submitBtn = document.getElementById('btn-submit-publish');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Coleta de Dados
            const titulo = document.getElementById('titulo').value.trim();
            const disciplina = document.getElementById('disciplina').value;
            const conteudo = document.getElementById('descricao-editor').innerHTML;

            // Validação Front-end
            if (!titulo || !disciplina || !conteudo || conteudo === '<br>') {
                alert("Por favor, preencha Título, Disciplina e Descrição.");
                submitBtn.innerText = 'Publicar Dúvida';
                submitBtn.disabled = false;
                return;
            }

            // Montagem do FormData (Obrigatório para envio de arquivos)
            const formData = new FormData();
            formData.append('matricula_aluno', userMatricula);
            formData.append('id_disciplina', disciplina);
            formData.append('titulo', titulo);
            formData.append('conteudo', conteudo);
            formData.append('palavras_chave', tags.join(','));

            // Adiciona os arquivos ao FormData
            selectedFiles.forEach(file => {
                formData.append('anexos', file);
            });

            try {
                const response = await fetch('http://localhost:3000/api/questions', {
                    method: 'POST',
                    body: formData // Fetch configura o Content-Type automaticamente
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Pergunta publicada com sucesso!");
                    window.location.href = '/html/homepage.html#feed-section';
                } else {
                    alert(`Erro ao publicar: ${result.message}`);
                }
            } catch (error) {
                console.error("Erro de rede:", error);
                alert("Erro de conexão com o servidor.");
            } finally {
                submitBtn.innerText = 'Publicar Dúvida';
                submitBtn.disabled = false;
            }
        });
    }
});