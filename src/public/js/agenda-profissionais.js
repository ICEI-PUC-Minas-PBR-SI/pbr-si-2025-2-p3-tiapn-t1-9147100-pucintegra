document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("appointments-body");
    const messageEl = document.getElementById("appointments-message");

    const API_BASE = "http://localhost:3000";

    // pega dados salvos no login
    const storedUser = localStorage.getItem("medlar_user");
    let idProfissional = null;

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user && user.tipo === "profissional" && user.id) {
                idProfissional = user.id;
            }
        } catch (e) {
            console.warn("Erro ao ler medlar_user:", e);
        }
    }

    if (!idProfissional) {
        idProfissional = localStorage.getItem("user_id") || 1;
    }

    const loggedInUser = {
        id_profissional: idProfissional,
    };

    // ---------------------------------------------------
    // Buscar agendamentos do profissional
    // ---------------------------------------------------
    async function fetchAppointments() {
        tbody.innerHTML = "";
        messageEl.textContent = "Carregando agendamentos...";

        try {
            const url = `${API_BASE}/api/agendamentos/profissional/${loggedInUser.id_profissional}`;
            console.log("Buscando agendamentos em:", url);

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                renderAppointments(data);
            } else {
                console.error("Erro da API:", data);
                messageEl.textContent = data.error || "Erro ao carregar agendamentos.";
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
            messageEl.textContent = "Erro de conexão ao buscar agendamentos.";
        }
    }

    // ---------------------------------------------------
    // Renderiza em formato de tabela
    // ---------------------------------------------------
    function renderAppointments(agendamentos) {
    const tbody = document.getElementById("appointments-body");
    const messageEl = document.getElementById("appointments-message");

    tbody.innerHTML = "";

    if (!agendamentos || agendamentos.length === 0) {
        messageEl.textContent = "Nenhum agendamento encontrado.";
        return;
    }

    messageEl.textContent = "";

    agendamentos.forEach((agendamento) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", agendamento.id_agendamento);

        const dataHora = new Date(agendamento.data_hora);
        const dataFormatada = dataHora.toLocaleDateString("pt-BR");
        const horaFormatada = dataHora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const valorFormatado = parseFloat(agendamento.valor || 0)
            .toFixed(2)
            .replace(".", ",");

        let statusClass = "";
        let statusText = "";
        let pagamentoText = "";
        let actionsHtml = "";

        switch (agendamento.status) {
            case "pendente":
                statusClass = "status-badge status-pending";
                statusText = "Pendente";
                pagamentoText = agendamento.status_pagamento || "-";
                actionsHtml = `
                    <div class="actions-container">
                        <button class="action-btn btn-details" data-id="${agendamento.id_agendamento}">Detalhes</button>
                        <button class="action-btn btn-done" data-id="${agendamento.id_agendamento}">Concluir</button>
                        <button class="action-btn btn-cancel" data-id="${agendamento.id_agendamento}">Cancelar</button>
                    </div>
                `;
                break;

            case "confirmado":
                statusClass = "status-badge status-accepted";
                statusText = "Confirmado";
                pagamentoText = agendamento.status_pagamento === "aprovado" ? "Aprovado" : "Pendente";
                actionsHtml = `
                    <div class="actions-container">
                        <button class="action-btn btn-details" data-id="${agendamento.id_agendamento}">Detalhes</button>
                        <button class="action-btn btn-done" data-id="${agendamento.id_agendamento}">Concluir</button>
                        <button class="action-btn btn-cancel" data-id="${agendamento.id_agendamento}">Cancelar</button>
                    </div>
                `;
                break;

            case "concluido":
                statusClass = "status-badge status-accepted";
                statusText = "Concluído";
                pagamentoText = "Pago";
                actionsHtml = `
                    <div class="actions-container">
                        <button class="action-btn btn-details" data-id="${agendamento.id_agendamento}">Detalhes</button>
                    </div>
                `;
                break;

            case "cancelado":
            case "rejeitado":
                statusClass = "status-badge status-rejected";
                statusText = "Cancelado / Rejeitado";
                pagamentoText = "-";
                actionsHtml = `
                    <div class="actions-container">
                        <button class="action-btn btn-details" data-id="${agendamento.id_agendamento}">Detalhes</button>
                    </div>
                `;
                break;

            default:
                statusClass = "status-badge status-pending";
                statusText = agendamento.status || "Status não informado";
                pagamentoText = agendamento.status_pagamento || "-";
                actionsHtml = `
                    <div class="actions-container">
                        <button class="action-btn btn-details" data-id="${agendamento.id_agendamento}">Detalhes</button>
                    </div>
                `;
                break;
        }

        tr.innerHTML = `
            <td>${dataFormatada}<br><small>${horaFormatada}</small></td>
            <td>
                <strong>${agendamento.nome_paciente}</strong><br>
                <small>${agendamento.email_paciente}</small>
            </td>
            <td>${agendamento.servico}</td>
            <td>R$ ${valorFormatado}</td>
            <td>${pagamentoText}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>${actionsHtml}</td>
        `;

        tbody.appendChild(tr);
    });

    // Detalhes
    document.querySelectorAll(".btn-details").forEach((btn) => {
        btn.addEventListener("click", () => {
            const row = btn.closest("tr");
            const nome = row.children[1].innerText.split("\n")[0].trim();
            const email = row.children[1].innerText.split("\n")[1]?.trim();
            const servico = row.children[2].innerText.trim();
            const dataHora = row.children[0].innerText.trim();

            alert(
                `Detalhes da consulta:\n\n` +
                `Paciente: ${nome}\n` +
                `E-mail: ${email}\n` +
                `Serviço: ${servico}\n` +
                `Data/Hora: ${dataHora}`
            );
        });
    });

    // Concluir
    document.querySelectorAll(".btn-done").forEach((btn) => {
        btn.addEventListener("click", () =>
            updateAppointmentStatus(btn.dataset.id, "concluir")
        );
    });

    // Cancelar Consulta
    document.querySelectorAll(".btn-cancel").forEach((btn) => {
        btn.addEventListener("click", () =>
            updateAppointmentStatus(btn.dataset.id, "cancelar")
        );
    });
}

    // ---------------------------------------------------
    // Atualizar status (aceitar/rejeitar)
    // ---------------------------------------------------
    async function updateAppointmentStatus(id_agendamento, action) {
        try {
            const response = await fetch(
                `${API_BASE}/api/agendamentos/${action}/${id_agendamento}`,
                { method: "PUT" }
            );

            const result = await response.json();

            if (response.ok) {
                alert(`Agendamento ${action} com sucesso!`);
                fetchAppointments();
            } else {
                alert(`Erro ao ${action} agendamento: ${result.error || "Erro desconhecido"}`);
            }
        } catch (error) {
            console.error(`Erro ao ${action} agendamento:`, error);
            alert("Erro de conexão ao tentar atualizar o agendamento.");
        }
    }

    // inicia
    fetchAppointments();
});
