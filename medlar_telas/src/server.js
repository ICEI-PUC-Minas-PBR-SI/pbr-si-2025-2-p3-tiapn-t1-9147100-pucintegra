// ===========================================================
// server.js (versão organizada)
// ===========================================================

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const path = require("path");
// const routes = require("./routes");

const app = express();

// -----------------------------------------------------------
// Middlewares
// -----------------------------------------------------------
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Util: remove tudo que não for número
const onlyDigits = (s) => (s || "").toString().replace(/\D/g, "");

// -----------------------------------------------------------
// Conexão MySQL
// -----------------------------------------------------------
const DB_NAME = "medlar";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@1997",
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

// Flags detectadas dinamicamente
let HAS_PROF_ENDERECO = false;
let HAS_PROF_REGISTRO = false;

async function detectColumns() {
  try {
    const [rows] = await pool.query(
      `SELECT COLUMN_NAME
         FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ?
          AND TABLE_NAME   = 'profissional'
          AND COLUMN_NAME IN ('endereco', 'registro_profissional')`,
      [DB_NAME]
    );

    const names = new Set(rows.map(r => r.COLUMN_NAME));

    HAS_PROF_ENDERECO = names.has("endereco");
    HAS_PROF_REGISTRO = names.has("registro_profissional");

    console.log("ℹ️ profissional.endereco:", HAS_PROF_ENDERECO ? "OK" : "NÃO EXISTE");
    console.log("ℹ️ profissional.registro_profissional:", HAS_PROF_REGISTRO ? "OK" : "NÃO EXISTE");
  } catch (e) {
    console.warn("⚠️ Falha ao detectar colunas do profissional:", e.message);
  }
}

// Boot inicial
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query("SELECT 1");
    conn.release();

    console.log(`✅ Conectado ao MySQL (${DB_NAME})`);
    await detectColumns();

  } catch (err) {
    console.error("❌ Falha ao conectar no MySQL:", err.message);
  }
})();

// -----------------------------------------------------------
// Rotas
// -----------------------------------------------------------
app.use("/api/busca", require("./routes/busca.routes"));
app.use("/api/agendamentos", require("./routes/agendamento.routes"));
app.use("/api/servicos", require("./routes/servicos.routes"));

// -----------------------------------------------------------
// Healthcheck
// -----------------------------------------------------------
app.get("/api/ping", (_req, res) => res.json({ ok: true }));

// -----------------------------------------------------------
// Rota raiz → carrega public/html/index.html
// -----------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

// -----------------------------------------------------------
// Util: Montar endereço
// -----------------------------------------------------------
function montarEndereco({ rua, numero, bairro, cidadeUf, cep }) {
  const p1 = [];
  if (rua) p1.push(String(rua).trim());
  if (numero) p1.push(String(numero).trim());
  const linha1 = p1.join(", ");

  const linha2 = [bairro, cidadeUf]
    .filter(Boolean)
    .map(s => String(s).trim())
    .join(", ");

  const base = [linha1, linha2].filter(Boolean).join(" - ");

  const cepFmt = onlyDigits(cep || "");
  return cepFmt ? `${base} - ${cepFmt}` : base;
}

// ===========================================================
// PACIENTES
// ===========================================================
app.post("/api/pacientes", async (req, res) => {
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
      complemento_pac,
      historico_medico_pac,
      senha_pac
    } = req.body || {};

    // Campos obrigatórios
    if (!nome_completo_pac || !cpf_pac || !data_nascimento_pac || !telefone_pac || !email_pac || !senha_pac) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    const cpf = onlyDigits(cpf_pac).slice(0, 11);
    const telefone = onlyDigits(telefone_pac).slice(0, 20);
    const numero = numero_pac ? onlyDigits(numero_pac).slice(0, 6) : "";

    const enderecoFull = montarEndereco({
      rua: endereco_pac,
      numero,
      bairro: bairro_pac,
      cidadeUf: cidade_pac,
      cep: cep_pac
    });

    const sql = `
      INSERT INTO paciente
        (nome, cpf, data_nascimento, telefone, email, endereco, senha)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      String(nome_completo_pac).trim(),
      cpf,
      data_nascimento_pac,
      telefone,
      String(email_pac).trim(),
      enderecoFull,
      senha_pac
    ];

    const [result] = await pool.execute(sql, params);
    res.status(201).json({ id_paciente: result.insertId });

  } catch (err) {
    console.error("❌ Erro ao inserir paciente:", err.message);
    res.status(500).json({ error: "Erro interno ao salvar paciente." });
  }
});

// ===========================================================
// PROFISSIONAIS
// ===========================================================
app.post("/api/profissionais", async (req, res) => {
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
    } = req.body || {};

    if (!nome_completo_prof || !sobrenome_prof || !cpf_prof || !email_prof || !telefone_prof) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    const nomeFull = `${String(nome_completo_prof).trim()} ${String(sobrenome_prof).trim()}`.trim();
    const cpf = onlyDigits(cpf_prof).slice(0, 11);
    const telefone = onlyDigits(telefone_prof).slice(0, 20);

    const especialidade = (areas_atendimento || "").toString().slice(0, 50);

    const numero = numero_prof ? onlyDigits(numero_prof).slice(0, 6) : "";
    const enderecoFull = montarEndereco({
      rua: endereco_prof,
      numero,
      bairro: bairro_prof,
      cidadeUf: cidade_prof,
      cep: cep_prof
    });

    // Montagem dinâmica de colunas
    const cols = ["nome", "cpf", "especialidade", "telefone", "email", "senha"];
    const vals = [nomeFull, cpf, especialidade || null, telefone, String(email_prof).trim(), senha_prof || null];

    if (HAS_PROF_REGISTRO) {
      cols.push("registro_profissional");
      vals.push((registro_profissional || "").toString().slice(0, 40) || null);
    }

    if (HAS_PROF_ENDERECO) {
      cols.push("endereco");
      vals.push(enderecoFull || null);
    }

    const placeholders = cols.map(() => "?").join(", ");
    const sql = `INSERT INTO profissional (${cols.join(", ")}) VALUES (${placeholders})`;

    const [result] = await pool.execute(sql, vals);
    res.status(201).json({ id_profissional: result.insertId });

  } catch (err) {
    console.error("❌ Erro ao inserir profissional:", err.message);
    res.status(500).json({ error: "Erro interno ao salvar profissional." });
  }
});

// ===========================================================
// SERVIÇOS
// ===========================================================
app.get("/api/servicos", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM servico LIMIT 100");
    res.json(rows);

  } catch (e) {
    console.error("❌ Erro ao listar serviços:", e.message);
    res.status(500).json({ error: "Erro ao listar serviços." });
  }
});

// ===========================================================
// LOGIN
// ===========================================================
app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body || {};

    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    const [pac] = await pool.execute(
      "SELECT id_paciente AS id, nome, email FROM paciente WHERE email = ? AND senha = ? LIMIT 1",
      [email, senha]
    );

    if (pac.length > 0) {
      return res.json({ ok: true, tipo: "paciente", ...pac[0] });
    }

    const [prof] = await pool.execute(
      "SELECT id_profissional AS id, nome, email FROM profissional WHERE email = ? AND senha = ? LIMIT 1",
      [email, senha]
    );

    if (prof.length > 0) {
      return res.json({ ok: true, tipo: "profissional", ...prof[0] });
    }

    return res.status(401).json({ error: "Credenciais inválidas." });

  } catch (err) {
    console.error("❌ Erro no login:", err.message);
    res.status(500).json({ error: "Erro interno no login." });
  }
});

// -----------------------------------------------------------
// Start Server
// -----------------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
