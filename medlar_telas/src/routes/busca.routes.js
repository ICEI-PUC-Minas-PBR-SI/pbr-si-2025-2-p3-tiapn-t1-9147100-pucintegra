const express = require("express");
const router = express.Router();
const BuscaController = require("../controllers/BuscaController");

// Buscar profissionais
router.get("/", BuscaController.buscar);

module.exports = router;
