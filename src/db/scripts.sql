-- 1. CRIAÇÃO DO AMBIENTE
DROP DATABASE IF EXISTS defaultdb;
CREATE DATABASE defaultdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE defaultdb;

-- 2. TABELAS INDEPENDENTES (SEM CHAVES ESTRANGEIRAS)

-- Tabela PESSOA (Generalização de Usuários)
CREATE TABLE PESSOA (
    Matricula VARCHAR(15) NOT NULL,
    CPF VARCHAR(14) NOT NULL UNIQUE,
    Nome VARCHAR(100) NOT NULL,
    Email_Institucional VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Tipo_Pessoa ENUM('Aluno', 'Professor') NOT NULL,
    Foto_Perfil VARCHAR(255),
    Tema_Preferencial VARCHAR(20) DEFAULT 'Claro',
    Idioma_Preferencial VARCHAR(10) DEFAULT 'pt-BR',
    Notificacoes_Ativas BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (Matricula)
);

-- Tabela CURSO
CREATE TABLE CURSO (
    Id_Curso INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE,
    PRIMARY KEY (Id_Curso)
);

-- Tabela DISCIPLINA
CREATE TABLE DISCIPLINA (
    Id_Disciplina INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE,
    PRIMARY KEY (Id_Disciplina)
);

-- Tabela PALAVRA_CHAVE (Tags para categorização)
CREATE TABLE PALAVRA_CHAVE (
    Id_PalavraChave INT NOT NULL AUTO_INCREMENT,
    Palavra VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (Id_PalavraChave)
);

-- 3. TABELAS DE RELACIONAMENTO E ESPECIALIZAÇÃO

