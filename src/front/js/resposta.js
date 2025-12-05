document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DADOS INICIAIS
    const params = new URLSearchParams(window.location.search);
    const questionId = params.get('id');
    const userMatricula = localStorage.getItem('usuarioMatricula');
    const token = localStorage.getItem('usuarioToken'); // Pega Token

    if (!userMatricula || !token) {
        alert("Faça login para participar.");
        window.location.href = "/html/autenticacao.html#login";
        return;
    }
    if (!questionId) {
        alert("Nenhuma pergunta selecionada.");
        window.location.href = "/html/feed.html";
        return;
    }

    // 2. EDITOR
    const editorArea = document.createElement('div');
    editorArea.contentEditable = 'true';
    editorArea.className = 'editor-area';
    editorArea.style.cssText = "background:transparent; min-height:220px; padding:10px; outline:none; border:1px solid #ccc; border-radius:5px;";
    const placeholder = document.getElementById('editor-placeholder');
    if(placeholder) placeholder.replaceWith(editorArea);

    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-bold')) document.execCommand('bold');
            if (icon.classList.contains('fa-italic')) document.execCommand('italic');
            if (icon.classList.contains('fa-list-ul')) document.execCommand('insertUnorderedList');
            editorArea.focus();
        });
    });

    // 3. CARREGAR DADOS (GET PROTEGIDO)
    async function loadData() {
        try {
            // Tenta endpoint direto (Protected?)
            const resDetail = await fetch(`http://localhost:8080/api/questions/${questionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(resDetail.ok) {
                const q = await resDetail.json();
                renderQuestion(q);
            }
        } catch(e) { console.error("Erro pergunta", e); }

        try {
            const resA = await fetch(`http://localhost:8080/api/questions/${questionId}/answers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(resA.ok) {
                const answers = await resA.json();
                renderAnswers(answers);
            }
        } catch(e) { console.error("Erro respostas", e); }
    }

    function renderQuestion(q) {
        const box = document.getElementById('question-display-area');
        const data = new Date(q.dataCriacao).toLocaleDateString('pt-BR');
        box.innerHTML = `
            <small>Postado em ${data} por ${q.matriculaAluno}</small>
            <h2 style="margin:10px 0;">${q.titulo}</h2>
            <div style="font-size:1rem; line-height:1.6;">${q.conteudo}</div>
        `;
    }

    function renderAnswers(list) {
        const area = document.getElementById('answers-list-area');
        if(list.length === 0) {
            area.innerHTML = '<p>Seja o primeiro a responder!</p>';
            return;
        }
        area.innerHTML = '';
        list.forEach(a => {
            const div = document.createElement('div');
            div.className = 'answer-card';
            div.innerHTML = `
                <div class="answer-header"><strong>${a.matriculaPessoa}</strong><span>${new Date(a.dataCriacao).toLocaleDateString('pt-BR')}</span></div>
                <div class="answer-body">${a.conteudo}</div>
                <div class="answer-actions">
                    <button class="btn-action-sm" onclick="reactToAnswer(${a.idResposta}, 'LIKE')"><i class="fas fa-thumbs-up"></i> Útil</button>
                    <button class="btn-action-sm" onclick="reactToAnswer(${a.idResposta}, 'DISLIKE')"><i class="fas fa-thumbs-down"></i> Não útil</button>
                </div>`;
            area.appendChild(div);
        });
    }

    // 4. ENVIAR RESPOSTA (POST PROTEGIDO)
    document.getElementById('btn-submit-answer').addEventListener('click', async (e) => {
        e.preventDefault();
        const texto = editorArea.innerHTML;
        if(texto.trim().length < 5) return alert("Escreva uma resposta mais completa.");

        try {
            const res = await fetch('http://localhost:8080/api/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // TOKEN
                },
                body: JSON.stringify({
                    idPergunta: questionId,
                    matriculaPessoa: userMatricula,
                    conteudo: texto,
                    status: "Visivel"
                })
            });

            if(res.ok) {
                alert("Resposta enviada!");
                loadData(); 
                editorArea.innerHTML = '';
            } else {
                alert("Erro ao enviar resposta.");
            }
        } catch(err) { alert("Erro de conexão."); }
    });

    // 5. REAGIR (POST PROTEGIDO)
    window.reactToAnswer = async (idResp, tipo) => {
        try {
            const res = await fetch('http://localhost:8080/api/reacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // TOKEN
                },
                body: JSON.stringify({
                    idResposta: idResp,
                    matriculaPessoa: userMatricula,
                    tipoReacao: tipo
                })
            });
            if(res.ok) alert("Reação registrada!");
            else alert("Você já reagiu ou houve um erro.");
        } catch(e) { alert("Erro de conexão."); }
    }

    loadData();
});