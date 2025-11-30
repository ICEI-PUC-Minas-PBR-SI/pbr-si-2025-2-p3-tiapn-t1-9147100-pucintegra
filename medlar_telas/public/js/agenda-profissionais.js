document.addEventListener("DOMContentLoaded", () => {
    const appointmentsList = document.getElementById("appointments-list");
    // O ID do profissional logado deve ser obtido de forma segura, por exemplo, de um cookie ou localStorage após o login.
    // Por enquanto, vamos simular a obtenção de um ID de usuário logado.
    const loggedInUser = {
        id_profissional: localStorage.getItem('user_id') || 2, // Tenta obter o ID do localStorage, senão usa 2 como fallback
    };

    // Função para buscar agendamentos
    async function fetchAppointments() {
        appointmentsList.innerHTML = "<li>Carregando agendamentos...</li>";
        try {
            const response = await fetch(`/api/agendamentos/profissional/${loggedInUser.id_profissional}`);
            const agendamentos = await response.json();

            if (response.ok) {
                renderAppointments(agendamentos);
            } else {
                appointmentsList.innerHTML = `<li>Erro ao carregar agendamentos: ${agendamentos.error}</li>`;
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
            appointmentsList.innerHTML = "<li>Erro de conexão ao buscar agendamentos.</li>";
        }
    }

    // Função para renderizar os agendamentos
    function renderAppointments(agendamentos) {
        appointmentsList.innerHTML = "";

        if (agendamentos.length === 0) {
            appointmentsList.innerHTML = "<li>Nenhum agendamento encontrado.</li>";
            return;
        }

        agendamentos.forEach(agendamento => {
            const li = document.createElement("li");
            li.classList.add("appointment-item");
            li.setAttribute("data-id", agendamento.id_agendamento);

            const dataHora = new Date(agendamento.data_hora);
            const dataFormatada = dataHora.toLocaleDateString("pt-BR");
            const horaFormatada = dataHora.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
            const valorFormatado = parseFloat(agendamento.valor).toFixed(2).replace('.', ',');

            let statusClass = "";
            let statusText = "";
            let actions = "";
            let pagamentoInfo = "";

            switch (agendamento.status) {
                case "pendente":
                    statusClass = "status-pending";
                    statusText = "Pendente (Sem Pagamento)";
                    actions = `
                        <button class="btn-accept" data-id="${agendamento.id_agendamento}">Aceitar</button>
                        <button class="btn-reject" data-id="${agendamento.id_agendamento}">Rejeitar</button>
                    `;
                    break;
                case "confirmado":
                    statusClass = "status-accepted";
                    statusText = "Confirmado ✅";
                    pagamentoInfo = `<span class="payment-info">Valor: R$ ${valorFormatado} | Pagamento: ${agendamento.status_pagamento === 'aprovado' ? 'Aprovado' : 'Pendente'}</span>`;
                    break;
                case "aceito":
                    statusClass = "status-accepted";
                    statusText = "Aceito (Pré-Pagamento)";
                    break;
                case "rejeitado":
                    statusClass = "status-rejected";
                    statusText = "Rejeitado ❌";
                    break;
            }

            li.innerHTML = `
                <div class="appointment-details">
                    <span class="appointment-date">${dataFormatada} às ${horaFormatada}</span>
                    <span class="appointment-patient">Paciente: ${agendamento.nome_paciente} (${agendamento.email_paciente})</span>
                    <span class="appointment-service">Serviço: ${agendamento.servico}</span>
                    ${pagamentoInfo}
                </div>
                <div class="appointment-actions">
                    <span class="appointment-status ${statusClass}">${statusText}</span>
                    ${actions}
                </div>
            `;
            appointmentsList.appendChild(li);
        });

        // Adiciona eventos de aceitar/rejeitar (apenas para status 'pendente' sem pagamento)
        document.querySelectorAll(".btn-accept").forEach(btn => {
            btn.addEventListener("click", () => updateAppointmentStatus(btn.dataset.id, "aceitar"));
        });
        document.querySelectorAll(".btn-reject").forEach(btn => {
            btn.addEventListener("click", () => updateAppointmentStatus(btn.dataset.id, "rejeitar"));
        });
    }

    // Função para atualizar o status do agendamento (apenas para o fluxo sem pagamento)
    async function updateAppointmentStatus(id_agendamento, action) {
        try {
            const response = await fetch(`/api/agendamentos/${action}/${id_agendamento}`, {
                method: "PUT",
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Agendamento ${action} com sucesso!`);
                fetchAppointments(); // Recarrega a lista
            } else {
                alert(`Erro ao ${action} agendamento: ${result.error}`);
            }
        } catch (error) {
            console.error(`Erro ao ${action} agendamento:`, error);
            alert("Erro de conexão ao tentar atualizar o agendamento.");
        }
    }

    // Carrega os agendamentos ao iniciar
    fetchAppointments();
});
