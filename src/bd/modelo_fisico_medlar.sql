-- ==========================================================
-- BANCO DE DADOS: MEDLAR
-- MODELO FÍSICO - SCRIPT DE CRIAÇÃO DAS TABELAS (v2 - comentado)
-- Alvo: MySQL 8+ (InnoDB, utf8mb4)
-- ==========================================================
-- Este banco dá suporte ao app Medlar (Home Care): pacientes,
-- profissionais, serviços, solicitações, agendamentos, pagamentos e consultas.
-- ==========================================================

-- ============== CONFIGURAÇÃO GERAL ==============
-- Garante suporte a acentos e emojis (Unicode completo)
SET NAMES utf8mb4;
-- Pausa a checagem de FKs para recriar tabelas sem erro
SET FOREIGN_KEY_CHECKS = 0;

-- Cria o banco (se não existir) e define o charset padrão
CREATE DATABASE IF NOT EXISTS medlar 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_0900_ai_ci;
USE medlar;

-- ==========================================================
-- TABELA: Paciente
-- Guarda dados básicos do paciente/familiar que usa a plataforma.
-- ==========================================================
DROP TABLE IF EXISTS Paciente;
CREATE TABLE Paciente (
  id_paciente       INT PRIMARY KEY AUTO_INCREMENT, -- ID único
  nome              VARCHAR(120) NOT NULL,          -- Nome completo
  cpf               CHAR(14) UNIQUE,                -- 000.000.000-00 (pode vir mascarado)
  data_nascimento   DATE,                           -- Data de nascimento
  telefone          VARCHAR(20),
  email             VARCHAR(120) UNIQUE,            -- E-mail não pode repetir
  endereco          VARCHAR(180),
  senha_hash        VARCHAR(255),                   -- Hash de senha (nunca guardar senha em claro)
  criado_em         DATETIME DEFAULT CURRENT_TIMESTAMP, -- Quando foi criado
  atualizado_em     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Última atualização
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Profissional
-- Dados do profissional de saúde (enf., fisio., fono, etc.).
-- ==========================================================
DROP TABLE IF EXISTS Profissional;
CREATE TABLE Profissional (
  id_profissional           INT PRIMARY KEY AUTO_INCREMENT, -- ID único
  nome                      VARCHAR(120) NOT NULL,
  cpf                       CHAR(14) UNIQUE,
  especialidade             VARCHAR(100),                   -- Área de atuação
  telefone                  VARCHAR(20),
  email                     VARCHAR(120) UNIQUE,
  qualificado               BOOLEAN DEFAULT TRUE,           -- Indicador genérico de validação
  disponibilidade           VARCHAR(100),                   -- Ex.: Seg a Sex / Manhã
  avaliacao_do_profissional DECIMAL(2,1) DEFAULT 0.0,      -- Média 0..5
  contato                   VARCHAR(120),                   -- WhatsApp, e-mail prof., etc.
  criado_em                 DATETIME DEFAULT CURRENT_TIMESTAMP,
  atualizado_em             DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Servico
-- Catálogo dos serviços oferecidos (ex.: curativo, avaliação).
-- ==========================================================
DROP TABLE IF EXISTS Servico;
CREATE TABLE Servico (
  id_servico       INT PRIMARY KEY AUTO_INCREMENT,  -- ID único
  nome_servico     VARCHAR(120) NOT NULL,           -- Nome do serviço
  descricao        TEXT,                            -- Detalhes do serviço
  valor_base       DECIMAL(10,2),                   -- Preço base
  duracao_padrao   INT,                             -- Duração em minutos
  criado_em        DATETIME DEFAULT CURRENT_TIMESTAMP,
  atualizado_em    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Metodo_pagamento
-- Formas aceitas para pagar os atendimentos.
-- ==========================================================
DROP TABLE IF EXISTS Metodo_pagamento;
CREATE TABLE Metodo_pagamento (
  id_metodo   INT PRIMARY KEY AUTO_INCREMENT,                          -- ID do método
  tipo        ENUM('Pix','Cartão de Crédito','Boleto') NOT NULL,       -- Tipos suportados
  descricao   VARCHAR(120)                                             -- Texto livre
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Cartao_credito
-- Cartões vinculados ao paciente (apenas dados não sensíveis).
-- ==========================================================
DROP TABLE IF EXISTS Cartao_credito;
CREATE TABLE Cartao_credito (
  id_cartao        INT PRIMARY KEY AUTO_INCREMENT,
  id_paciente      INT NOT NULL,                 -- Dono do cartão
  numero_mascarado VARCHAR(25),                  -- **** **** **** 1234
  nome_titular     VARCHAR(120),
  validade         CHAR(5),                      -- MM/AA
  bandeira         VARCHAR(30),                  -- Visa, MasterCard...
  criado_em        DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Solicitacao
-- Pedido de atendimento feito pelo paciente/família.
-- ==========================================================
DROP TABLE IF EXISTS Solicitacao;
CREATE TABLE Solicitacao (
  id_solicitacao        INT PRIMARY KEY AUTO_INCREMENT,
  id_paciente           INT NOT NULL,            -- Quem pediu
  id_profissional       INT NULL,                -- Profissional (pode vir depois)
  data_solicitacao      DATETIME NOT NULL,
  descricao_necessidade TEXT,                    -- Ex.: “dor lombar”, “curativo”
  localizacao           VARCHAR(150),            -- Endereço do atendimento
  status                ENUM('pendente','em análise','aceita','recusada') DEFAULT 'pendente',
  criado_em             DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_paciente)     REFERENCES Paciente(id_paciente),
  FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional)
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Negociacao
-- Registro dos valores/condições combinados antes do agendamento.
-- ==========================================================
DROP TABLE IF EXISTS Negociacao;
CREATE TABLE Negociacao (
  id_negociacao   INT PRIMARY KEY AUTO_INCREMENT,
  id_solicitacao  INT NOT NULL,
  valor_proposto  DECIMAL(10,2),                 -- Quanto foi proposto
  valor_aceito    DECIMAL(10,2),                 -- Quanto ficou fechado
  observacoes     TEXT,                           -- Observações do acordo
  criado_em       DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_solicitacao) REFERENCES Solicitacao(id_solicitacao)
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Agendamento
-- Agenda final do atendimento (data/hora, serviço e participantes).
-- ==========================================================
DROP TABLE IF EXISTS Agendamento;
CREATE TABLE Agendamento (
  id_agendamento  INT PRIMARY KEY AUTO_INCREMENT,
  id_solicitacao  INT NOT NULL,                  -- Pedido que originou
  id_paciente     INT NOT NULL,
  id_profissional INT NOT NULL,
  id_servico      INT NOT NULL,
  data_hora       DATETIME NOT NULL,             -- Quando vai acontecer
  tipo_consulta   VARCHAR(100),                  -- Opcional: presencial/online
  status          ENUM('Confirmado','Pendente','Cancelado') DEFAULT 'Pendente',
  preco_final     DECIMAL(10,2),                 -- Valor final (base + taxas/descontos)
  criado_em       DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_solicitacao)  REFERENCES Solicitacao(id_solicitacao),
  FOREIGN KEY (id_paciente)     REFERENCES Paciente(id_paciente),
  FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional),
  FOREIGN KEY (id_servico)      REFERENCES Servico(id_servico)
) ENGINE=InnoDB;

-- Índices para agilizar buscas por profissional/paciente + data
CREATE INDEX idx_agendamento_prof_data ON Agendamento (id_profissional, data_hora);
CREATE INDEX idx_agendamento_pac_data  ON Agendamento (id_paciente, data_hora);

-- ==========================================================
-- TABELA: Pagamento
-- Resultado financeiro do agendamento (quando e como foi pago).
-- ==========================================================
DROP TABLE IF EXISTS Pagamento;
CREATE TABLE Pagamento (
  id_pagamento     INT PRIMARY KEY AUTO_INCREMENT,
  id_agendamento   INT NOT NULL,                     -- Para qual agendamento
  id_metodo        INT NOT NULL,                     -- Qual método (Pix, Cartão...)
  data_pagamento   DATETIME,                         -- Quando pagou
  valor_pago       DECIMAL(10,2) NOT NULL,           -- Quanto pagou
  status_pagamento ENUM('Aprovado','Pendente','Recusado') DEFAULT 'Pendente',
  codigo_transacao VARCHAR(80),                      -- Código do gateway (se online)
  criado_em        DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_agendamento) REFERENCES Agendamento(id_agendamento),
  FOREIGN KEY (id_metodo)      REFERENCES Metodo_pagamento(id_metodo)
) ENGINE=InnoDB;

-- ==========================================================
-- TABELA: Consulta
-- Registro clínico do atendimento realizado.
-- ==========================================================
DROP TABLE IF EXISTS Consulta;
CREATE TABLE Consulta (
  id_consulta     INT PRIMARY KEY AUTO_INCREMENT,
  id_agendamento  INT NOT NULL,
  id_profissional INT NOT NULL,
  id_paciente     INT NOT NULL,
  observacoes     TEXT,                              -- Anotações do profissional
  resultado       TEXT,                              -- Resultado/parecer
  criado_em       DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_agendamento)  REFERENCES Agendamento(id_agendamento),
  FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional),
  FOREIGN KEY (id_paciente)     REFERENCES Paciente(id_paciente)
) ENGINE=InnoDB;

-- ============== FINALIZAÇÃO ==============
-- Reativa a checagem de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 1;
