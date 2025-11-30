const { pool } = require("../config/db");

module.exports = {
  /**
   * Cria uma nova solicitação de agendamento.
   * @param {object} data - Dados do agendamento.
   * @returns {number} O ID do agendamento inserido.
   */
  async criarSolicitacao(data) {
  const sql = `
    INSERT INTO agendamento (
      id_paciente,
      id_profissional,
      id_servico,
      data_hora,
      status,
      preco_final
    ) VALUES (?, ?, ?, ?, 'pendente', ?)
  `;
  const [result] = await pool.execute(sql, [
    data.id_paciente,
    data.id_profissional,
    data.servico,   // aqui vem o id_servico
    data.data_hora,
    data.valor,     // aqui vem o valor/preço final
  ]);
  return result.insertId;
},
    /**
   * Lista agendamentos do PROFISSIONAL.
   * @param {number} id_profissional - ID do profissional.
   * @returns {Array} Lista de agendamentos.
   */
  async listarAgendamentosDoProfissional(id_profissional) {
    const sql = `
      SELECT
        a.id_agendamento,
        a.data_hora,
        s.nome_servico AS servico,
        a.preco_final AS valor,
        a.status,
        p.nome AS nome_paciente,
        p.email AS email_paciente,
        p.telefone AS telefone_paciente,
        pmt.status_pagamento,
        pmt.data_pagamento
      FROM agendamento a
      JOIN paciente p ON a.id_paciente = p.id_paciente
      JOIN servico s ON a.id_servico = s.id_servico
      LEFT JOIN pagamento pmt ON pmt.id_agendamento = a.id_agendamento
      WHERE a.id_profissional = ?
      ORDER BY a.data_hora DESC
    `;
    const [rows] = await pool.query(sql, [id_profissional]);
    return rows;
  },

  /**
   * Lista agendamentos do PACIENTE.
   * @param {number} id_paciente - ID do paciente.
   * @returns {Array} Lista de agendamentos.
   */
  async listarAgendamentosDoPaciente(id_paciente) {
    const sql = `
      SELECT
        a.id_agendamento,
        a.data_hora,
        s.nome_servico AS servico,
        a.preco_final AS valor,
        a.status,
        pr.nome AS nome_profissional,
        pr.especialidade AS especialidade_profissional,
        pmt.status_pagamento,
        pmt.data_pagamento
      FROM agendamento a
      JOIN profissional pr ON a.id_profissional = pr.id_profissional
      JOIN servico s ON a.id_servico = s.id_servico
      LEFT JOIN pagamento pmt ON pmt.id_agendamento = a.id_agendamento
      WHERE a.id_paciente = ?
      ORDER BY a.data_hora DESC
    `;
    const [rows] = await pool.query(sql, [id_paciente]);
    return rows;
  },



  /**
   * Atualiza o status de um agendamento.
  * @param {number} id_agendamento - ID do agendamento.
  * @param {string} status - Novo status (pendente, confirmado, concluido, cancelado, etc).
  * @returns {number} Número de linhas afetadas.
  */
  async atualizarStatus(id_agendamento, status) {
    const sql = `
      UPDATE agendamento
      SET status = ?
      WHERE id_agendamento = ?
    `;
    const [result] = await pool.execute(sql, [status, id_agendamento]);
    return result.affectedRows;
  },

  /**
   * Cria um registro de pagamento para um agendamento.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} valor - Valor do pagamento.
   * @param {string} metodo_pagamento - Método de pagamento.
   * @returns {number} O ID do pagamento inserido.
   */
  async criarPagamento(id_agendamento, valor, metodo_pagamento) {
    const sql = `
      INSERT INTO pagamento (id_agendamento, valor, metodo_pagamento, status_pagamento, data_pagamento, id_transacao_externa)
      VALUES (?, ?, ?, 'aprovado', NOW(), ?)
    `;
    // Simulação de ID de transação externa
    const id_transacao_externa = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const [result] = await pool.execute(sql, [id_agendamento, valor, metodo_pagamento, id_transacao_externa]);
    return result.insertId;
  },

  /**
   * Atualiza o agendamento com o ID do pagamento e muda o status para 'confirmado'.
   * @param {number} id_agendamento - ID do agendamento.
   * @param {number} id_pagamento - ID do pagamento.
   * @returns {number} Número de linhas afetadas.
   */
  async confirmarAgendamento(id_agendamento, id_pagamento) {
    const sql = `
      UPDATE agendamento
      SET id_pagamento = ?, status = 'confirmado'
      WHERE id_agendamento = ?
    `;
    const [result] = await pool.execute(sql, [id_pagamento, id_agendamento]);
    return result.affectedRows;
  },

  /**
   * Busca a disponibilidade de um profissional.
   * @param {number} id_profissional - ID do profissional.
   * @returns {object} Objeto com dias e horários disponíveis.
   */
  async buscarDisponibilidade(id_profissional) {
    const sql = `
      SELECT dias_disponiveis, hora_inicio, hora_fim
      FROM profissional
      WHERE id_profissional = ?
    `;
    const [rows] = await pool.query(sql, [id_profissional]);
    return rows[0];
  },

  /**
   * Busca agendamentos confirmados para um profissional em um período.
   * @param {number} id_profissional - ID do profissional.
   * @param {string} data_inicio - Data de início (YYYY-MM-DD).
   * @param {string} data_fim - Data de fim (YYYY-MM-DD).
   * @returns {Array} Lista de agendamentos confirmados.
   */
  async buscarAgendamentosConfirmados(id_profissional, data_inicio, data_fim) {
    const sql = `
      SELECT data_hora
      FROM agendamento
      WHERE id_profissional = ?
        AND status = 'confirmado'
        AND data_hora BETWEEN ? AND ?
    `;
    const [rows] = await pool.query(sql, [id_profissional, data_inicio, data_fim]);
    return rows;
  }
};

// Adicionando a função de busca de serviço para obter o valor
module.exports.buscarServicoPorId = async (id_servico) => {
  const sql = `
    SELECT preco
    FROM servico
    WHERE id_servico = ?
  `;
  const [rows] = await pool.query(sql, [id_servico]);
  return rows[0];
};

// Reorganizando as exportações para incluir as novas funções
module.exports = {
  ...module.exports,
  criarSolicitacao: module.exports.criarSolicitacao,
  buscarPorProfissional: module.exports.buscarPorProfissional,
  buscarPorPaciente: module.exports.buscarPorPaciente,
  atualizarStatus: module.exports.atualizarStatus,
  criarPagamento: module.exports.criarPagamento,
  confirmarAgendamento: module.exports.confirmarAgendamento,
  buscarDisponibilidade: module.exports.buscarDisponibilidade,
  buscarAgendamentosConfirmados: module.exports.buscarAgendamentosConfirmados,
  buscarServicoPorId: module.exports.buscarServicoPorId,
};
