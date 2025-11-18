const PacienteModel = require("../models/PacienteModel");
const onlyDigits = require("../utils/onlyDigits");
const montarEndereco = require("../utils/endereco");

module.exports = {
  async criar(req, res) {
    try {
      const {
        nome_completo_pac,
        cpf_pac,
        data_nascimento_pac,
        telefone_pac,
        email_pac,
        cep_pac,
        cidade_pac,
        bairro_pac,
        endereco_pac,
        numero_pac,
        senha_pac
      } = req.body;

      if (!nome_completo_pac || !cpf_pac || !data_nascimento_pac || !telefone_pac || !email_pac || !senha_pac) {
        return res.status(400).json({ error: "Campos obrigatórios faltando." });
      }

      const enderecoFull = montarEndereco({
        rua: endereco_pac,
        numero: onlyDigits(numero_pac),
        bairro: bairro_pac,
        cidadeUf: cidade_pac,
        cep: cep_pac
      });

      const id = await PacienteModel.criarPaciente({
        nome: nome_completo_pac.trim(),
        cpf: onlyDigits(cpf_pac),
        data_nascimento: data_nascimento_pac,
        telefone: onlyDigits(telefone_pac),
        email: email_pac.trim(),
        endereco: enderecoFull,
        senha: senha_pac
      });

      res.status(201).json({ id_paciente: id });

    } catch (e) {
      console.error("Erro Paciente:", e.message);
      res.status(500).json({ error: "Erro interno ao salvar paciente." });
    }
  }
};
