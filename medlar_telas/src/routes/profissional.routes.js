const express = require("express");
const router = express.Router();
const ProfissionalController = require("../controllers/ProfissionalController");

router.post("/", ProfissionalController.criar);

module.exports = router;
