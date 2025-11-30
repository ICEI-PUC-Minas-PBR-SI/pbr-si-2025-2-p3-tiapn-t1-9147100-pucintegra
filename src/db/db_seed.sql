INSERT INTO paciente (nome, cpf, data_nascimento, telefone, email, endereco, senha) VALUES
('Ana Silva', '11122233344', '1990-01-15', '11987654321', 'ana.silva@teste.com', 'Rua A, 100 - Centro - SP - 12345678', '123456'),
('Bruno Costa', '55566677788', '1985-05-20', '21998765432', 'bruno.costa@teste.com', 'Av. B, 200 - Copacabana - RJ - 87654321', '123456');

INSERT INTO profissional (nome, cpf, especialidade, telefone, email, senha, registro_profissional, endereco) VALUES
('Dr. Carlos Mendes', '99988877766', 'Cardiologia', '11912345678', 'carlos.mendes@teste.com', '123456', 'CRM/SP 12345', 'Rua C, 300 - Jardins - SP - 11111111'),
('Dra. Daniela Lima', '44433322211', 'Dermatologia', '21923456789', 'daniela.lima@teste.com', '123456', 'CRM/RJ 67890', 'Av. D, 400 - Ipanema - RJ - 22222222');

INSERT INTO servico (nome) VALUES
('Consulta Médica'),
('Exame de Rotina'),
('Pequena Cirurgia');

INSERT INTO agendamento (id_paciente, id_profissional, data_hora, servico, status) VALUES
(1, 1, '2025-12-01 10:00:00', 'Consulta Médica', 'pendente'),
(2, 1, '2025-12-02 14:30:00', 'Exame de Rotina', 'aceito'),
(1, 2, '2025-12-03 09:00:00', 'Consulta Médica', 'pendente');
