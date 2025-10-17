# Processo 4 – Envio Perguntas e Respostas

O Processo 4 descreve o fluxo pelo qual um usuário publica uma **pergunta** ou envia uma **resposta** na plataforma acadêmica (feed de interação). O objetivo é permitir a criação de dúvidas ligadas às disciplinas institucionais e respostas colaborativas, garantindo validações (formato, disciplina, moderação) e armazenamento no banco de dados para posterior consulta, curadoria e exibição. O diagrama fornecido (p4_PerguntaResposta.png) serviu como base visual para o fluxo (usuário ↔ sistema).

---

## Fluxo principal
1. Usuário acessa o **feed de interação**.  
2. Usuário escolhe se vai **criar uma pergunta** ou **responder** (gateway "Pergunta ou resposta?").  
3. **Se pergunta:** usuário clica em *Fazer uma pergunta*, preenche formulário e envia.  
4. **Se resposta:** usuário seleciona a pergunta que deseja responder, preenche o campo de resposta e envia.  
5. Sistema recebe os dados (endpoint/queue).  
6. Sistema valida/filtra (validações básicas, antispam, associação à disciplina).  
7. Sistema armazena a pergunta/resposta no banco de dados e atualiza metadados da thread.  
8. Sistema retorna confirmação ao usuário e (opcional) notifica envolvidos.

---


![PROCESSO 4 - Envio de perguntas e respostas](../images/p4_PerguntaResposta.png "Modelo BPMN do Processo 4.")

---

# Detalhamento das atividades  

### Atividade 1 – Acessar área de Postagens (Usuário)

| **Campo**         | **Tipo**       | **Restrições**              | **Valor**         |
|-------------------|----------------|-----------------------------|-------------------|
| Seção "Postagens" | Navegação UI   | Requer login concluído      |  Default          |

| **Comandos**      | **Destino**            | **Tipo**   |
|-------------------|------------------------|------------|
| Clicar na seção   | Listagem de postagens e opções (perguntar/responder) | Usuário (navegação) |

---

### Gateway - Pergunta ou Resposta?
| **Campo**          | **Tipo**    | **Restrições**                                | **Valor** |
|--------------------|-------------|-----------------------------------------------|-----------|
| Escolha do usuário | Decisão     | Usuário escolhe fluxo | Pergunta / Resposta               |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Branching          | Pergunta → Fazer pergunta; Resposta → Selecionar pergunta para responder | Usuário (decisão) |


#### Fluxo Pergunta:

Atividade 1: Clicar em "Fazer uma pergunta" (Usuário)

| **Campo**          | **Tipo**    | **Restrições**                | **Valor ** |
|--------------------|-------------|-------------------------------|------------|
| Botão "Fazer uma pergunta" | Botão | Único e visível  | Default  |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Clicar no botão    | Formulário de dúvida | Usuário (interação)    |

Atividade 2: Preencher formulário de dúvida (Usuário)

| **Campo**          | **Tipo**    | **Restrições**                | **Valor ** |
|--------------------|-------------|-------------------------------|------------|
| Campos: Título, Conteúdo, Curso, Disciplina, Palavras-chave | Formulário | Título obrigatório; conteúdo mínimo; curso/disciplina validos | Valores informados  |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Preecher e submeter| Cnvergência para confirmar envio | Usuário (entrada) |


#### Fluxo Resposta:
#####Atividade 1: Selecionar pergunta que deseja responder (Usuário)

| **Campo**          | **Tipo**        | **Restrições**               | ** Valor **|
|--------------------|-----------------|------------------------------|------------|
| Lista de perguntas | Lista interativa| Perguntas visíveis por disciplina/curso; acesso permitido  | Pergunta selecionada |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Clicar na pergunta | Abrir campo de resposta | Usuário (seleção)   |

Atividade 2: Preencher conteúdo da resposta (Usuário)

| **Campo**          | **Tipo**    | **Restrições**                | **Valor ** |
|--------------------|-------------|-------------------------------|------------|
| Conteúdo da resposta: Texto, Links, Imagens | Editor de texto enriquecido | Limites de tamanho; imagens com formatos válidos; links sanitizados | Conteúdo inserido |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Preecher e submeter| Convergência para confirmar envio| Usuário (entrada) |


