document.addEventListener('DOMContentLoaded', () => {
    
    const userMatricula = localStorage.getItem('usuarioMatricula'); 
    const feedList = document.getElementById('full-feed-list');
    const navContainer = document.getElementById('nav-links-container');

    // 1. CONFIGURAR NAVBAR
    if (navContainer) {
        if (userMatricula) {
            navContainer.innerHTML = `
                <a href="/html/homepage.html" class="nav-link" style="color:white; margin-right:15px;">Home</a>
                <a href="/html/pergunta.html" class="nav-link" style="color:white; margin-right:15px;">Nova Pergunta</a>
                <a href="/html/perfil.html" class="profile-icon-link" style="color:white; font-size:1.5rem;"><i class="fas fa-user-circle"></i></a>
            `;
        } else {
            navContainer.innerHTML = `
                <a href="/html/autenticacao.html#login" class="nav-link" style="color:white; margin-right:15px;">Entrar</a>
                <a href="/html/autenticacao.html#register" class="btn-nav-login" style="background:white; color:#007bff; padding:5px 15px; border-radius:20px;">Cadastre-se</a>
            `;
        }
    }

    // 2. FILTRO
    window.filterFeed = function(disciplinaId, tema) {
        // CORREÇÃO: API_BASE_URL
        let url = `${API_BASE_URL}/api/feed/questions`;
        const params = new URLSearchParams();
        if (disciplinaId) params.append('disciplinaId', disciplinaId);
        if (tema) params.append('tema', tema);
        if (params.toString()) url += `?${params.toString()}`;
        loadFeedUrl(url);
    }
    const selectDisciplina = document.getElementById('feed-filter-disciplina');
    if (selectDisciplina) selectDisciplina.addEventListener('change', (e) => filterFeed(e.target.value, null));

    // 3. CARREGAR FEED
    function loadFeedUrl(url) {
        feedList.innerHTML = '<p style="text-align:center; padding:20px;"><i class="fas fa-spinner fa-spin"></i> Carregando...</p>';
        fetch(url)
            .then(res => res.json())
            .then(questions => renderFeed(questions))
            .catch(err => {
                console.error(err);
                feedList.innerHTML = '<p style="text-align:center;">Erro ao carregar feed (API Offline?).</p>';
            });
    }

    function renderFeed(questions) {
        feedList.innerHTML = '';
        if (!questions || questions.length === 0) {
            feedList.innerHTML = '<p style="text-align:center; padding:30px;">Nenhuma discussão encontrada.</p>';
            return;
        }

        questions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'feed-card';
            
            // CORREÇÃO: URL da imagem do perfil
            const avatarUrl = q.autorFoto ? `${API_BASE_URL}${q.autorFoto}` : null;
            const avatarImg = avatarUrl ? `<img src="${avatarUrl}" style="width:30px;height:30px;border-radius:50%;margin-right:10px;object-fit:cover;">` : '<i class="fas fa-user-circle fa-lg" style="margin-right:10px;"></i>';
            const dataFormatada = new Date(q.dataCriacao).toLocaleDateString('pt-BR');

            // CORREÇÃO: URL da imagem do anexo
            let imageHtml = '';
            if (q.anexos && q.anexos.length > 0) {
                const imgUrl = `${API_BASE_URL}${q.anexos[0]}`;
                imageHtml = `
                    <div class="card-image-container">
                        <img src="${imgUrl}" class="feed-img-preview" alt="Anexo da pergunta">
                    </div>`;
            }

            let tagsHtml = '';
            if (q.tags && q.tags.length > 0) {
                tagsHtml = '<div style="margin-top:10px; display:flex; gap:5px; flex-wrap:wrap;">';
                q.tags.forEach(tag => {
                    tagsHtml += `<span style="background:#e9ecef; color:#555; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600;">${tag}</span>`;
                });
                tagsHtml += '</div>';
            }

            card.innerHTML = `
                <div class="card-main">
                    <div class="card-header">
                        <span class="badge-discipline">Disciplina #${q.idDisciplina}</span>
                        <span class="post-date">${dataFormatada}</span>
                    </div>
                    
                    <h3 class="card-title">${q.titulo}</h3>
                    
                    <div class="card-body">
                        ${q.conteudo}
                        ${imageHtml} ${tagsHtml}  </div>

                    <div class="card-footer">
                        <div class="author-info" style="display:flex; align-items:center;">
                            ${avatarImg} <strong>${q.autorNome || q.matriculaAluno}</strong>
                        </div>
                        <button class="btn-reply" onclick="toggleAnswers(${q.idPergunta})"><i class="fas fa-comment-dots"></i> Ver Respostas / Responder</button>
                    </div>

                    <div id="answers-container-${q.idPergunta}" class="answers-container" style="display:none; border-top:1px solid #eee; padding:15px; background:#f9f9f9;">
                        <div id="answers-list-${q.idPergunta}" class="answers-list"><p style="text-align:center; color:#999;">Carregando respostas...</p></div>
                        <div class="new-answer-box" style="margin-top:15px; display:flex; gap:10px;">
                            <input type="text" id="input-answer-${q.idPergunta}" placeholder="Escreva uma resposta..." style="flex:1; padding:8px; border:1px solid #ccc; border-radius:20px;">
                            <button onclick="postAnswer(${q.idPergunta})" style="background:#007bff; color:white; border:none; border-radius:50%; width:35px; height:35px; cursor:pointer;"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>`;
            
            feedList.appendChild(card);
        });
    }

    filterFeed(null, null);
});

