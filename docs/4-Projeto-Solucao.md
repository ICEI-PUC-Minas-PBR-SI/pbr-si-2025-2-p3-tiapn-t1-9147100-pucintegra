## 4. Projeto da Solução

## 4.1. Arquitetura da solução

A arquitetura do **Medlar** foi desenhada para atender aos requisitos funcionais (cadastro de pacientes e profissionais, busca, agendamento, notificações, prontuário/arquivos, relatórios) e não funcionais (segurança, disponibilidade, escalabilidade, desempenho e usabilidade).

**Visão em camadas**

- **Cliente (Web):**
  - SPA/PWA (React/Next.js).
  - Autenticação via JWT/OAuth.
  - Máscaras/validações de formulário, acessibilidade e cache local (IndexedDB/LocalStorage).
- **API Backend (REST/GraphQL):**
  - Orquestra os fluxos de negócio: cadastro, busca, agendamento, avaliações, relatórios.
  - Serviços internos: Autenticação/Autorização (RBAC), Pacientes, Profissionais, Agenda, Prontuário/Arquivos, Notificações, Relatórios.
- **Persistência e Arquivos:**
  - **PostgreSQL** (dados transacionais).
  - **Object Storage** (S3/GCS/Azure Blob) para documentos e imagens.
  - **Redis** para cache/sessões/filas leves (opcional).
- **Mensageria/Jobs:**
  - Fila de tarefas para e-mails, SMS e push (BullMQ/Sidekiq/Celery).
- **Integrações externas:**
  - **Maps/Geocoding** (Google Maps/Mapbox) — geolocalização e distância.
  - **Push** (Firebase Cloud Messaging).
  - **E-mail/SMS** (SendGrid/Postmark/Twilio).
- **Observabilidade & DevOps:**
  - Logs estruturados, métricas e tracing (ELK/Datadog).
  - CI/CD (GitHub Actions).
  - Hospedagem: Front (Vercel/Netlify), API (Render/Heroku/Fly.io), DB gerenciado.
- **Segurança:**
  - HTTPS, CORS, criptografia em repouso (KMS), **RBAC**, auditoria de acesso, backups e políticas de retenção.

---
 
 **Diagrama de Arquitetura**:


