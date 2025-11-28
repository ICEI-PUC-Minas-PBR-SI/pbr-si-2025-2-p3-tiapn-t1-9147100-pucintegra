document.addEventListener('DOMContentLoaded', () => {
    
    const userMatricula = sessionStorage.getItem('userMatricula'); 

    const navContainer = document.getElementById('nav-links-container');
    const feedList = document.getElementById('full-feed-list');
    const lockMessage = document.getElementById('login-lock-message');
    const loader = document.getElementById('feed-loader');

    // 1. Configurar Navbar
    if (userMatricula) {
        navContainer.innerHTML = `
            <a href="/html/homepage.html" class="nav-link" style="color:white; margin-right:15px;">Home</a>
            <a href="/html/pergunta.html" class="nav-link" style="color:white; margin-right:15px;">Nova Pergunta</a>
            <a href="/html/perfil.html" class="profile-icon-link" style="color:white; font-size:1.5rem;"><i class="fas fa-user-circle"></i></a>
        `;
    } else {
        navContainer.innerHTML = `
            <a href="/html/autenticacao.html#login" class="nav-link" style="color:white; margin-right:15px;">Entrar</a>
            <a href="/html/autenticacao.html#register" class="btn-nav-login" style="background:white; color:#007bff; padding:5px 15px; border-radius:20px; text-decoration:none;">Cadastre-se</a>
        `;
    }

    // 2. Carregar Feed
    // CORREÇÃO: URLs apontam para porta 8080
    const apiUrl = userMatricula 
        ? 'http://localhost:8080/api/feed/questions' 
        : 'http://localhost:8080/api/feed/questions?limit=3';
    
    loader.style.display = 'block';

   fetch(apiUrl)
        .then(res => {
            if(!res.ok) throw new Error("API Offline");
            return res.json();
        })
        .then(questions => renderFeed(questions))
        .catch(err => {
            console.error("Erro ao carregar feed:", err);
            loader.style.display = 'none';
            // REMOVI OS DADOS FAKES. AGORA MOSTRA ERRO SE O JAVA FALHAR.
            feedList.innerHTML = `
                <div style="text-align:center; padding:40px; color:#666;">
                    <i class="fas fa-exclamation-triangle" style="font-size:2rem; color:#f0ad4e;"></i>
                    <p style="margin-top:10px">Não foi possível carregar as discussões.</p>
                    <small>Verifique se o servidor Backend (Java) está rodando na porta 8080.</small>
                </div>
            `;
        });

    function renderFeed(questions) {
        loader.style.display = 'none';
        
        if (!questions || questions.length === 0) {
            feedList.innerHTML = '<p style="text-align:center; padding:30px; color:#666;">Nenhuma discussão encontrada.</p>';
            return;
        }

        questions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'feed-card';
            
            let imageHtml = '';
            if (q.ImagemAnexo) {
                imageHtml = `<div class="card-image-container"><img src="${q.ImagemAnexo}" class="feed-img-preview"></div>`;
            }

            const likes = q.Likes || 0;
            const dislikes = q.Dislikes || 0;
            const score = likes - dislikes;

            card.innerHTML = `
                <div class="card-main">
                    <div class="card-header">
                        <span class="badge-discipline">${q.Disciplina || 'Geral'}</span>
                        <span class="post-date">${new Date(q.Data_Criacao).toLocaleDateString()}</span>
                    </div>
                    <h3 class="card-title">${q.Titulo}</h3>
                    <div class="card-body">${q.Conteudo}</div>
                    ${imageHtml} 
                    <div class="card-footer">
                        <div class="author-info">
                            <i class="fas fa-user-circle fa-lg"></i>
                            <span>${q.Autor || 'Usuário'}</span>
                        </div>
                        
                        <div class="reaction-box">
                            <button class="btn-reaction" id="btn-like-q-${q.Id_Pergunta}" onclick="handleReaction('question', ${q.Id_Pergunta}, 'LIKE')">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <span class="reaction-count" id="score-q-${q.Id_Pergunta}">${score}</span>
                            <button class="btn-reaction" id="btn-dislike-q-${q.Id_Pergunta}" onclick="handleReaction('question', ${q.Id_Pergunta}, 'DISLIKE')">
                                <i class="fas fa-thumbs-down"></i>
                            </button>
                        </div>

                        <button class="btn-toggle-answers" onclick="toggleAnswers(${q.Id_Pergunta})">
                            <i class="far fa-comment"></i> Ver Respostas
                        </button>
                    </div>
                </div>
                <div id="answers-area-${q.Id_Pergunta}" class="answers-section">
                    <div class="answers-list-container"></div>
                    ${userMatricula ? `
                    <div class="new-answer-box">
                        <input type="text" id="input-ans-${q.Id_Pergunta}" class="input-answer" placeholder="Escreva uma resposta...">
                        <button class="btn-send-answer" onclick="sendAnswer(${q.Id_Pergunta})"><i class="fas fa-paper-plane"></i></button>
                    </div>` : ''}
                </div>
            `;
            feedList.appendChild(card);
        });

        if (!userMatricula) lockMessage.style.display = 'block';
    }

    // --- FUNÇÕES GLOBAIS DE INTERAÇÃO ---

    window.toggleAnswers = async function(id) {
        const area = document.getElementById(`answers-area-${id}`);
        const container = area.querySelector('.answers-list-container');
        const loaderIcon = document.createElement('div');
        loaderIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        
        area.classList.toggle('open');
        
        if (area.classList.contains('open')) {
            container.innerHTML = '';
            container.appendChild(loaderIcon);

            try {
                // CORREÇÃO: URL aponta para a porta 8080
                const res = await fetch(`http://localhost:8080/api/questions/${id}/answers`);
                const answers = await res.json();
                
                container.innerHTML = ''; // Limpa loader
                if (answers.length === 0) {
                    container.innerHTML = '<p style="padding:10px; font-style:italic; color:#999; font-size:0.9rem;">Seja o primeiro a responder!</p>';
                } else {
                    answers.forEach(a => {
                        container.innerHTML += `
                            <div class="answer-item">
                                <div class="answer-avatar">
                                    <img src="${a.Foto_Perfil || '/docs/images/default-avatar.png'}" alt="Avatar">
                                </div>
                                <div class="answer-content">
                                    <div class="ans-meta">
                                        <strong>${a.AutorNome}</strong> 
                                        <span>• ${new Date(a.Data_Criacao).toLocaleDateString()}</span>
                                    </div>
                                    <p>${a.Conteudo}</p>
                                </div>
                            </div>
                        `;
                    });
                }
            } catch (err) {
                container.innerHTML = '<p style="color:red">Erro ao carregar respostas.</p>';
            }
        }
    };

    window.sendAnswer = async function(id) {
        const input = document.getElementById(`input-ans-${id}`);
        const content = input.value.trim();
        if (!content) return;

        try {
            // CORREÇÃO: URL aponta para a porta 8080
            const res = await fetch(`http://localhost:8080/api/questions/${id}/answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matricula: userMatricula, conteudo: content })
            });

            if (res.ok) {
                input.value = '';
                // Recarrega as respostas
                const area = document.getElementById(`answers-area-${id}`);
                area.classList.remove('open');
                setTimeout(() => toggleAnswers(id), 50);
            } else {
                alert("Erro ao enviar.");
            }
        } catch (err) { alert("Erro de conexão."); }
    };

    // ---------------------------------------------------------
    // LÓGICA DE REAÇÃO (Com modo simulação caso backend falhe)
    // ---------------------------------------------------------
    window.handleReaction = async function(targetType, id, actionType) {
        console.log(`Tentando reagir: ${actionType} no item ${id}`);

        if (!sessionStorage.getItem('userMatricula')) {
            alert("Você precisa estar logado (sessionStorage) para reagir.");
            return;
        }

        const prefix = targetType === 'question' ? 'q' : 'a';
        const btnLike = document.getElementById(`btn-like-${prefix}-${id}`);
        const btnDislike = document.getElementById(`btn-dislike-${prefix}-${id}`);
        const scoreSpan = document.getElementById(`score-${prefix}-${id}`);

        // 1. Atualização Visual Otimista (Muda antes de esperar o servidor)
        let currentScore = parseInt(scoreSpan.innerText);
        const wasLiked = btnLike.classList.contains('liked');
        const wasDisliked = btnDislike.classList.contains('disliked');

        btnLike.classList.remove('liked');
        btnDislike.classList.remove('disliked');

        if (actionType === 'LIKE') {
            if (wasLiked) {
                currentScore--;
            } else {
                btnLike.classList.add('liked');
                currentScore += (wasDisliked ? 2 : 1);
            }
        } else { // DISLIKE
            if (wasDisliked) {
                currentScore++;
            } else {
                btnDislike.classList.add('disliked');
                currentScore -= (wasLiked ? 2 : 1);
            }
        }
        
        scoreSpan.innerText = currentScore;

        // 2. Tenta salvar no Servidor (Silencioso)
        try {
            // CORREÇÃO: URL aponta para a porta 8080
            const response = await fetch('http://localhost:8080/api/reacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    matricula: sessionStorage.getItem('userMatricula'),
                    tipo: actionType,
                    alvo: targetType,
                    id: id
                })
            });
            
            if(!response.ok) throw new Error("Erro no backend");
            console.log("Reação salva no servidor com sucesso.");

        } catch (err) {
            console.warn("Backend offline ou erro de API. A reação foi aplicada apenas visualmente (Simulação).");
        }
    };
});