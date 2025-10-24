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

### Exemplo de um Modelo BPMN do PROCESSO 2 - Cadastro


<img width="2278" height="1866" alt="Novo modelo 2" src="https://github.com/user-attachments/assets/70e50a10-cb11-4662-a952-021bab22f1d4" />



[Este modelo representaria o fluxo otimizado do processo de cadastro, incorporando as melhorias propostas. Ele pode incluir etapas como: Início do Cadastro, Preenchimento de Dados, Validação Automática, Análise de Credenciais (para profissionais), Aprovação/Rejeição, Notificação ao Usuário, e Fim do Cadastro.]

# Detalhamento do Fluxo de Cadastro de Profissional

Este documento detalha as atividades, campos, restrições e comandos de navegação do fluxo de cadastro de profissionais, incluindo elementos de controle e auditoria.

## 1. Nome da atividade: Início do Cadastro

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| tipo_cadastro | Seleção única | Obrigatório | Profissional |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Iniciar Cadastro | Preenchimento de Dados | default |

---

## 2. Nome da atividade: Preenchimento de Dados (Profissional)

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
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
| :--- | :--- | :--- |
| Próximo | Validação de Dados | default |
| Cancelar | Início do Cadastro | cancel |

---

## 3. Nome da atividade: Validação de Dados

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_validacao | Caixa de texto | Somente leitura | Em validação |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Concluído | Notificação de Cadastro | default |
| Erro na Validação | Preenchimento de Dados | erro |

---

## 4. Nome da atividade: Notificação de Cadastro

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| mensagem_notificacao | Área de texto | Somente leitura | Seu cadastro foi concluído com sucesso! |
| data_cadastro | Data/Hora | Somente leitura, Auditoria | [Data e hora atual do sistema] |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Fechar | Fim do Processo 1 | default |

---

## 5. Nome da atividade: Fim do Processo 1

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status_final | Caixa de texto | Somente leitura | Cadastro Finalizado |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Nenhum | Nenhum | Fim do Fluxo |


## Wireframe 

<img width="1360" height="692" alt="Captura de tela 2025-10-24 200828" src="https://github.com/user-attachments/assets/a23ec5e4-0e29-4c0d-95ce-fd340e5dac07" />

<img width="1352" height="668" alt="Captura de tela 2025-10-24 200922" src="https://github.com/user-attachments/assets/8dcdd339-2931-4942-9e55-6cc2d7192421" />

<img width="1346" height="683" alt="Captura de tela 2025-10-24 195927" src="https://github.com/user-attachments/assets/1a9162c4-3db1-45c6-b204-712ff54451be" />

<img width="1339" height="538" alt="Captura de tela 2025-10-24 200041" src="https://github.com/user-attachments/assets/05c06648-fde3-460c-8d40-96d24f77fe31" />

<img width="1319" height="409" alt="Captura de tela 2025-10-24 200058" src="https://github.com/user-attachments/assets/e6e8b100-510d-4520-9af0-9bfeee871a3d" />
