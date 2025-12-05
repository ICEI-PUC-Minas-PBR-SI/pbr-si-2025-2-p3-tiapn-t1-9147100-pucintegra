document.addEventListener('DOMContentLoaded', () => {

    // --- REFERÊNCIAS AOS ELEMENTOS VISUAIS ---
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');
    const forgotLink = document.querySelector('.forgot-link a');
    const forgotModal = document.getElementById('forgot-modal');
    const closeForgotBtn = document.getElementById('close-forgot-modal');
    const forgotForm = document.getElementById('forgot-form');

    // --- ALTERNAR ENTRE LOGIN E CADASTRO (UI) ---
    const updateStateFromHash = () => {
        if (window.location.hash === '#register') {
            container.classList.add('active');
            document.querySelector('.form-box.register').style.visibility = 'visible';
            document.querySelector('.form-box.login').style.visibility = 'hidden';
        } else {
            container.classList.remove('active');
            document.querySelector('.form-box.register').style.visibility = 'hidden';
            document.querySelector('.form-box.login').style.visibility = 'visible';
        }
    };

    if (registerBtn) registerBtn.addEventListener('click', () => window.location.hash = 'register');
    if (loginBtn) loginBtn.addEventListener('click', () => window.location.hash = 'login');
    window.addEventListener('hashchange', updateStateFromHash);
    updateStateFromHash();


    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputs = loginForm.querySelectorAll('input');
            const email = inputs[0].value;
            const senha = inputs[1].value;

            try {
                // CORREÇÃO: Usando caminho relativo (sem localhost)
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, senha: senha })
                });

                const data = await response.json();
if (response.ok) {
                    // Se deu certo, salva os dados
                    localStorage.setItem('usuarioToken', data.token);
                    localStorage.setItem('usuarioMatricula', data.matricula);
                    localStorage.setItem('usuarioNome', data.nome);
                    localStorage.setItem('usuarioTipo', data.tipo);

                    alert('Bem-vindo(a), ' + data.nome + '!');
                    window.location.href = "perfil.html"; 
                } else {
                    // Se a senha estiver errada
                    alert(data.error || 'Falha na autenticação.');
                }

            } catch (error) {
                // Se o servidor cair ou a internet falhar
                console.error("Erro na requisição:", error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    }


    // --- LÓGICA DE CADASTRO ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputs = registerForm.querySelectorAll('input');
            const nome = inputs[0].value;
            const cpf = inputs[1].value;
            const matricula = inputs[2].value;
            const email = inputs[3].value;
            const senha = inputs[4].value;
            const tipoInput = registerForm.querySelector('input[name="tipo_usuario"]:checked');
            const tipoPessoa = tipoInput ? tipoInput.value : 'Aluno'; 

            try {
                // CORREÇÃO: Usando caminho relativo (sem localhost)
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, cpf, matricula, emailInstitucional: email, senha, tipoPessoa })
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso! Faça login para continuar.");
                    window.location.hash = 'login';
                } else {
                    const errorText = await response.text();
                    alert("Erro ao cadastrar: " + errorText);
                }
            } catch (error) { 
                console.error(error);
                alert("Erro de conexão ao tentar cadastrar."); 
            }
        });
    }

    // LÓGICA DE RECUPERAÇÃO DE SENHA
    if (forgotLink && forgotModal) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotModal.style.display = 'flex';
        });

        closeForgotBtn.addEventListener('click', () => {
            forgotModal.style.display = 'none';
        });

        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('forgot-email').value;
            const cpf = document.getElementById('forgot-cpf').value;
            const novaSenha = document.getElementById('forgot-new-pass').value;

            try {
                // CORREÇÃO: Usando caminho relativo (sem localhost)
                const res = await fetch('/api/auth/recover-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, cpf, novaSenha })
                });

                if (res.ok) {
                    alert('Senha alterada com sucesso! Faça login com a nova senha.');
                    forgotModal.style.display = 'none';
                    forgotForm.reset();
                } else {
                    const err = await res.json();
                    alert(err.error || 'Erro ao alterar senha.');
                }
            } catch (error) {
                alert('Erro de conexão.');
            }
        });
    }
});
