const AgendamentoModel = require("../models/AgendamentoModel");

module.exports = {
  /**
   * Cria uma nova solicitação de agendamento (pré-pagamento).
   * O agendamento é criado com status 'pendente' e o pagamento é processado.
   */
  async solicitar(req, res) {
    try {
      const { id_paciente, id_profissional, data_hora, id_servico, metodo_pagamento } = req.body;

      if (!id_paciente || !id_profissional || !data_hora || !id_servico || !metodo_pagamento) {
        return res.status(400).json({ error: "Campos obrigatórios faltando." });
      }

      // 1. Buscar o valor do serviço
      const servicoData = await AgendamentoModel.buscarServicoPorId(id_servico);
      if (!servicoData || !servicoData.preco) {
        return res.status(404).json({ error: "Serviço não encontrado ou sem preço definido." });
      }
      const valor = servicoData.preco;

      // 2. Criar a solicitação de agendamento (status 'pendente')
      const id_agendamento = await AgendamentoModel.criarSolicitacao({
        id_paciente,
        id_profissional,
        data_hora,
        servico: id_servico, // Armazenando o ID do serviço
        valor,
      });

      // 3. Simular o processamento do pagamento
      // Em um ambiente real, aqui seria a integração com um gateway de pagamento (Stripe, PagSeguro, etc.)
      const id_pagamento = await AgendamentoModel.criarPagamento(id_agendamento, valor, metodo_pagamento);

      // 4. Confirmar o agendamento após o pagamento ser 'aprovado'
      await AgendamentoModel.confirmarAgendamento(id_agendamento, id_pagamento);

      res.status(201).json({
        id_agendamento,
        valor,
        status: "confirmado",
        message: "Agendamento confirmado e pagamento aprovado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao solicitar agendamento e processar pagamento:", err.message);
      res.status(500).json({ error: "Erro interno ao processar agendamento e pagamento." });
    }
  },

  /**
   * Lista agendamentos (confirmados e pendentes) para um profissional.
   */
  async listarPorProfissional(req, res) {
    try {
      const { id_profissional } = req.params;

      if (!id_profissional) {
        return res.status(400).json({ error: "ID do profissional é obrigatório." });
      }

      const agendamentos = await AgendamentoModel.buscarPorProfissional(id_profissional);
      res.json(agendamentos);
    } catch (err) {
      console.error("❌ Erro ao listar agendamentos do profissional:", err.message);
      res.status(500).json({ error: "Erro interno ao listar agendamentos." });
    }
  },

  /**
   * Lista agendamentos de um paciente.
   */
  async listarPorPaciente(req, res) {
    try {
      const { id_paciente } = req.params;

      if (!id_paciente) {
        return res.status(400).json({ error: "ID do paciente é obrigatório." });
      }

      const agendamentos = await AgendamentoModel.buscarPorPaciente(id_paciente);
      res.json(agendamentos);
    } catch (err) {
      console.error("❌ Erro ao listar agendamentos do paciente:", err.message);
      res.status(500).json({ error: "Erro interno ao listar agendamentos." });
    }
  },

  /**
   * Busca a disponibilidade de um profissional.
   */
  async buscarDisponibilidade(req, res) {
    try {
      const { id_profissional, data_inicio, data_fim } = req.query;

      if (!id_profissional || !data_inicio || !data_fim) {
        return res.status(400).json({ error: "ID do profissional, data de início e data de fim são obrigatórios." });
      }

      const [disponibilidade, agendamentosConfirmados] = await Promise.all([
        AgendamentoModel.buscarDisponibilidade(id_profissional),
        AgendamentoModel.buscarAgendamentosConfirmados(id_profissional, data_inicio, data_fim),
      ]);

      if (!disponibilidade) {
        return res.status(404).json({ error: "Profissional não encontrado ou sem disponibilidade definida." });
      }

      // Retorna a disponibilidade base e os horários já ocupados
      res.json({
        dias_disponiveis: disponibilidade.dias_disponiveis.split(',').map(d => parseInt(d.trim())), // Ex: [1, 2, 3, 4, 5]
        hora_inicio: disponibilidade.hora_inicio, // Ex: "09:00:00"
        hora_fim: disponibilidade.hora_fim, // Ex: "18:00:00"
        horarios_ocupados: agendamentosConfirmados.map(a => a.data_hora), // Lista de DATETIME de agendamentos confirmados
      });
    } catch (err) {
      console.error("❌ Erro ao buscar disponibilidade:", err.message);
      res.status(500).json({ error: "Erro interno ao buscar disponibilidade." });
    }
  },

  /**
   * As funções aceitar e rejeitar não são mais necessárias para o fluxo de pré-pagamento,
   * mas as mantemos para compatibilidade ou para um fluxo de agendamento sem pagamento.
   * No novo fluxo, o status é 'confirmado' após o pagamento.
   */
  async aceitar(req, res) {
    try {
      const { id_agendamento } = req.params;
      const affectedRows = await AgendamentoModel.atualizarStatus(id_agendamento, "aceito");
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Agendamento não encontrado ou já processado." });
      }
      res.json({ message: "Agendamento aceito com sucesso." });
    } catch (err) {
      console.error("❌ Erro ao aceitar agendamento:", err.message);
      res.status(500).json({ error: "Erro interno ao aceitar agendamento." });
    }
  },

  async rejeitar(req, res) {
    try {
      const { id_agendamento } = req.params;
      const affectedRows = await AgendamentoModel.atualizarStatus(id_agendamento, "rejeitado");
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Agendamento não encontrado ou já processado." });
      }
      res.json({ message: "Agendamento rejeitado com sucesso." });
    } catch (err) {
      console.error("❌ Erro ao rejeitar agendamento:", err.message);
      res.status(500).json({ error: "Erro interno ao rejeitar agendamento." });
    }
  },
};
