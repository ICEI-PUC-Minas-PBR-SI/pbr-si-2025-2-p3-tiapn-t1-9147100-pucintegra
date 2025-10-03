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

## Detalhamento das atividades

### Atividade 1 – Acessar feed de interação (Usuário)
| Campo | Tipo | Restrições |
|---|---|---|
| Menu: Feed| Botão | Usuário deve estar logado para postar; feed pode ser público para leitura |

**Comandos**
- Clicar em *Feed* → **Tela de feed** é exibida com lista de perguntas e filtros (disciplina, recentes, sem resposta).

---

### Atividade 2 – Escolher ação: Pergunta ou Resposta? (Usuário)
| Campo | Tipo | Restrições |
|---|---|---|
| Decisão | Ação | Expor opções claras: *Fazer uma pergunta* / *Responder pergunta* |

**Comandos**
- Selecionar *Fazer uma pergunta* → abre formulário de pergunta.  
- Selecionar *Responder* em uma pergunta específica → abre vista da pergunta com campo de resposta.

---

### Atividade 3A – Fazer uma pergunta (Usuário)
| Campo | Tipo | Restrições |
|---|---|---|
| Título | Texto (1 linha) | **Obrigatório**; máximo recomendado 150 caracteres |
| Conteúdo | Área de texto | **Obrigatório**; mínimo 10 caracteres, máximo ~5000 |
| Disciplina | Seleção única | **Obrigatório** quando a dúvida é acadêmica; deve mapear para disciplinas cadastradas |
| Anexo(s) | Arquivo (pdf,png,jpg,docx) | Opcional; tamanho máximo por anexo (ex.: 5MB) |
| Tags | Seleção múltipla | Opcional; facilita busca |
| Visibilidade | Dropdown | Público / Só campus (conforme regras institucionais) |
| Referência bibliográfica | Link | Opcional |

**Comandos**
- Clicar *Fazer uma pergunta* → preencher campos → clicar *Enviar* → formulário é submetido ao backend.

---

### Atividade 3B – Responder a pergunta (Usuário)
| Campo | Tipo | Restrições |
|---|---|---|
| Pergunta selecionada | Leitura | Exibe título, conteúdo, disciplina e contexto |
| Resposta | Área de texto | **Obrigatório**; mínimo 5 caracteres, máximo ~5000 |
| Anexo(s) | Arquivo | Opcional |
| Citar fonte | Texto/Link | Opcional (recomendar boas práticas de citação) |
| Marcar como solução | Checkbox | Só disponível para autor da pergunta ou professor/moderador |

**Comandos**
- Selecionar pergunta → clicar *Responder* → preencher campo → clicar *Enviar* → submissão ao backend.

---

### Atividade 4 – Receber dados (Sistema)
| Campo | Tipo | Restrições |
|---|---|---|
| Payload da UI | JSON / FormData | Deve conter: user_id, role, título (se pergunta), conteúdo, disciplina_id, anexos, timestamp |

**Comandos**
- Endpoint `/questions` ou `/answers` recebe POST → coloca em processamento síncrono ou fila para validação.

---

### Atividade 5 – Validar dados recebidos (Sistema)
| Campo | Tipo | Regras |
|---|---|---|
| Campos obrigatórios | Validação | Título/conteúdo/disciplina (quando aplicável) não podem estar vazios |
| Tamanho | Validação | Respeitar limites (máx/min caracteres/size) |
| Profanity / Spam | Filtro automático | Se detectar, sinalizar para moderação ou bloquear |
| Disciplina | Consulta | disciplina_id deve existir no catálogo institucional |

**Comandos**
- Se dados corretos → seguir para armazenamento.  
- Se incorretos → retornar erro com mensagem amigável ao usuário (ex.: "Preencha o campo X").

---

### Atividade 6 – Armazenar no banco de dados (Sistema)
| Campo | Tipo | O que é salvo |
|---|---|---|
| Perguntas | Tabela `questions` | id, title, content, discipline_id, author_id, created_at, status, visibility |
| Respostas | Tabela `answers` | id, question_id, content, author_id, created_at, is_accepted |
| Metadados | Tabelas auxiliares | tags, attachments, score/likes, número de respostas, last_activity |

**Comandos**
- Inserir registro → atualizar contadores da pergunta (número de respostas, timestamp).  
- Se marcado como solução → atualizar `is_accepted` e notificar autor(es).  
- Se sinalizado pelo filtro → inserir na fila/moderação.

---

### Atividade 7 – Confirmação ao usuário & exibição (Sistema)
| Campo | Tipo | Restrições |
|---|---|---|
| Feedback | Mensagem / Toast | Informar sucesso ou erro; mostrar link para a pergunta publicada |
| Notificações | Push / Email / In-app | (Opcional) Notificar autor da pergunta / participantes |

**Comandos**
- Retornar resposta HTTP com ID do recurso → atualizar UI local com nova pergunta/resposta.

---

## Regras de negócio e observações
- **Autenticação:** apenas usuários logados podem postar. Professores e moderadores têm privilégios extras (validar/remover/aceitar respostas).  
- **Moderação:** conteúdo com violação (ofensas, plágio, material protegido) deve ser sinalizado e colocado em análise por equipe administrativa.  
- **Integração institucional:** ao escolher uma disciplina, a pergunta deve ser indexada no repositório ligado ao catálogo de disciplinas da PUC (para relatórios e filtros).  
- **Privacidade:** oferecer opção de anonimato (dependendo de política institucional) e controles de visibilidade por campus/curso.  
- **Histórico:** manter histórico de edições (versionamento simples) e logs de ações para auditoria.

---

## Tipos de dados utilizados
- **Área de texto** – conteúdo da pergunta/resposta;  
- **Caixa de texto** – título, referência;  
- **Seleção única** – disciplina;  
- **Seleção múltipla** – tags;  
- **Arquivo** – anexos (pdf, imagens, etc.);  
- **Booleano** – marcar como solução, anonimato;  
- **Data/Hora** – created_at, updated_at.

