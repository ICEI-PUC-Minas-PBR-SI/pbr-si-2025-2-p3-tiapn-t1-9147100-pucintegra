// src/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const AdminController = require("../controllers/AdminController");

// Protege todas as rotas com middleware adminAuth
router.use(adminAuth);

// Pacientes
router.get("/pacientes/pendentes", AdminController.listarPacientesPendentes);
router.put("/pacientes/:id/aprovar", AdminController.aprovarPaciente);
router.put("/pacientes/:id/rejeitar", AdminController.rejeitarPaciente);
router.delete("/pacientes/:id", AdminController.deletarPaciente);

// Profissionais
router.get("/profissionais/pendentes", AdminController.listarProfissionaisPendentes);
router.put("/profissionais/:id/aprovar", AdminController.aprovarProfissional);
router.put("/profissionais/:id/rejeitar", AdminController.rejeitarProfissional);
router.delete("/profissionais/:id", AdminController.deletarProfissional);

module.exports = router;

// routes/admin.routes.js
{
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/pendentes", AdminController.listarPendentes);
router.put("/aprovar/:tipo/:id", AdminController.aprovar);
router.put("/rejeitar/:tipo/:id", AdminController.rejeitar);

module.exports = router;
}
