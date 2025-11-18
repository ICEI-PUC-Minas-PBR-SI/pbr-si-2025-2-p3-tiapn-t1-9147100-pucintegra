const ProfissionalModel = require("../models/ProfissionalModel");
const onlyDigits = require("../utils/onlyDigits");
const montarEndereco = require("../utils/endereco");

module.exports = {
  async criar(req, res) {
    try {
      const {
        nome_completo_prof,
        sobrenome_prof,
        registro_profissional,
        cpf_prof,
        email_prof,
        telefone_prof,
        areas_atendimento,
        senha_prof,
        cep_prof,
        cidade_prof,
        bairro_prof,
        endereco_prof,
        numero_prof
      } = req.body;

      if (!nome_completo_prof || !sobrenome_prof || !cpf_prof || !email_prof || !telefone_prof) {
        return res.status(400).json({ error: "Campos obrigatórios faltando." });
      }

      const enderecoFull = montarEndereco({
        rua: endereco_prof,
        numero: onlyDigits(numero_prof),
        bairro: bairro_prof,
        cidadeUf: cidade_prof,
        cep: cep_prof
      });

      const id = await ProfissionalModel.criarProfissional({
        nome: `${nome_completo_prof} ${sobrenome_prof}`.trim(),
        cpf: onlyDigits(cpf_prof),
        especialidade: areas_atendimento,
        telefone: onlyDigits(telefone_prof),
        email: email_prof,
        senha: senha_prof,
        registro_profissional,
        endereco: enderecoFull
      });

      res.status(201).json({ id_profissional: id });

    } catch (err) {
      console.error("Erro Profissional:", err.message);
      res.status(500).json({ error: "Erro interno ao salvar profissional." });
    }
  }
};
