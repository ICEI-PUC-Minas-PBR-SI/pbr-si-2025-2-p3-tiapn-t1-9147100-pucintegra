# 1 - Especificações do Projeto

A definição do problema parte da dificuldade enfrentada por microempreendedores individuais (MEIs) e profissionais autônomos em manter um controle financeiro eficiente. Muitos ainda utilizam métodos manuais ou informais (planilhas, cadernos, anotações soltas), o ocasiona a perda de dados, erros e falta de clareza sobre a real situação financeira do negócio.  
 
A solução proposta é o **Smart Gestão**, um sistema de controle financeiro que permite registrar e categorizar receitas e despesas, emitir relatórios, gerar alertas e apoiar o planejamento estratégico do usuário.  
 
Nesta seção, serão apresentadas as **personas**, as **histórias de usuários**, os **requisitos funcionais e não funcionais** e as **restrições do projeto**, elaborados a partir de técnicas de modelagem de software e práticas de análise de requisitos.

---

## 2 - Requisitos Mínimos do Sistema  

O sistema **Smart Gestão** foi projetado para ser executado em equipamentos com configuração acessível, de forma a atender a realidade de microempreendedores individuais e profissionais autônomos. Para isso, foram definidos requisitos mínimos de hardware e software compatíveis com a execução em computadores pessoais e dispositivos móveis atuais.  

### 2.1 - Hardware mínimo recomendado
- **Processador:** Intel Core i3 (8ª geração ou superior) / AMD Ryzen 3 (3200U ou superior)  
- **Memória RAM:** 8 GB  
- **Armazenamento:** 2 GB livre em disco  
- **Tela:** Resolução mínima de 1024x768 pixels  
- **Rede:** Conexão com a internet  

### 2.2 - Softwares recomendados 
- **Sistema Operacional:** Windows 10 ou superior, Linux Ubuntu 20+, Android 11+ ou iOS 14+  
- **Navegadores compatíveis:** Chrome, Edge, Firefox ou Safari (versões recentes)  
- **Banco de Dados:** PostgreSQL 13+ ou MySQL 8+  
- **Servidor de Aplicação:** Node.js 18+ ou equivalente open-source  

---

## 3 - Personas  
 
- **3.1 - João, 32 anos – Microempreendedor de serviços locais**  
João é dono de uma barbearia em seu bairro. Trabalha sozinho e atende em média 15 clientes por dia. Apesar do bom movimento, enfrenta dificuldades para organizar suas finanças, já que ainda faz os registros em um caderno antigo. Casado e pai de um filho pequeno, ele tem pouco tempo para lidar com planilhas complexas e teme perder o controle do fluxo de caixa. Sonha em expandir seu negócio, mas sabe que precisa de mais clareza sobre lucros e despesas para tomar decisões estratégicas.  
 
- **3.2 - Ana, 28 anos – Vendedora autônoma online**  
Ana vende cosméticos e acessórios em redes sociais e marketplaces. Solteira e bastante conectada ao mundo digital, ela lida diariamente com dezenas de transações pequenas, o que torna difícil visualizar seus lucros reais. Apesar de usar planilhas esporadicamente, acaba se perdendo com a alta demanda. Ana gostaria de uma solução simples no celular para acompanhar receitas, despesas e resultados em tempo real, ajudando-a a investir melhor em marketing e estoque.  
 
- **3.3 - Carlos, 41 anos – Prestador de serviços de manutenção**  
Carlos é casado e tem dois filhos adolescentes. Trabalha com pequenos reparos em domicílios, como eletricidade e encanamento. Costuma anotar seus ganhos e gastos em papéis soltos e frequentemente mistura finanças pessoais com profissionais. Isso gera dificuldades na hora de calcular margens de lucro e planejar investimentos. Carlos deseja separar melhor suas contas e ter um sistema que o ajude a entender se realmente está lucrando no fim do mês.  
 
- **3.4 - Marina, 36 anos – Dona de restaurante local**  
Marina administra um pequeno delivery de refeições caseiras. Casada e apaixonada por gastronomia, investe muito tempo na cozinha e pouco no gerenciamento do negócio. Utiliza anotações manuais para organizar custos e pagamentos, mas sofre com atrasos em contas e falta de controle sobre tributos. Ela precisa de relatórios claros sobre faturamento e custos, além de alertas que a ajudem a não perder prazos. Seu objetivo é organizar as finanças para manter o restaurante sustentável e, no futuro, abrir uma segunda unidade.
 
---

## 4 - Histórias de Usuários  
 
