// src/controllers/AdminController.js
const AdminModel = require("../models/AdminModel");

module.exports = {
  // Pacientes
  async listarPacientesPendentes(req, res) {
    try {
      const rows = await AdminModel.listarPacientesPendentes();
      res.json(rows);
    } catch (err) {
      console.error("Erro listarPacientesPendentes:", err.message);
      res.status(500).json({ error: "Erro ao listar pacientes pendentes." });
    }
  },

  async aprovarPaciente(req, res) {
    try {
      const { id } = req.params;
      const r = await AdminModel.atualizarStatusPaciente(id, "aprovado");
      if (r === 0) return res.status(404).json({ error: "Paciente não encontrado." });
      res.json({ ok: true });
    } catch (err) {
      console.error("Erro aprovarPaciente:", err.message);
      res.status(500).json({ error: "Erro ao aprovar paciente." });
    }
  },

  async rejeitarPaciente(req, res) {
    try {
      const { id } = req.params;
      const r = await AdminModel.atualizarStatusPaciente(id, "rejeitado");
      if (r === 0) return res.status(404).json({ error: "Paciente não encontrado." });
      res.json({ ok: true });
    } catch (err) {
      console.error("Erro rejeitarPaciente:", err.message);
      res.status(500).json({ error: "Erro ao rejeitar paciente." });
    }
  },

  async deletarPaciente(req, res) {
    try {
      const { id } = req.params;
      const r = await AdminModel.deletarPaciente(id);
      if (r === 0) return res.status(404).json({ error: "Paciente não encontrado." });
      res.json({ ok: true });
    } catch (err) {
      console.error("Erro deletarPaciente:", err.message);
      res.status(500).json({ error: "Erro ao deletar paciente." });
    }
  },

  // Profissionais
  async listarProfissionaisPendentes(req, res) {
    try {
      const rows = await AdminModel.listarProfissionaisPendentes();
      res.json(rows);
    } catch (err) {
      console.error("Erro listarProfissionaisPendentes:", err.message);
      res.status(500).json({ error: "Erro ao listar profissionais pendentes." });
    }
  },

  async aprovarProfissional(req, res) {
    try {
      const { id } = req.params;
      const r = await AdminModel.atualizarStatusProfissional(id, "aprovado");
      if (r === 0) return res.status(404).json({ error: "Profissional não encontrado." });
      res.json({ ok: true });
    } catch (err) {
      console.error("Erro aprovarProfissional:", err.message);
      res.status(500).json({ error: "Erro ao aprovar profissional." });
    }
  },

  async rejeitarProfissional(req, res) {
    try {
      const { id } = req.params;
      const r = await AdminModel.atualizarStatusProfissional(id, "rejeitado");
      if (r === 0) return res.status(404).json({ error: "Profissional não encontrado." });
      res.json({ ok: true });
    } catch (err) {
      console.error("Erro rejeitarProfissional:", err.message);
      res.status(500).json({ error: "Erro ao rejeitar profissional." });
    }
  },

  async deletarProfissional(req, res) {
    try {
      const { id } = req.params;
      const r = await AdminModel.deletarProfissional(id);
      if (r === 0) return res.status(404).json({ error: "Profissional não encontrado." });
      res.json({ ok: true });
    } catch (err) {
      console.error("Erro deletarProfissional:", err.message);
      res.status(500).json({ error: "Erro ao deletar profissional." });
    }
  }
};

{
    // controllers/AdminController.js

const db = require("../config/db");

module.exports = {
  async listarPendentes(req, res) {
    try {
      const [pac] = await db.query("SELECT id_paciente AS id, nome, email, 'paciente' AS tipo FROM paciente WHERE status = 'pendente'");
      const [prof] = await db.query("SELECT id_profissional AS id, nome, email, 'profissional' AS tipo FROM profissional WHERE status = 'pendente'");

      res.json([...pac, ...prof]);
    } 
    catch (e) {
      res.status(500).json({ error: "Erro ao listar pendentes." });
    }
  },

  async aprovar(req, res) {
    try {
      const { tipo, id } = req.params;

      const tabela = tipo === "paciente" ? "paciente" : "profissional";
      const idCol = tipo === "paciente" ? "id_paciente" : "id_profissional";

      await db.query(
        `UPDATE ${tabela} SET status='aprovado' WHERE ${idCol} = ? LIMIT 1`,
        [id]
      );

      res.json({ ok: true, msg: `${tipo} aprovado!` });
    }
    catch (e) {
      res.status(500).json({ error: "Erro ao aprovar." });
    }
  },

  async rejeitar(req, res) {
    try {
      const { tipo, id } = req.params;

      const tabela = tipo === "paciente" ? "paciente" : "profissional";
      const idCol = tipo === "paciente" ? "id_paciente" : "id_profissional";

      await db.query(
        `UPDATE ${tabela} SET status='rejeitado' WHERE ${idCol} = ? LIMIT 1`,
        [id]
      );

      res.json({ ok: true, msg: `${tipo} rejeitado!` });
    }
    catch (e) {
      res.status(500).json({ error: "Erro ao rejeitar." });
    }
  }
};

}