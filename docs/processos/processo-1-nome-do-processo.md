## 3.3.1 Processo 1 – Cadastro de Pacientes

### Oportunidades de Melhoria para o Processo de Cadastro

Com base na análise do processo atual (AS-IS) de cadastro de pacientes, as seguintes oportunidades de melhoria foram identificadas:

*   **Automação e Padronização:** Eliminar o preenchimento manual e repetitivo de formulários, implementando um sistema padronizado e automatizado para coleta de informações.
*   **Validação Abrangente e Automática:** Implementar validações automáticas para dados como CPF/CNPJ, idade mínima, formato de e-mail e registros profissionais, reduzindo erros e inconsistências.
*   **Segurança e Privacidade dos Dados:** Centralizar o armazenamento de dados pessoais e de saúde em um ambiente seguro, garantindo a privacidade e a conformidade com regulamentações de proteção de dados.
*   **Agilidade na Aprovação:** Reduzir a dependência de validação manual de credenciais profissionais, agilizando o processo de aprovação e disponibilização do serviço.
*   **Facilidade de Atualização:** Desenvolver um sistema que permita atualizações cadastrais de forma ágil e acessível aos usuários (pacientes e profissionais), sem a necessidade de processos manuais complexos.
*   **Integração de Sistemas:** Conectar o sistema de cadastro a prontuários eletrônicos, plataformas de pagamento e conselhos profissionais, centralizando e aumentando a confiabilidade das informações.
*   **Comunicação Eficiente:** Melhorar a comunicação sobre o status do cadastro e outras informações relevantes, evitando perdas de comunicação e atrasos.

### Exemplo de um Modelo BPMN do PROCESSO 1 - Cadastro


<img width="2278" height="1866" alt="Novo modelo" src="https://github.com/user-attachments/assets/4cf4cecb-8033-47e6-9339-9b742742556a" />


[Este modelo representaria o fluxo otimizado do processo de cadastro, incorporando as melhorias propostas. Ele pode incluir etapas como: Início do Cadastro, Preenchimento de Dados, Validação Automática, Aprovação/Rejeição, Notificação ao Usuário, e Fim do Cadastro.]

# Processo 1: Cadastro de Paciente

## Nome da atividade: Início do Cadastro

| Campo         | Tipo          | Restrições | Valor default |
|---------------|---------------|------------|---------------|
| tipo_cadastro | Seleção única | Obrigatório | Paciente e Profissional    |

### Comandos

| Comandos        | Destino                 | Tipo    |
|-----------------|-------------------------|---------|
| Iniciar Cadastro | Preenchimento de Dados | default |

## Nome da atividade: Preenchimento de Dados (Paciente)

| Campo             | Tipo          | Restrições                                  | Valor default |
|-------------------|---------------|---------------------------------------------|---------------|
| nome_completo     | Caixa de texto | Obrigatório, mínimo 3 caracteres            |              |
| cpf               | Número        | Obrigatório, 11 dígitos, formato XXX.XXX.XXX-XX |           |
| email             | Caixa de texto | Obrigatório, formato de e-mail              |              |     
| data_nascimento   | Data          | Obrigatório, formato DD-MM-AAAA, maior de 18 anos |         |           
| endereco          | Área de texto | Obrigatório                                 |               |        
| telefone          | Caixa de texto | Obrigatório, formato (XX) XXXXX-XXXX        |              |           
                                                                                                                
### Comandos

| Comandos | Destino            | Tipo    |
|----------|--------------------|---------|
| Próximo  | Validação de Dados | default |
| Cancelar | Início do Cadastro | cancel  |

### Comandos

| Comandos | Destino            | Tipo    |
|----------|--------------------|---------|
| Próximo  | Validação de Dados | default |
| Voltar   | Preenchimento de Dados | back    |

## Nome da atividade: Validação de Dados

| Campo            | Tipo          | Restrições      | Valor default |
|------------------|---------------|-----------------|---------------|
| status_validacao | Caixa de texto | Somente leitura | Em validação  |

### Comandos

| Comandos         | Destino                 | Tipo    |
|------------------|-------------------------|---------|
| Concluído        | Notificação de Cadastro | default |
| Erro na Validação | Preenchimento de Dados  | erro    |

## Nome da atividade: Notificação de Cadastro

| Campo                | Tipo         | Restrições      | Valor default                      |
|----------------------|--------------|-----------------|------------------------------------|
| mensagem_notificacao | Área de texto | Somente leitura | Seu cadastro foi concluído com sucesso! |

### Comandos

| Comandos | Destino         | Tipo    |
|----------|-----------------|---------|
| Fechar   | Fim do Processo 1 | default |


## Wireframe 

<img width="1364" height="693" alt="Captura de tela 2025-10-17 184714" src="https://github.com/user-attachments/assets/896e4e53-eae8-422d-a8b5-7d60a209dc78" />
<img width="1347" height="692" alt="Captura de tela 2025-10-17 184731" src="https://github.com/user-attachments/assets/4a2f8aea-0567-43f3-b782-be95cd5d68fb" />

