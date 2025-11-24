document.addEventListener('DOMContentLoaded', () => {
    
    const userMatricula = sessionStorage.getItem('userMatricula');
    const navContainer = document.getElementById('nav-links-container');
    const feedList = document.getElementById('full-feed-list');
    const lockMessage = document.getElementById('login-lock-message');
    const loader = document.getElementById('feed-loader');

    // 1. Configurar Navbar (Mantendo consistência com o resto do site)
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
    // Se logado: carrega tudo. Se não: carrega apenas 3 (limit=3)
    const apiUrl = userMatricula ? '/api/feed/questions' : '/api/feed/questions?limit=3';

    loader.style.display = 'block';

    fetch(apiUrl)
        .then(res => res.json())
        .then(questions => {
            loader.style.display = 'none';
            
            if (questions.length === 0) {
                feedList.innerHTML = '<p style="text-align:center; padding:30px; color:#666;">Nenhuma discussão encontrada.</p>';
                return;
            }

            questions.forEach(q => {
                const card = document.createElement('div');
                card.className = 'feed-card';
                
                // Lógica de Imagem: Verifica se o banco retornou um caminho de imagem
                let imageHtml = '';
                if (q.ImagemAnexo) {
                    // Cria a tag IMG apontando para a pasta /uploads/
                    imageHtml = `
                        <div class="card-image-container">
                            <img src="${q.ImagemAnexo}" alt="Anexo da pergunta" class="feed-img-preview">
                        </div>`;
                }

                card.innerHTML = `
                    <div class="card-main">
                        <div class="card-header">
                            <span class="badge-discipline">${q.Disciplina}</span>
                            <span class="post-date">${new Date(q.Data_Criacao).toLocaleDateString()}</span>
                        </div>
                        
                        <h3 class="card-title">${q.Titulo}</h3>
                        
                        <div class="card-body">
                            ${q.Conteudo}
                        </div>
                        
                        ${imageHtml} <div class="card-footer">
                            <div class="author-info">
                                <i class="fas fa-user-circle fa-lg"></i>
                                <span>${q.Autor || 'Usuário'}</span>
                            </div>
                            <button class="btn-toggle-answers" onclick="toggleAnswers(${q.Id_Pergunta})">
                                <i class="far fa-comment"></i> Ver Respostas
                            </button>
                        </div>
                    </div>
                    
                    <div id="answers-area-${q.Id_Pergunta}" class="answers-section">
                        <div class="answers-loader"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>
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

            // Mostra mensagem de bloqueio se não estiver logado
            if (!userMatricula) {
                lockMessage.style.display = 'block';
            }
        })
        .catch(err => {
            console.error(err);
            loader.style.display = 'none';
            feedList.innerHTML = '<p style="text-align:center; color:red;">Erro ao carregar feed.</p>';
        });

    // --- FUNÇÕES GLOBAIS PARA INTERAÇÃO ---

    window.toggleAnswers = async function(questionId) {
        const area = document.getElementById(`answers-area-${questionId}`);
        const container = area.querySelector('.answers-list-container');
        const loader = area.querySelector('.answers-loader');

        if (area.classList.contains('open')) {
            area.classList.remove('open');
            return;
        }

        area.classList.add('open');
        loader.style.display = 'block';
        container.innerHTML = '';

        try {
            const res = await fetch(`/api/questions/${questionId}/answers`);
            const answers = await res.json();
            loader.style.display = 'none';
            
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
            loader.style.display = 'none';
        }
    };

    window.sendAnswer = async function(questionId) {
        const input = document.getElementById(`input-ans-${questionId}`);
        const content = input.value.trim();
        if (!content) return;

        try {
            const res = await fetch(`/api/questions/${questionId}/answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matricula: userMatricula, conteudo: content })
            });

            if (res.ok) {
                input.value = '';
                const area = document.getElementById(`answers-area-${questionId}`);
                area.classList.remove('open');
                setTimeout(() => toggleAnswers(questionId), 50);
            } else {
                alert("Erro ao enviar.");
            }
        } catch (err) { alert("Erro de conexão."); }
    };
});