| EU COMO… (Persona) | QUERO/PRECISO… (Funcionalidade) | PARA… (Motivo/Valor) |
|---------------------|---------------------------------|-----------------------|
| Ana | Classificar transações por categoria | Identificar padrões de gastos |
| Ana | Registrar transações pelo celular | Não perder registros quando estiver em trânsito |
| Ana | Ter garantia de segurança nos dados | Confiar que informações não serão vazadas |
| Carlos | Visualizar relatórios gráficos mensais | Facilitar análise financeira |
| Carlos | Exportar relatórios em PDF/Excel | Compartilhar com contador |
| João | Cadastrar receitas e despesas rapidamente | Ter controle diário do caixa |
| João | Receber alertas de vencimento de tributos | Evitar multas e atrasos |
| João | Cadastrar fornecedores | Organizar despesas recorrentes |
| Marina | Definir metas de gastos | Controlar orçamento e evitar excessos |
| Marina | Ter um dashboard inicial com visão geral | Tomar decisões rápidas |

---

## 5 - Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

---
# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Esta seção descreve a solução proposta a partir da perspectiva do usuário. São apresentadas as **personas**, as **histórias de usuários**, os **requisitos funcionais e não funcionais** e as **restrições** do projeto.  

Para elaborar esta etapa, utilizamos as seguintes **técnicas e ferramentas**:  
- **Personas**: criadas com base em perfis de alunos, professores e gestores da PUC Minas, aplicando **mapa de empatia** e levantamento de stakeholders.  
- **Histórias de usuários (User Stories)**: elaboradas com base em práticas ágeis, utilizando o modelo **EU COMO... QUERO... PARA...**.  
- **Requisitos funcionais e não funcionais**: definidos a partir das histórias e priorizados pela técnica **MoSCoW (Must, Should, Could, Won’t)**.  
- **Restrições**: estabelecidas de acordo com as normas institucionais e de segurança digital da PUC Minas. 

## Personas

1. **Clara Monteverde (Aluna):**  21 anos, estudante de Análise e Desenvolvimento de Sistemas. Mora em Belo Horizonte, solteira. Busca otimizar seus estudos, utilizando a internet de forma segura e confiável.  

2. **Rafael Antunes (Professor):**  54 anos, professor de Algoritmos e Estrutura de Dados. Casado, 2 filhos, mora em Contagem. Deseja atender melhor seus alunos fora da sala de aula, oferecendo suporte digital.  

3. **Mariana Costa (Administradora):**  29 anos, responsável pela gestão administrativa e moderação. Casada, mãe de 1 filho, mora em BH. Busca manter a plataforma segura, organizada e dentro das normas institucionais.  

4. **Lucas Oliveira (Aluno):** 23 anos, faz estágio em desenvolvimento e cursa Engenharia de Software. Mora em Betim. Gosta de colaborar em fóruns, responder dúvidas e compartilhar materiais. Vê na plataforma uma oportunidade de reforçar o portfólio acadêmico.  

5. **Fernanda Dias (Monitora):**  32 anos, tutora da área de TI no campus Barreiro. Mora em Belo Horizonte. Precisa acompanhar os alunos, sugerir materiais de apoio e validar respostas técnicas.  


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

## Histórias de Usuários

| EU COMO...   | QUERO/PRECISO ...                  | PARA ...                                                      |
|--------------|------------------------------------|----------------------------------------------------------------|
| Clara Monteverde (Aluna)       | Tirar minhas dúvidas em um canal confiável | Otimizar meu aprendizado e me preparar para avaliações |
| Lucas Oliveira (Aluno)      | Acessar materiais de diferentes disciplinas | Integrar meus estudos em um único ambiente |
| Clara Monteverde (Aluna)       | Avaliar respostas de colegas        | Contribuir para a qualidade das interações |
| Rafael Antunes (Professor)    | Responder alunos via web            | Apoiar o aprendizado e economizar tempo de atendimento individual |
| Rafael Antunes (Professor)    | Indicar materiais complementares    | Direcionar melhor os estudos dos alunos |
| Mariana Costa (Administradora)| Aplicar as políticas de uso         | Garantir que a plataforma seja usada de forma correta |
| Mariana Costa (Administradora)| Gerar relatórios de uso e interações| Monitorar engajamento e desempenho da plataforma |
| Fernanda Dias (Monitora)        | Validar respostas técnicas dos alunos| Garantir que o conteúdo publicado esteja correto e confiável |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID     | Descrição do Requisito  | Prioridade |
|--------|-------------------------|------------|
| RF-001 | Permitir cadastro e autenticação de usuários com credenciais da PUC | ALTA |
| RF-002 | Permitir envio de dúvidas pelos alunos | ALTA |
| RF-003 | Permitir que professores e tutores respondam dúvidas | ALTA |
| RF-004 | Permitir que usuários avaliem respostas (curtida/nota) | MÉDIA |
| RF-005 | Disponibilizar materiais de apoio e bibliografia recomendada | ALTA |
| RF-006 | Permitir personalização do perfil do usuário (foto, bio, curso) | MÉDIA |
| RF-007 | Emitir relatórios de participação e desempenho | MÉDIA |
| RF-008 | Possibilitar moderação de conteúdos pela equipe administrativa | ALTA |
| RF-009 | Manter registro de interações (perguntas, respostas, avaliações) | ALTA |
| RF-010 | Permitir integração futura com calendário acadêmico e portal do aluno | BAIXA |

