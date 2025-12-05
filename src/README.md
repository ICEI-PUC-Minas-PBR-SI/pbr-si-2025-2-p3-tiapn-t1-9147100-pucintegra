# PUC Integra - Plataforma de Colaboração Acadêmica

O **PUC Integra** é um sistema web colaborativo inspirado no modelo de perguntas e respostas (Q&A), desenvolvido especificamente para a comunidade acadêmica da Pontifícia Universidade Católica de Minas Gerais. O objetivo é promover a interação, validação de conhecimento e compartilhamento de materiais entre alunos e professores.

## 📋 Sobre o Projeto

A aplicação visa resolver a fragmentação da comunicação acadêmica, oferecendo um ambiente centralizado onde:
* **Alunos** podem postar dúvidas, responder colegas e compartilhar materiais.
* **Professores** podem validar respostas, moderar conteúdo e atribuir status de monitor.
* **Conteúdo** é organizado por cursos e disciplinas oficiais da instituição.

## 🚀 Tecnologias Utilizadas

O projeto segue uma arquitetura baseada em APIs RESTful:

* **Back-end:** Java 17 com Framework Spring Boot (Web, JPA, Security).
* **Banco de Dados:** MySQL 8.0.
* **Front-end:** HTML5, CSS3, JavaScript (Vanilla ES6+).
* **Autenticação:** JWT (JSON Web Token) e BCrypt para criptografia.

## 📂 Estrutura de Diretórios

A estrutura do código-fonte está organizada da seguinte forma:

* `src/main/java`: Código-fonte da API (Controllers, Models, Repositories, Services).
* `src/main/resources`: Configurações do Spring (`application.properties`) e uploads.
* `src/front`: Interface do usuário (HTML, CSS, JS) desacoplada.
* `src/db`: Scripts SQL para modelagem e criação do banco.
* `docs`: Documentação de engenharia de software e diagramas.

## 🔧 Guia de Instalação e Execução

### 1. Configuração do Banco de Dados
Antes de iniciar a aplicação Java, é necessário preparar o banco:
1.  Tenha o MySQL instalado e rodando na porta `3306`.
2.  Acesse a pasta `src/db` e execute o arquivo `scripts.sql` no seu cliente MySQL (Workbench, DBeaver) para criar o schema `puc_integra` e as tabelas.
3.  Verifique as credenciais no arquivo `src/main/resources/application.properties` e ajuste `username` e `password` conforme sua instalação local.

### 2. Executando o Back-end (API)
1.  Na raiz do projeto, execute via Maven:
    ```bash
    mvn spring-boot:run
    ```
2.  A API estará disponível em `http://localhost:8080`.

### 3. Executando o Front-end
Como o front-end é estático e consome a API via `fetch`:
1.  Navegue até a pasta `src/front/html`.
2.  Você pode abrir o arquivo `homepage.html` diretamente no navegador ou utilizar uma extensão como **Live Server** (VS Code) para evitar problemas de CORS e caminhos relativos.

## 🛠 Funcionalidades Implementadas

* **Autenticação:** Login e Cadastro com distinção automática de Aluno/Professor.
* **Feed de Perguntas:** Listagem com filtros por disciplina e busca por tema.
* **Interação:** Criação de perguntas (com editor rico e anexos), respostas e reações (Like/Dislike).
* **Perfil:** Visualização de estatísticas do usuário, edição de foto/bio e gestão de monitores (perfil Professor).

## 👥 Equipe
Trabalho Interdisciplinar - Sistemas de Informação (PUC Minas)