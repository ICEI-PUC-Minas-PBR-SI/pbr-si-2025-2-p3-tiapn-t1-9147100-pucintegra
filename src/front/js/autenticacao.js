// Envolvemos todo o código em 'DOMContentLoaded' para garantir que o HTML foi carregado
document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const cpfInput = document.getElementById('cpf');
    const matriculaInput = document.getElementById('matricula');

    /**
     * Função central que lê o hash da URL e atualiza a interface.
     */
    const updateStateFromHash = () => {
        if (window.location.hash === '#register') {
            container.classList.add('active');
        } else {
            // Padrão é a tela de login (se for #login ou hash vazio)
            container.classList.remove('active');
        }
    };

    // --- LÓGICA DE TOGGLE (MODIFICADA) ---

    // 1. Botão de Registrar: agora apenas muda o hash
    registerBtn.addEventListener('click', () => {
        window.location.hash = 'register';
    });

    // 2. Botão de Login: agora apenas muda o hash
    loginBtn.addEventListener('click', () => {
        window.location.hash = 'login';
    });

    // 3. Ouvinte de Hash:
    // Isso é acionado quando o hash muda (pelos cliques acima OU pelos botões "voltar/avançar" do navegador)
    window.addEventListener('hashchange', updateStateFromHash);

    // 4. Estado Inicial:
    // Verifica o hash assim que a página é carregada
    updateStateFromHash();


    // --- LÓGICA DE MÁSCARA (MANTIDA) ---

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
            let value = matriculaInput.value.replace(/\D/g, '');
            value = value.slice(0, 6); // Limita a matrícula a 6 dígitos
            matriculaInput.value = value;
        });
    }

});