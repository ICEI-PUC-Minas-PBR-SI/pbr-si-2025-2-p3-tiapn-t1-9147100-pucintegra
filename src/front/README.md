# Front-end - PUC Integra

Este diretório contém a interface de usuário da aplicação PUC Integra. O projeto utiliza **HTML5, CSS3 e JavaScript Vanilla**, sem a necessidade de frameworks complexos de build (como React ou Angular), facilitando a manutenção e o aprendizado.

## 📂 Estrutura de Pastas

* `/html`: Contém as páginas estruturais do sistema.
    * `homepage.html`: Tela inicial (Landing Page).
    * `autenticacao.html`: Tela de Login e Cadastro (com alternância via JS).
    * `feed.html`: Listagem principal de perguntas e discussões.
    * `pergunta.html`: Formulário para criação de novas dúvidas.
    * `resposta.html`: Tela de detalhes de uma pergunta e suas respostas.
    * `perfil.html`: Dashboard do usuário.
* `/css`: Folhas de estilo separadas por página/contexto.
    * Utiliza variáveis CSS (`:root`) para consistência de cores (Azul PUC).
* `/js`: Lógica de interação e comunicação com a API.

## 🔌 Integração com o Back-end

O Front-end comunica-se com o Back-end (Spring Boot) através de requisições HTTP (`fetch API`).

* **Base URL:** `http://localhost:8080/api`
* **Autenticação:** O sistema utiliza **JWT (JSON Web Token)**. Após o login, o token é armazenado no `localStorage` do navegador e enviado automaticamente no cabeçalho `Authorization` das requisições protegidas.

### Fluxo de Arquivos JS Principais
1.  **autenticacao.js:** Gerencia login, cadastro e recuperação de senha. Salva o token.
2.  **feed.js:** Carrega a lista de perguntas, gerencia filtros por disciplina e renderiza o HTML dinamicamente.
3.  **pergunta.js:** Controla o formulário de nova pergunta, editor de texto rico e upload de arquivos.
4.  **perfil.js:** Carrega dados do usuário, estatísticas e permite edição de perfil.

## ▶️ Como Rodar

Não é necessário instalar dependências via `npm` para rodar este front-end.

1.  Certifique-se de que a API Java (`src/main`) esteja rodando na porta 8080.
2.  Abra o arquivo `/html/homepage.html` no seu navegador.
3.  **Recomendação:** Utilize um servidor local simples (como a extensão **Live Server** do VS Code) para abrir os arquivos HTML. Isso evita bloqueios de segurança do navegador relacionados a módulos ES6 e caminhos de arquivo.