### Gateway - Tarefas convergem (confirmação)
| **Campo**          | **Tipo**    | **Restrições**                                | **Valor** |
|--------------------|-------------|-----------------------------------------------|-----------|
|Confirmação de envio| Decisão     | Usuário confirma revisar antes de enviar      | Confirmar / Cancelar|

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
| Branching          | Confirmar → Confirmar envio da postagem       | Usuário (decisão) |



#### Atividade - Confirmar envio da postagem (Usuário)

| **Campo**          | **Tipo**    | **Restrições**                | **Valor ** |
|--------------------|-------------|-------------------------------|------------|
| Botão de envio     | Botão       | Somente após preencher campos obrigatórios | Default  |

| **Comandos**       | **Destino**                      | **Tipo**   |
|--------------------|----------------------------------|------------|
|Clicar para enviar  | Registrar postagem               | Usuário (ação) |



---

### Atividade 2 – Preencher formulário de cadastro (Sistema)

| **Campo**             | **Tipo**        | **Restrições**                                        | **Valor** |
|-----------------------|-----------------|-------------------------------------------------------|-------------------|
| Campos do formulário: Nome, E-mail institucional, Matrícula, Senha, Tipo de usuário (professor/aluno) | Formulário (Caixa de texto)  | Todos obrigatórios; e-mail com domínio institucional |                   |

| **Comandos**          | **Destino**                    | **Tipo**   |
|-----------------------|--------------------------------|------------|
| Preencher formulário e submeter | Validação dos dados | Usuário     |


---

### Atividade 3 – Validar matrícula e E-mail (Sistema)

| Campo | Tipo | Restrições |  **Valor** |
|-------|------|------------|------------|
| Validação de cadastro | Automático | Consulta à base da universidade; formato de e-mail institucional | True / False |


| **Comandos**       | **Destino**                | **Tipo**   |
|--------------------|----------------------------|------------|
| Verificar na base de dados| Decisão "Dados válidos?"       | Automático |

---


## Atividade 4 – Atribuir Perfil (Sistema)

| **Campo**               | **Tipo**    | **Restrições**                         | **Valor ** |
|-------------------------|-------------|----------------------------------------|------------|
| Definifição de perfil   | Automático  | Baseado no campo "Tipo de usuário"     | Perfil     |

| **Comandos**       | **Destino**                                   | **Tipo**  |
|--------------------|-----------------------------------------------|-----------|
|Atualizar atributo de usuário    | Exibir confirmação de cadastro   | Sistema   |


---

## Atividade 5 – Exibir confirmação de cadastro (Sistema → Usuário)
 
| **Campo**         | **Tipo**        | **Restrições**                              | **Valor default** |
|-------------------|-----------------|---------------------------------------------|-------------------|
| Mensagem de sucesso   | Mensagem UI   | Deve conter orientação (ex.: prossiga para login)  |  Texto   |

| **Comandos**       | **Destino**                 | **Tipo**   |
|--------------------|-----------------------------|------------|
| Apresentar página de confirmação | Tela de perfil| Sistema    |


---

## Atividade 6 – Visualizar tela de perfil (Usuário)

| **Campo**            | **Tipo**    | **Restrições**                       | **Valor ** |
|----------------------|-------------|--------------------------------------|------------|
| Tela de perfil       | Página UI   | Carregar dados do usuário recém-criado | Dados    |

| **Comandos**       | **Destino**          | **Tipo**   |
|--------------------|----------------------|------------|
| Navegar no perfil  | Não se aplica        | Usuário    |

---

## Tipos de dados utilizados
- **Área de texto** – conteúdo da pergunta/resposta;  
- **Caixa de texto** – título, referência;  
- **Seleção única** – disciplina;  
- **Seleção múltipla** – tags;  
- **Arquivo** – anexos (pdf, imagens, etc.);  
- **Booleano** – marcar como solução, anonimato;  
- **Data/Hora** – created_at, updated_at.

