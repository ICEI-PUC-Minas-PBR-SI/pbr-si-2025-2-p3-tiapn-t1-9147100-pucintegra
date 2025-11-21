// autenticacao.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CAPTURA DE ELEMENTOS DA INTERFACE ---
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const cpfInput = document.getElementById('cpf');
    const matriculaInput = document.getElementById('matricula');

    // Captura dos formulários
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    // --- 2. LÓGICA DE TOGGLE VISUAL (LOGIN/CADASTRO) ---
    const updateStateFromHash = () => {
        if (window.location.hash === '#register') {
            container.classList.add('active');
            // Garante visibilidade durante a transição (conforme correção anterior)
            document.querySelector('.form-box.register').style.visibility = 'visible';
            document.querySelector('.form-box.login').style.visibility = 'hidden';
        } else {
            container.classList.remove('active');
            document.querySelector('.form-box.register').style.visibility = 'hidden';
            document.querySelector('.form-box.login').style.visibility = 'visible';
        }
    };

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.hash = 'register';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.hash = 'login';
        });
    }

    window.addEventListener('hashchange', updateStateFromHash);
    updateStateFromHash();


    // --- 3. INTEGRAÇÃO BACK-END: CADASTRO (Processo 1) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            // Captura de Dados: Usando querySelectorAll para pegar os inputs na ordem
            const inputs = registerForm.querySelectorAll('.input-box input');
            
            const nome = inputs[0].value;
            const cpf = inputs[1].value;
            const matricula = inputs[2].value;
            const email = inputs[3].value;
            const senha = inputs[4].value;
            const confirmarSenha = inputs[5].value; 
            
            // Captura do Tipo de Usuário (radio button)
            const tipoUsuarioInput = registerForm.querySelector('input[name="tipo_usuario"]:checked');
            const tipo_usuario = tipoUsuarioInput ? (tipoUsuarioInput.value === 'aluno' ? 'Aluno' : 'Professor') : '';
            
            // Validações Front-end
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem. Por favor, verifique.');
                return; 
            }
            if (!tipo_usuario) {
                alert('Selecione o Tipo de Usuário.');
                return;
            }

            const userData = {
                nome: nome,
                cpf: cpf.replace(/\D/g, ''), // Remove máscara
                matricula: matricula,
                email: email,
                senha: senha,
                tipo_usuario: tipo_usuario
            };
            
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Cadastro de ${data.userId} realizado com sucesso! Faça login.`);
                    // Redireciona para login após sucesso
                    window.location.hash = 'login';
                } else {
                    alert(`Erro no Cadastro: ${data.message || 'Ocorreu um erro desconhecido.'}`);
                }
            } catch (error) {
                console.error('Erro de rede/comunicação:', error);
                alert('Erro de comunicação com o servidor. Verifique se o Node.js está ativo.');
            }
        });
    }


    // --- 4. INTEGRAÇÃO BACK-END: LOGIN (Processo 2) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            
            // Captura de Dados: Usando querySelectorAll para pegar os inputs
            const inputs = loginForm.querySelectorAll('.input-box input');
            const email = inputs[0].value;
            const senha = inputs[1].value;
            
            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, senha: senha })
                });

                const data = await response.json();

                if (response.ok) {
                    // ** LÓGICA DE SUCESSO: SALVAR STATUS DE AUTENTICAÇÃO **
                    localStorage.setItem('userMatricula', data.user.matricula); 
                    localStorage.setItem('userType', data.user.tipo); 

                    alert(`Login de ${data.user.nome} (${data.user.tipo}) realizado com sucesso!`);
                    
                    // Redireciona para a tela principal (homepage.html)
                    window.location.href = '/html/homepage.html'; 
                    
                } else {
                    alert(`Erro no Login: ${data.message || 'Verifique suas credenciais.'}`);
                }
            } catch (error) {
                console.error('Erro de rede/servidor:', error);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
    
    // --- 5. LÓGICA DE MÁSCARA (Ajustar IDs e nomes de variáveis se necessário) ---

    if (cpfInput) {
        cpfInput.addEventListener('input', () => {
            let value = cpfInput.value.replace(/\D/g, '');
            value = value.slice(0, 11);

            if (value.length > 3) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
            }
            if (value.length > 6) {
                value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            }
            if (value.length > 9) {
                value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
            }
            cpfInput.value = value;
        });
    }

    if (matriculaInput) {
        matriculaInput.addEventListener('input', () => {
            let value = matriculaInput.value.replace(/[^a-zA-Z0-9]/g, ''); 
            matriculaInput.value = value.slice(0, 15);
        });
    }
});

// ==========================================================
// FUNÇÃO DE LOGOUT (Deve ser chamada por um botão no Header/Perfil)
// ==========================================================
function logout() {
    localStorage.removeItem('userMatricula');
    localStorage.removeItem('userType');
    // Redireciona de volta para a tela de login
    window.location.href = '/html/autenticacao.html#login'; 
}