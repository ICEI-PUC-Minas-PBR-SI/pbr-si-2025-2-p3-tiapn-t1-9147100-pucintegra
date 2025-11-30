const express = require("express");
const router = express.Router();
const AgendamentoController = require("../controllers/AgendamentoController");

// Buscar disponibilidade do profissional
router.get("/disponibilidade", AgendamentoController.buscarDisponibilidade);

// Solicitar agendamento (paciente)
router.post("/", AgendamentoController.solicitar);

// Listar agendamentos do profissional
router.get("/profissional/:id_profissional", AgendamentoController.listarPorProfissional);

// Listar agendamentos do paciente
router.get("/paciente/:id_paciente", AgendamentoController.listarPorPaciente);

// Aceitar agendamento (profissional)
router.put("/aceitar/:id_agendamento", AgendamentoController.aceitar);

// Rejeitar agendamento (profissional)
router.put("/rejeitar/:id_agendamento", AgendamentoController.rejeitar);

module.exports = router;
