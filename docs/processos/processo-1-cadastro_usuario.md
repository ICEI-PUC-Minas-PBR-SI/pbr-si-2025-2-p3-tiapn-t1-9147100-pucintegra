### 3.3.1 Processo 1 – Cadastro de Usuário

![Modelo BPMN do PROCESSO 1 - Cadastro de Usuário](../images/processo_1_bpmn.png "Cadastro de Usuário")

#### Detalhamento das atividades

1. [Acessar o sistema]()
   - Ponto inicial do fluxo. O usuário decide se deseja entrar com uma conta existente ou criar uma nova como Locador ou Locatário.  
   - Esta etapa substitui a antiga "Escolha do Tipo de Usuário", direcionando o usuário diretamente para o formulário de cadastro específico.

2. [Preenchimento dos dados do Locador](#atividade-1---preenchimento-dos-dados-do-locador)
   - Captura informações do cadastro do proprietário do espaço. (nome, e-mail, CPF/CNPJ, endereço, etc.)  
   - Inclui criação e confirmação de senha e opção de foto de perfil.
     
3. [Preenchimento dos dados do Locatário](#atividade-2---preenchimento-dos-dados-do-locatário)
   - Coleta dados pessoais do cliente interessado em alugar um espaço. (nome, e-mail, CPF/CNPJ, endereço, etc.)   
   - Estrutura semelhante à do locador, mas focada em pessoa física.
     
4. [Confirmação de Cadastro](#atividade-3---confirmação-de-cadastro)
   - Envio de código de verificação por e-mail.  
   - Exige aceite dos termos de uso antes da validação.
     
5. [Validação do Usuário (Locador / Locatário)](#atividade-4---validação-do-usuário-locador--locatário)
   - Verificação das informações preenchidas.  
     
6. [Cadastro Concluído](#atividade-5---cadastro-concluído)   
   - Exibe mensagem de boas-vindas ao usuário.  
   - Encaminha o usuário ao painel principal do sistema.

### Atividade 1 - Acessar o Sistema 

**Comandos**

| Nome do botão/link | Destino | Tipo |
| :--- | :--- | :--- |
| Criar conta como Locador | Atividade 2 - Preenchimento dos dados do Locador | default |
| Criar conta como Locatário| Atividade 1 - Escolha do Tipo de Usuário | default |
| Já possuo uma conta| - | default |


  
### Atividade 2 - Preenchimento dos dados do Locador

| Campo            | Tipo           | Restrições                                                     | Valor default   |
|------------------|----------------|----------------------------------------------------------------|-----------------|
| Nome completo    | Caixa de texto | obrigatório, mínimo 3 caracteres                               | -               |
| E-mail           | Caixa de texto | formato de e-mail válido, obrigatório                          | -               |
| Telefone         | Caixa de texto | formato (xx) xxxxx-xxxx, obrigatório                           | -               |
| CPF/CNPJ         | Caixa de texto | obrigatório, verificação de duplicidade                        | -               |
| Endereço         | Área de texto  | obrigatório                                                    | -               |
| Senha            | Caixa de texto | mínimo 8 caracteres, incluir letra maiúscula, número e símbolo | -               |
| Confirmar senha  | Caixa de texto | deve coincidir com senha                                       | -               |
| Foto de perfil   | Imagem         | opcional, até 2MB                                              | imagem padrão   |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|--------------------|----------------------------|---------|
| Cancelar           | Fim do processo            | cancel  |
| Confirmar cadastro | Confirmação de cadastro    | default |


### Atividade 3 - Preenchimento dos dados do Locatário

| Campo            | Tipo           | Restrições                                                     | Valor default   |
|------------------|----------------|----------------------------------------------------------------|-----------------|
| Nome completo    | Caixa de texto | obrigatório, mínimo 3 caracteres                               | -               |
| E-mail           | Caixa de texto | formato de e-mail válido, obrigatório                          | -               |
| Telefone         | Caixa de texto | formato (xx) xxxxx-xxxx, obrigatório                           | -               |
| CPF              | Caixa de texto | obrigatório, verificação de duplicidade                        | -               |
| Endereço         | Área de texto  | obrigatório                                                    | -               |
| Senha            | Caixa de texto | mínimo 8 caracteres, incluir letra maiúscula, número e símbolo | -               |
| Confirmar senha  | Caixa de texto | deve coincidir com senha                                       | -               |
| Foto de perfil   | Imagem         | opcional, até 2MB                                              | imagem padrão   |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|--------------------|----------------------------|---------|
| Cancelar           | Fim do processo            | cancel  |
| Confirmar cadastro | Confirmação de cadastro    | default |


### Atividade 4 - Confirmação de Cadastro
| Campo                    | Tipo                     | Restrições                                      | Valor default |
|--------------------------|--------------------------|-------------------------------------------------|---------------|
| Código de verificação    | Número                   | enviado por e-mail ou SMS, obrigatório          | -             |
| Aceite dos termos de uso | Seleção única (checkbox) | obrigatório                                     | desmarcado    |

**Comandos**  
| Nome do botão/link | Destino                                | Tipo    |
|--------------------|----------------------------------------|---------|
| Voltar             | Preenchimento dos dados                | cancel  |
| Confirmar          | Validação do usuário Locador/Locatário | default |

### Atividade 4 - Validação do Usuário (Locador / Locatário)


**Comandos**  


### Atividade 5 - Cadastro Concluído
| Campo                   | Tipo          | Restrições            | Valor default       |
|-------------------------|---------------|-----------------------|---------------------|
| Mensagem de boas-vindas | Área de texto | apenas leitura        | -                   |

**Comandos**  
| Nome do botão/link  | Destino              | Tipo    |
|---------------------|----------------------|---------|
| Acessar painel      | Início do sistema    | default |
| Fechar      | Confirmação de Cadastro    | - |

## Wireframe
![Wireframe do PROCESSO 1 - Cadastro de Usuário](../images/Wireframe_Cadastro_Colmeia.jpg "Wireframe de baixa fidelidade")
