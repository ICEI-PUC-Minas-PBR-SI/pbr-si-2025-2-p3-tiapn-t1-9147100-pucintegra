### 3.3.1 Processo 1 – Cadastro de Usuários

O processo de cadastro tem como objetivo permitir que novos usuários sejam registrados na plataforma PUC Integra.  
Durante o cadastro, o usuário informa seus dados pessoais (nome, e-mail institucional, senha, matrícula e curso).  
Após o preenchimento, o sistema valida as informações e identifica automaticamente o tipo de usuário: **aluno** ou **professor**.  

Essa identificação é essencial para garantir que o perfil inicial seja atribuído corretamente, permitindo que cada usuário utilize a plataforma de acordo com suas responsabilidades acadêmicas.  

**Oportunidades de melhoria:**  
- Automatizar a identificação do perfil com base na matrícula e e-mail;  
- Implementar mensagens claras de erro para facilitar a experiência do usuário;  
- Garantir segurança no armazenamento dos dados (criptografia de senha e validação de entrada). 

![PROCESSO 1 - Cadastro de Usuários](../images/p1_CadastroUsuário.png "Modelo BPMN do Processo 1.")

---

# Detalhamento das atividades  

### Atividade 1 – Acessar tela de cadastro (Usuário)

| **Campo**         | **Tipo**       | **Restrições**              | **Valor**         |
|-------------------|----------------|-----------------------------|-------------------|
| Botão cadastro    | Botão          | Único, visível              |  Default          |

| **Comandos**      | **Destino**            | **Tipo**   |
|-------------------|------------------------|------------|
| Selecionar botão "Realizar cadastro"| Formulário de cadastro| Usuário (interação)   |

---

### Atividade 2 – Preencher formulário de cadastro (Usuário)

| **Campo**             | **Tipo**        | **Restrições**                                        | **Valor** |
|-----------------------|-----------------|-------------------------------------------------------|-------------------|
| Campos do formulário: Nome, E-mail institucional, Matrícula, Senha, Tipo de usuário (professor/aluno) | Formulário (Caixa de texto)  | Todos obrigatórios; e-mail com domínio institucional | Valores informados pelo usuário  |

| **Comandos**          | **Destino**                    | **Tipo**   |
|-----------------------|--------------------------------|------------|
| Preencher formulário e submeter | Validação dos dados | Usuário (entrada de dados) |


---

### Atividade 3 – Validar matrícula e E-mail (Sistema)

| Campo | Tipo | Restrições |  **Valor** |
|-------|------|------------|------------|
| Validação de cadastro | Automático | Consulta à base da universidade; formato de e-mail institucional | True / False |


| **Comandos**       | **Destino**                | **Tipo**   |
|--------------------|----------------------------|------------|
| Verificar na base de dados| Decisão "Dados válidos?"       | Sistema (automático)|

---


### Gateway - Dados válidos?
| **Campo**         | **Tipo**    | **Restrições**                                 | **Valor** |
|--------------------|-------------|-----------------------------------------------|-----------|
| Verificação de dados| Booleano    | Resultado da validação do sistema  | True / False        |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Branching          | Decisão "Dados válidos?"         | Sistema (decisão)|


#### Atividade (NÃO): Exibir mensagem de erro (Sistema → Usuário)

| **Campo**          | **Tipo**    | **Restrições**                | **Valor**  |
|--------------------|-------------|-------------------------------|------------|
| Feedback de erro   | Mensagem UI | Mensagem apresentando o erro  | Texto      |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Apresentar o erro ao usuário e permitir correção| Formulário de dados  | Sistema (feedback) |


#### Atividade (SIM): Armazenar dados cadastrados (Sistema → Usuário)

| **Campo**          | **Tipo**    | **Restrições**                | **Valor** |
|--------------------|-------------|-------------------------------|------------|
| Persistência dos dados do usuário  | Serviço | Validação prévia obrigatória  | Registro  |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
|Armazenar novo cadastro em tabela de usuários| Atribuir Perfil (Aluno/Professor)  | Sistema (persistência) |


---

## Atividade 4 – Atribuir Perfil (Sistema)

| **Campo**               | **Tipo**    | **Restrições**                         | **Valor** |
|-------------------------|-------------|----------------------------------------|------------|
| Definifição de perfil   | Automático  | Baseado no campo "Tipo de usuário"     | Perfil     |

| **Comandos**       | **Destino**                                   | **Tipo**  |
|--------------------|-----------------------------------------------|-----------|
|Atualizar atributo de usuário    | Exibir confirmação de cadastro   | Sistema (automático) |


---

## Atividade 5 – Exibir confirmação de cadastro (Sistema → Usuário)
 
| **Campo**         | **Tipo**        | **Restrições**                              | **Valor** |
|-------------------|-----------------|---------------------------------------------|-------------------|
| Mensagem de sucesso   | Mensagem UI   | Deve conter orientação (ex.: prossiga para login)  |  Texto   |

| **Comandos**       | **Destino**                 | **Tipo**   |
|--------------------|-----------------------------|------------|
| Apresentar página de confirmação | Tela de perfil| Sistema (feedback)|


---

## Atividade 6 – Visualizar tela de perfil (Usuário)

| **Campo**            | **Tipo**    | **Restrições**                       | **Valor** |
|----------------------|-------------|--------------------------------------|------------|
| Tela de perfil       | Página UI   | Carregar dados do usuário recém-criado | Dados    |

| **Comandos**       | **Destino**          | **Tipo**   |
|--------------------|----------------------|------------|
| Navegar no perfil  | Não se aplica        | Usuário (visualização)|

---
![WIREFRAME - PROCESSO 1 - Cadastro de Usuários](../images/wireframe_cadastro.png)

_Tipos de dados utilizados:_  

* **Área de texto** - campo texto de múltiplas linhas  
* **Caixa de texto** - campo texto de uma linha  
* **Número** - campo numérico  
* **Data** - campo do tipo data (dd-mm-aaaa)  
* **Hora** - campo do tipo hora (hh:mm:ss)  
* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)  
* **Imagem** - campo contendo uma imagem  
* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (radio button ou combobox)  
* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (checkbox ou listbox)  
* **Arquivo** - campo de upload de documento  
* **Link** - campo que armazena uma URL  
* **Tabela** - campo formado por uma matriz de valores  
