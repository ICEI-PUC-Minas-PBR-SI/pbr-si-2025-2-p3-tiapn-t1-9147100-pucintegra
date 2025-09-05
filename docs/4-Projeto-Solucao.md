## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução


4. Projeto da Solução 

4.1. Arquitetura da Solução 

A arquitetura proposta para o sistema de controle de despesas para MEIs e profissionais autônomos é baseada em um modelo cliente-servidor, com uma abordagem moderna que visa escalabilidade, desempenho e facilidade de manutenção. Conforme o diagrama abaixo, a solução será dividida em três camadas principais: Frontend, Backend e Banco de Dados, com o deploy do Frontend sendo realizado via GitHub Pages e o Backend em uma plataforma de hospedagem, interagindo com um serviço de API. 



Descrição dos Módulos e Tecnologias: 

•Frontend (Navegador): O sistema será acessado via navegador web, utilizando Páginas Web (HTML, CSS e JavaScript) para a construção da interface do usuário. Esta camada será responsável por toda a interação visual e coleta de dados do usuário. O Local Storage será utilizado para armazenar dados temporários ou preferências do usuário, otimizando a experiência e reduzindo a dependência de requisições constantes ao servidor para informações não críticas. O deploy do frontend será realizado através do GitHub Pages, garantindo acessibilidade e facilidade de atualização. 

•Backend (Hospedagem - Java SpringBoot): A lógica de negócio principal do sistema será implementada no backend, hospedado em uma plataforma como o Heroku. Esta camada será desenvolvida utilizando Java SpringBoot, um framework robusto e amplamente utilizado para a criação de aplicações corporativas e APIs RESTful. O backend será responsável por processar as requisições do frontend, gerenciar a autenticação e autorização dos usuários, aplicar as regras de negócio para o controle de despesas (registro, categorização, cálculo de saldos, etc.) e interagir com o banco de dados. 

•Banco de Dados (MySQL): Para a persistência dos dados do sistema, será utilizado o MySQL como Sistema Gerenciador de Banco de Dados (SGBD). O MySQL é uma escolha popular devido à sua robustez, escalabilidade e compatibilidade com o SpringBoot, garantindo a segurança e a integridade das informações financeiras dos usuários. 

•APIs Externas (Exemplo NewsAPI): Embora o diagrama de exemplo inclua uma NewsAPI, para o nosso sistema de controle de despesas, poderíamos considerar a integração com APIs externas para funcionalidades futuras, como, por exemplo, APIs de bancos para importação automática de extratos (com consentimento do usuário) ou APIs de serviços de pagamento para conciliação de transações. No momento, o foco principal é a funcionalidade interna de controle de despesas. 

Esta arquitetura permite uma clara separação de responsabilidades, facilitando o desenvolvimento paralelo das equipes de frontend e backend, além de proporcionar flexibilidade para futuras expansões e integrações. 

4.2. Protótipos de Telas (Wireframes) 

A interface visual do sistema está sendo elaborada com foco na simplicidade e usabilidade, atendendo aos requisitos funcionais e não funcionais de acessibilidade e intuitividade para MEIs e profissionais autônomos. Os wireframes são essenciais para visualizar a estrutura e o fluxo de interação do usuário, garantindo que as funcionalidades planejadas sejam apresentadas de forma clara e eficiente. 

Principais Interfaces e sua Elaboração: 

 

•Tela de Login/Cadastro: Essencial para o controle de acesso, garantindo a segurança das informações financeiras. Será simples e direta, solicitando apenas os dados necessários para o registro e autenticação. 

•Dashboard Principal: Visão geral do fluxo de caixa, com gráficos e resumos das receitas e despesas. Esta tela será o ponto central para o acompanhamento financeiro, com acesso rápido às principais funcionalidades. 

•Registro de Transação (Receita/Despesa): Formulário intuitivo para a inserção de novas transações, com campos para valor, data, descrição e categoria. A categorização será um ponto chave para a organização financeira. 

•Gerenciamento de Categorias: Interface para que o usuário possa criar, editar ou excluir categorias personalizadas de receitas e despesas. 

