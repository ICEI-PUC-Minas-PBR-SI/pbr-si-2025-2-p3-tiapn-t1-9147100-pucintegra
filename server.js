const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); 
const app = express();
const PORT = 3000;
const saltRounds = 10;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Define onde e como salvar os arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Nome único: data + nome original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS COM DEBUG

// 1. Define o caminho absoluto para a pasta do front-end
const frontendPath = path.join(__dirname, 'src', 'front');

// 2. Imprime no terminal para verificarmos se o caminho está certo
console.log('------------------------------------------------');
console.log('📂 Pasta de Arquivos Estáticos:', frontendPath);
if (fs.existsSync(frontendPath)) {
    console.log('✅ A pasta existe! O servidor tentará ler arquivos daqui.');
} else {
    // Isso é comum na Vercel, pois a estrutura de pastas muda no build, não se preocupe por enquanto
    console.log('⚠️ Aviso: Pasta src/front não encontrada no caminho padrão.');
}
console.log('------------------------------------------------');

app.use(express.static(frontendPath));
app.use('/docs/images', express.static(path.join(__dirname, 'docs', 'images')));
// Permite acessar os uploads via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- ROTAS DE AUTENTICAÇÃO (CORRIGIDAS) ---

// Adicionado /auth no caminho para combinar com o Front-end
app.post('/api/auth/register', async (req, res) => {
    const { nome, cpf, matricula, email, senha, tipo_usuario } = req.body;
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        await db.execute('INSERT INTO PESSOA (Nome, CPF, Matricula, Email_Institucional, Senha, Tipo_Pessoa) VALUES (?, ?, ?, ?, ?, ?)', [nome, cpf, matricula, email, hash, tipo_usuario]);
        const tipoTabela = tipo_usuario === 'Aluno' ? 'ALUNO' : 'PROFESSOR';
        const colunaMatricula = tipo_usuario === 'Aluno' ? 'Matricula_Aluno' : 'Matricula_Professor';
        await db.execute(`INSERT INTO ${tipoTabela} (${colunaMatricula}) VALUES (?)`, [matricula]);
        res.status(201).json({ message: 'Cadastro sucesso', userId: matricula });
    } catch (error) { 
        console.error("Erro no cadastro:", error);
        res.status(500).json({ message: 'Erro cadastro' }); 
    }
});

// Adicionado /auth no caminho para combinar com o Front-end
app.post('/api/auth/login', async (req, res) => {
    /* Lógica de Login */
    const { email, senha } = req.body;
    try {
        const [rows] = await db.execute('SELECT Matricula, Senha, Nome, Tipo_Pessoa FROM PESSOA WHERE Email_Institucional = ?', [email]);
        const user = rows[0];
        if (user && await bcrypt.compare(senha, user.Senha)) {
            res.json({ message: 'Login sucesso', user: { matricula: user.Matricula, nome: user.Nome, tipo: user.Tipo_Pessoa } });
        } else { res.status(401).json({ message: 'Falha login' }); }
    } catch (e) { 
        console.error("Erro no login:", e);
        res.status(500).json({ message: 'Erro login' }); 
    }
});

// Rota Nova: Recuperação de Senha (Para evitar erro 404)
app.post('/api/auth/recover-password', async (req, res) => {
    // Placeholder: futuramente você implementa o envio de e-mail aqui
    res.status(200).json({ message: 'Solicitação recebida (Simulação)' });
});