![Imagem do WhatsApp de 2025-10-09 à(s) 21 48 06_b4ac3a1e](https://github.com/user-attachments/assets/d33b799a-ce2a-4c4d-85c7-96006cbdded3)

 

### 4.2. Protótipos de telas

Os protótipos apresentados a seguir representam as principais interfaces do sistema **Medlar**, desenvolvidas para ilustrar a **interação do usuário com a plataforma** e apoiar o design final do aplicativo.  

Esses *wireframes* demonstram como o sistema atende às **histórias de usuário**, **requisitos funcionais** e **não funcionais** descritos na *Especificação do Projeto*, oferecendo uma visão clara de como o usuário navegará entre as telas e executará as principais ações.

As telas foram criadas em **baixa fidelidade**, com foco na estrutura, hierarquia e posicionamento dos elementos da interface, sem aplicação de cores, estilos visuais ou identidade definitiva.  

---

### 1️⃣ Protótipo de Baixa Fidelidade — Cadastro de Profissional  

<img src="https://github.com/user-attachments/assets/6d9e1a0b-9857-4139-a7c5-729a9cfb218d" alt="Cadastro de Profissional - Protótipo Baixa de Fidelidade" width="80%">

### Descrição da Tela  

- **Cabeçalho:** contém o logotipo do sistema, o nome *Medlar* e o menu de navegação (“Início” e “Sobre”), garantindo identidade visual e consistência.  
- **Título:** “Cadastro de Profissional” indica claramente o propósito da página.  
- **Campos de entrada:**  
  - **Nome** e **Sobrenome** — identificação pessoal.  
  - **CRRM/COREN** — campo para o registro profissional obrigatório.  
  - **Experiência Profissional** — área de texto para descrição detalhada da formação e experiências.  
  - **Área de Atendimento** — especialidade ou campo de atuação (ex.: enfermagem, fisioterapia, fonoaudiologia).  
- **Seção de Documentos:** espaço para upload de arquivos comprobatórios (ex.: diploma, registro profissional, documento de identidade), representados por *cards* de upload.  
- **Botões de ação:**  
  - **Voltar** — retorna à tela anterior.  
  - **Enviar** — envia o cadastro para validação pela equipe administrativa.

 ---

### 2️⃣ Tela de Cadastro de Paciente  

![Sem título](https://github.com/user-attachments/assets/a5a557d9-cc23-4b71-907b-2d8b93b2c68a)


#### Descrição da Tela  
- **Objetivo:** Permitir que pacientes ou familiares realizem o cadastro inicial na plataforma Medlar, inserindo informações pessoais e de contato de forma simples e organizada.  
- **Campos de entrada:** Nome completo, CPF, data de nascimento, telefone, e-mail e endereço, garantindo que os dados necessários sejam registrados corretamente.  
- **Botões de ação:**  
  - **Voltar** — retorna à tela anterior, permitindo que o usuário revise ou cancele o cadastro.  
  - **Continuar** — avança para a próxima etapa do cadastro, salvando as informações inseridas.    
 
---

### 3️⃣ Tela de Login

<img src="https://github.com/user-attachments/assets/64bc7d37-1d34-4ce1-9c43-9b5c2726ab41" alt="Cadastro de Login - Protótipo Baixa de Fidelidade" width="80%">

#### Descrição da Tela  
- **Objetivo:** Permitir que o usuário acesse sua conta na plataforma **Medlar**, inserindo suas credenciais de forma simples e segura.  
- **Campos de entrada:** E-mail e Senha, garantindo a autenticação correta do usuário cadastrado.  
- **Botões de ação:**  
  - **Entrar** — realiza o login no sistema, validando as credenciais informadas.  
- **Link complementar:**  
  - **Registrar-se** — direciona o usuário para a tela de criação de nova conta, caso ainda não possua cadastro.  

---

### 4️⃣ Tela de Busca de Profissionais  

<img width="777" height="559" alt="aprototipo" src="https://github.com/user-attachments/assets/bc745274-c9d5-4b9f-8fa3-abf6281e7c91" />

#### Descrição da Tela  
- **Objetivo:** Permitir que o usuário (paciente ou familiar) encontre profissionais de saúde disponíveis para atendimento domiciliar, utilizando filtros de busca e informações detalhadas de perfil.  

- **Elementos Principais:**  
  - **Barra de pesquisa:** Campo central para buscar profissionais por nome ou palavra-chave.  
  - **Filtros laterais:**  
    - **Especialidade:** Seleção de área de atuação (ex.: Enfermagem, Fisioterapia, Fonoaudiologia, etc.).  
    - **Localização:** Campo para inserir CEP ou endereço, com base em geolocalização.  
    - **Disponibilidade:** Escolha de data ou horário para atendimentos.  
    - **Preço:** Controle deslizante para definir faixa de preço mínima e máxima.  
    - **Classificação:** Botão de ação para aplicar filtros.  
  - **Lista de resultados:**  
    - Cards de profissionais contendo:  
      - Foto (avatar genérico ou foto real do profissional).  
      - Nome e especialidade.  
      - Avaliação por estrelas e número de atendimentos realizados.  
      - Botão **“Ver Perfil”** para acessar informações detalhadas.  
  - **Botão “Favoritos”:** Acesso rápido aos profissionais salvos.  
  
---

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)


### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

#### 4.3.2 Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

![Imagem do WhatsApp de 2025-09-13 à(s) 16 30 43_eae4e805](https://github.com/user-attachments/assets/700c7738-1c35-470c-97c5-cce9dd06f2a8)

---


#### 4.3.3 Modelo Físico

O modelo físico do banco de dados **Medlar** representa a estrutura detalhada das tabelas que armazenam e organizam as informações da aplicação.  

Esse banco de dados é utilizado para registrar pacientes, profissionais de saúde, serviços, solicitações de atendimento, agendamentos, pagamentos e consultas realizados dentro da plataforma.

<code>

-- Criação da tabela Paciente
CREATE TABLE Paciente (
    id_paciente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    cpf CHAR(14) UNIQUE,
    data_nascimento DATE,
    telefone VARCHAR(20),
    email VARCHAR(120) UNIQUE,
    endereco VARCHAR(180),
    senha_hash VARCHAR(255),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela Profissional
CREATE TABLE Profissional (
    id_profissional INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    cpf CHAR(14) UNIQUE,
    especialidade VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(120) UNIQUE,
    qualificado BOOLEAN DEFAULT TRUE,
    disponibilidade VARCHAR(100),
    avaliacao_do_profissional DECIMAL(2,1) DEFAULT 0.0,
    contato VARCHAR(120),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela Servico
CREATE TABLE Servico (
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    nome_servico VARCHAR(120) NOT NULL,
    descricao TEXT,
    valor_base DECIMAL(10,2),
    duracao_padrao INT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela Metodo_pagamento
CREATE TABLE Metodo_pagamento (
    id_metodo INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('Pix','Cartão de Crédito','Boleto') NOT NULL,
    descricao VARCHAR(120)
);

-- Criação da tabela Cartao_credito
CREATE TABLE Cartao_credito (
    id_cartao INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT NOT NULL,
    numero_mascarado VARCHAR(25),
    nome_titular VARCHAR(120),
    validade CHAR(5),
    bandeira VARCHAR(30),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);

-- Criação da tabela Solicitacao
CREATE TABLE Solicitacao (
    id_solicitacao INT PRIMARY KEY AUTO_INCREMENT,
    id_paciente INT NOT NULL,
    id_profissional INT NULL,
    data_solicitacao DATETIME NOT NULL,
    descricao_necessidade TEXT,
    localizacao VARCHAR(150),
    status ENUM('pendente','em análise','aceita','recusada') DEFAULT 'pendente',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional)
);

-- Criação da tabela Negociacao
CREATE TABLE Negociacao (
    id_negociacao INT PRIMARY KEY AUTO_INCREMENT,
    id_solicitacao INT NOT NULL,
    valor_proposto DECIMAL(10,2),
    valor_aceito DECIMAL(10,2),
    observacoes TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_solicitacao) REFERENCES Solicitacao(id_solicitacao)
);

-- Criação da tabela Agendamento
CREATE TABLE Agendamento (
    id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
    id_solicitacao INT NOT NULL,
    id_paciente INT NOT NULL,
    id_profissional INT NOT NULL,
    id_servico INT NOT NULL,
    data_hora DATETIME NOT NULL,
    tipo_consulta VARCHAR(100),
    status ENUM('Confirmado','Pendente','Cancelado') DEFAULT 'Pendente',
    preco_final DECIMAL(10,2),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_solicitacao) REFERENCES Solicitacao(id_solicitacao),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional),
    FOREIGN KEY (id_servico) REFERENCES Servico(id_servico)
);

-- Índices para agilizar busca
CREATE INDEX idx_agendamento_prof_data ON Agendamento (id_profissional, data_hora);
CREATE INDEX idx_agendamento_pac_data ON Agendamento (id_paciente, data_hora);

-- Criação da tabela Pagamento
CREATE TABLE Pagamento (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    id_agendamento INT NOT NULL,
    id_metodo INT NOT NULL,
    data_pagamento DATETIME,
    valor_pago DECIMAL(10,2) NOT NULL,
    status_pagamento ENUM('Aprovado','Pendente','Recusado') DEFAULT 'Pendente',
    codigo_transacao VARCHAR(80),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_agendamento) REFERENCES Agendamento(id_agendamento),
    FOREIGN KEY (id_metodo) REFERENCES Metodo_pagamento(id_metodo)
);

