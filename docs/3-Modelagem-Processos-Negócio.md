# Processo de Cadastro no Aplicativo Home Care

Este documento detalha o processo de cadastro de profissionais e usuários no aplicativo Home Care, com base nas informações fornecidas sobre os principais processos de negócio e requisitos do sistema.

## Participantes do Processo

Os principais participantes envolvidos no processo de cadastro e utilização do aplicativo são:

*   **Pacientes:** Indivíduos que necessitam de cuidados contínuos em domicílio (acamados, idosos, pós-cirúrgicos, etc.).
*   **Familiares/Cuidadores:** Responsáveis pelo paciente, que gerenciam a contratação e o acompanhamento dos serviços.
*   **Profissionais da Saúde:** Técnicos de enfermagem, enfermeiros, fisioterapeutas e fonoaudiólogos que prestam os serviços.
*   **Administradores da Plataforma:** Equipe responsável pela gestão, manutenção e segurança do aplicativo.

## Principais Processos de Negócio - Foco no Cadastro

Com base na análise estratégica e nos objetivos do projeto, o processo de cadastro é um dos processos de negócio essenciais que o aplicativo deverá controlar:

### 1. Cadastro de Profissionais

O sistema deve permitir que profissionais da saúde criem um perfil detalhado, incluindo informações pessoais, formação, especialidades, áreas de atendimento e validação de credenciais. Este processo é crucial para que os profissionais possam ser encontrados por pacientes que necessitam de atendimento domiciliar, otimizando suas agendas e aumentando sua renda.

## Histórias de Usuários Relacionadas ao Cadastro

As seguintes histórias de usuários ilustram a importância do processo de cadastro:

| EU COMO... | QUERO/PRECISO ... | PARA ... |
|---|---|---|
| Familiar de paciente acamado | Agendar atendimento domiciliar com profissional de saúde | Garantir o cuidado contínuo e adequado para o paciente |
| Profissional de saúde (Enfermeiro, Fisioterapeuta, Fonoaudiólogo) | Ser encontrado por pacientes que precisam de atendimento domiciliar | Aumentar minha renda e otimizar meu tempo de trabalho |
| Administrador do sistema | Gerenciar o cadastro de pacientes e profissionais | Manter a base de dados atualizada e organizada |

## Requisitos Funcionais Relacionados ao Cadastro

Os requisitos funcionais do aplicativo Home Care que se relacionam diretamente com o processo de cadastro são:

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RF-001 | Permitir o cadastro de pacientes e familiares | ALTA |
| RF-002 | Permitir o cadastro de profissionais de saúde | ALTA |

## Requisitos Não Funcionais Relacionados ao Cadastro

Os requisitos não funcionais que impactam o processo de cadastro incluem:

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RNF-001 | O sistema deve ser responsivo e compatível com dispositivos móveis (smartphones e tablets) | ALTA |
| RNF-002 | O aplicativo deve garantir a segurança e privacidade dos dados sensíveis dos pacientes (senhas criptografadas, controle de acessos, auditoria de log) | ALTA |
| RNF-004 | A interface do usuário deve ser intuitiva e de fácil usabilidade para pacientes, familiares e profissionais de saúde | ALTA |

## Restrições Relacionadas ao Cadastro

As restrições que podem afetar o processo de cadastro são:

| ID | Restrição |
|---|---|
| 01 | O desenvolvimento inicial pode ser limitado por custos e recursos disponíveis. |
| 02 | A adoção do aplicativo pode enfrentar resistência inicial de usuários e profissionais. |
| 04 | A segurança e privacidade dos dados do paciente são críticas e exigem atenção contínua. |
| 05 | A disponibilidade de profissionais qualificados na plataforma pode variar por região. |

## Conclusão

O processo de cadastro é a porta de entrada para o aplicativo Home Care, sendo crucial para o sucesso da plataforma. A implementação de um sistema de cadastro eficiente, seguro e intuitivo é fundamental para atrair e reter tanto profissionais de saúde quanto pacientes e seus familiares. Ao garantir a validação de credenciais, a facilidade de uso e a proteção dos dados, o aplicativo poderá construir uma base sólida de usuários, otimizando a conexão entre oferta e demanda por serviços de saúde domiciliar e contribuindo para a melhoria da qualidade de vida dos pacientes.

---

## 3. Modelagem dos Processos de Negócio


