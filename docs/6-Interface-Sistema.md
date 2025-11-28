## 6. Interface do Sistema

Esta seção apresenta a visão geral das telas principais da plataforma **Medlar**, demonstrando como o usuário interage com o sistema ao longo dos processos de autenticação, busca, agendamento e gerenciamento de atendimentos.

<img width="1916" height="906" alt="Tela Inicial Medlar" src="https://github.com/user-attachments/assets/1e8a637b-60a4-4b18-87cb-0fe8d040a6ce" />

---

### 6.1. Tela Principal do Sistema

**Descrição:**  
A tela principal funciona como a porta de entrada do usuário na plataforma, exibindo um menu simples e o acesso às principais áreas — como busca de profissionais, agenda e perfil.

**Tela principal do sistema:**  

<img width="1916" height="906" alt="Tela Inicial Medlar" src="https://github.com/user-attachments/assets/7f5c1225-81b4-42c1-bab5-201c0145b1c5" />


---

### 6.2. Telas do Processo 1 — Autenticação e Cadastro

#### **6.2.1. Tela de Login**

**Descrição:**  
Permite que pacientes ou profissionais acessem o sistema utilizando e-mail e senha.

- Campos: e-mail e senha  
- Ações: Entrar, Criar cadastro

**Tela de login:**  
![Tela login](docs/img/tela-login.png)


#### **6.2.2. Tela de Cadastro de Paciente**

**Descrição:**  
Tela utilizada para registrar novos pacientes na plataforma.

- Campos: nome, CPF, data de nascimento, telefone, e-mail  
- Endereço completo  
- Histórico médico (opcional)

**Tela de cadastro de paciente:**  
![Tela cadastro paciente](docs/img/tela-cadastro-paciente.png)


---

### 6.3. Telas do Processo 2 — Gestão de Profissionais

#### **6.3.1. Tela de Cadastro de Profissional**

**Descrição:**  
Utilizada para cadastrar profissionais de saúde, incluindo dados pessoais e profissionais.

- Registro profissional (CRM/COREN)
- Especialidade
- Experiência
- Telefone / e-mail
- Upload de foto de perfil

**Tela de cadastro de profissional:**  
![Tela cadastro profissional](docs/img/tela-cadastro-profissional.png)


#### **6.3.2. Tela de Perfil do Profissional**

**Descrição:**  
Exibe informações detalhadas sobre um profissional, permitindo que o paciente avalie e escolha o especialista desejado.

**Tela de perfil do profissional:**  
![Tela perfil profissional](docs/img/tela-perfil-profissional.png)


---

### 6.4. Telas do Processo 3 — Busca de Profissionais

#### **6.4.1. Tela de Busca**

**Descrição:**  
Permite que o paciente filtre profissionais por especialidade, localização, disponibilidade e faixa de preço.

- Listagem com foto, nome, especialidade, descrição e avaliação  
- Botões: *Ver Perfil* e *Agendar Consulta*

**Tela de busca:**  
![Tela busca](docs/img/tela-busca.png)


#### **6.4.2. Tela de Perfil (aberta pela busca)**

**Descrição:**  
Exibe detalhes completos do profissional dentro de um modal ou página dedicada.

**Tela de perfil:**  
![Tela perfil busca](docs/img/tela-perfil-busca.png)


---

### 6.5. Telas do Processo 4 — Solicitação de Atendimento

#### **6.5.1. Tela de Solicitar Atendimento**

**Descrição:**  
Utilizada para marcar consultas com profissionais. Nesta tela, o paciente seleciona:

- Profissional (preenchido automaticamente)
- Serviço desejado
- Data
- Horário disponível (com base na disponibilidade real do profissional)
- Método de pagamento

**Tela solicitar atendimento:**  
![Tela solicitar atendimento](docs/img/tela-solicitar-atendimento.png)


#### **6.5.2. Tela de Confirmação / Sucesso**

**Descrição:**  
Após enviar o agendamento, o sistema confirma e direciona o paciente para sua agenda.

**Tela confirmação:**  
![Tela confirmação](docs/img/tela-confirmacao.png)


---

### 6.6. Telas do Processo 5 — Agenda do Paciente

#### **6.6.1. Tela de Agenda do Paciente**

**Descrição:**  
Exibe o calendário mensal e a lista de consultas do dia selecionado.

- Destaque de dias com consultas  
- Lista com horário, profissional e status  

**Tela agenda paciente:**  
![Tela agenda paciente](docs/img/tela-agenda-paciente.png)



#### **6.6.2. Detalhes da Consulta (Paciente)**

**Descrição:**  
Mostra informações completas sobre a consulta selecionada.

**Tela detalhes consulta paciente:**  
![Tela detalhes paciente](docs/img/tela-detalhes-paciente.png)


---

### 6.7. Telas do Processo 6 — Agenda do Profissional

#### **6.7.1. Tela de Consultas Pendentes**

**Descrição:**  
Lista todos os atendimentos agendados pelos pacientes.

- Colunas: data, paciente, serviço, valor, status, pagamento  
- Ações: Detalhes, Concluir, Cancelar

**Tela agenda profissional:**  

<img width="1903" height="905" alt="Telas do Processo 6 — Agenda do Profissional" src="https://github.com/user-attachments/assets/be159e6a-9537-44a7-80b5-4adcc9c064bd" />


#### **6.7.2. Tela de Detalhes do Atendimento (Profissional)**

**Descrição:**  
Permite ao profissional visualizar informações completas e atualizar o status da consulta.

**Tela detalhes profissional:**  
![Tela detalhes profissional](docs/img/tela-detalhes-profissional.png)

---
