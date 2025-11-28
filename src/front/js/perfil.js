document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTEÇÃO DE ROTA
    const userMatricula = sessionStorage.getItem('userMatricula');
    if (!userMatricula) {
        const currentUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/html/autenticacao.html#login?returnUrl=${currentUrl}`;
        return;
    }

    // Elementos da DOM
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
            // CORREÇÃO: URL aponta para a porta 8080
            const res = await fetch(`http://localhost:8080/api/profile/${userMatricula}`);
            if (!res.ok) throw new Error('Falha na resposta da API');
            
            const data = await res.json();
            const user = data.user;
            const stats = data.stats;

            dom.name.innerText = user.Nome || "Nome Indisponível";
            dom.handle.innerText = `@${userMatricula}`;
            dom.bio.innerText = user.Biografia || "Sem biografia.";
            
            if (user.Foto_Perfil) {
                dom.img.src = `${user.Foto_Perfil}?t=${new Date().getTime()}`;
            }

            dom.statQ.innerText = stats.questions || 0;
            dom.statA.innerText = stats.answers || 0;

            document.getElementById('edit-name-input').value = user.Nome || "";
            document.getElementById('edit-bio-input').value = user.Biografia || "";

        } catch (err) {
            console.error(err);
        }
    }

    // 3. Carregar Feed (Minhas Perguntas + INTERAÇÕES)
    async function loadFeed() {
        // --- A. Carregar Perguntas ---
        try {
            // CORREÇÃO: URL aponta para a porta 8080
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
            // CORREÇÃO: URL aponta para a porta 8080
            const resA = await fetch(`http://localhost:8080/api/users/${userMatricula}/answers`);
            if (resA.ok) answers = await resA.json();

            // 2. Busca Reações
            console.log("Tentando buscar reações para:", userMatricula);
            // CORREÇÃO: URL aponta para a porta 8080 e usa a rota correta do Controller
            const resR = await fetch(`http://localhost:8080/api/reacoes/usuario/${userMatricula}`);
            
            if (resR.ok) {
                const dataR = await resR.json();
                console.log("Reações encontradas no Banco:", dataR);

                reactions = dataR.map(r => ({
                    Id: r.id,
                    Tipo: r.tipo,       
                    TituloAlvo: r.titulo || "Item sem título",
                    Data_Criacao: r.data, 
                    type: 'reaction'    
                }));
            } else {
                console.error("Erro no backend ao buscar reações:", resR.status);
            }

            // 3. Unifica as listas
            const allInteractions = [
                ...answers.map(a => ({...a, type: 'answer', dateObj: new Date(a.Data_Criacao) })),
                ...reactions.map(r => ({...r, dateObj: new Date(r.Data_Criacao) }))
            ];

            // 4. Ordena por data
            allInteractions.sort((a, b) => b.dateObj - a.dateObj);

            // 5. Renderiza
            if (allInteractions.length === 0) {
                dom.interactionsList.innerHTML = '<p class="empty-msg">Nenhuma interação recente.</p>';
            } else {
                allInteractions.forEach(item => {
                    dom.interactionsList.innerHTML += createItemCard(item, item.type);
                });
            }

        } catch (e) { 
            console.error('Erro CRÍTICO no JS do Perfil:', e); 
            dom.interactionsList.innerHTML = '<p class="empty-msg">Erro ao carregar dados.</p>';
        }
    }

    // Função auxiliar para gerar o HTML do card
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
            // Card de Reação (Like/Dislike)
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

        return `
            <div class="item-card" id="${type}-${item.Id || item.Id_Pergunta || item.Id_Resposta}">
                <div class="item-content">
                    <h4 style="display:flex; align-items:center; gap:10px;">
                        ${iconHtml} <span>${titleHtml}</span>
                    </h4>
                    ${contentHtml ? `<p>${contentHtml}</p>` : ''}
                    <small style="color:#999; font-size:0.8rem;">${dateStr}</small>
                </div>
                ${type !== 'reaction' ? `<button class="delete-btn" onclick="deleteItem('${type}', ${item.Id || item.Id_Pergunta || item.Id_Resposta})"><i class="fas fa-trash"></i></button>` : ''}
            </div>
        `;
    }

    // 4. Salvar Edição do Perfil (PUT)
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
            // CORREÇÃO: URL aponta para a porta 8080
            const res = await fetch(`http://localhost:8080/api/profile/${userMatricula}`, { method: 'PUT', body: formData });
            if (res.ok) {
                alert("Perfil atualizado!");
                dom.modal.style.display = 'none';
                loadProfile();
            } else {
                alert("Erro ao atualizar.");
            }
        } catch (err) { alert("Erro de conexão."); } 
        finally { btnSave.innerText = originalText; btnSave.disabled = false; }
    });

    // 5. Controles de Abas e Modal
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            
            btn.classList.add('active');
            const targetId = btn.dataset.tab + '-tab'; 
            document.getElementById(targetId).style.display = 'block';
        });
    });

    document.getElementById('questions-tab').style.display = 'block';
    document.getElementById('interactions-tab').style.display = 'none';

    const openModalBtn = document.getElementById('btn-open-edit');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if(openModalBtn) openModalBtn.onclick = () => dom.modal.style.display = 'flex';
    if(closeModalBtn) closeModalBtn.onclick = () => dom.modal.style.display = 'none';

    loadProfile();
    loadFeed();
});

window.logout = function() {
    sessionStorage.clear();
    window.location.href = '/html/autenticacao.html#login';
}

window.deleteItem = async function(type, id) {
    if(!confirm("Deseja realmente excluir?")) return;
    alert("Item removido (simulação).");
    const el = document.getElementById(`${type}-${id}`);
    if(el) el.remove();
}