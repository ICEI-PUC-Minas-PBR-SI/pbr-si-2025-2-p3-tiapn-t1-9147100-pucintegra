CREATE DATABASE colmeia;
USE colmeia;
-- Usuario
CREATE TABLE Usuario (
 id_usuario INT AUTO_INCREMENT PRIMARY KEY,
 nome_completo VARCHAR(150) NOT NULL,
 tipo_usuario ENUM('locatário','locador','administrador') NOT NULL,
 cpf VARCHAR(14),
 cnpj VARCHAR(18),
 endereco VARCHAR(255),
 email VARCHAR(120) UNIQUE NOT NULL,
 telefone VARCHAR(20),
 senha VARCHAR(100) NOT NULL,
 foto_perfil VARCHAR(200)
);
-- Categoria_Admin
CREATE TABLE Categoria_Admin (
   id_categoria_admin INT PRIMARY KEY,
   nome VARCHAR(50),
   descricao TEXT,
   nivel INT
);
-- Categoria_Cliente
CREATE TABLE Categoria_Cliente (
   id_categoria_cliente INT PRIMARY KEY,
   nome VARCHAR(50),
   descricao TEXT
);
-- Administrador
CREATE TABLE Administrador (
   id_admin INT PRIMARY KEY,
   id_usuario INT,
   id_categoria_admin INT,
   FOREIGN KEY (id_categoria_admin) REFERENCES Categoria_Admin(id_categoria_admin)
);
-- Cliente
CREATE TABLE Cliente (
   id_cliente INT PRIMARY KEY,
   id_usuario INT,
   id_categoria_cliente INT,
   FOREIGN KEY (id_categoria_cliente) REFERENCES Categoria_Cliente(id_categoria_cliente)
);
-- Produto
CREATE TABLE Produto (
   id_produto INT PRIMARY KEY,
   tipo VARCHAR(50) NOT NULL,
   nome VARCHAR(255) NOT NULL,
   foto_produto VARCHAR(255),
   descricao TEXT,
   preco DECIMAL(10,2),
   tipo_local VARCHAR(100),
   endereco VARCHAR(255),
   especificacao TEXT
);
-- Anuncio
CREATE TABLE Anuncio (
   id_anuncio INT PRIMARY KEY,
   id_cliente INT NOT NULL,
   titulo VARCHAR(255) NOT NULL,
   descricao TEXT,
   data_publicacao DATE,
   status VARCHAR(50) DEFAULT 'disponível',
   FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);
-- Item_Anuncio
CREATE TABLE Item_Anuncio (
   id_item INT PRIMARY KEY,
   id_anuncio INT NOT NULL,
   id_produto INT NOT NULL,
   quantidade INT NOT NULL,
   descricao TEXT,
   FOREIGN KEY (id_anuncio) REFERENCES Anuncio(id_anuncio),
   FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);
-- Promocao
CREATE TABLE Promocao (
   id_promocao INT PRIMARY KEY,
   id_anuncio INT NOT NULL,
   descricao TEXT,
   prioridade INT,
   data_inicio DATE,
   data_fim DATE,
   FOREIGN KEY (id_anuncio) REFERENCES Anuncio(id_anuncio)
);
-- Foto
CREATE TABLE Foto (
   id_fotos INT PRIMARY KEY,
   url VARCHAR(255) NOT NULL,
   id_produto INT NOT NULL,
   FOREIGN KEY (id_produto) REFERENCES Anuncio(id_anuncio)
);
-- Reserva
CREATE TABLE Reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_anuncio INT NOT NULL,
    id_produto INT NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    status ENUM('pendente','confirmada','cancelada') NOT NULL DEFAULT 'pendente',
    preco_total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_anuncio) REFERENCES Anuncio(id_anuncio),
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);