// ROTA DE PERGUNTAS COM UPLOAD 
app.post('/api/questions', upload.array('anexos', 3), async (req, res) => {
    console.log("--> Recebendo requisição de Nova Pergunta...");
    
    const { matricula_aluno, id_disciplina, titulo, conteudo, palavras_chave } = req.body;

    // Validação estrita no Backend
    if (!matricula_aluno || !id_disciplina || !titulo || !conteudo) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [resultPergunta] = await connection.execute(
            'INSERT INTO PERGUNTA (Matricula_Aluno, Id_Disciplina, Titulo, Conteudo, Visibilidade, Status) VALUES (?, ?, ?, ?, ?, ?)',
            [matricula_aluno, id_disciplina, titulo, conteudo, 'Aberta', 'Aberta']
        );
        const id_pergunta = resultPergunta.insertId;

        if (palavras_chave) {
            const tagsArray = palavras_chave.split(',').filter(t => t.trim() !== "");
            for (const palavra of tagsArray) {
                const tagLimpa = palavra.trim();
                await connection.execute('INSERT IGNORE INTO PALAVRA_CHAVE (Palavra) VALUES (?)', [tagLimpa]);
                const [rowsTag] = await connection.execute('SELECT Id_PalavraChave FROM PALAVRA_CHAVE WHERE Palavra = ?', [tagLimpa]);
                if (rowsTag.length > 0) {
                    await connection.execute('INSERT INTO PERGUNTA_PALAVRACHAVE (Id_Pergunta, Id_PalavraChave) VALUES (?, ?)', [id_pergunta, rowsTag[0].Id_PalavraChave]);
                }
            }
        }

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const caminhoRelativo = '/uploads/' + file.filename;
                await connection.execute(
                    'INSERT INTO PERGUNTA_ANEXO (Id_Pergunta, Nome_Arquivo, Caminho_Arquivo, Tipo_Arquivo) VALUES (?, ?, ?, ?)',
                    [id_pergunta, file.originalname, caminhoRelativo, file.mimetype]
                );
            }
        }

        await connection.commit();
        res.status(201).json({ message: 'Pergunta publicada!', id: id_pergunta });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('CRITICAL ERROR na Publicação:', error);
        res.status(500).json({ message: 'Erro interno: ' + error.message });
    } finally {
        if (connection) connection.release();
    }
});

// ROTAS DE PERFIL

// 1. Obter dados do perfil + Estatísticas
app.get('/api/profile/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
        const [userRows] = await db.execute(
            `SELECT Nome, Email_Institucional, Tipo_Pessoa, Foto_Perfil, Biografia 
             FROM PESSOA WHERE Matricula = ?`, [matricula]
        );
        
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const [qRows] = await db.execute(
            'SELECT COUNT(*) as total FROM PERGUNTA WHERE Matricula_Aluno = ?', [matricula]
        );
        
        const [aRows] = await db.execute(
            'SELECT COUNT(*) as total FROM RESPOSTA WHERE Matricula_Pessoa = ?', [matricula]
        );

        res.json({ 
            user: userRows[0], 
            stats: { 
                questions: qRows[0].total, 
                answers: aRows[0].total 
            } 
        });

    } catch (error) { 
        console.error("Erro ao buscar perfil:", error);
        res.status(500).json({ message: error.message }); 
    }
});

// 2. Atualizar Perfil (Bio + Foto + Nome)
app.put('/api/profile/:matricula', upload.single('foto_perfil'), async (req, res) => {
    const { matricula } = req.params;
    const { biografia, nome } = req.body; 
    const file = req.file;

    try {
        let query = 'UPDATE PESSOA SET Nome = ?, Biografia = ?';
        let params = [nome, biografia];

        if (file) {
            const caminhoFoto = '/uploads/' + file.filename;
            query += ', Foto_Perfil = ?';
            params.push(caminhoFoto);
        }

        query += ' WHERE Matricula = ?';
        params.push(matricula);

        await db.execute(query, params);
        res.json({ message: 'Perfil atualizado com sucesso!' });
    } catch (error) { 
        console.error("Erro ao atualizar perfil:", error);
        res.status(500).json({ message: "Erro interno ao atualizar: " + error.message }); 
    }
});

