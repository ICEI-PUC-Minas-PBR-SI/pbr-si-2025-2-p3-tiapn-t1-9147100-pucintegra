### 3.3.2 Processo 2 – Cadastro do Local

![Modelo BPMN do PROCESSO 2 - Cadastro do Local](../images/processo_2_cadastro_local.png "Cadastro de Local")


#### Detalhamento das atividades

1. Logar com usuário Locador

   - Permite que o usuário insira suas credenciais (login e senha) para acessar a área de cadastro de local.
   - Verifica a validade das credenciais no sistema.

2. Preenchimento dos dados do Local

   - Captura informações detalhadas da propriedade a ser alugada (endereço, características, valor, etc.).
   - Inclui a opção de fazer upload de fotos da propriedade para visualização.

3. Confirmação dos dados

   - Exibe um resumo de todas as informações da propriedade preenchidas.
   - Permite ao usuário revisar e validar os dados antes de prosseguir.
    
4. Cadastro Concluído

   - Exibe uma mensagem de sucesso, confirmando que o local foi cadastrado com êxito.
   - Redireciona o usuário para a página de gerenciamento de propriedades, onde o novo local estará listado.

   

**Nome da atividade 1**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| ***Exemplo:***  |                  |                |                   |
| login           | Caixa de Texto   | formato de e-mail |                |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| ***Exemplo:***       |                                |                   |
| entrar               | Fim do Processo 1              | default           |
| cadastrar            | Início do proceso de cadastro  |                   |


**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