> **Links Úteis**:
> - [Modelagem de Processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 Dicas Práticas de Modelagem de Processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

### 3.1. Modelagem da situação atual (Modelagem AS IS)

#### 3.1.1. Descrição Geral

O processo atual para encontrar e contratar profissionais de saúde para atendimento domiciliar (home care) é predominantemente manual, fragmentado e baseado em redes de contatos informais. Famílias que necessitam de cuidados para pacientes em casa e profissionais autônomos que oferecem esses serviços enfrentam um cenário ineficiente, com pouca tecnologia e sem uma plataforma centralizada que facilite a conexão. A busca depende de indicações, a comunicação é assíncrona e a gestão de agendamentos e pagamentos é descentralizada, gerando insegurança e retrabalho para ambas as partes.

#### 3.1.2. Etapas do Processo Atual

**Perspectiva da Família (Ex: Mariana, mãe de um paciente):**

1.  **Identificação da Necessidade:** A família recebe uma recomendação médica ou percebe a necessidade de um profissional de saúde (enfermeiro, fisioterapeuta, etc.) para cuidados contínuos em casa.

2.  **Busca por Indicações:** A busca começa de forma informal, pedindo recomendações a amigos, familiares, outros médicos ou em grupos de redes sociais. Não há um local centralizado para encontrar profissionais qualificados e com referências.

3.  **Contato e Verificação Individual:** A família entra em contato, um por um, com os profissionais indicados. Para cada um, é preciso verificar credenciais, experiência, disponibilidade de agenda e negociar valores. Este processo é lento, repetitivo e marcado por longas esperas por resposta.

4.  **Negociação e Agendamento Manual:** Após encontrar um profissional adequado, o agendamento é feito verbalmente ou por mensagem de texto. A família anota em uma agenda pessoal, sem um sistema formal de confirmação ou lembretes.

5.  **Acompanhamento e Pagamento:** O acompanhamento da evolução do paciente é feito por anotações informais. O pagamento é realizado diretamente ao profissional (via PIX, dinheiro), e o controle financeiro é manual.

**Perspectiva do Profissional (Ex: Rafael, enfermeiro):**

1.  **Divulgação dos Serviços:** O profissional depende do marketing "boca a boca", distribuindo cartões e informando sua rede de contatos que está disponível para atendimentos domiciliares.

2.  **Gestão de Contatos:** Recebe ligações e mensagens de potenciais clientes em horários variados, muitas vezes durante outros atendimentos, o que dificulta a resposta imediata.

3.  **Conciliação de Agenda:** Precisa consultar sua agenda pessoal (caderno, calendário do celular) para verificar horários livres, calcular tempos de deslocamento e encaixar novos pacientes, um verdadeiro quebra-cabeça logístico.

4.  **Carga Administrativa:** Gasta tempo considerável com tarefas não clínicas, como negociação, agendamento, planejamento de rotas e controle financeiro, o que limita seu potencial de renda.

#### 3.1.3. Pontos Críticos e Dificuldades

*   **Processo Lento e Ineficiente:** A busca manual e a negociação individual consomem muito tempo tanto da família quanto do profissional, atrasando o início de cuidados que podem ser urgentes.

*   **Insegurança e Falta de Transparência:** Não há um método padronizado para verificar as credenciais e o histórico dos profissionais. Da mesma forma, os profissionais não têm garantia sobre as condições de trabalho ou o pagamento.

*   **Susceptibilidade a Erros:** O agendamento manual está sujeito a erros, esquecimentos e conflitos de horário. O controle financeiro descentralizado também pode levar a falhas.

*   **Comunicação Fragmentada:** A comunicação via telefone e WhatsApp é desorganizada, dificultando o registro de informações importantes sobre o paciente e o compartilhamento de atualizações entre a família e o profissional.

*   **Dificuldade de Otimização:** Os profissionais têm dificuldade em preencher lacunas em suas agendas e otimizar suas rotas, resultando em perda de tempo e de potencial de faturamento.

 #### 3.1.4. Conclusão

O modelo atual de conexão para serviços de home care é insustentável e ineficiente para ambas as partes. A falta de uma plataforma digital centralizada gera um ciclo de retrabalho, insegurança e sobrecarga administrativa. Essas limitações demonstram a clara necessidade de uma solução como o Medlar, que automatize a busca, valide as credenciais, centralize a comunicação e simplifique o agendamento e o pagamento, trazendo mais segurança, eficiência e profissionalismo ao mercado de cuidados domiciliares.


<img width="760" height="439" alt="Captura de tela 2025-09-03 210220" src="https://github.com/user-attachments/assets/99677aee-66ca-485a-8d69-313dda1ac2b7" />

---

### 3.2. Descrição geral da proposta (Modelagem TO BE)

A proposta consiste na implementação de um aplicativo digital para gestão de atendimentos domiciliares (Home Care), que centraliza e automatiza todo o processo de conexão entre pacientes, familiares e profissionais de saúde. O sistema tem como objetivo eliminar a fragmentação e o retrabalho identificados no modelo atual (AS-IS), promovendo eficiência, segurança e acessibilidade.

A solução permitirá que famílias encontrem profissionais de forma simples e confiável, por meio de perfis verificados, avaliações de usuários e filtros inteligentes. O agendamento será realizado diretamente na plataforma, com confirmações automáticas, notificações e lembretes, garantindo organização e evitando falhas de comunicação.

Para os profissionais, o aplicativo oferecerá gestão integrada de agenda, rotas, histórico de pacientes e faturamento, reduzindo a carga administrativa e aumentando a produtividade. Além disso, contará com prontuário digital, relatórios de evolução do paciente, chat seguro e geolocalização em tempo real, proporcionando maior transparência e confiança no serviço.

Com essa proposta, os processos hoje manuais, repetitivos e descentralizados passam a ser digitalizados, padronizados e escaláveis, criando um ecossistema de Home Care moderno, seguro e de fácil uso, que beneficia pacientes, familiares e profissionais de saúde.

---

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](./processos/processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")
