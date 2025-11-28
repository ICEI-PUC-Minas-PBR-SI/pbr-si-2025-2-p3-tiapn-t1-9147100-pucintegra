# Medlar

`SISTEMAS DE INFORMAÇÃO`

`TRABALHO INTERDICIPLINAR: APLICAÇÃO PROCESSOS DE NEGOCIOS`

`2° semestre - 2025`

O desenvolvimento de um aplicativo para centralizar profissionais de 
saúde no atendimento domiciliar (Home Care) oferece uma solução prática e 
inovadora para pacientes que necessitam de cuidados contínuos.


## Integrantes

* Brenda Vieira Nascimento Santos
* Fernando Rafael da Silva Alves
* Gustavo Souza Rodrigues
* Pablo Vinicius Lazaro da Silva
* Pedro Henrique Lopes Silva
* Pedro Henrique Lima Bomfim

## Orientador

*  Cleia Marcia Gomes Amaral

---


## Instruções de Utilização do Projeto Medlar

Este documento fornece as instruções resumidas para instalar as dependências e executar a aplicação Medlar.

## 1. Pré-requisitos

Para executar a aplicação, você precisará ter instalado em seu ambiente:

*   **Node.js e npm:** A aplicação é construída em Node.js.
*   **MySQL:** A aplicação utiliza um banco de dados MySQL.

## 2. Configuração do Banco de Dados

A aplicação está configurada para se conectar a um banco de dados MySQL.

1.  **Servidor MySQL:** Certifique-se de que seu servidor MySQL esteja em execução.
2.  **Criação do Banco de Dados:** Crie um banco de dados com o nome `medlar`.
3.  **Credenciais:** A aplicação utiliza as seguintes credenciais de conexão, conforme definido em `src/config/db.js` e `src/server.js`:
    *   **Host:** `localhost`
    *   **Usuário:** `root`
    *   **Senha:** `@1997`

    > **Nota:** Se suas credenciais de banco de dados forem diferentes, você precisará editar os arquivos `src/config/db.js` e `src/server.js` para refletir a configuração correta.

4.  **Estrutura do Banco de Dados (Schema):** Você precisará importar o schema (estrutura das tabelas) do projeto para o banco de dados `medlar`. O arquivo de schema não estava no ZIP fornecido, mas é essencial para o funcionamento da aplicação (ex: tabelas `paciente`, `profissional`, `agendamento`, etc.).

## 3. Instalação de Dependências

1.  **Navegue até o diretório do projeto:**
    ```bash
    cd /caminho/para/medlar_project
    ```
2.  **Instale as dependências:** A aplicação utiliza as dependências listadas no `package.json` (`cors`, `express`, `multer`, `mysql2`). Use o `npm` para instalá-las:
    ```bash
    npm install
    ```

## 4. Execução da Aplicação

1.  **Inicie o servidor:** Use o script `start` definido no `package.json` para iniciar a aplicação:
    ```bash
    npm start
    ```
2.  **Verificação:** Se a conexão com o banco de dados for bem-sucedida, o console exibirá uma mensagem similar a:
    ```
    ✅ Conectado ao MySQL (medlar)
    🚀 API rodando em http://localhost:3000
    ```
3.  **Acesso:** A aplicação estará acessível no seu navegador através do endereço:
    ```
    http://localhost:3000
    ```

---

# Documentação

<ol>
<li><a href="docs/1-Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/2-Especificação.md"> Especificação do Projeto</a></li>
<li><a href="docs/3-Modelagem-Processos-Negócio.md"> Modelagem dos Processos de Negocio</a></li>
<li><a href="docs/4-Projeto-Solucao.md"> Projeto da solução</a></li>
<li><a href="docs/5-Planejamento-Projeto.md"> Gerenciamento do Projeto</a></li>
<li><a href="docs/6-Interface-Sistema.md"> Interface do Sistema</a></li>
<li><a href="docs/7-Conclusão.md"> Conclusão</a></li>
<li><a href="docs/8-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="docs/Apresentaçãodasolução.md"> Apresentação da solução</a></li>


## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentações. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócio.

