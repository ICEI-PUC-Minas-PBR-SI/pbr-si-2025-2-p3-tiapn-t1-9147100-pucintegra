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


-- Tabela ALUNO (Especialização de PESSOA)
CREATE TABLE ALUNO (
    Matricula_Aluno VARCHAR(14) PRIMARY KEY,
    FOREIGN KEY (Matricula_Aluno) REFERENCES PESSOA(Matricula)
);

-- Tabela PROFESSOR (Especialização de PESSOA)
CREATE TABLE PROFESSOR (
    Matricula_Professor VARCHAR(14) PRIMARY KEY,
    FOREIGN KEY (Matricula_Professor) REFERENCES PESSOA(Matricula)
);