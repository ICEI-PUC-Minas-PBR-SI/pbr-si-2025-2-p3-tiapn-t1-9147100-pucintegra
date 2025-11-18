// models/LoginModel.js

const db = require("../config/db");

module.exports = {
  async autenticar(email, senha) {
    // Paciente
    let [pac] = await db.query(
      `SELECT id_paciente AS id, nome, email, status, 'paciente' AS tipo
       FROM paciente 
       WHERE email = ? AND senha = ?
       LIMIT 1`,
      [email, senha]
    );

    if (pac.length > 0) return pac[0];

    // Profissional
    let [prof] = await db.query(
      `SELECT id_profissional AS id, nome, email, status, 'profissional' AS tipo
       FROM profissional 
       WHERE email = ? AND senha = ?
       LIMIT 1`,
      [email, senha]
    );

    if (prof.length > 0) return prof[0];

    return null;
  }
};
