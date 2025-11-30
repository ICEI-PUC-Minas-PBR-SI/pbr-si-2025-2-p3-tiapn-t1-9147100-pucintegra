// src/controllers/AgendamentoController.js
const AgendamentoModel = require("../models/AgendamentoModel");

const AgendamentoController = {
  /**
   * Cria uma nova solicitação de agendamento + pagamento.
   * Fluxo:
   *  1) Busca valor do serviço
   *  2) Cria agendamento com status 'pendente'
   *  3) Cria registro de pagamento
   *  4) Confirma o agendamento (status 'confirmado')
   */
  async solicitar(req, res) {
    try {
      const {
        id_paciente,
        id_profissional,
        data_hora,
        id_servico,
        metodo_pagamento,
      } = req.body || {};

      if (
        !id_paciente ||
        !id_profissional ||
        !data_hora ||
        !id_servico ||
        !metodo_pagamento
      ) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios faltando." });
      }

      // 1) Buscar o valor do serviço
      const servicoData = await AgendamentoModel.buscarServicoPorId(
        id_servico
      );

      if (!servicoData || servicoData.preco == null) {
        return res.status(404).json({
          error: "Serviço não encontrado ou sem preço definido.",
        });
      }

      const valor = Number(servicoData.preco);

      // 2) Criar solicitação de agendamento (status 'pendente')
      const id_agendamento = await AgendamentoModel.criarSolicitacao({
        id_paciente,
        id_profissional,
        data_hora,
        servico: id_servico, // guarda o ID do serviço
        valor,
      });

      // 3) Criar pagamento (aqui você simula aprovação automática)
      const id_pagamento =
        await AgendamentoModel.criarPagamento(
          id_agendamento,
          valor,
          metodo_pagamento
        );

      // 4) Confirmar agendamento após pagamento "aprovado"
      await AgendamentoModel.confirmarAgendamento(
        id_agendamento,
        id_pagamento
      );

      return res.status(201).json({
        id_agendamento,
        valor,
        status: "confirmado",
        message:
          "Agendamento confirmado e pagamento aprovado com sucesso.",
      });
    } catch (err) {
      console.error(
        "❌ Erro ao solicitar agendamento e processar pagamento:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao processar agendamento e pagamento.",
      });
    }
  },

  /**
   * Lista agendamentos (confirmados/pendentes) de um profissional.
   */
  async listarPorProfissional(req, res) {
    try {
      const { id_profissional } = req.params;

      if (!id_profissional) {
        return res
          .status(400)
          .json({ error: "ID do profissional é obrigatório." });
      }

      const agendamentos =
        await AgendamentoModel.listarAgendamentosDoProfissional(
          Number(id_profissional)
        );

      return res.json(agendamentos);
    } catch (err) {
      console.error(
        "❌ Erro ao listar agendamentos do profissional:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao listar agendamentos.",
      });
    }
  },

  /**
   * Lista agendamentos de um paciente.
   */
  async listarPorPaciente(req, res) {
    try {
      const { id_paciente } = req.params;

      if (!id_paciente) {
        return res
          .status(400)
          .json({ error: "ID do paciente é obrigatório." });
      }

      const agendamentos =
        await AgendamentoModel.listarAgendamentosDoPaciente(
          Number(id_paciente)
        );

      return res.json(agendamentos);
    } catch (err) {
      console.error(
        "❌ Erro ao listar agendamentos do paciente:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao listar agendamentos.",
      });
    }
  },

  /**
   * Busca disponibilidade de um profissional em um intervalo de datas.
   * Espera query: id_profissional, data_inicio, data_fim
   */
  async buscarDisponibilidade(req, res) {
    try {
      const { id_profissional, data_inicio, data_fim } = req.query;

      if (!id_profissional || !data_inicio || !data_fim) {
        return res.status(400).json({
          error:
            "ID do profissional, data de início e data de fim são obrigatórios.",
        });
      }

      const [disponibilidade, agendamentosConfirmados] = await Promise.all(
        [
          AgendamentoModel.buscarDisponibilidade(id_profissional),
          AgendamentoModel.buscarAgendamentosConfirmados(
            id_profissional,
            data_inicio,
            data_fim
          ),
        ]
      );

      if (!disponibilidade) {
        return res.status(404).json({
          error:
            "Profissional não encontrado ou sem disponibilidade definida.",
        });
      }

      return res.json({
        dias_disponiveis: disponibilidade.dias_disponiveis
          .split(",")
          .map((d) => parseInt(d.trim(), 10)), // ex: "1,2,3,4,5" → [1,2,3,4,5]
        hora_inicio: disponibilidade.hora_inicio,
        hora_fim: disponibilidade.hora_fim,
        horarios_ocupados: agendamentosConfirmados.map(
          (a) => a.data_hora
        ),
      });
    } catch (err) {
      console.error(
        "❌ Erro ao buscar disponibilidade:",
        err.message
      );
      return res.status(500).json({
        error: "Erro interno ao buscar disponibilidade.",
      });
    }
  },

  /**
   * Aceitar agendamento (profissional confirma).
   */
  async aceitar(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "confirmado"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou não pôde ser atualizado.",
        });
      }

      return res.json({
        message: "Agendamento aceito/confirmado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao aceitar agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao aceitar agendamento.",
      });
    }
  },

  /**
   * Rejeitar agendamento.
   */
  async rejeitar(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "rejeitado"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou não pôde ser atualizado.",
        });
      }

      return res.json({
        message: "Agendamento rejeitado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao rejeitar agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao rejeitar agendamento.",
      });
    }
  },

  /**
   * Concluir agendamento (após atendimento).
   */
  async concluir(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "concluido"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou não pôde ser atualizado.",
        });
      }

      return res.json({
        message: "Agendamento concluído com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao concluir agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao concluir agendamento.",
      });
    }
  },

  /**
   * Cancelar agendamento (profissional).
   */
  async cancelar(req, res) {
    try {
      const { id_agendamento } = req.params;

      const affectedRows =
        await AgendamentoModel.atualizarStatus(
          id_agendamento,
          "cancelado"
        );

      if (affectedRows === 0) {
        return res.status(404).json({
          error:
            "Agendamento não encontrado ou já processado.",
        });
      }

      return res.json({
        message: "Agendamento cancelado com sucesso.",
      });
    } catch (err) {
      console.error("❌ Erro ao cancelar agendamento:", err.message);
      return res.status(500).json({
        error: "Erro interno ao cancelar agendamento.",
      });
    }
  },
};

module.exports = AgendamentoController;
