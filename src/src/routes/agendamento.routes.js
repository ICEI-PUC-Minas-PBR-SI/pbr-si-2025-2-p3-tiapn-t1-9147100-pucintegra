// src/routes/agendamento.routes.js
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

/**
 * ==========================================================
 * GET /api/agendamentos/disponibilidade
 * params (query): id_profissional, data_inicio, data_fim
 * Usado na tela de solicitar atendimento
 * ==========================================================
 */
router.get("/disponibilidade", async (req, res) => {
  try {
    const { id_profissional, data_inicio, data_fim } = req.query;

    if (!id_profissional || !data_inicio || !data_fim) {
      return res.status(400).json({
        error:
          "id_profissional, data_inicio e data_fim são obrigatórios.",
      });
    }

    const [rows] = await pool.query(
      `
      SELECT data_hora
        FROM agendamento
       WHERE id_profissional = ?
         AND data_hora BETWEEN ? AND ?
         AND status IN ('pendente', 'confirmado')
      `,
      [id_profissional, data_inicio, data_fim]
    );

    const horarios_ocupados = rows.map((r) => r.data_hora);

    res.json({
      dias_disponiveis: [1, 2, 3, 4, 5, 6], // seg a sáb
      hora_inicio: "07:00",
      hora_fim: "19:00",
      horarios_ocupados,
    });
  } catch (err) {
    console.error("❌ Erro na disponibilidade:", err);
    res.status(500).json({ error: "Erro ao buscar disponibilidade." });
  }
});

/**
 * ==========================================================
 * GET /api/agendamentos/profissional/:id_profissional
 * Usado em agenda-profissionais.html
 * ==========================================================
 */
router.get("/profissional/:id_profissional", async (req, res) => {
  try {
    const { id_profissional } = req.params;

    if (!id_profissional) {
      return res
        .status(400)
        .json({ error: "ID do profissional é obrigatório." });
    }

    const [rows] = await pool.query(
      `
      SELECT 
        a.id_agendamento,
        a.data_hora,
        a.status,
        a.preco_final       AS valor,

        -- nomes esperados no JS da agenda do profissional
        p.nome              AS nome_paciente,
        p.email             AS email_paciente,

        s.nome_servico      AS servico
      FROM agendamento a
      JOIN paciente  p ON p.id_paciente  = a.id_paciente
      JOIN servico   s ON s.id_servico   = a.id_servico
      WHERE a.id_profissional = ?
      ORDER BY a.data_hora ASC
      `,
      [id_profissional]
    );

    return res.json(rows);
  } catch (err) {
    console.error(
      "❌ Erro ao listar agendamentos do profissional:",
      err
    );
    res
      .status(500)
      .json({ error: "Erro ao listar agendamentos do profissional." });
  }
});

/**
 * ==========================================================
 * GET /api/agendamentos/paciente/:id_paciente
 * Usado em agenda-paciente.html
 * ==========================================================
 */
router.get("/paciente/:id_paciente", async (req, res) => {
  try {
    const { id_paciente } = req.params;

    if (!id_paciente) {
      return res
        .status(400)
        .json({ error: "ID do paciente é obrigatório." });
    }

    const [rows] = await pool.query(
      `
      SELECT 
        a.id_agendamento,
        a.data_hora,
        a.status,
        a.preco_final           AS valor,

        -- infos do profissional que vão aparecer pro paciente
        prof.nome               AS nome_profissional,
        prof.especialidade      AS especialidade_profissional,

        s.nome_servico          AS servico
      FROM agendamento a
      JOIN profissional prof ON prof.id_profissional = a.id_profissional
      JOIN servico      s    ON s.id_servico        = a.id_servico
      WHERE a.id_paciente = ?
      ORDER BY a.data_hora ASC
      `,
      [id_paciente]
    );

    // sempre devolve um array (mesmo vazio), pro JS não bugar
    return res.json(rows);
  } catch (err) {
    console.error(
      "❌ Erro ao listar agendamentos do paciente:",
      err
    );
    res
      .status(500)
      .json({ error: "Erro ao listar agendamentos do paciente." });
  }
});

/**
 * ==========================================================
 * POST /api/agendamentos
 * body: { id_paciente, id_profissional, id_servico, data_hora, metodo_pagamento }
 * ==========================================================
 */
router.post("/", async (req, res) => {
  try {
    const {
      id_paciente,
      id_profissional,
      id_servico,
      data_hora,
      metodo_pagamento, // vem do front, mas não existe coluna na tabela agendamento
    } = req.body || {};

    if (
      !id_paciente ||
      !id_profissional ||
      !id_servico ||
      !data_hora ||
      !metodo_pagamento
    ) {
      return res.status(400).json({
        error:
          "id_paciente, id_profissional, id_servico, data_hora e metodo_pagamento são obrigatórios.",
      });
    }

    const [servRows] = await pool.query(
      "SELECT valor_base FROM servico WHERE id_servico = ?",
      [id_servico]
    );

    if (servRows.length === 0) {
      return res.status(400).json({ error: "Serviço não encontrado." });
    }

    const valor_base = Number(servRows[0].valor_base || 0);

    const status = "confirmado"; // ou "pendente"

    const [result] = await pool.query(
      `
      INSERT INTO agendamento
        (id_paciente, id_profissional, id_servico, data_hora, status, preco_final)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        id_paciente,
        id_profissional,
        id_servico,
        data_hora,
        status,
        valor_base,
      ]
    );

    const id_agendamento = result.insertId;

    res.status(201).json({
      id_agendamento,
      status,
      valor: valor_base,
    });
  } catch (err) {
    console.error("❌ Erro ao criar agendamento:", err);
    res.status(500).json({ error: "Erro ao criar agendamento." });
  }
});

module.exports = router;
