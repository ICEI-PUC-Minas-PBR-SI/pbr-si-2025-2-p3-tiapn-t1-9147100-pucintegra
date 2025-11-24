// server.js (Coloque aqui o código completo do servidor Node.js/Express)
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./src/node_modules/db'); // Importa a conexão com o banco de dados
const path = require('path');

const app = express();
const PORT = 3000;
const saltRounds = 10; 

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/front'))); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs/images', express.static(path.join(__dirname, 'docs', 'images')));
const requireAuth = (req, res, next) => {
    // 1. Tenta obter a matrícula do usuário. 
    const matricula = req.body.matricula_aluno || req.headers['x-user-matricula']; 

    // CRUCIAL: A matrícula deve ser uma string não vazia.
    if (!matricula || matricula.length < 5) { // Matrícula tem no mínimo 5 caracteres
        // Se a matrícula não for encontrada ou for vazia/muito curta (inválida)
        console.log('Tentativa de acesso não autorizado detectada. Matrícula recebida:', matricula);
        return res.status(401).json({ 
            message: 'Acesso negado. Matrícula inválida ou ausente.',
            errorCode: 'AUTH_REQUIRED'
        });
    }
    // Se o check de matrícula passar, anexa a matrícula ao objeto req para a rota usar
    req.userMatricula = matricula; 

    // Continua para o próximo middleware ou para o handler da rota (app.post('/api/questions', ...))
    next();
};
app.post('/api/questions', requireAuth, async (req, res) => {
    // ... Aqui o código do seu Back-end para inserir a pergunta
    // A variável req.userMatricula contém a matrícula já verificada, use-a no INSERT
    const { titulo, conteudo, id_disciplina, palavras_chave } = req.body;
    const matricula_aluno = req.userMatricula; // Usa a matrícula do middleware!
    
    // ... (restante da sua lógica de inserção no MySQL)
});

// ROTAS DE AUTENTICAÇÃO (Processos 1 e 2) ===============================================
// Rota para Cadastro (Processo 1)
app.post('/api/register', async (req, res) => {
    const { nome, cpf, matricula, email, senha, tipo_usuario } = req.body;
    if (!nome || !cpf || !matricula || !email || !senha || !tipo_usuario) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        await db.execute(
            'INSERT INTO PESSOA (Nome, CPF, Matricula, Email_Institucional, Senha, Tipo_Pessoa) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, cpf, matricula, email, hash, tipo_usuario]
        );
        const tipoTabela = tipo_usuario === 'Aluno' ? 'ALUNO' : 'PROFESSOR';
        const colunaMatricula = tipo_usuario === 'Aluno' ? 'Matricula_Aluno' : 'Matricula_Professor';
        await db.execute(
            `INSERT INTO ${tipoTabela} (${colunaMatricula}) VALUES (?)`,
            [matricula]
        );
        res.status(201).json({ 
            message: 'Cadastro realizado com sucesso!',
            userId: matricula,
            type: tipo_usuario
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Matrícula, CPF ou E-mail já cadastrado.' });
        }
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro interno no servidor ao cadastrar.' });
    }
});

// Rota para Login (Processo 2)
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }
    try {
        const [rows] = await db.execute(
            'SELECT Matricula, Senha, Nome, Tipo_Pessoa FROM PESSOA WHERE Email_Institucional = ?',
            [email]
        );
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }
        const match = await bcrypt.compare(senha, user.Senha);
        if (match) {
            res.status(200).json({ 
                message: 'Login realizado com sucesso!', 
                user: { 
                    matricula: user.Matricula, 
                    nome: user.Nome, 
                    tipo: user.Tipo_Pessoa 
                } 
            });
        } else {
            res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor ao logar.' });
    }
});

// ROTA PARA PERGUNTAS (Processo 4 - Publicação) ===============================================
app.post('/api/questions', async (req, res) => {
    const { matricula_aluno, id_disciplina, titulo, conteudo, palavras_chave, visibilidade = 'Aberta' } = req.body;
    if (!matricula_aluno || !id_disciplina || !titulo || !conteudo) {
        return res.status(400).json({ message: 'Campos obrigatórios (Matrícula, Disciplina, Título e Conteúdo) faltando.' });
    }
    
    const keywordsArray = palavras_chave ? palavras_chave.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
    
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        // 1. Insere a Pergunta
        const [resultPergunta] = await connection.execute(
            'INSERT INTO PERGUNTA (Matricula_Aluno, Id_Disciplina, Titulo, Conteudo, Visibilidade, Status) VALUES (?, ?, ?, ?, ?, ?)',
            [matricula_aluno, id_disciplina, titulo, conteudo, visibilidade, 'Aberta']
        );
        const id_pergunta = resultPergunta.insertId;

        // 2. Insere e associa as Palavras-Chave
        for (const palavra of keywordsArray) {
            await connection.execute(
                'INSERT IGNORE INTO PALAVRA_CHAVE (Palavra) VALUES (?)',
                [palavra]
            );
            
            const [rowsPalavra] = await connection.execute(
                'SELECT Id_PalavraChave FROM PALAVRA_CHAVE WHERE Palavra = ?',
                [palavra]
            );
            const id_palavra_chave = rowsPalavra[0].Id_PalavraChave;
            
            await connection.execute(
                'INSERT INTO PERGUNTA_PALAVRACHAVE (Id_Pergunta, Id_PalavraChave) VALUES (?, ?)',
                [id_pergunta, id_palavra_chave]
            );
        }

        await connection.commit(); 
        res.status(201).json({ 
            message: 'Pergunta publicada com sucesso!', 
            id: id_pergunta 
        });

    } catch (error) {
        if (connection) await connection.rollback(); 
        console.error('Erro ao publicar pergunta:', error);
        res.status(500).json({ message: 'Erro interno no servidor ao publicar a pergunta.' });
    } finally {
        if (connection) connection.release(); 
    }
});


// Rota Padrão
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/front/html/homepage.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});