-- Criação da tabela Consulta
CREATE TABLE Consulta (
    id_consulta INT PRIMARY KEY AUTO_INCREMENT,
    id_agendamento INT NOT NULL,
    id_profissional INT NOT NULL,
    id_paciente INT NOT NULL,
    observacoes TEXT,
    resultado TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_agendamento) REFERENCES Agendamento(id_agendamento),
    FOREIGN KEY (id_profissional) REFERENCES Profissional(id_profissional),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);

</code>

📄 **Observação:**  
O script completo do modelo físico foi **incluído** em um arquivo `.sql` localizado na pasta: `src/bd`.

### 4.4. Tecnologias

Para o desenvolvimento da aplicação **Medlar**, foram utilizadas tecnologias que garantem integração eficiente entre o front-end, o back-end e o banco de dados, priorizando desempenho, segurança e escalabilidade.  
A escolha das ferramentas foi baseada em sua robustez, facilidade de manutenção e compatibilidade com os requisitos do sistema.

### 🧠 Tecnologias Utilizadas

| **Dimensão** | **Tecnologia / Ferramenta** |
|---------------|------------------------------|
| **SGBD (Banco de Dados)** | 🗄️ **MySQL** — responsável pelo armazenamento e gerenciamento das informações da aplicação. |
| **Front-end** | 💻 **HTML, CSS e JavaScript** — utilizados na construção das interfaces do usuário e protótipos das telas. |
| **Back-end** | ☕ **Java (Spring Boot)** — responsável pela lógica de negócio e integração entre o sistema e o banco de dados. |
| **IDE de Desenvolvimento** | 🧩 **Visual Studio Code** — ambiente utilizado para escrever, editar e integrar o código com o GitHub. |
| **Controle de Versão** | 🔁 **Git + GitHub** — utilizado para versionamento do código, colaboração e publicação da documentação. |
| **Servidor / Deploy** | 🌐 **GitHub Pages** — hospedagem das páginas web e documentação do projeto. |
| **Modelagem e Diagramas** | 🧮 **Lucidchart / Bizagi Modeler** — criação dos diagramas BPMN e modelagem AS-IS e TO-BE. |
| **Prototipagem de Telas** | 🎨 **Figma / Draw.io** — elaboração dos wireframes e protótipos de baixa fidelidade das telas do aplicativo. |

