document.addEventListener('DOMContentLoaded', () => {

    // Variáveis Visuais
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    // Lógica de Alternar (Toggle) entre Login e Cadastro
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

    // --- LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const inputs = loginForm.querySelectorAll('.input-box input');
            const email = inputs[0].value;
            const senha = inputs[1].value;

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    // 1. Salva na Sessão (Dura enquanto a aba estiver aberta)
                    sessionStorage.setItem('userMatricula', data.user.matricula);
                    sessionStorage.setItem('userType', data.user.tipo);

                    // 2. Verifica se existe uma URL de retorno (Redirecionamento Inteligente)
                    const urlParams = new URLSearchParams(window.location.search);
                    const returnUrl = urlParams.get('returnUrl');

                    alert(`Bem-vindo(a), ${data.user.nome}!`);

                    if (returnUrl) {
                        window.location.href = returnUrl; // Vai para onde o usuário queria ir (ex: Perfil)
                    } else {
                        window.location.href = '/html/homepage.html'; // Padrão
                    }
                } else {
                    alert(data.message || 'Erro no login.');
                }
            } catch (error) {
                console.error(error);
                alert('Erro de conexão com o servidor.');
            }
        });
    }

    // --- CADASTRO ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const inputs = registerForm.querySelectorAll('.input-box input');
            // ... (mesma lógica de captura de inputs do seu código anterior)
            // Para simplificar aqui:
            const nome = inputs[0].value;
            const cpf = inputs[1].value; // Lembre de limpar caracteres especiais
            const matricula = inputs[2].value;
            const email = inputs[3].value;
            const senha = inputs[4].value;
            const tipoUsuarioInput = registerForm.querySelector('input[name="tipo_usuario"]:checked');
            const tipo_usuario = tipoUsuarioInput ? tipoUsuarioInput.value : 'Aluno';

            try {
                const res = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, cpf, matricula, email, senha, tipo_usuario })
                });
                if (res.ok) {
                    alert("Cadastro realizado! Faça login.");
                    window.location.hash = 'login';
                } else {
                    alert("Erro ao cadastrar.");
                }
            } catch (e) { alert("Erro de conexão."); }
        });
    }
});