// 3. Listar Perguntas do Usuário
app.get('/api/users/:matricula/questions', async (req, res) => {
    const { matricula } = req.params;
    try {
        const [rows] = await db.execute(
            `SELECT P.*, D.Nome as DisciplinaNome 
             FROM PERGUNTA P 
             JOIN DISCIPLINA D ON P.Id_Disciplina = D.Id_Disciplina 
             WHERE P.Matricula_Aluno = ? ORDER BY P.Data_Criacao DESC`, 
            [matricula]
        );
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 4. Listar Respostas do Usuário
app.get('/api/users/:matricula/answers', async (req, res) => {
    const { matricula } = req.params;
    try {
        const [rows] = await db.execute(
            `SELECT R.*, P.Titulo as PerguntaTitulo 
             FROM RESPOSTA R 
             JOIN PERGUNTA P ON R.Id_Pergunta = P.Id_Pergunta 
             WHERE R.Matricula_Pessoa = ? ORDER BY R.Data_Criacao DESC`, 
            [matricula]
        );
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 5. Deletar Pergunta
app.delete('/api/questions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM PERGUNTA_PALAVRACHAVE WHERE Id_Pergunta = ?', [id]);
        await db.execute('DELETE FROM PERGUNTA_ANEXO WHERE Id_Pergunta = ?', [id]);
        await db.execute('DELETE FROM RESPOSTA WHERE Id_Pergunta = ?', [id]);
        await db.execute('DELETE FROM PERGUNTA WHERE Id_Pergunta = ?', [id]);
        res.json({ message: 'Deletado' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// ROTAS DE FEED DETALHADO E RESPOSTAS
// 1. Buscar respostas de uma pergunta específica
app.get('/api/questions/:id/answers', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute(`
            SELECT R.*, P.Nome as AutorNome, P.Foto_Perfil
            FROM RESPOSTA R
            JOIN PESSOA P ON R.Matricula_Pessoa = P.Matricula
            WHERE R.Id_Pergunta = ?
            ORDER BY R.Data_Criacao ASC
        `, [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Publicar uma nova resposta
app.post('/api/questions/:id/answers', async (req, res) => {
    const { id } = req.params; // ID da Pergunta
    const { matricula, conteudo } = req.body;

    if (!matricula || !conteudo) {
        return res.status(400).json({ message: 'Dados incompletos.' });
    }

    try {
        await db.execute(`
            INSERT INTO RESPOSTA (Id_Pergunta, Matricula_Pessoa, Conteudo, Data_Criacao)
            VALUES (?, ?, ?, NOW())
        `, [id, matricula, conteudo]);
        
        res.status(201).json({ message: 'Resposta enviada!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao salvar resposta.' });
    }
});

// ROTA: Feed Geral com Imagem
app.get('/api/feed/questions', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 100;
    
    try {
        const query = `
            SELECT 
                P.Id_Pergunta, 
                P.Titulo, 
                P.Conteudo, 
                P.Data_Criacao, 
                D.Nome as Disciplina, 
                PES.Nome as Autor,
                (
                    SELECT Caminho_Arquivo 
                    FROM PERGUNTA_ANEXO PA 
                    WHERE PA.Id_Pergunta = P.Id_Pergunta 
                    AND PA.Tipo_Arquivo LIKE 'image/%' 
                    LIMIT 1
                ) as ImagemAnexo
            FROM PERGUNTA P
            JOIN DISCIPLINA D ON P.Id_Disciplina = D.Id_Disciplina
            JOIN ALUNO A ON P.Matricula_Aluno = A.Matricula_Aluno
            JOIN PESSOA PES ON A.Matricula_Aluno = PES.Matricula
            ORDER BY P.Data_Criacao DESC
            LIMIT ${limit}
        `;

        const [rows] = await db.query(query);
        res.json(rows);

    } catch (error) {
        console.error("Erro no Feed:", error);
        res.status(500).json({ message: 'Erro ao carregar feed.' });
    }
});

// ROTA RAIZ: Redireciona automaticamente para a tela de login
app.get('/', (req, res) => {
    res.redirect('/html/homepage.html');
});

app.listen(PORT, () => {
    console.log(Servidor rodando em http://localhost:${PORT});
});
