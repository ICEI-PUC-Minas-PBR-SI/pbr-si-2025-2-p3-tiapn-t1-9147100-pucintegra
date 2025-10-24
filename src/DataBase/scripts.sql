-- Tabela PESSOA (Baseada nos Processos 1 e 3)
CREATE TABLE PESSOA (
    Nome VARCHAR(100) NOT NULL,
    CPF VARCHAR(14) NOT NULL UNIQUE,
    Matricula VARCHAR(15) PRIMARY KEY,
    Email_Institucional VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Tipo_Pessoa ENUM('Aluno', 'Professor') NOT NULL,
    Foto_Perfil VARCHAR(255)
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

-- Tabela ALUNO (Especialização de PESSOA)
CREATE TABLE ALUNO (
    Matricula_Aluno VARCHAR(14) PRIMARY KEY,
    Eh_Monitor BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Matricula_Aluno) REFERENCES PESSOA(Matricula)
);

-- Tabela PROFESSOR (Especialização de PESSOA)
CREATE TABLE PROFESSOR (
    Matricula_Professor VARCHAR(14) PRIMARY KEY,
    Id_Disciplina_Principal INT,
    FOREIGN KEY (Matricula_Professor) REFERENCES PESSOA(Matricula),
    FOREIGN KEY (Id_Disciplina_Principal) REFERENCES DISCIPLINA(Id_Disciplina)
);