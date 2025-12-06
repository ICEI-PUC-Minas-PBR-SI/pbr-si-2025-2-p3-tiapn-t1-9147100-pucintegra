document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            btn.classList.add('active');
            const targetEl = document.getElementById(btn.dataset.tab + '-tab');
            if(targetEl) targetEl.style.display = 'block';
        });
    });

    const btnLogoutSidebar = document.getElementById('btn-logout-sidebar');
    if(btnLogoutSidebar) btnLogoutSidebar.addEventListener('click', (e) => { e.preventDefault(); window.logout(); });

    const modal = document.getElementById('edit-modal');
    const openModalBtn = document.getElementById('btn-open-edit');
    const closeModalBtn = document.querySelector('.close-modal');
    if(openModalBtn) openModalBtn.onclick = () => modal.style.display = 'flex';
    if(closeModalBtn) closeModalBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

    const userMatricula = localStorage.getItem('usuarioMatricula');
    const token = localStorage.getItem('usuarioToken');

    if (!userMatricula || !token) {
        window.location.href = "/autenticacao.html#login";
        return;
    }

    const dom = {
        name: document.getElementById('user-name-display'),
        handle: document.getElementById('user-matricula-display'),
        type: document.getElementById('user-type-display'),
        monitorBadge: document.getElementById('monitor-badge'), 
        professorPanel: document.getElementById('professor-panel'), 
        bio: document.getElementById('user-bio-display'),
        img: document.getElementById('profile-img-display'),
        statQ: document.getElementById('stat-questions'),
        statA: document.getElementById('stat-answers'),
        questionsList: document.getElementById('questions-list'),
        interactionsList: document.getElementById('interactions-list'),
        formEdit: document.getElementById('edit-profile-form')
    };

    async function loadProfile() {
        try {
            // CORREÇÃO: API_BASE_URL
            const res = await fetch(`${API_BASE_URL}/api/profile/${userMatricula}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.ok) {
                const data = await res.json();
                const user = data.user;
                const stats = data.stats;

                dom.name.innerText = user.nome || "Usuário";
                dom.handle.innerText = `@${userMatricula}`;
                
                if (dom.type) {
                    dom.type.innerText = user.tipoPessoa || "Aluno"; 
                    if (user.tipoPessoa === 'Professor') {
                        dom.type.style.background = '#ffc107';
                        dom.type.style.color = '#000';
                        if(dom.professorPanel) dom.professorPanel.style.display = 'block';
                    } else {
                        dom.type.style.background = '#e9ecef';
                        dom.type.style.color = '#555';
                        if (user.ehMonitor === true && dom.monitorBadge) {
                            dom.monitorBadge.style.display = 'inline-block';
                        }
                    }
                }
                
                dom.bio.innerText = user.biografia || "Sem biografia.";
                if (user.fotoPerfil) {
                    // CORREÇÃO: URL da imagem
                    dom.img.src = `${API_BASE_URL}${user.fotoPerfil}?t=${new Date().getTime()}`;
                }

                dom.statQ.innerText = stats.questions || 0;
                dom.statA.innerText = stats.answers || 0;

                if(document.getElementById('edit-name-input')) {
                    document.getElementById('edit-name-input').value = user.nome || "";
                    document.getElementById('edit-bio-input').value = user.biografia || "";
                }
            }
            else {
                if (res.status === 403 || res.status === 401) {
                    alert("Sua sessão expirou. Por favor, faça login novamente.");
                    window.logout(); // Chama a função de logout existente
                    return;
                }
                console.error("Erro ao carregar perfil");
            }
        } catch (err) { console.error("Erro perfil:", err); }
    }

    async function loadFeed() {
        try {
            // CORREÇÃO: API_BASE_URL
            const resQ = await fetch(`${API_BASE_URL}/api/users/${userMatricula}/questions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resQ.ok) {
                const questions = await resQ.json();
                dom.questionsList.innerHTML = '';
                if (questions.length === 0) dom.questionsList.innerHTML = '<p class="empty-msg">Nenhuma pergunta feita.</p>';
                else questions.forEach(q => dom.questionsList.innerHTML += createItemCard(q, 'question'));
            }
        } catch(e) { console.error(e); }

        let items = [];
        try {
            // CORREÇÃO: API_BASE_URL
            const resA = await fetch(`${API_BASE_URL}/api/users/${userMatricula}/answers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resA.ok) {
                const answers = await resA.json();
                answers.forEach(a => items.push({ ...a, type: 'answer', dateObj: new Date(a.dataCriacao) }));
            }

            // CORREÇÃO: API_BASE_URL
            const resR = await fetch(`${API_BASE_URL}/api/reacoes/usuario/${userMatricula}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resR.ok) {
                const reactions = await resR.json();
                reactions.forEach(r => items.push({
                    id: r.id,
                    type: 'reaction',
                    reactionType: r.tipo,
                    tituloAlvo: r.titulo,
                    dateObj: new Date(r.data)
                }));
            }

            items.sort((a, b) => b.dateObj - a.dateObj);
            dom.interactionsList.innerHTML = '';
            if (items.length === 0) dom.interactionsList.innerHTML = '<p class="empty-msg">Nenhuma interação encontrada.</p>';
            else items.forEach(item => dom.interactionsList.innerHTML += createItemCard(item, item.type));
            
        } catch(e) { console.error("Erro interações:", e); }
    }

    function createItemCard(item, type) {
        let iconHtml = '', titleHtml = '', contentHtml = '';
        let dateStr = item.dateObj ? item.dateObj.toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');

        if (type === 'question') {
            iconHtml = '<i class="fas fa-question-circle" style="color:#0056b3"></i>';
            titleHtml = `Você perguntou: <strong>${item.titulo}</strong>`;
            contentHtml = item.conteudo || "";
        } else if (type === 'answer') {
            iconHtml = '<i class="fas fa-comment" style="color:#6c757d"></i>';
            titleHtml = `Você respondeu na discussão #${item.idPergunta}`;
            contentHtml = item.conteudo || "";
        } else if (type === 'reaction') {
            const isLike = (item.reactionType === 'LIKE'); 
            iconHtml = isLike ? '<i class="fas fa-thumbs-up" style="color:#28a745"></i>' : '<i class="fas fa-thumbs-down" style="color:#dc3545"></i>';
            titleHtml = `${isLike ? 'Curtiu' : 'Não curtiu'} uma resposta em: <strong>${item.tituloAlvo}</strong>`;
        }
        return `
            <div class="item-card" style="padding:15px; border-bottom:1px solid #eee; background:white; margin-bottom:10px; border-radius:5px;">
                <div class="item-content">
                    <h4 style="display:flex; align-items:center; gap:10px; margin:0 0 5px 0; font-size:1rem;">${iconHtml} <span>${titleHtml}</span></h4>
                    ${contentHtml ? `<p style="color:#555; font-size:0.9rem; margin:0;">${contentHtml}</p>` : ''}
                    <small style="color:#999; font-size:0.8rem; display:block; margin-top:5px;">${dateStr}</small>
                </div>
            </div>`;
    }

    if (dom.formEdit) {
        dom.formEdit.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSave = dom.formEdit.querySelector('.btn-save');
            btnSave.textContent = "Salvando...";
            btnSave.disabled = true;

            const formData = new FormData();
            formData.append('nome', document.getElementById('edit-name-input').value);
            formData.append('biografia', document.getElementById('edit-bio-input').value);
            const fileInput = document.getElementById('edit-photo-input');
            if(fileInput.files.length > 0) formData.append('foto_perfil', fileInput.files[0]);

            try {
                // CORREÇÃO: API_BASE_URL
                const res = await fetch(`${API_BASE_URL}/api/profile/${userMatricula}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                });
                if (res.ok) {
                    alert("Perfil atualizado!");
                    loadProfile();
                    modal.style.display = 'none';
                } else alert("Erro ao atualizar.");
            } catch(err) { alert("Erro de conexão."); } 
            finally { btnSave.textContent = "Salvar Alterações"; btnSave.disabled = false; }
        });
    }

    const btnPromover = document.getElementById('btn-promover-monitor');
    if (btnPromover) {
        btnPromover.addEventListener('click', async () => {
            const inputMatricula = document.getElementById('input-monitor-matricula');
            const matriculaAlvo = inputMatricula.value.trim();

            if (!matriculaAlvo) return alert("Digite a matrícula do aluno.");

            try {
                // CORREÇÃO: API_BASE_URL
                const res = await fetch(`${API_BASE_URL}/api/monitoria/promover`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ matriculaAluno: matriculaAlvo })
                });

                const data = await res.json();
                if (res.ok) {
                    alert(data.message);
                    inputMatricula.value = '';
                } else {
                    alert("Erro: " + (data.error || "Não foi possível promover."));
                }
            } catch (error) {
                console.error(error);
                alert("Erro de conexão com o servidor.");
            }
        });
    }

    loadProfile();
    loadFeed();
});

window.logout = function() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/autenticacao.html#login';
}