### 3.3.1 Processo 1 – Cadastro e Login

O processo de **Entrada no Sistema** começa quando o usuário vai até o browser de sua preferência e insere a url da aplicação. O browser então exibe a tela onde é possível inserir e-mail e senha;  Já para **Preencher formulário de cadastrar** a tela de preenchimento de um formulário é apresentada onde o usuário adiciona seus dados como login, senha, nome, idade e genero; o sistema, então, envia um link de verificação para o e-mail ou sms, e, após a sua confirmação,  finaliza o registro ao ter o código validado.


![PROCESSO 1](../images/modelagem-1-cadastro-login-r2.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

**Fazer Login** 

| **Campo**       | **Tipo**         | **Restrições**         | **Valor default** |
| ---             | ---              | ---                    | ---               |
| [Nome do campo] | [tipo de dados]  |                        |                   |
| login           | Caixa de Texto   | formato de e-mail      |                   |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Entrar               | Fim do Processo 1              | default           |


**Preencher formulário de cadastro** 

| **Campo**       | **Tipo**         | **Restrições**         | **Valor default** |
| ---             | ---              | ---                    | ---               |
| login           | Caixa de Texto   | formato de e-mail      |                   |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |                   |
| Nome            | Caixa de Texto   | mínimo de 5 caracteres |                   |
| Idade           | Número           |                        |                   |
| Genero          | Seleção múltipla |                        |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Cadastrar            | Enviar código de validação     |                   |


**Enviar código de validação** 
 
| **Campo**       | **Tipo**           | **Restrições** | **Valor default** |
| ---             | ---                | ---            | ---               |
| Método          | Seleção múltipla   |                | Email             |



| **Comandos**      |  **Destino**                   | **Tipo**          |
| ---               | ---                            | ---               |
| Enviar            | Inserir código de validação    |                   |

**Inserir código de validação** 

| **Campo**       | **Tipo**         | **Restrições**         | **Valor default** |
| ---             | ---              | ---                    | ---               |
| codigo          | Caixa de Texto   | mínimo de 8 caracteres |                |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Validar código       | Fazer Login                    |                   |
