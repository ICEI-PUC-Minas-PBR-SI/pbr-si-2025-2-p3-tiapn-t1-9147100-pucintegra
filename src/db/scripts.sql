-- 1. CRIAÇÃO E SELEÇÃO DO BANCO DE DADOS
DROP DATABASE IF EXISTS puc_integra;
CREATE DATABASE puc_integra CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE puc_integra;

-- 2. TABELAS DE ENTIDADES FORTES (Sem dependências externas)

-- Tabela PESSOA (Entidade pai para Aluno e Professor)
-- Baseado nos Processos 1 (Cadastro) e 3 (Perfil)
CREATE TABLE PESSOA (
    Nome VARCHAR(100) NOT NULL,
    CPF VARCHAR(14) NOT NULL UNIQUE,
    Matricula VARCHAR(15) PRIMARY KEY,
    Email_Institucional VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL, -- Recomenda-se armazenar o Hash
    Tipo_Pessoa ENUM('Aluno', 'Professor') NOT NULL,
    Foto_Perfil VARCHAR(255),
    Tema_Preferencial VARCHAR(20),
    Idioma_Preferencial VARCHAR(10),
    Notificacoes_Ativas BOOLEAN DEFAULT TRUE
);

-- Tabela CURSO
CREATE TABLE CURSO (
    Id_Curso INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE
);

-- Tabela DISCIPLINA
CREATE TABLE DISCIPLINA (
    Id_Disciplina INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Sigla VARCHAR(10) UNIQUE
);

-- Tabela PALAVRA_CHAVE (Para categorização de perguntas)
CREATE TABLE PALAVRA_CHAVE (
    Id_PalavraChave INT PRIMARY KEY AUTO_INCREMENT,
    Palavra VARCHAR(50) UNIQUE NOT NULL
);

-- 3. TABELAS DE ESPECIALIZAÇÃO E RELACIONAMENTOS INICIAIS

-- Tabela ALUNO (Especialização de PESSOA)
CREATE TABLE ALUNO (
    Matricula_Aluno VARCHAR(15) PRIMARY KEY,
    Eh_Monitor BOOLEAN DEFAULT FALSE,
    CONSTRAINT FK_Aluno_Pessoa FOREIGN KEY (Matricula_Aluno) REFERENCES PESSOA(Matricula)
);

-- Tabela PROFESSOR (Especialização de PESSOA)
CREATE TABLE PROFESSOR (
    Matricula_Professor VARCHAR(15) PRIMARY KEY,
    Id_Disciplina_Principal INT,
    CONSTRAINT FK_Professor_Pessoa FOREIGN KEY (Matricula_Professor) REFERENCES PESSOA(Matricula),
    CONSTRAINT FK_Professor_Disciplina FOREIGN KEY (Id_Disciplina_Principal) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela CURSO_DISCIPLINA (Relacionamento N:N)
CREATE TABLE CURSO_DISCIPLINA (
    Id_Curso INT NOT NULL,
    Id_Disciplina INT NOT NULL,
    PRIMARY KEY (Id_Curso, Id_Disciplina),
    CONSTRAINT FK_CD_Curso FOREIGN KEY (Id_Curso) REFERENCES CURSO(Id_Curso),
    CONSTRAINT FK_CD_Disciplina FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
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

-- 4. TABELAS DO CORE DO NEGÓCIO (Perguntas e Respostas)
-- Tabela PERGUNTA (Baseado no Processo 4)
CREATE TABLE PERGUNTA (
    Id_Pergunta INT PRIMARY KEY AUTO_INCREMENT,
    Matricula_Aluno VARCHAR(15) NOT NULL,
    Id_Disciplina INT NOT NULL,
    Titulo VARCHAR(150) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Aberta', 'Fechada', 'Moderacao') DEFAULT 'Aberta',
    Visibilidade VARCHAR(20),
    CONSTRAINT FK_Pergunta_Aluno FOREIGN KEY (Matricula_Aluno) REFERENCES ALUNO(Matricula_Aluno),
    CONSTRAINT FK_Pergunta_Disciplina FOREIGN KEY (Id_Disciplina) REFERENCES DISCIPLINA(Id_Disciplina)
);

-- Tabela PERGUNTA_ANEXO (Arquivos anexados à pergunta)
CREATE TABLE PERGUNTA_ANEXO (
    Id_Pergunta INT NOT NULL,
    Nome_Arquivo VARCHAR(255) NOT NULL,
    Caminho_Arquivo VARCHAR(255) NOT NULL,
    Tipo_Arquivo VARCHAR(50),
    PRIMARY KEY (Id_Pergunta, Nome_Arquivo),
    CONSTRAINT FK_Anexo_Pergunta FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta)
);

-- Tabela PERGUNTA_PALAVRACHAVE (Tags da pergunta)
CREATE TABLE PERGUNTA_PALAVRACHAVE (
    Id_Pergunta INT NOT NULL,
    Id_PalavraChave INT NOT NULL,
    PRIMARY KEY (Id_Pergunta, Id_PalavraChave),
    CONSTRAINT FK_PP_Pergunta FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta),
    CONSTRAINT FK_PP_Palavra FOREIGN KEY (Id_PalavraChave) REFERENCES PALAVRA_CHAVE(Id_PalavraChave)
);

-- Tabela RESPOSTA (Baseado no Processo 4)
CREATE TABLE RESPOSTA (
    Id_Resposta INT PRIMARY KEY AUTO_INCREMENT,
    Id_Pergunta INT NOT NULL,
    Matricula_Pessoa VARCHAR(15) NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_Criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Is_Accepted BOOLEAN DEFAULT FALSE, -- Se a resposta foi marcada como "Melhor Resposta"
    CONSTRAINT FK_Resposta_Pergunta FOREIGN KEY (Id_Pergunta) REFERENCES PERGUNTA(Id_Pergunta),
    CONSTRAINT FK_Resposta_Pessoa FOREIGN KEY (Matricula_Pessoa) REFERENCES PESSOA(Matricula)