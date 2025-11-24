document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTEÇÃO DE ROTA
    const userMatricula = sessionStorage.getItem('userMatricula');
    if (!userMatricula) {
        // Redireciona para login se não tiver sessão
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
        answersList: document.getElementById('answers-list'),
        modal: document.getElementById('edit-modal'),
        formEdit: document.getElementById('edit-profile-form')
    };

    // 2. Carregar Dados do Perfil (GET)
    async function loadProfile() {
        try {
            const res = await fetch(`/api/profile/${userMatricula}`);
            if (!res.ok) throw new Error('Falha na resposta da API');
            
            const data = await res.json();
            const user = data.user;
            const stats = data.stats;

            // Atualiza UI com dados do usuário
            dom.name.innerText = user.Nome || "Nome Indisponível";
            dom.handle.innerText = `@${userMatricula}`;
            dom.bio.innerText = user.Biografia || "Sem biografia.";
            
            // Atualiza a imagem (adiciona timestamp para forçar refresh do cache do navegador)
            if (user.Foto_Perfil) {
                dom.img.src = `${user.Foto_Perfil}?t=${new Date().getTime()}`;
            }

            // Atualiza Estatísticas
            dom.statQ.innerText = stats.questions || 0;
            dom.statA.innerText = stats.answers || 0;

            // Preenche os campos do Modal de Edição para quando o usuário abrir
            document.getElementById('edit-name-input').value = user.Nome || "";
            document.getElementById('edit-bio-input').value = user.Biografia || "";

        } catch (err) {
            console.error(err);
            dom.name.innerText = "Erro ao carregar";
        }
    }

    // 3. Carregar Feed (Minhas Perguntas/Respostas)
    async function loadFeed() {
        // Perguntas
        const resQ = await fetch(`/api/users/${userMatricula}/questions`);
        const questions = await resQ.json();
        dom.questionsList.innerHTML = questions.length ? '' : '<p class="empty-msg">Você ainda não fez perguntas.</p>';
        questions.forEach(q => dom.questionsList.innerHTML += createItemCard(q, 'question'));

        // Respostas
        const resA = await fetch(`/api/users/${userMatricula}/answers`);
        const answers = await resA.json();
        dom.answersList.innerHTML = answers.length ? '' : '<p class="empty-msg">Você ainda não enviou respostas.</p>';
        answers.forEach(a => dom.answersList.innerHTML += createItemCard(a, 'answer'));
    }

    function createItemCard(item, type) {
        const title = type === 'question' ? item.Titulo : `Resposta em: ${item.PerguntaTitulo || 'Pergunta Excluída'}`;
        const id = type === 'question' ? item.Id_Pergunta : item.Id_Resposta;
        return `
            <div class="item-card" id="${type}-${id}">
                <div class="item-content">
                    <h4>${title}</h4>
                    <p>${item.Conteudo}</p>
                    <small>${new Date(item.Data_Criacao).toLocaleDateString()}</small>
                </div>
                <button class="delete-btn" onclick="deleteItem('${type}', ${id})"><i class="fas fa-trash"></i></button>
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

        // Captura os dados
        const nome = document.getElementById('edit-name-input').value;
        const bio = document.getElementById('edit-bio-input').value;
        const fileInput = document.getElementById('edit-photo-input');

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('biografia', bio);
        
        // Só anexa se o usuário selecionou um arquivo
        if (fileInput.files[0]) {
            formData.append('foto_perfil', fileInput.files[0]);
        }

        try {
            const res = await fetch(`/api/profile/${userMatricula}`, {
                method: 'PUT',
                body: formData // Fetch configura o boundary automaticamente
            });

            if (res.ok) {
                alert("Perfil atualizado com sucesso!");
                dom.modal.style.display = 'none'; // Fecha modal
                loadProfile(); // Recarrega dados na tela
            } else {
                const errData = await res.json();
                alert(`Erro ao atualizar: ${errData.message}`);
            }
        } catch (err) {
            console.error(err);
            alert("Erro de conexão com o servidor.");
        } finally {
            btnSave.innerText = originalText;
            btnSave.disabled = false;
        }
    });

    // 5. Controles de UI (Abas e Modal)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none'); // Esconde todos
            
            btn.classList.add('active');
            const targetId = btn.dataset.tab + '-tab';
            document.getElementById(targetId).style.display = 'block'; // Mostra alvo
        });
    });

    // Inicializa com a aba de perguntas visível
    document.getElementById('questions-tab').style.display = 'block';
    document.getElementById('answers-tab').style.display = 'none';

    // Modal
    const openModalBtn = document.getElementById('btn-open-edit'); // Botão do sidebar
    const openModalBtn2 = document.getElementById('btn-edit-trigger'); // Botão do header (se houver)
    
    const openModal = () => dom.modal.style.display = 'flex';
    const closeModal = () => dom.modal.style.display = 'none';

    if(openModalBtn) openModalBtn.onclick = openModal;
    if(openModalBtn2) openModalBtn2.onclick = openModal;
    document.querySelector('.close-modal').onclick = closeModal;

    // Inicialização
    loadProfile();
    loadFeed();
});

// Funções Globais
window.logout = function() {
    sessionStorage.clear();
    window.location.href = '/html/autenticacao.html#login';
}

window.deleteItem = async function(type, id) {
    if(!confirm("Deseja realmente excluir?")) return;
    // Implementar chamada DELETE API aqui se necessário
    // fetch...
    alert("Item removido (simulação).");
    document.getElementById(`${type}-${id}`).remove();
}