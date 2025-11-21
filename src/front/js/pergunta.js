// pergunta.js

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. VERIFICAÇÃO DE LOGIN E PROTEÇÃO DE PÁGINA
    // ==========================================================
    const matriculaLogada = localStorage.getItem('userMatricula');

    if (!matriculaLogada) {
        alert('Você precisa estar logado para fazer uma pergunta.');
        // Redireciona para a tela de autenticação, usando o caminho relativo correto.
        window.location.href = '/html/autenticacao.html#login'; 
        return; // Interrompe o restante do script
    }
    
    // Matrícula do usuário logado, usada para identificar o autor da pergunta no Back-end
    const MATRICULA_USUARIO_LOGADO = matriculaLogada; 
    
    // ==========================================================
    // 2. LÓGICA DE PUBLICAÇÃO DA PERGUNTA (Processo 4)
    // ==========================================================
    const btnPublicar = document.querySelector('.btn-publicar');
    const formPrincipal = document.querySelector('.form-content-area form'); 

    if (btnPublicar) {
        btnPublicar.addEventListener('click', async (event) => {
            
            event.preventDefault(); 

            // 2.1. Coleta de Dados do Formulário
            const titulo = document.getElementById('titulo').value.trim();
            // Pegamos o VALUE do campo (que deve ser o ID da Disciplina - numérico)
            const disciplina = document.getElementById('disciplina').value; 
            // Pega o conteúdo da área editável (contenteditable="true")
            const descricao = document.getElementById('descricao').innerHTML.trim(); 
            // No seu HTML, o Palavras-Chave é um select; pegamos o valor.
            const palavraChaveSelect = document.getElementById('keyword-select');
            const palavras_chave = palavraChaveSelect.value !== 'Selecionar Palavras-Chave' ? palavraChaveSelect.value : '';


            // 2.2. Validação Front-end
            if (!titulo || !disciplina || !descricao || descricao === '<br>') {
                alert('Preencha Título, Disciplina e Descrição antes de publicar.');
                return;
            }

            // O ID do curso não é enviado na tabela PERGUNTA, mas é bom coletá-lo se necessário no futuro
            // const curso = document.getElementById('curso').value; 

            const dadosPergunta = {
                // Usa a matrícula garantida pelo check de login
                matricula_aluno: MATRICULA_USUARIO_LOGADO, 
                id_disciplina: disciplina, 
                titulo: titulo,
                conteudo: descricao,
                palavras_chave: palavras_chave,
                visibilidade: 'Aberta' // Padrão
            };

            // 2.3. Envia a requisição POST para o Back-end
            try {
                const response = await fetch('http://localhost:3000/api/questions', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                        // OPCIONAL: Enviar a matrícula no header (melhor segurança)
                        // 'X-User-Matricula': MATRICULA_USUARIO_LOGADO 
                    },
                    body: JSON.stringify(dadosPergunta)
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`SUCESSO! Pergunta ID: ${data.id} publicada!`);
                    
                    // Limpa o formulário após o sucesso
                    if (formPrincipal) {
                        formPrincipal.reset();
                    }
                    document.getElementById('descricao').innerHTML = ''; // Limpa o editor contenteditable
                    
                } else {
                    // Se o Back-end retornou um erro (status 401, 400, 500)
                    alert(`ERRO do Servidor: ${data.message || 'Falha ao processar a requisição.'}`);
                    console.error('Detalhe do Erro:', data);
                }
            } catch (error) {
                console.error('Erro de rede/comunicação:', error);
                alert('Erro de comunicação com o servidor. Verifique se o Node.js está ativo.');
            }
        });
    }

    // ==========================================================
    // 3. FUNÇÕES AUXILIARES DA TOOLBAR (Editor de Texto)
    // ==========================================================
    // Estas funções permitem que os botões (B, I, U, etc.) formatem o texto no editor
    window.formatText = function(command, value) {
        document.execCommand(command, false, value);
        document.getElementById('descricao').focus(); // Mantém o foco na área de edição
    };
});