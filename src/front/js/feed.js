document.addEventListener('DOMContentLoaded', () => {
    
    // CORREÇÃO 1: Usar localStorage em vez de sessionStorage
    const userMatricula = localStorage.getItem('usuarioMatricula'); 

    const navContainer = document.getElementById('nav-links-container');
    const feedList = document.getElementById('full-feed-list');
    const lockMessage = document.getElementById('login-lock-message');
    const loader = document.getElementById('feed-loader');

    // Configurar Navbar
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
                <a href="/html/autenticacao.html#register" class="btn-nav-login" style="background:white; color:#007bff; padding:5px 15px; border-radius:20px; text-decoration:none;">Cadastre-se</a>
            `;
        }
    }

    // Carregar Feed
    const apiUrl = 'http://localhost:8080/api/feed/questions';
    
    if(loader) loader.style.display = 'block';

   fetch(apiUrl)
        .then(res => {
            if(!res.ok) throw new Error("API Offline");
            return res.json();
        })
        .then(questions => renderFeed(questions))
        .catch(err => {
            console.error("Erro ao carregar feed:", err);
            if(loader) loader.style.display = 'none';
            if(feedList) feedList.innerHTML = `<p style="text-align:center; padding:20px;">Não foi possível carregar as discussões.</p>`;
        });

    function renderFeed(questions) {
        if(loader) loader.style.display = 'none';
        
        if (!questions || questions.length === 0) {
            if(feedList) feedList.innerHTML = '<p style="text-align:center; padding:30px; color:#666;">Nenhuma discussão encontrada.</p>';
            return;
        }

        if(feedList) feedList.innerHTML = ''; // Limpa lista

        questions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'feed-card';
            
            let imageHtml = '';
            // Se o FeedController enviar autorFoto
            let avatarUrl = q.autorFoto ? `http://localhost:8080${q.autorFoto}` : null;
            let avatarImg = avatarUrl ? `<img src="${avatarUrl}" style="width:30px;height:30px;border-radius:50%;margin-right:10px;object-fit:cover;">` : '<i class="fas fa-user-circle fa-lg" style="margin-right:10px;"></i>';

            const likes = q.likes || 0;
            const dislikes = q.dislikes || 0;
            const score = likes - dislikes;
            const dataFormatada = new Date(q.dataCriacao).toLocaleDateString();

            // CORREÇÃO 2: Exibir autorNome
            const nomeExibicao = q.autorNome || q.matriculaAluno;

            card.innerHTML = `
                <div class="card-main">
                    <div class="card-header">
                        <span class="badge-discipline">Disciplina #${q.idDisciplina}</span>
                        <span class="post-date">${dataFormatada}</span>
                    </div>
                    <h3 class="card-title">${q.titulo}</h3>
                    <div class="card-body">${q.conteudo}</div>
                    ${imageHtml} 
                    <div class="card-footer">
                        <div class="author-info" style="display:flex; align-items:center;">
                            ${avatarImg}
                            <strong>${nomeExibicao}</strong>
                        </div>
                        
                        <div class="reaction-box">
                            <button class="btn-reaction" onclick="handleReaction('question', ${q.idPergunta}, 'LIKE')">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <span class="reaction-count">${score}</span>
                            <button class="btn-reaction" onclick="handleReaction('question', ${q.idPergunta}, 'DISLIKE')">
                                <i class="fas fa-thumbs-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            feedList.appendChild(card);
        });

        if (!userMatricula && lockMessage) lockMessage.style.display = 'block';
    }

    // --- LÓGICA DE REAÇÃO CORRIGIDA ---
    window.handleReaction = async function(targetType, id, actionType) {
        // CORREÇÃO 3: Usar localStorage
        const matricula = localStorage.getItem('usuarioMatricula');

        if (!matricula) {
            alert("Você precisa estar logado para reagir.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/reacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    matricula: matricula,
                    tipo: actionType,
                    alvo: targetType,
                    id: id
                })
            });
            
            if(response.ok) {
                alert("Reação registrada!");
            } else {
                console.warn("Erro ao salvar reação no banco.");
            }
        } catch (err) {
            console.warn("API de reações offline.");
        }
    };
});