// --- FUNÇÕES GLOBAIS ---

window.toggleAnswers = function(questionId) {
    const container = document.getElementById(`answers-container-${questionId}`);
    if (container.style.display === 'none') {
        container.style.display = 'block';
        loadAnswers(questionId);
    } else {
        container.style.display = 'none';
    }
}

window.loadAnswers = async function(questionId) {
    const listDiv = document.getElementById(`answers-list-${questionId}`);
    const matricula = localStorage.getItem('usuarioMatricula');
    const token = localStorage.getItem('usuarioToken');

    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        // CORREÇÃO: API_BASE_URL
        const res = await fetch(`${API_BASE_URL}/api/questions/${questionId}/answers?matriculaUsuario=${matricula || ''}`, {
            headers: headers
        });
        
        if (!res.ok && res.status === 403) {
            listDiv.innerHTML = '<p style="color:#666;">Faça login para ver as respostas.</p>';
            return;
        }

        const answers = await res.json();
        if(answers.length === 0) {
            listDiv.innerHTML = '<p style="font-size:0.9rem; color:#666; font-style:italic;">Seja o primeiro a responder!</p>';
            return;
        }

        listDiv.innerHTML = '';
        answers.forEach(a => {
            const colorLike = a.minhaReacao === 'LIKE' ? '#28a745' : '#666';
            const colorDislike = a.minhaReacao === 'DISLIKE' ? '#dc3545' : '#666';
            
            const div = document.createElement('div');
            div.style.cssText = "background:white; padding:10px; border-radius:8px; margin-bottom:8px; border:1px solid #eee;";
            div.innerHTML = `
                <div style="font-size:0.85rem; font-weight:bold; margin-bottom:4px; color:#444;">
                    ${a.matriculaAutor} <span style="font-weight:normal; color:#999; font-size:0.75rem;">• ${new Date(a.dataCriacao).toLocaleDateString('pt-BR')}</span>
                </div>
                <div style="font-size:0.95rem; color:#333; margin-bottom:8px;">${a.conteudo}</div>
                <div style="display:flex; gap:15px; align-items:center;">
                    <button onclick="handleReaction(${a.idResposta}, 'LIKE', ${questionId})" style="border:none; background:none; cursor:pointer; color:${colorLike}; display:flex; align-items:center; gap:5px;">
                        <i class="fas fa-thumbs-up"></i> ${a.likes || 0}
                    </button>
                    <button onclick="handleReaction(${a.idResposta}, 'DISLIKE', ${questionId})" style="border:none; background:none; cursor:pointer; color:${colorDislike}; display:flex; align-items:center; gap:5px;">
                        <i class="fas fa-thumbs-down"></i> ${a.dislikes || 0}
                    </button>
                </div>`;
            listDiv.appendChild(div);
        });
    } catch (e) {
        console.error(e);
        listDiv.innerHTML = '<p style="color:red">Erro ao carregar respostas.</p>';
    }
}

window.postAnswer = async function(questionId) {
    const matricula = localStorage.getItem('usuarioMatricula');
    const token = localStorage.getItem('usuarioToken');

    if (!matricula || !token) return alert("Faça login para responder.");

    const input = document.getElementById(`input-answer-${questionId}`);
    const texto = input.value.trim();
    if(!texto) return;

    try {
        // CORREÇÃO: API_BASE_URL
        const res = await fetch(`${API_BASE_URL}/api/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                idPergunta: questionId,
                matriculaPessoa: matricula,
                conteudo: texto,
                status: "Visivel"
            })
        });

        if(res.ok) {
            input.value = ''; 
            loadAnswers(questionId); 
        } else {
            alert("Erro ao enviar.");
        }
    } catch(e) { alert("Erro de conexão."); }
}

window.handleReaction = async function(idResposta, tipo, questionId) {
    const matricula = localStorage.getItem('usuarioMatricula');
    const token = localStorage.getItem('usuarioToken');

    if (!matricula || !token) return alert("Faça login para reagir.");

    try {
        // CORREÇÃO: API_BASE_URL
        const res = await fetch(`${API_BASE_URL}/api/reacoes`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ matriculaPessoa: matricula, tipoReacao: tipo, idResposta: idResposta })
        });
        
        if(res.ok) {
            loadAnswers(questionId);
        } else {
            console.warn("Erro ao salvar reação.");
        }
    } catch (err) { console.warn("API offline."); }
};

window.logout = function() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/html/autenticacao.html#login';
}