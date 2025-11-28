## Banco de dados
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
INSERT INTO Usuario (id_usuario, nome_completo, tipo_usuario, cpf, cnpj, endereco, email, telefone, senha, foto_perfil) VALUES
(1, 'Amanda Beatriz Oliveira da Silva Costa', 'locatário', '428.319.655-21', NULL, 'Rua das Palmeiras, 142 – São Paulo/SP', 'amanda.costa@gmail.com', '(11) 94821-3221', '9hA3@zqf', '/fotos/amanda.jpg'),
(36, 'Tiago Henrique Ramos Vasconcelos', 'administrador', '112.330.988-07', NULL, 'Rua Chile, 112 – Salvador/BA', 'tiago.ramos@locafacil.com', '(71) 99100-2312', 'Wp!99eZt', '/fotos/tiago_admin.jpg');
-- Categoria_Admin
CREATE TABLE Categoria_Admin (
   id_categoria_admin INT PRIMARY KEY,
   nome VARCHAR(50),
   descricao TEXT,
   nivel INT
);
INSERT INTO Categoria_Admin (id_categoria_admin, nome, descricao, nivel) VALUES
(1, 'Moderador', 'Pode gerenciar conteúdos e denúncias, mas não pode deletar anúncios permanentes', 1),
(2, 'Editor de Conteúdo', 'Pode criar, editar e deletar anúncios e produtos, mas não altera administradores', 2),
(3, 'Administrador Master', 'Possui todas as permissões do sistema, incluindo gerenciamento de usuários e categorias', 3);
-- Categoria_Cliente
CREATE TABLE Categoria_Cliente (
   id_categoria_cliente INT PRIMARY KEY,
   nome VARCHAR(50),
   descricao TEXT
);
INSERT INTO Categoria_Cliente (id_categoria_cliente, nome, descricao) VALUES
(1, 'Locatário Básico', 'Usuário que procura espaços, equipamentos ou serviços para alugar de forma pontual. Pode favoritar anúncios, enviar mensagens e realizar reservas simples.'),
(2, 'Locatário Premium', 'Versão aprimorada do locatário, com benefícios como atendimento prioritário, descontos em serviços e acesso antecipado a promoções.'),
(3, 'Locador Individual', 'Pessoa física (CPF) ou pequeno empreendedor que disponibiliza seus próprios espaços ou equipamentos para aluguel, geralmente de forma esporádica.'),
(4, 'Locador Profissional', 'Empresa (CNPJ) ou profissional do setor de eventos que aluga seus espaços, equipamentos ou serviços de forma recorrente e possui anúncios ativos.'),
(5, 'Locador Parceiro', 'Parceiro comercial com destaque na plataforma, podendo criar promoções personalizadas e participar de campanhas publicitárias.');
-- Administrador
CREATE TABLE Administrador (
   id_admin INT PRIMARY KEY,
   id_usuario INT,
   id_categoria_admin INT,
   FOREIGN KEY (id_categoria_admin) REFERENCES Categoria_Admin(id_categoria_admin)
);
INSERT INTO Administrador (id_admin, id_usuario, id_categoria_admin) VALUES
(1, 31, 1),
(2, 32, 3),
(3, 33, 2),
(4, 34, 1),
(5, 35, 2),
(6, 36, 2);
-- Cliente
CREATE TABLE Cliente (
   id_cliente INT PRIMARY KEY,
   id_usuario INT,
   id_categoria_cliente INT,
   FOREIGN KEY (id_categoria_cliente) REFERENCES Categoria_Cliente(id_categoria_cliente)
);
INSERT INTO Cliente (id_cliente, id_usuario, id_categoria_cliente) VALUES
(1, 1, 1),
(30, 30, 2);
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
INSERT INTO Produto (id_produto, tipo, nome, foto_produto, descricao, preco, tipo_local, endereco, especificacao) VALUES
(1, 'espaço', 'Chácara Recanto dos Lagos', '/fotos/chacara_lagos.jpg', 'Área com piscina, churrasqueira e espaço coberto para até 100 pessoas', 950, 'Chácara', 'Rua das Palmeiras, 142 – São Paulo/SP', 'Piscina, churrasqueira, estacionamento'),
(30, 'serviço', 'Segurança Privada para Eventos', '/fotos/seguranca_evento.jpg', 'Profissionais treinados e uniformizados', 700, NULL, NULL, 'Equipe treinada, uniformizada');
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
INSERT INTO Anuncio (id_anuncio, id_cliente, titulo, descricao, data_publicacao, status) VALUES
(1, 3, 'Chácara Recanto dos Lagos para festas e confraternizações', 'Área com piscina, churrasqueira e espaço coberto para até 100 pessoas', '2025-03-14', 'disponível'),
(30, 12, 'Serviço de Segurança Privada para eventos', 'Profissionais treinados e uniformizados', '2025-10-02', 'disponível');
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
INSERT INTO Item_Anuncio (id_item, id_anuncio, id_produto, quantidade, descricao) VALUES
(1, 1, 1, 1, 'Chácara completa para festa com piscina, churrasqueira e área coberta'),
(30, 15, 15, 1, 'Estúdio criativo com equipamentos básicos para gravação');
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
INSERT INTO Promocao (id_promocao, id_anuncio, descricao, prioridade, data_inicio, data_fim) VALUES
(1, 1, 'Impulsionar chácara popular entre locatários frequentes', 3, '2025-10-01', '2025-10-31'),
(10, 30, 'Segurança privada impulsionada para eventos corporativos', 1, '2025-10-01', '2025-10-31');
-- Foto
CREATE TABLE Foto (
   id_fotos INT PRIMARY KEY,
   url VARCHAR(255) NOT NULL,
   id_produto INT NOT NULL,
   FOREIGN KEY (id_produto) REFERENCES Anuncio(id_anuncio)
);
INSERT INTO Foto (id_fotos, url, id_produto) VALUES
(1, '/fotos/chacara_lagos_1.jpg', 1),
(32, '/fotos/seguranca_evento_1.jpg', 30);
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





