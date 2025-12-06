document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURAÇÃO DO BACKEND (RENDER) ---
    const API_BASE_URL = 'https://pbr-si-2025-2-p3-tiapn-t1-9147100.onrender.com';

    // --- ELEMENTOS DO DOM ---
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');
    const forgotLink = document.querySelector('.forgot-link a');
    const forgotModal = document.getElementById('forgot-modal');
    const closeForgotBtn = document.getElementById('close-forgot-modal');
    const forgotForm = document.getElementById('forgot-form');

    // --- TROCA DE TELAS (LOGIN/CADASTRO) ---
    const updateStateFromHash = () => {
        if (window.location.hash === '#register') {
            container.classList.add('active');
            if(document.querySelector('.form-box.register')) document.querySelector('.form-box.register').style.visibility = 'visible';
            if(document.querySelector('.form-box.login')) document.querySelector('.form-box.login').style.visibility = 'hidden';
        } else {
            container.classList.remove('active');
            if(document.querySelector('.form-box.register')) document.querySelector('.form-box.register').style.visibility = 'hidden';
            if(document.querySelector('.form-box.login')) document.querySelector('.form-box.login').style.visibility = 'visible';
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
                const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // OBS: Se o login der erro 400, mude 'email' para 'emailInstitucional' aqui também
                    body: JSON.stringify({ email: email, senha: senha })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('usuarioToken', data.token);
                    localStorage.setItem('usuarioMatricula', data.matricula);
                    localStorage.setItem('usuarioNome', data.nome);
                    localStorage.setItem('usuarioTipo', data.tipo);

                    alert('Bem-vindo(a), ' + data.nome + '!');
                    window.location.href = "/perfil.html"; 
                } else {
                    alert(data.error || 'Falha na autenticação.');
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    }

    // --- LÓGICA DE CADASTRO (CORRIGIDA) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const inputs = registerForm.querySelectorAll('input');
            const nome = inputs[0].value;
            const cpf = inputs[1].value;
            const matricula = inputs[2].value;
            const emailValor = inputs[3].value; // Valor digitado no campo de email
            const senha = inputs[4].value;
            const tipoInput = registerForm.querySelector('input[name="tipo_usuario"]:checked');
            const tipoPessoa = tipoInput ? tipoInput.value : 'Aluno'; 

            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // CORREÇÃO FINAL: Usando 'emailInstitucional' conforme o Java DTO
                    body: JSON.stringify({ 
                        nome: nome, 
                        cpf: cpf, 
                        matricula: matricula, 
                        emailInstitucional: emailValor, // <--- O NOME CERTO!
                        senha: senha, 
                        tipoPessoa: tipoPessoa 
                    })
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso! Faça login para continuar.");
                    window.location.hash = 'login';
                } else {
                    const errorText = await response.text();
                    try {
                        const errorJson = JSON.parse(errorText);
                        alert("Erro ao cadastrar: " + (errorJson.error || errorText));
                    } catch (e) {
                        alert("Erro ao cadastrar: " + errorText);
                    }
                }
            } catch (error) { 
                console.error(error);
                alert("Erro de conexão ao tentar cadastrar."); 
            }
        });
    }

    // --- RECUPERAÇÃO DE SENHA ---
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
                const res = await fetch(`${API_BASE_URL}/api/auth/recover-password`, {
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