### 5.1 - Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|------------|------------|
| RF-001 | Permitir o cadastro de receitas e despesas | ALTA |
| RF-002 | Classificar transações em categorias predefinidas (ex.: alimentação, transporte, contas fixas) | ALTA |
| RF-003 | Emitir relatórios financeiros simples (mensais e anuais) em formato de tabela | ALTA |
| RF-004 | Exibir gráficos básicos (pizza e barra) para análise de despesas e receitas | MÉDIA |
| RF-005 | Permitir que o usuário defina metas de gastos mensais por categoria | MÉDIA |
| RF-006 | Emitir lembretes automáticos de pagamentos (ex.: tributos e contas recorrentes) | MÉDIA |
| RF-007 | Exibir um painel inicial (dashboard) com resumo das principais informações financeiras | ALTA |
| RF-008 | Permitir exportação de relatórios em PDF | MÉDIA |
| RF-009 | Possibilitar cadastro básico de fornecedores e clientes | MÉDIA |
| RF-010 | Disponibilizar acesso ao sistema via navegador (desktop) e versão simplificada mobile | ALTA |

---

### 5.2 - Requisitos Não Funcionais
|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O login deve ser realizado com as credenciais institucionais da PUC | ALTA | 
|RNF-002| Todo tráfego de dados deve ser protegido por protocolos de segurança. |  ALTA | 
|RNF-003| O sistema precisa diferenciar permissões de acordo com o perfil do usuário. | MÉDIA | 
|RNF-004| Informações sensíveis, como senhas, devem ser armazenadas de forma criptografada. |  ALTA | 
|RNF-005| A plataforma deve manter registros de atividades críticas para auditoria. |  ALTA |
|RNF-006| O tempo de carregamento das páginas deve ser inferior a 2 segundos em situações normais. | MÉDIA | 
|RNF-007| A aplicação deve suportar uma quantidade definida de acessos simultâneos sem perda significativa de desempenho. | MÉDIA | 
|RNF-008| O código deve seguir boas práticas de desenvolvimento para facilitar melhorias. | MÉDIA | 
|RNF-009| A arquitetura do sistema deve ser modular, favorecendo correções e novas implementações. |  MÉDIA | 
|RNF-010| Deve haver documentação atualizada dos principais componentes. |  ALTA | 
|RNF-011| A interface deve ser simples e intuitiva, de fácil uso para alunos e professores. | ALTA | 
|RNF-012| O sistema deve seguir padrões de acessibilidade, garantindo acesso a pessoas com deficiência. |  ALTA | 
|RNF-013| O layout precisa ser responsivo, funcionando bem em computadores, tablets e celulares. | MÉDIA | 
|RNF-014| A aplicação deve funcionar nos principais navegadores atuais. | ALTA | 
|RNF-015| Deve haver backups automáticos e periódicos do banco de dados. | MÉDIA |
|RNF-016| Nenhum dado deve ser perdido em situações de queda do sistema. | ALTA | 
|RNF-017| A plataforma deve possibilitar integrações futuras com outros serviços acadêmicos, como calendário e portal do aluno | BAIXA | 
|RNF-018| O sistema deve possibilitar o acompanhamento de desempenho e uso. |  MÉDIA | 

