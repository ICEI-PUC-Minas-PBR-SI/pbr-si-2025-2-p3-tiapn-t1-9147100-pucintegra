const mysql = require('mysql2');

// Cria a conexão usando as variáveis de ambiente (seguro)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'defaultdb',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Esta opção 'ssl' é obrigatória para bancos na nuvem (como Aiven/Azure)
    ssl: {
        rejectUnauthorized: false
    }
});

// Teste rápido de conexão (aparecerá no log da Vercel)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar no Banco de Dados:', err.code);
        console.error('Detalhes:', err.message);
    } else {
        console.log('✅ Conectado ao Banco de Dados com sucesso!');
        connection.release();
    }
});

module.exports = pool.promise();
