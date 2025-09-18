### 3.3.2 Processo 2 – Gerênciamento de grupos
O processo de gerenciamento de grupos tem início assim que o usuário faz login ou acessa diretamente a URL no navegador. Em seguida, o sistema exibe a tela de gerenciamento de grupos, onde é possível visualizar todos os grupos associados ao usuário logado. Caso não haja nenhum grupo ou o usuário deseje criar um novo, essa opção também estará disponível.

Após visualizar os grupos, o usuário pode abrir um deles para acessar informações detalhadas. Dentro do grupo, é possível consultar o fechamento das contas — que representa o saldo resultante da diferença entre o valor pago pelo usuário e o valor pago pelos demais membros do grupo. O usuário pode realizar abatimentos em pagamentos e marcar saldos positivos como quitados, ação que gera o envio automático de um e-mail ao recebedor, informando sobre o abatimento.

Além disso, o usuário pode visualizar todas as despesas do grupo e registrar novas despesas, se desejar.

Caso o usuário seja administrador do grupo, ele terá acesso a funcionalidades adicionais, como: aprovar despesas, realizar o fechamento de contas, adicionar ou remover integrantes, e atribuir permissões de administrador a outros membros. Todas essas ações também geram notificações por e-mail para os demais participantes do grupo.

![PROCESSO 2](../images/modelagem-2-gerenciamento-de-grupo.png "Modelo BPMN do Processo 2.")


#### Detalhamento das atividades


**Visualizar grupos**

| **Campo**         | **Tipo**        | **Restrições**     | **Valor default**  |
| ---               | ---             | ---                | ---                |
| grupos            | Tabela          |                    |  grupos do usuário | 

| **Comandos**  | **Destino**        | **Tipo**   |
| ---           | ---                | ---        |
| abrir_grupo   | Gerenciar grupo    |            |
| criar_grupo   | Criar grupo        |            |


---

**Criar grupo**

| **Campo**       | **Tipo**        | **Restrições**                                  | **Valor default** |
| ---             | ---             | ---                                             | ---               |
| nome_grupo      | Caixa de texto  | obrigatório; 3–60 caracteres                    |                   |
| descricao       | Área de texto   | até 500 caracteres                              |                   |
| imagem_capa     | Imagem          | opcional; até 5 MB                              |                   |

| **Comandos**  | **Destino**     | **Tipo** |
| ---           | ---             | ---      |
| salvar        | Gerenciar grupo | default  |
| cancelar      | Visualizar grupos| cancel   |


---

**Gerenciar grupo**

| **Campo**       | **Tipo**        | **Restrições**                            | **Valor default** |
| ---             | ---             | ---                                       | ---               |
| nome_grupo      | Caixa de texto  | obrigatório                               |                   |
| descricao       | Área de texto   | até 500 caracteres                        |                   |                  
| imagem_capa     | Imagem          | opcional; até 5 MB                        |                   | 

| **Comandos**          | **Destino**                   | **Tipo** |
| ---                   | ---                           | ---      |
| incluir_despesa       | Incluir despesas (processo 4) |          |
| excluir_despesa       | Excluir despesas (processo 4) |          |
| aprovar_despesas      | Aprovar despesas              |          |
| incluir_membro (adm)  | Incluir membros (processo 3)  |          |
| excluir_membro (adm)  | Excluir membro (processo 3)   |          |
| definir_adm (adm)     | Nenhum                        |          |
| visualizar_fechamento | Visualizar fechamento         |          |
| fazer_fechamento (adm)| Visualizar fechamento         |          |
| salvar                | Gerenciar grupo               | default  |
| voltar                | Visualizar grupos             | cancel   |


---

**Visualizar fechamento**

| **Campo**       | **Tipo**        | **Restrições**       | **Valor default**                             |
| ---             | ---             | ---                  | ---                                           |
| fechamento      | Tabela          |                      |  despesas que o usuário tem a receber ou pagar|

| **Comandos**             | **Destino**                   | **Tipo**   |
| ---                      | ---                           | ---        |
| abater_pagamento         | Abater pagamento (processo 5) |            |
| marcar_como_recebido     | Nenhum                        |            |
| cancelar                 | Visualizar grupos             | cancel     |


---


**Aprovar despesas**

| **Campo**           | **Tipo**        | **Restrições**      | **Valor default** |
| ---                 | ---             | ---                 | ---               |
| selecionar_despesas | Seleção múltipla|                     |                   |

| **Comandos** | **Destino**                | **Tipo** |
| ---          | ---                        | ---      |
| aprovar      | Gerenciar despesas/fechamentos | default |
| reprovar     | Enviar notificação         |          |
| voltar       | Gerenciar despesas/fechamentos | cancel |


---


**Definir outros administradores**

| **Campo**          | **Tipo**         | **Restrições**          | **Valor default** |
| ---                | ---              | ---                     | ---               |
| selecionar_membros | Seleção múltipla | somente membros ativos  |                   |

| **Comandos** | **Destino**       | **Tipo** |
| ---          | ---               | ---      |
| confirmar    | Enviar notificação| default  |
| cancelar     | Gerenciar pessoas | cancel   |


---

**Fazer fechamento**

| **Campo**          | **Tipo**         | **Restrições**    | **Valor default** |
| ---                | ---              | ---               | ---               |
|                    |                  |                   |                   |

| **Comandos**           | **Destino**                    | **Tipo** |
| ---                    | ---                            | ---      |
| calcular_fechamentos   | Enviar notificação             | default  |

---

**Marcar como recebido ou não recebido**

| **Campo**          | **Tipo**         | **Restrições**    | **Valor default** |
| ---                | ---              | ---               | ---               |
|                    |                  |                   |                   |

| **Comandos**               | **Destino**                    | **Tipo** |
| ---                        | ---                            | ---      |
| marcar_como_recebido_ou_nao| nenhum                         |          |

