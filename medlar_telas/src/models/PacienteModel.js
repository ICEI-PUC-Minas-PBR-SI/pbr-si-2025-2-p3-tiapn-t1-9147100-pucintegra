const { pool } = require("../config/db");

module.exports = {
  async criarPaciente(data) {
    const sql = `
      INSERT INTO paciente
        (nome, cpf, data_nascimento, telefone, email, endereco, senha)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.nome,
      data.cpf,
      data.data_nascimento,
      data.telefone,
      data.email,
      data.endereco,
      data.senha
    ];

    const [result] = await pool.execute(sql, params);
    return result.insertId;
  }
};
