-- Script de Atualização do Banco de Dados Medlar

-- 1. Tabela de Pagamentos
-- Armazena informações sobre transações de pagamento.
CREATE TABLE IF NOT EXISTS pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    metodo_pagamento VARCHAR(50) NOT NULL, -- Ex: 'cartao', 'pix', 'boleto'
    status_pagamento VARCHAR(20) NOT NULL DEFAULT 'pendente', -- Ex: 'pendente', 'aprovado', 'rejeitado', 'estornado'
    data_pagamento DATETIME,
    id_transacao_externa VARCHAR(255), -- ID da transação na operadora de pagamento (simulado)
    FOREIGN KEY (id_agendamento) REFERENCES agendamento(id_agendamento)
);

-- 2. Atualizar a tabela de Agendamento
-- Adicionar colunas para valor e status de pagamento.
-- O status do agendamento será alterado para refletir o fluxo de pagamento.
ALTER TABLE agendamento
ADD COLUMN valor DECIMAL(10, 2) DEFAULT 0.00,
ADD COLUMN id_pagamento INT,
ADD COLUMN data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD FOREIGN KEY (id_pagamento) REFERENCES pagamento(id_pagamento);

-- 3. Atualizar a tabela de Serviço
-- Adicionar um campo de preço para cada serviço.
ALTER TABLE servico
ADD COLUMN preco DECIMAL(10, 2) DEFAULT 0.00;

-- 4. Atualizar a tabela de Profissional
-- Adicionar um campo para a disponibilidade (simples, para fins de demonstração)
ALTER TABLE profissional
ADD COLUMN dias_disponiveis VARCHAR(50) DEFAULT '1,2,3,4,5', -- 1=Segunda, 5=Sexta
ADD COLUMN hora_inicio TIME DEFAULT '09:00:00',
ADD COLUMN hora_fim TIME DEFAULT '18:00:00';

-- 5. Atualizar dados de serviço (Exemplo)
-- Se a tabela 'servico' já existir, atualize os preços.
UPDATE servico SET preco = 150.00 WHERE nome = 'Consulta Inicial';
UPDATE servico SET preco = 100.00 WHERE nome = 'Sessão de Acompanhamento';
-- Se não houver dados, insira alguns (opcional, dependendo do estado do banco do usuário)
-- INSERT INTO servico (nome, descricao, preco) VALUES ('Consulta Inicial', 'Primeira consulta com o profissional', 150.00);
-- INSERT INTO servico (nome, descricao, preco) VALUES ('Sessão de Acompanhamento', 'Sessões subsequentes', 100.00);
