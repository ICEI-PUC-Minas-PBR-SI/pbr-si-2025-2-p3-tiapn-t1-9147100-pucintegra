document.addEventListener('DOMContentLoaded', () => {
    

    // 1. LÓGICA DE PROTEÇÃO (INTEGRAÇÃO COM O LOGIN)

    
    // Tenta pegar a matrícula do localStorage (onde o autenticacao.js salvou)
    // Se não achar, tenta no sessionStorage (caso tenha lógica antiga)
    const userMatricula = localStorage.getItem('usuarioMatricula') || sessionStorage.getItem('userMatricula');

    // Se não tiver matrícula em lugar nenhum, chuta pro login
    if (!userMatricula) {
        alert("Sessão expirada ou não iniciada. Faça login novamente.");
        window.location.href = "index.html"; // Redireciona para o login
        return; // Para a execução do script aqui
    }

    console.log("Usuário autenticado:", userMatricula);


    // 2. ELEMENTOS DO DOM (MANTIDO DO SEU CÓDIGO)

    const dom = {
        name: document.getElementById('user-name-display'),
        handle: document.getElementById('user-matricula-display'),
        bio: document.getElementById('user-bio-display'),
        img: document.getElementById('profile-img-display'),
        statQ: document.getElementById('stat-questions'),
        statA: document.getElementById('stat-answers'),
        questionsList: document.getElementById('questions-list'),
        interactionsList: document.getElementById('interactions-list'),
        modal: document.getElementById('edit-modal'),
        formEdit: document.getElementById('edit-profile-form')
    };


    // 2. Carregar Dados do Perfil (GET)
    async function loadProfile() {
        try {
            const res = await fetch(`http://localhost:8080/api/profile/${userMatricula}`);
            if (!res.ok) throw new Error('Falha na resposta da API');
            
            const data = await res.json();
            
            // O Java retorna { "user": {...}, "stats": {...} }
            const user = data.user;
            const stats = data.stats;

            // CORREÇÃO: Usando nomes exatos do Java (camelCase)
            dom.name.innerText = user.nome || "Nome Indisponível";
            dom.handle.innerText = `@${userMatricula}`;
            dom.bio.innerText = user.biografia || "Sem biografia.";
            
            // CORREÇÃO: Java manda 'fotoPerfil', não 'Foto_Perfil'
            if (user.fotoPerfil) {
                // Adiciona timestamp (?t=...) para o navegador não usar a imagem velha do cache
                dom.img.src = `http://localhost:8080${user.fotoPerfil}?t=${new Date().getTime()}`;
            }

            dom.statQ.innerText = stats.questions || 0;
            dom.statA.innerText = stats.answers || 0;

            document.getElementById('edit-name-input').value = user.nome || "";
            document.getElementById('edit-bio-input').value = user.biografia || "";

        } catch (err) {
            console.error(err);
        }
    }


    // 4. CARREGAR FEED (PERGUNTAS + INTERAÇÕES)

    async function loadFeed() {
        // --- A. Carregar Perguntas ---
        try {
            const resQ = await fetch(`http://localhost:8080/api/users/${userMatricula}/questions`);
            if(resQ.ok) {
                const questions = await resQ.json();
                dom.questionsList.innerHTML = questions.length ? '' : '<p class="empty-msg">Você ainda não fez perguntas.</p>';
                questions.forEach(q => dom.questionsList.innerHTML += createItemCard(q, 'question'));
            }
        } catch(e) { console.log('Erro ao carregar perguntas'); }

        // --- B. Carregar Interações (Respostas + Reações) ---
        dom.interactionsList.innerHTML = '';
        
        let answers = [];
        let reactions = [];

        try {
            // 1. Busca Respostas
            const resA = await fetch(`http://localhost:8080/api/users/${userMatricula}/answers`);
            if (resA.ok) answers = await resA.json();

            // 2. Busca Reações
            const resR = await fetch(`http://localhost:8080/api/reacoes/usuario/${userMatricula}`);
            
            if (resR.ok) {
                const dataR = await resR.json();
                reactions = dataR.map(r => ({
                    Id: r.id,
                    Tipo: r.tipo,       
                    TituloAlvo: r.titulo || "Item sem título",
                    Data_Criacao: r.data, 
                    type: 'reaction'    
                }));
            }

            // 3. Unifica as listas e ordena
            const allInteractions = [
                ...answers.map(a => ({...a, type: 'answer', dateObj: new Date(a.Data_Criacao) })),
                ...reactions.map(r => ({...r, dateObj: new Date(r.Data_Criacao) }))
            ];

            allInteractions.sort((a, b) => b.dateObj - a.dateObj);

            // 4. Renderiza
            if (allInteractions.length === 0) {
                dom.interactionsList.innerHTML = '<p class="empty-msg">Nenhuma interação recente.</p>';
            } else {
                allInteractions.forEach(item => {
                    dom.interactionsList.innerHTML += createItemCard(item, item.type);
                });
            }

        } catch (e) { 
            console.error('Erro ao carregar interações:', e); 
            dom.interactionsList.innerHTML = '<p class="empty-msg">Erro ao carregar dados.</p>';
        }
    }


    // 5. FUNÇÃO AUXILIAR DE HTML (MANTIDO DO SEU CÓDIGO)

    function createItemCard(item, type) {
        let iconHtml = '';
        let titleHtml = '';
        let contentHtml = '';
        let dateStr = new Date(item.Data_Criacao || Date.now()).toLocaleDateString();

        if (type === 'question') {
            iconHtml = '<i class="fas fa-question-circle" style="color:var(--puc-blue)"></i>';
            titleHtml = item.Titulo;
            contentHtml = item.Conteudo;
        } 
        else if (type === 'answer') {
            iconHtml = '<i class="fas fa-comment" style="color:var(--puc-light)"></i>';
            titleHtml = `Respondeu em: <strong>${item.PerguntaTitulo || 'Discussão'}</strong>`;
            contentHtml = item.Conteudo;
        }
        else if (type === 'reaction') {
            const isLike = item.Tipo === 'LIKE'; 
            if (isLike) {
                iconHtml = '<i class="fas fa-thumbs-up" style="color:#28a745"></i>'; 
                titleHtml = `Curtiu a discussão: <strong>${item.TituloAlvo || 'Item removido'}</strong>`;
            } else {
                iconHtml = '<i class="fas fa-thumbs-down" style="color:#dc3545"></i>'; 
                titleHtml = `Não curtiu a discussão: <strong>${item.TituloAlvo || 'Item removido'}</strong>`;
            }
            contentHtml = '';
        }

        // Adiciona lógica de delete apenas se tiver ID
        const idToDelete = item.Id || item.Id_Pergunta || item.Id_Resposta;
        const deleteBtn = (type !== 'reaction' && idToDelete) 
            ? `<button class="delete-btn" onclick="deleteItem('${type}', ${idToDelete})"><i class="fas fa-trash"></i></button>`
            : '';

        return `
            <div class="item-card" id="${type}-${idToDelete}">
                <div class="item-content">
                    <h4 style="display:flex; align-items:center; gap:10px;">
                        ${iconHtml} <span>${titleHtml}</span>
                    </h4>
                    ${contentHtml ? `<p>${contentHtml}</p>` : ''}
                    <small style="color:#999; font-size:0.8rem;">${dateStr}</small>
                </div>
                ${deleteBtn}
            </div>
        `;
    }


    // 6. SALVAR EDIÇÃO DO PERFIL (PUT)

    if (dom.formEdit) {
        dom.formEdit.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSave = dom.formEdit.querySelector('.btn-save');
            const originalText = btnSave.innerText;
            btnSave.innerText = "Salvando...";
            btnSave.disabled = true;

            const formData = new FormData();
            formData.append('nome', document.getElementById('edit-name-input').value);
            formData.append('biografia', document.getElementById('edit-bio-input').value);
            
            const fileInput = document.getElementById('edit-photo-input');
            if (fileInput.files[0]) formData.append('foto_perfil', fileInput.files[0]);

            try {
                const res = await fetch(`http://localhost:8080/api/profile/${userMatricula}`, { 
                    method: 'PUT', 
                    body: formData 
                });
                
                if (res.ok) {
                    alert("Perfil atualizado!");
                    dom.modal.style.display = 'none';
                    loadProfile(); // Recarrega os dados na tela
                } else {
                    alert("Erro ao atualizar.");
                }
            } catch (err) { 
                alert("Erro de conexão."); 
            } finally { 
                btnSave.innerText = originalText; 
                btnSave.disabled = false; 
            }
        });
    }


    // 7. CONTROLES DE UI (ABAS E MODAL)

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            
            btn.classList.add('active');
            const targetId = btn.dataset.tab + '-tab'; 
            const targetEl = document.getElementById(targetId);
            if(targetEl) targetEl.style.display = 'block';
        });
    });

    // Inicia na aba de perguntas
    const tabQuestions = document.getElementById('questions-tab');
    if (tabQuestions) tabQuestions.style.display = 'block';
    
    const tabInteractions = document.getElementById('interactions-tab');
    if (tabInteractions) tabInteractions.style.display = 'none';

    // Controles do Modal
    const openModalBtn = document.getElementById('btn-open-edit');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if(openModalBtn) openModalBtn.onclick = () => dom.modal.style.display = 'flex';
    if(closeModalBtn) closeModalBtn.onclick = () => dom.modal.style.display = 'none';
    
    // Fecha modal ao clicar fora
    window.onclick = (event) => {
        if (event.target == dom.modal) {
            dom.modal.style.display = "none";
        }
    }

    // INICIALIZAÇÃO
    loadProfile();
    loadFeed();
});

// 8. FUNÇÕES GLOBAIS (LOGOUT E DELETE)

window.logout = function() {
    // Limpa tanto localStorage (novo) quanto sessionStorage (antigo/fallback)
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html'; // Redireciona para o login
}

window.deleteItem = async function(type, id) {
    if(!confirm("Deseja realmente excluir este item?")) return;
    
    // Lógica de simulação (pode ser trocada por fetch DELETE no futuro)
    try {
        // Exemplo: await fetch(`http://localhost:8080/api/${type}s/${id}`, { method: 'DELETE' });
        
        // Remove visualmente
        const el = document.getElementById(`${type}-${id}`);
        if(el) {
            el.remove();
            alert("Item removido.");
        }
    } catch (error) {
        alert("Erro ao remover item.");
    }
}