•Relatórios: Telas dedicadas à geração de relatórios por período, categoria ou tipo de transação, com opções de visualização em tabelas e gráficos. 

•Definição de Metas: Interface para que o usuário possa estabelecer metas financeiras (ex: economia mensal, orçamento por categoria) e acompanhar seu progresso. 

•Alertas e Notificações: Configurações para que o usuário receba alertas sobre despesas excessivas, pagamentos a vencer ou metas atingidas. 

Os wireframes estão sendo desenvolvidos para refletir as histórias de usuário levantadas na fase de especificação, garantindo que cada tela atenda a uma necessidade específica do empreendedor. A prototipagem interativa permitirá validar a experiência do usuário antes da implementação completa. 

4.3. Modelo de Dados 

O desenvolvimento da solução requer uma base de dados robusta para o armazenamento e controle de todas as informações financeiras e de usuário. Utilizaremos um modelo de dados relacional, representado por um Diagrama Entidade-Relacionamento (DER), que contemplará todas as entidades e atributos associados aos processos de controle de despesas, além do controle de acesso de usuários. 

4.3.1 Modelo ER (Diagrama Entidade-Relacionamento) 

O DER representará graficamente as entidades do sistema e seus relacionamentos. As principais entidades incluirão: 

•Usuário: Informações do MEI/Autônomo (nome, email, senha, etc.). 

•ContaFinanceira: Representa as contas bancárias ou carteiras digitais do usuário, onde as transações ocorrem. 

•Transacao: Detalhes de cada receita ou despesa (valor, data, descrição, tipo, categoria). 

•Categoria: Classificação das transações (alimentação, transporte, vendas, serviços, etc.). 

•MetaFinanceira: Objetivos financeiros definidos pelo usuário (valor, período, tipo). 

•Alerta: Configurações e histórico de alertas gerados. 

O DER será elaborado para garantir a integridade dos dados e otimizar as consultas, suportando os relatórios e funcionalidades de busca necessários. 

4.3.2 Esquema Relacional 

O Esquema Relacional corresponderá à representação das tabelas no banco de dados, com a definição de chaves primárias, chaves estrangeiras e restrições de integridade. Este esquema detalhará a estrutura de cada tabela, os tipos de dados de cada atributo e os relacionamentos entre as tabelas, garantindo a normalização e a eficiência do banco de dados. 

4.3.3 Modelo Físico (Script SQL) 

O Modelo Físico será o script SQL para a criação das tabelas no MySQL. Este script incluirá as instruções CREATE TABLE com a definição de colunas, tipos de dados, chaves primárias, chaves estrangeiras e quaisquer outras restrições necessárias para implementar o esquema relacional. O script será versionado no repositório do projeto, na pasta src/bd. 

4.4. Tecnologias 

As tecnologias selecionadas para o desenvolvimento do sistema foram escolhidas com base na sua robustez, popularidade, suporte da comunidade e adequação aos requisitos do projeto, conforme a tabela a seguir: 

Dimensão 

Tecnologia 

SGBD 

MySQL 

Front end 

HTML + CSS + JS 

Back end 

Java SpringBoot 

Deploy 

Github Pages 

Como as Tecnologias se Relacionam (Fluxo de Interação): 

1.O usuário acessa o sistema através de um navegador web, que carrega as Páginas Web (HTML, CSS, JS) hospedadas no GitHub Pages. 

2.A interface do usuário, desenvolvida com HTML, CSS e JavaScript, envia requisições (ex: registrar despesa, consultar extrato) para o Backend, implementado em Java SpringBoot. 

3.O Backend processa a requisição, aplica a lógica de negócio e interage com o MySQL (SGBD) para armazenar ou recuperar os dados financeiros. 

4.O MySQL retorna os dados ao Backend. 

5.O Backend envia a resposta (ex: confirmação de registro, lista de transações) de volta para o Frontend. 

6.O Frontend atualiza a interface do usuário, exibindo as informações solicitadas ou confirmando a operação. 

Esta combinação de tecnologias oferece uma solução completa e escalável, desde a interface do usuário até a persistência dos dados, garantindo um desenvolvimento eficiente e um produto final de alta qualidade para os MEIs e profissionais 
