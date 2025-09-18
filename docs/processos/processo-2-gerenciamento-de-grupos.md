### 3.3.2 Processo 2 – Gerênciamento de grupos

_Apresente aqui o nome e as oportunidades de melhoria para o processo 2. 
Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN._

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
| cancelar               | Gerenciar despesas/fechamentos | cancel   |

---

**Marcar como recebido ou não recebido**

| **Campo**          | **Tipo**         | **Restrições**    | **Valor default** |
| ---                | ---              | ---               | ---               |
|                    |                  |                   |                   |

| **Comandos**               | **Destino**                    | **Tipo** |
| ---                        | ---                            | ---      |
| marcar como recebido ou não| nenhum                         |          |

