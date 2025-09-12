### 3.3.1 Processo 1 – Cadastro de Usuário

_Apresente aqui o nome e as oportunidades de melhoria para o processo 1. 
Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN._

![Modelo BPMN do PROCESSO 1 - Cadastro de Usuário](../images/processo_1_cadastro_usuario.jpg "Cadastro de Usuário")

#### Detalhamento das atividades

1. [Preenchimento dos dados do Locador](#preenchimento-dos-dados-do-locador)  
2. [Preenchimento dos dados do Locatário](#preenchimento-dos-dados-do-locatário)  
3. [Confirmação de Cadastro](#confirmação-de-cadastro)  
4. [Validação do Usuário (Locador / Locatário)](#validação-do-usuário-locador--locatário)  
5. [Cadastro Concluído](#cadastro-concluído)   

### Preenchimento dos dados do Locador

| Campo            | Tipo         | Restrições                                                | Valor default   |
|------------------|-------------|-----------------------------------------------------------|-----------------|
| Nome completo    | Caixa de texto | obrigatório, mínimo 3 caracteres                          | -               |
| E-mail           | Caixa de texto | formato de e-mail válido, obrigatório                     | -               |
| Telefone         | Caixa de texto | formato (xx) xxxxx-xxxx, obrigatório                      | -               |
| CPF/CNPJ         | Caixa de texto | obrigatório, verificação de duplicidade                   | -               |
| Endereço         | Área de texto  | obrigatório                                               | -               |
| Senha            | Caixa de texto | mínimo 8 caracteres, incluir letra maiúscula, número e símbolo | -         |
| Confirmar senha  | Caixa de texto | deve coincidir com senha                                  | -               |
| Foto de perfil   | Imagem         | opcional, até 2MB                                         | imagem padrão   |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|---------------------|----------------------------|---------|
| Cancelar           | Fim do processo            | cancel  |
| Confirmar cadastro | Confirmação de cadastro    | default |


### **Preenchimento dos dados do Locatário**

| Campo            | Tipo         | Restrições                                                | Valor default   |
|------------------|-------------|-----------------------------------------------------------|-----------------|
| Nome completo    | Caixa de texto | obrigatório, mínimo 3 caracteres                          | -               |
| E-mail           | Caixa de texto | formato de e-mail válido, obrigatório                     | -               |
| Telefone         | Caixa de texto | formato (xx) xxxxx-xxxx, obrigatório                      | -               |
| CPF              | Caixa de texto | obrigatório, verificação de duplicidade                   | -               |
| Endereço         | Área de texto  | obrigatório                                               | -               |
| Senha            | Caixa de texto | mínimo 8 caracteres, incluir letra maiúscula, número e símbolo | -         |
| Confirmar senha  | Caixa de texto | deve coincidir com senha                                  | -               |
| Foto de perfil   | Imagem         | opcional, até 2MB                                         | imagem padrão   |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|---------------------|----------------------------|---------|
| Cancelar           | Fim do processo            | cancel  |
| Confirmar cadastro | Confirmação de cadastro    | default |


### **Confirmação de Cadastro**
| Campo              | Tipo        | Restrições                                      | Valor default |
|--------------------|-------------|-------------------------------------------------|---------------|
| Código de verificação | Número    | enviado por e-mail ou SMS, obrigatório          | -             |
| Aceite dos termos de uso | Seleção única (checkbox) | obrigatório                       | desmarcado    |

**Comandos**  
| Nome do botão/link | Destino                         | Tipo    |
|---------------------|---------------------------------|---------|
| Voltar             | Preenchimento dos dados         | cancel  |
| Confirmar          | Validação do usuário Locador/Locatário | default |

### **Validação do Usuário (Locador / Locatário)**
| Campo              | Tipo             | Restrições                                    | Valor default |
|--------------------|------------------|-----------------------------------------------|---------------|
| Status da validação | Seleção única   | valores possíveis: aprovado / pendente / rejeitado | pendente   |
| Documentos enviados | Arquivo         | formatos aceitos: PDF, JPG, PNG               | -             |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|---------------------|----------------------------|---------|
| Reenviar dados     | Preenchimento dos dados    | cancel  |
| Aprovar cadastro   | Cadastro concluído         | default |

### **Cadastro Concluído**
| Campo                 | Tipo        | Restrições            | Valor default       |
|-----------------------|-------------|-----------------------|---------------------|
| Mensagem de boas-vindas | Área de texto | apenas leitura       | -                   |

**Comandos**  
| Nome do botão/link | Destino              | Tipo    |
|---------------------|----------------------|---------|
| Acessar painel     | Início do sistema    | default |