-- Tabela CURSO_DISCIPLINA (Relacionamento N:N)
CREATE TABLE CURSO_DISCIPLINA (
    Id_Curso INT NOT NULL,
    Id_Disciplina INT NOT NULL,
    PRIMARY KEY (Id_Curso, Id_Disciplina),
    CONSTRAINT FK_CursoDisciplina_Curso FOREIGN KEY (Id_Curso) REFERENCES CURSO(Id_Curso),
    CONSTRAINT FK_CursoDisciplina_Disciplina FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela ALUNO (Especialização de PESSOA)
CREATE TABLE ALUNO (
    Matricula_Aluno VARCHAR(15) NOT NULL,
    Eh_Monitor BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (Matricula_Aluno),
    CONSTRAINT FK_Aluno_Pessoa FOREIGN KEY (Matricula_Aluno) REFERENCES PESSOA(Matricula)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela PROFESSOR (Especialização de PESSOA)
CREATE TABLE PROFESSOR (
    Matricula_Professor VARCHAR(15) NOT NULL,
    Id_Disciplina_Principal INT,
    PRIMARY KEY (Matricula_Professor),
    CONSTRAINT FK_Professor_Pessoa FOREIGN KEY (Matricula_Professor) REFERENCES PESSOA(Matricula)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Professor_Disciplina FOREIGN KEY (Id_Disciplina_Principal) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela MONITORIA (Relacionamento Ternário: Aluno, Professor, Disciplina)
CREATE TABLE MONITORIA (
    Matricula_Aluno VARCHAR(15) NOT NULL,
    Matricula_Professor VARCHAR(15) NOT NULL,
    Id_Disciplina INT NOT NULL,
    Data_Inicio DATE NOT NULL,
    Data_Fim DATE,
    PRIMARY KEY (Matricula_Aluno, Matricula_Professor, Id_Disciplina),
    CONSTRAINT FK_Monitoria_Aluno FOREIGN KEY (Matricula_Aluno) REFERENCES ALUNO(Matricula_Aluno),
    CONSTRAINT FK_Monitoria_Professor FOREIGN KEY (Matricula_Professor) REFERENCES PROFESSOR(Matricula_Professor),
    CONSTRAINT FK_Monitoria_Disciplina FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- 4. TABELAS DO CORE DO NEGÓCIO (PERGUNTAS E RESPOSTAS)

-- Tabela PERGUNTA (Processo 4)
CREATE TABLE PERGUNTA (
    Id_Pergunta INT NOT NULL AUTO_INCREMENT,
    Matricula_Aluno VARCHAR(15) NOT NULL,
    Id_Disciplina INT NOT NULL,
    Titulo VARCHAR(150) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Aberta', 'Fechada', 'Moderacao') DEFAULT 'Aberta',
    Visibilidade VARCHAR(20) DEFAULT 'Publica',
    PRIMARY KEY (Id_Pergunta),
    CONSTRAINT FK_Pergunta_Aluno FOREIGN KEY (Matricula_Aluno) REFERENCES ALUNO(Matricula_Aluno),
    CONSTRAINT FK_Pergunta_Disciplina FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela RESPOSTA (Processo 4)
CREATE TABLE RESPOSTA (
    Id_Resposta INT NOT NULL AUTO_INCREMENT,
    Id_Pergunta INT NOT NULL,
    Matricula_Pessoa VARCHAR(15) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Is_Accepted BOOLEAN DEFAULT FALSE, -- Indica se foi marcada como Melhor Resposta
    PRIMARY KEY (Id_Resposta),
    CONSTRAINT FK_Resposta_Pergunta FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta) ON DELETE CASCADE,
    CONSTRAINT FK_Resposta_Pessoa FOREIGN KEY (Matricula_Pessoa) REFERENCES PESSOA(Matricula)
);

-- Tabela REACAO (Likes/Dislikes em Respostas)
CREATE TABLE REACAO (
    Id_Reacao INT NOT NULL AUTO_INCREMENT,
    Id_Resposta INT NOT NULL,
    Matricula_Pessoa VARCHAR(15) NOT NULL,
    Tipo_Reacao ENUM('Like', 'Dislike') NOT NULL,
    PRIMARY KEY (Id_Reacao),
    UNIQUE KEY Unique_Reacao_Usuario (Id_Resposta, Matricula_Pessoa), -- Impede votos duplicados
    CONSTRAINT FK_Reacao_Resposta FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta) ON DELETE CASCADE,
    CONSTRAINT FK_Reacao_Pessoa FOREIGN KEY (Matricula_Pessoa) REFERENCES PESSOA(Matricula)
);

-- 5. TABELAS DE DETALHES (ANEXOS E TAGS)

-- Tabela PERGUNTA_ANEXO
CREATE TABLE PERGUNTA_ANEXO (
    Id_Pergunta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Pergunta, Nome_Arquivo),
    CONSTRAINT FK_Anexo_Pergunta FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta) ON DELETE CASCADE
);

-- Tabela RESPOSTA_ANEXO
CREATE TABLE RESPOSTA_ANEXO (
    Id_Resposta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Resposta, Nome_Arquivo),
    CONSTRAINT FK_Anexo_Resposta FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta) ON DELETE CASCADE
);

-- Tabela PERGUNTA_PALAVRACHAVE (Relacionamento N:N)
CREATE TABLE PERGUNTA_PALAVRACHAVE (
    Id_Pergunta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Pergunta, Id_PalavraChave),
    CONSTRAINT FK_TagPergunta_Pergunta FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta) ON DELETE CASCADE,
    CONSTRAINT FK_TagPergunta_Tag FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);

-- Tabela RESPOSTA_PALAVRACHAVE (Relacionamento N:N)
CREATE TABLE RESPOSTA_PALAVRACHAVE (
    Id_Resposta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Resposta, Id_PalavraChave),
    CONSTRAINT FK_TagResposta_Resposta FOREIGN KEY (Id_Resposta) REFERENCES RESPOSTA(Id_Resposta) ON DELETE CASCADE,
    CONSTRAINT FK_TagResposta_Tag FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);