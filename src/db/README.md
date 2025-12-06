# Banco de Dados - PUC Integra

Este diretório contém os scripts e informações sobre a camada de persistência de dados do projeto PUC Integra. O banco de dados escolhido é o **MySQL**, utilizando uma abordagem relacional para garantir a integridade das informações acadêmicas.

## 🗂 Estrutura do Modelo de Dados

O banco de dados `puc_integra` foi modelado utilizando conceitos de especialização e relacionamentos N:N. Abaixo estão as principais tabelas e suas funções:

### Entidades de Usuários
* **PESSOA:** Tabela "pai" que armazena dados comuns (Nome, CPF, Email, Senha).
* **ALUNO:** Especialização de Pessoa. Contém flag de monitoria.
* **PROFESSOR:** Especialização de Pessoa. Contém vínculo com disciplina principal.

### Entidades Acadêmicas
* **CURSO:** Cursos de graduação (ex: Sistemas de Informação).
* **DISCIPLINA:** Matérias ofertadas (ex: Algoritmos, Banco de Dados).
* **CURSO_DISCIPLINA:** Tabela associativa que liga cursos às disciplinas.

### Core do Sistema (Interações)
* **PERGUNTA:** Armazena as dúvidas, vinculadas a um Aluno e uma Disciplina.
* **RESPOSTA:** Respostas dadas por qualquer Pessoa (Aluno ou Professor).
* **REACAO:** Tabela de likes/dislikes em respostas.
* **ANEXOS (Pergunta/Resposta):** Tabelas para armazenar referências de arquivos enviados.
* **PALAVRA_CHAVE:** Sistema de tags para categorização.

## ⚙️ Como utilizar o Script SQL

O arquivo `scripts.sql` presente nesta pasta contém a definição completa do esquema (DDL).

1.  **Reset:** O script inicia com um `DROP DATABASE IF EXISTS`, o que significa que **rodar este script apagará todos os dados existentes** no banco `puc_integra`. Use com cuidado em produção.
2.  **Criação:** Cria o database e todas as tabelas com as constraints de chave estrangeira (FK) corretas.
3.  **Execução:**
    * Abra o MySQL Workbench ou terminal.
    * Copie e cole o conteúdo de `scripts.sql`.
    * Execute todo o script.

## 🔒 Credenciais e Conexão

A aplicação Java se conecta a este banco através das configurações definidas em `src/main/resources/application.properties`.

* **Database:** `puc_integra`
* **Porta Padrão:** `3306`
* **Timezone:** UTC (Configurado na string de conexão JDBC)