# PUC Integra - Plataforma de Colaboração Acadêmica

O **PUC Integra** é um sistema web colaborativo inspirado no modelo de perguntas e respostas (Q&A), desenvolvido especificamente para a comunidade acadêmica da Pontifícia Universidade Católica de Minas Gerais. O objetivo é promover a interação, validação de conhecimento e compartilhamento de materiais entre alunos e professores.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido seguindo uma arquitetura MVC, utilizando as seguintes tecnologias:

* **Front-end:** HTML5, CSS3, JavaScript (Vanilla).
* **Back-end:** Java com Framework Spring Boot.
* **Banco de Dados:** MySQL 8.0.
* **Versionamento:** Git & GitHub.

## 📂 Estrutura de Diretórios

A estrutura do código-fonte está organizada da seguinte forma:

* `/src`: Contém o código-fonte da aplicação (Java).
* `/src/main/resources`: Configurações do Spring e templates.
* `/front`: Arquivos estáticos do front-end (HTML, CSS, JS, Imagens).
* `/database`: Scripts SQL para criação do banco de dados (Modelo Físico).
* `/docs`: Documentação do projeto.

## 🔧 Como executar o projeto

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* Java JDK 17+
* Maven
* MySQL Server

### Passo 1: Configuração do Banco de Dados
1.  Acesse a pasta `/database`.
2.  Execute o script `scripts.sql` no seu gerenciador de banco de dados (MySQL Workbench, DBeaver, etc.) para criar o banco `puc_integra` e as tabelas necessárias.
3.  Certifique-se de que o serviço do MySQL está rodando na porta `3306`.

### Passo 2: Configuração da Aplicação
1.  Navegue até o arquivo `application.properties` em `/src/main/resources`.
2.  Configure as credenciais do seu banco de dados local:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/puc_integra
    spring.datasource.username=SEU_USUARIO
    spring.datasource.password=SUA_SENHA
    ```

### Passo 3: Executando a aplicação
1.  Abra o terminal na raiz do projeto.
2.  Execute o comando:
    ```bash
    mvn spring-boot:run
    ```
3.  Acesse a aplicação no navegador através do endereço: `http://localhost:8080`.

## 👥 Equipe de Desenvolvimento
Trabalho Interdisciplinar - Sistemas de Informação (PUC Minas)

* Gabriel Rodrigo dos Santos Miguel
* Giovanna Fabíola Vaz
* Luiza Rodrigues Vertelo
* Mateus de Carvalho Freitas
* Ronaldo Pereira de Camargos Júnior

---
*Este projeto é de cunho acadêmico e segue as normas da PUC Minas.*