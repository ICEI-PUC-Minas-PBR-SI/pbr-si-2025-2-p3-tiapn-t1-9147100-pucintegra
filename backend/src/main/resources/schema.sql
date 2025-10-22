CREATE TABLE IF NOT EXISTS usuarios (
    id IDENTITY PRIMARY KEY,
    primeiro_nome VARCHAR(100) NOT NULL,
    ultimo_nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    celular VARCHAR(30),
    senha VARCHAR(255),
    hash_senha VARCHAR(255),
    genero VARCHAR(30),
    idade INT,
    CONSTRAINT uk_usuarios_email UNIQUE (email)
);

