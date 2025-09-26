## 3.3.1 Processo 2 – Cadastro de Profissionais

### Oportunidades de Melhoria para o Processo de Cadastro

Com base na análise do processo atual (AS-IS) de cadastro de profissionais, as seguintes oportunidades de melhoria foram identificadas:

*   **Automação e Padronização:** Eliminar o preenchimento manual e repetitivo de formulários, implementando um sistema padronizado e automatizado para coleta de informações.
*   **Validação Abrangente e Automática:** Implementar validações automáticas para dados como CPF/CNPJ, idade mínima, formato de e-mail e registros profissionais, reduzindo erros e inconsistências.
*   **Segurança e Privacidade dos Dados:** Centralizar o armazenamento de dados pessoais e de saúde em um ambiente seguro, garantindo a privacidade e a conformidade com regulamentações de proteção de dados.
*   **Agilidade na Aprovação:** Reduzir a dependência de validação manual de credenciais profissionais, agilizando o processo de aprovação e disponibilização do serviço.
*   **Facilidade de Atualização:** Desenvolver um sistema que permita atualizações cadastrais de forma ágil e acessível aos usuários (pacientes e profissionais), sem a necessidade de processos manuais complexos.
*   **Integração de Sistemas:** Conectar o sistema de cadastro a prontuários eletrônicos, plataformas de pagamento e conselhos profissionais, centralizando e aumentando a confiabilidade das informações.
*   **Comunicação Eficiente:** Melhorar a comunicação sobre o status do cadastro e outras informações relevantes, evitando perdas de comunicação e atrasos.

### Exemplo de um Modelo BPMN do PROCESSO 1 - Cadastro

<img width="1860" height="1776" alt="Novo modelocleia" src="https://github.com/user-attachments/assets/5886d6ca-1110-42f6-bc3c-97b8fe23ff08" />


[Este modelo representaria o fluxo otimizado do processo de cadastro, incorporando as melhorias propostas. Ele pode incluir etapas como: Início do Cadastro, Preenchimento de Dados, Validação Automática, Análise de Credenciais (para profissionais), Aprovação/Rejeição, Notificação ao Usuário, e Fim do Cadastro.]

### Detalhamento das Atividades

#### Nome da atividade: Início do Cadastro

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| tipo_cadastro | Seleção única | Obrigatório | Paciente |

| Comandos | Destino | Tipo |
|---|---|---|
| Iniciar Cadastro | Preenchimento de Dados | default |

| Comandos | Destino | Tipo |
|---|---|---|
| Próximo | Validação de Dados | default |
| Cancelar | Início do Cadastro | cancel |

#### Nome da atividade: Preenchimento de Dados (Profissional)

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| nome_completo | Caixa de texto | Obrigatório, mínimo 3 caracteres | |
| cpf | Número | Obrigatório, 11 dígitos, formato XXX.XXX.XXX-XX | |
| cnpj | Número | Opcional, 14 dígitos, formato XX.XXX.XXX/XXXX-XX | |
| registro_profissional | Caixa de texto | Obrigatório, formato específico do conselho (ex: COREN-SP-123456) | |
| formacao_academica | Área de texto | Obrigatório | |
| especialidades | Seleção múltipla | Obrigatório, mínimo 1 seleção | Enfermagem, Fisioterapia, Fonoaudiologia, etc. |
| areas_atendimento | Área de texto | Opcional | |
| endereco | Área de texto | Obrigatório | |
| telefone | Caixa de texto | Obrigatório, formato (XX) XXXXX-XXXX | |
| email | Caixa de texto | Obrigatório, formato de e-mail | |
| comprovante_registro | Arquivo | Obrigatório, PDF ou Imagem | |

| Comandos | Destino | Tipo |
|---|---|---|
| Próximo | Validação de Dados | default |
| Cancelar | Início do Cadastro | cancel |

#### Nome da atividade: Validação de Dados

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| status_validacao | Caixa de texto | Somente leitura | Em validação |

| Comandos | Destino | Tipo |
|---|---|---|
| Concluído | Notificação de Cadastro | default |
| Erro na Validação | Preenchimento de Dados | erro |

#### Nome da atividade: Notificação de Cadastro

| Campo | Tipo | Restrições | Valor default |
|---|---|---|---|
| mensagem_notificacao | Área de texto | Somente leitura | Seu cadastro foi concluído com sucesso! |

| Comandos | Destino | Tipo |
|---|---|---|
| Fechar | Fim do Processo 1 | default |

