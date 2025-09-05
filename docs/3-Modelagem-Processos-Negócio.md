## 3. Modelagem dos Processos de Negócio


> **Links Úteis**:
> - [Modelagem de Processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 Dicas Práticas de Modelagem de Processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

### 3.1. Modelagem da situação atual (Modelagem AS IS)

#### 3.1.1. Descrição Geral

O processo atual para cadastrar profissionais da saúde e pacientes,e encontrar e contratar profissionais de saúde para atendimento domiciliar (home care) é predominantemente manual, fragmentado e baseado em redes de contatos informais. Famílias que necessitam de cuidados para pacientes em casa e profissionais autônomos que oferecem esses serviços enfrentam um cenário ineficiente, com pouca tecnologia e sem uma plataforma centralizada que facilite a conexão. A busca depende de indicações, a comunicação é assíncrona e a gestão de agendamentos e pagamentos é descentralizada, gerando insegurança e retrabalho para ambas as partes.

---

## 3.1.2. Etapas do Processo Atual (Cadastro de Profissionais e Pacientes)

#### Perspectiva da Família/Paciente (Ex: Mariana, mãe de um paciente)

*   **Coleta de Informações Básicas:** A família ou paciente precisa reunir dados pessoais (nome, CPF, data de nascimento, endereço, telefone, email).
*   **Preenchimento Manual:** O cadastro é feito em formulários físicos ou digitais sem padronização, muitas vezes exigindo envio repetitivo dos mesmos documentos em diferentes locais.
*   **Validação Limitada:** Não há garantia imediata de que os dados foram validados corretamente (ex.: CPF válido, data de nascimento coerente, email no formato certo).
*   **Confirmação Precária:** A confirmação do cadastro ocorre via e-mail ou mensagem simples, podendo se perder facilmente.
*   **Atualização de Dados:** Caso precise atualizar telefone, endereço ou informações de saúde, o processo exige contato direto com o suporte ou preenchimento de novos formulários.
*   **Segurança da Informação:** O armazenamento de dados pessoais e de saúde é descentralizado, muitas vezes sem garantias de privacidade ou integração com outros sistemas de prontuário eletrônico.

### Perspectiva do Profissional de Saúde (Ex: Rafael, enfermeiro)

*   **Reunião de Documentação:** O profissional precisa providenciar informações como nome, CPF, CNPJ (quando aplicável), registro profissional (CRM, COREN, etc.), formação acadêmica, especialidades, endereço, telefone e email.
*   **Envio Manual:** Os dados são enviados manualmente, anexando cópias digitais ou físicas de documentos para validação.
*   **Dependência de Conferência Manual:** A validação de registros profissionais muitas vezes depende de análise manual ou consulta individual no conselho de classe.
*   **Confirmação Irregular:** O retorno sobre aprovação ou recusa do cadastro é demorado e pouco padronizado, o que atrasa o início da atuação na plataforma.
*   **Gestão de Alterações:** Caso precise atualizar endereço, telefone, experiência ou especialidade, o processo não é ágil e geralmente depende de um novo envio de documentos.
*   **Integração Restrita:** O cadastro não se conecta automaticamente a sistemas de prontuário eletrônico, agenda digital ou meios de pagamento, obrigando o profissional a manter controles paralelos.

---

### 3.1.3. Pontos Críticos e Dificuldades

*   **Processo Burocrático e Repetitivo:** Tanto pacientes quanto profissionais precisam preencher e enviar as mesmas informações em diferentes cadastros, o que gera retrabalho e demora.
*   **Validações Incompletas:** Falta verificação automática de CPF/CNPJ, idade mínima, emails e registros profissionais, gerando risco de erros e inconsistências.
*   **Insegurança de Dados:** Armazenamento descentralizado e ausência de padrões de privacidade aumentam o risco de perda ou uso indevido de informações sensíveis.
*   **Demora na Aprovação:** A validação manual de credenciais profissionais retarda o processo de disponibilização do serviço.
*   **Dificuldade de Atualização:** Alterações cadastrais exigem processos manuais, lentos e muitas vezes pouco acessíveis ao usuário.
*   **Ausência de Integração:** Falta de conexão com sistemas de prontuário eletrônico, plataformas de pagamento ou conselhos profissionais dificulta a centralização e a confiabilidade das informações.


---

## 3.1.2. Etapas do Processo Atual(Busca de profissionais)

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

[PROCESSO 2 - Gerenciamento de Busca e Contratação de Profissional de Saúde Domiciliar](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")
