const { pool, DB_NAME } = require("../config/db");

let HAS_ENDERECO = false;
let HAS_REGISTRO = false;

async function detectarColunas() {
  try {
    const [rows] = await pool.query(`
      SELECT COLUMN_NAME
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = ?
      AND TABLE_NAME = 'profissional'
      AND COLUMN_NAME IN ('endereco', 'registro_profissional')
    `, [DB_NAME]);

    const names = new Set(rows.map(r => r.COLUMN_NAME));

    HAS_ENDERECO = names.has("endereco");
    HAS_REGISTRO = names.has("registro_profissional");

    console.log("Colunas detectadas -> endereco:", HAS_ENDERECO, "| registro:", HAS_REGISTRO);
  } catch (e) {
    console.log("Erro ao detectar colunas:", e.message);
  }
}

// Detecta no início
detectarColunas();

module.exports = {
  /**
   * Busca profissionais por especialidade e/ou nome.
   * @param {string} termo - Termo de busca (especialidade ou nome).
   * @returns {Array} Lista de profissionais.
   */
  async buscarProfissionais(termo) {
    const termoBusca = `%${termo}%`;
    const sql = `
      SELECT
        id_profissional,
        nome,
        especialidade,
        telefone,
        email,
        endereco
      FROM profissional
      WHERE especialidade LIKE ? OR nome LIKE ?
      LIMIT 50
    `;
    const [rows] = await pool.query(sql, [termoBusca, termoBusca]);
    return rows;
  },
  async criarProfissional(data) {
    const cols = ["nome", "cpf", "especialidade", "telefone", "email", "senha"];
    const vals = [data.nome, data.cpf, data.especialidade, data.telefone, data.email, data.senha];

    if (HAS_REGISTRO) {
      cols.push("registro_profissional");
      vals.push(data.registro_profissional || null);
    }

    if (HAS_ENDERECO) {
      cols.push("endereco");
      vals.push(data.endereco || null);
    }

    const placeholders = cols.map(() => "?").join(", ");

    const sql = `INSERT INTO profissional (${cols.join(", ")}) VALUES (${placeholders})`;
    const [result] = await pool.execute(sql, vals);

    return result.insertId;
  }
};