---

#### 💡 Descrição das Tecnologias Utilizadas

- **MySQL:** Banco de dados relacional utilizado para armazenar as informações do sistema, como cadastros de pacientes, profissionais e agendamentos.  
- **Spring Boot (Java):** Framework responsável pela camada de back-end, fornecendo APIs integradas ao banco de dados.  
- **HTML + CSS + JavaScript:** Linguagens usadas no front-end para criar uma interface acessível e responsiva.  
- **Git / GitHub:** Ferramentas de controle de versão e colaboração entre os membros do grupo.  
- **Figma:** Utilizado para prototipar as telas e padronizar o design da aplicação.

---

#### 🔁 Fluxo de Interação entre Tecnologias

O diagrama abaixo ilustra como as tecnologias se integram e o caminho percorrido por uma requisição do usuário até o retorno da resposta no sistema.

<img width="1248" height="832" alt="Arquitetura_Medlar_Fluxo2" src="https://github.com/user-attachments/assets/d92506a9-2ec1-4137-822d-1729d8c6f431" />

**Descrição do Fluxo:**
1. O **usuário** acessa o aplicativo via navegador (Front-end em HTML, CSS e JS).  
2. O front-end se comunica com a **API REST** desenvolvida em **Spring Boot**, que processa as solicitações.  
3. O **back-end** envia e recebe dados do **banco MySQL**, realizando validações e regras de negócio.  
4. O resultado é retornado ao front-end, exibindo informações em tempo real para o usuário.  
5. O sistema é hospedado via **GitHub Pages** (interface) e **Render** (API), garantindo disponibilidade e fácil manutenção.

---