| ID | Descrição | Prioridade |
|----|------------|------------|
| RNF-001 | O sistema deve ser responsivo, permitindo uso em diferentes dispositivos (PCs e celulares) | ALTA |
| RNF-002 | O tempo médio de resposta das operações deve ser de até **5 segundos** | MÉDIA |
| RNF-003 | O sistema deve ser compatível com navegadores modernos (Chrome, Firefox, Edge) | ALTA |
| RNF-004 | Os dados do usuário devem ser armazenados de forma segura em banco de dados | ALTA |
| RNF-005 | O banco de dados deve suportar ao menos **1.000 registros de transações** sem perda de desempenho | MÉDIA |
| RNF-006 | O sistema deve ser implementado de forma modular, facilitando futuras expansões | MÉDIA |
| RNF-007 | A interface deve ser simples, intuitiva e de fácil navegação para usuários não técnicos | ALTA |
| RNF-008 | O login deve exigir usuário e senha, com recuperação básica de senha por e-mail | MÉDIA |
| RNF-009 | A arquitetura deve possibilitar futura integração com APIs externas (ex.: serviços contábeis) | BAIXA |

---

### 5.3 - Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Descrição |
|----|------------|
| R-01 | O projeto deverá ser entregue até a data limite estabelecida pela disciplina |
| R-02 | O sistema deve ser desenvolvido apenas com tecnologias open-source e gratuitas |
| R-03 | O sistema não terá integração bancária direta nesta versão inicial |
| R-04 | O escopo do projeto está limitado ao **controle de receitas e despesas**, não incluindo contabilidade avançada |
| R-05 | A disponibilidade obrigatória do sistema está restrita ao período de apresentação/testes acadêmicos |
| R-06 | O desenvolvimento deve seguir o cronograma definido em sprints |
| R-07 | O sistema não contemplará funcionalidades de análise preditiva ou inteligência artificial nesta versão inicial |
|ID| Restrição                                             |
|--|-------------------------------------------------------|
|R-01| A aplicação deve utilizar infraestrutura compatível com os padrões da PUC Minas. |
|R-02| O banco de dados deve armazenar informações apenas em servidores autorizados e que atendam às normas da universidade. |
|R-03| Apenas usuários com vínculo ativo com a PUC Minas poderão criar contas e acessar os conteúdos. |
|R-04| Dados sensíveis não poderão ser compartilhados fora do ambiente institucional. |
|R-05| Alunos só poderão postar dúvidas e respostas após autenticação no sistema. |
|R-06| A moderação de conteúdos inapropriados ficará restrita à equipe administrativa da instituição. |
|R-08| A plataforma deve seguir o padrão visual e de identidade institucional da PUC Minas. |
|R-09| Somente informações autorizadas poderão ser integradas ao calendário acadêmico e bibliografia institucional. |
|R-10| O acesso externo (fora da comunidade acadêmica da PUC) será restrito, salvo autorização expressa da instituição. |
|R-11| O acesso será restrito a estudantes da área de Tecnologia da Informação da PUC Minas. |

## Matriz de Rastreabilidade
A tabela abaixo mostra a relação entre as **Histórias de Usuários** e os **Requisitos funcionais e não-funcionais** que garantem sua implementação.

| História de Usuário                                                                 | Requisitos Relacionados |
|-------------------------------------------------------------------------------------|--------------------------|
| **EU, Clara Monteverde, COMO aluna quero tirar minhas dúvidas em um canal confiável para otimizar meu aprendizado** | RF-002, RF-003, RNF-001, RNF-002 |
| **EU, Clara Monteverde, COMO aluna quero acessar materiais de diferentes disciplinas para integrar meus estudos em um único ambiente** | RF-005, RF-009, RNF-013 |
| **EU, Lucas Oliveira, COMO aluna quero avaliar respostas de colegas para contribuir para a qualidade das interações** | RF-004, RF-009 |
| **EU, Rafael Antunes, COMO professor quero responder alunos via web para apoiar o aprendizado** | RF-003, RF-005, RNF-011 |
| **EU, Rafael Antunes, COMO professor quero indicar materiais complementares para direcionar melhor os estudos dos alunos** | RF-005, RNF-010 |
| **EU, Mariana Costa, COMO administradora quero aplicar as políticas de uso para garantir que a plataforma seja usada de forma correta** | RF-008, RNF-003, RNF-005 |
| **EU, Mariana Costa, COMO administradora quero gerar relatórios de uso e interações para monitorar engajamento** | RF-007, RF-009, RNF-018 |
| **EU, Rafael Antunes, COMO professor quero validar respostas técnicas dos alunos para garantir confiabilidade do conteúdo** | RF-003, RF-008, RNF-004 |
| **EU, Lucas Oliveira, COMO aluno quero personalizar meu perfil para ter uma identidade no ambiente virtual** | RF-006, RNF-011, RNF-013 |
| **EU, Mariana Costa, COMO administradora quero que apenas usuários com vínculo ativo possam acessar** | RF-001, RNF-001, R-03 |
