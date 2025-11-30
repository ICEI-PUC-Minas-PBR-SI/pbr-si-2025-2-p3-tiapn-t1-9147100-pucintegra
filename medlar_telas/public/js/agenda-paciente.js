document.addEventListener("DOMContentLoaded", () => {
    const appointmentsList = document.getElementById("appointments-list");
    const loggedInUser = {
        id_paciente: 1, // ID simulado do paciente logado
    };

    // Função para buscar agendamentos
    async function fetchAppointments() {
        appointmentsList.innerHTML = "<li>Carregando agendamentos...</li>";
        try {
            const response = await fetch(`/api/agendamentos/paciente/${loggedInUser.id_paciente}`);
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

            const dataHora = new Date(agendamento.data_hora);
            const dataFormatada = dataHora.toLocaleDateString("pt-BR");
            const horaFormatada = dataHora.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
            const valorFormatado = parseFloat(agendamento.valor).toFixed(2).replace('.', ',');

            let statusClass = "";
            let statusText = "";
            let pagamentoInfo = "";

            switch (agendamento.status) {
                case "pendente":
                    statusClass = "status-pending";
                    statusText = "Pendente ⏳";
                    break;
                case "confirmado":
                    statusClass = "status-accepted";
                    statusText = "Confirmado ✅";
                    pagamentoInfo = `<span class="payment-info">Valor: R$ ${valorFormatado} | Pagamento: ${agendamento.status_pagamento === 'aprovado' ? 'Aprovado' : 'Pendente'}</span>`;
                    break;
                case "aceito": // Mantido para compatibilidade com agendamentos antigos
                    statusClass = "status-accepted";
                    statusText = "Aceito ✅";
                    break;
                case "rejeitado":
                    statusClass = "status-rejected";
                    statusText = "Rejeitado ❌";
                    break;
            }

            li.innerHTML = `
                <div class="appointment-details">
                    <span class="appointment-date">${dataFormatada} às ${horaFormatada}</span>
                    <span class="appointment-professional">Profissional: ${agendamento.nome_profissional} (${agendamento.especialidade_profissional})</span>
                    <span class="appointment-service">Serviço: ${agendamento.servico}</span>
                    ${pagamentoInfo}
                </div>
                <div class="appointment-actions">
                    <span class="appointment-status ${statusClass}">${statusText}</span>
                </div>
            `;
            appointmentsList.appendChild(li);
        });
    }

    // Carrega os agendamentos ao iniciar
    fetchAppointments();
});
