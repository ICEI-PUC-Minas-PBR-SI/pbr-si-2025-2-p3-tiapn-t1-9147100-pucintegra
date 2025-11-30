const express = require("express");
const router = express.Router();
const ServicoController = require("../controllers/ServicoController");

router.get("/", ServicoController.listar);
router.get("/:id_servico", ServicoController.buscarPorId);

module.exports = router;
