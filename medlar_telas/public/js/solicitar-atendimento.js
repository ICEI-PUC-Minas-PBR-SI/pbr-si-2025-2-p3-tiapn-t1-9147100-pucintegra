document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".appointment-form");
    const profissionalInput = document.getElementById("profissional");
    const servicoSelect = document.getElementById("servico");
    const valorServicoP = document.getElementById("valor-servico");
    const dataInput = document.getElementById("data");
    const horarioSelect = document.getElementById("horario");
    const metodoPagamentoSelect = document.getElementById("metodo_pagamento");

    let id_profissional = null;
    let nome_profissional = null;
    let servicosDisponiveis = [];

    // Simulação de dados do usuário logado (Paciente)
    // Em um sistema real, isso viria de um token de sessão
    const loggedInUser = {
        id_paciente: 1, // ID simulado do paciente logado
        nome: "Paciente Teste",
    };

    // --- Funções de Inicialização ---

    function init() {
        const urlParams = new URLSearchParams(window.location.search);
        id_profissional = urlParams.get("prof_id");
        nome_profissional = urlParams.get("prof_nome");

        if (nome_profissional) {
            profissionalInput.value = decodeURIComponent(nome_profissional);
            profissionalInput.setAttribute("data-id", id_profissional);
        } else {
            profissionalInput.value = "Selecione um profissional na tela de busca";
        }

        // Definir a data mínima como hoje
        const today = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', today);

        carregarServicos();
        // Adicionar listeners após carregar serviços
        servicoSelect.addEventListener("change", atualizarValorServico);
        dataInput.addEventListener("change", carregarDisponibilidade);
    }

    // --- Funções de API ---

    async function carregarServicos() {
        try {
            const response = await fetch("/api/servicos");
            if (!response.ok) throw new Error("Falha ao carregar serviços.");
            servicosDisponiveis = await response.json();

            servicoSelect.innerHTML = '<option value="" disabled selected>Selecione um serviço</option>';
            servicosDisponiveis.forEach(servico => {
                const option = document.createElement("option");
                option.value = servico.id_servico;
                option.textContent = `${servico.nome} (R$ ${parseFloat(servico.preco).toFixed(2).replace('.', ',')})`;
                servicoSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
            alert("Erro ao carregar a lista de serviços.");
        }
    }

    async function carregarDisponibilidade() {
        const dataSelecionada = dataInput.value;
        if (!id_profissional || !dataSelecionada) return;

        // Calcula o início e fim do dia para a busca
        const dataInicio = `${dataSelecionada}T00:00:00`;
        const dataFim = `${dataSelecionada}T23:59:59`;

        try {
            const response = await fetch(`/api/agendamentos/disponibilidade?id_profissional=${id_profissional}&data_inicio=${dataInicio}&data_fim=${dataFim}`);
            if (!response.ok) throw new Error("Falha ao carregar disponibilidade.");
            const { dias_disponiveis, hora_inicio, hora_fim, horarios_ocupados } = await response.json();

            // 1. Verificar se o dia da semana está disponível
            const diaSemana = new Date(dataSelecionada).getDay(); // 0=Dom, 1=Seg...
            // O backend usa 1=Seg, 5=Sex. Ajustar para 0=Dom, 6=Sab
            const diaSemanaAjustado = diaSemana === 0 ? 7 : diaSemana; 

            if (!dias_disponiveis.includes(diaSemanaAjustado)) {
                horarioSelect.innerHTML = '<option value="" disabled selected>Profissional não atende neste dia.</option>';
                return;
            }

            // 2. Gerar horários (simulando slots de 30 minutos)
            const slots = gerarSlots(hora_inicio, hora_fim, 30);
            
            // 3. Filtrar horários ocupados
            const horariosOcupadosFormatados = horarios_ocupados.map(dt => new Date(dt).toTimeString().substring(0, 5));
            
            horarioSelect.innerHTML = '<option value="" disabled selected>Selecione um horário</option>';
            slots.forEach(slot => {
                if (!horariosOcupadosFormatados.includes(slot)) {
                    const option = document.createElement("option");
                    option.value = slot;
                    option.textContent = slot;
                    horarioSelect.appendChild(option);
                }
            });

            if (horarioSelect.options.length === 1) {
                horarioSelect.innerHTML = '<option value="" disabled selected>Nenhum horário disponível neste dia.</option>';
            }

        } catch (error) {
            console.error("Erro ao carregar disponibilidade:", error);
            horarioSelect.innerHTML = '<option value="" disabled selected>Erro ao carregar horários.</option>';
        }
    }

    // --- Funções de Utilidade ---

    function atualizarValorServico() {
        const idServico = servicoSelect.value;
        const servico = servicosDisponiveis.find(s => s.id_servico == idServico);
        if (servico) {
            valorServicoP.textContent = `Valor: R$ ${parseFloat(servico.preco).toFixed(2).replace('.', ',')}`;
        } else {
            valorServicoP.textContent = '';
        }
    }

    function gerarSlots(inicio, fim, intervaloMinutos) {
        const slots = [];
        let [hInicio, mInicio] = inicio.split(':').map(Number);
        let [hFim, mFim] = fim.split(':').map(Number);

        let currentTime = new Date(0, 0, 0, hInicio, mInicio);
        const endTime = new Date(0, 0, 0, hFim, mFim);

        while (currentTime < endTime) {
            const hora = String(currentTime.getHours()).padStart(2, '0');
            const minuto = String(currentTime.getMinutes()).padStart(2, '0');
            slots.push(`${hora}:${minuto}`);
            
            currentTime.setMinutes(currentTime.getMinutes() + intervaloMinutos);
        }
        return slots;
    }

    // --- Evento de Submissão ---

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!id_profissional) {
            alert("Por favor, selecione um profissional na tela de busca.");
            return;
        }

        const id_servico = servicoSelect.value;
        const data = dataInput.value;
        const horario = horarioSelect.value;
        const metodo_pagamento = metodoPagamentoSelect.value;

        if (!id_servico || !data || !horario || !metodo_pagamento) {
            alert("Por favor, preencha todos os campos de agendamento e pagamento.");
            return;
        }

        const dataHora = `${data} ${horario}:00`;

        const payload = {
            id_paciente: loggedInUser.id_paciente,
            id_profissional: parseInt(id_profissional),
            id_servico: parseInt(id_servico),
            data_hora: dataHora,
            metodo_pagamento: metodo_pagamento,
        };

        try {
            const response = await fetch("/api/agendamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Agendamento confirmado para ${nome_profissional} em ${data} às ${horario}! Valor pago: R$ ${parseFloat(result.valor).toFixed(2).replace('.', ',')}. Status: ${result.status}.`);
                window.location.href = "/public/html/agenda-paciente.html"; // Redireciona para a agenda do paciente
            } else {
                alert(`Erro ao agendar: ${result.error}`);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro de conexão ao tentar agendar.");
        }
    });

    init();
});
