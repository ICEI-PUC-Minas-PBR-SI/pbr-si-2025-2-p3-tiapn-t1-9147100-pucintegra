### 3.3.1 Processo 1 – Cadastro de Usuário
O processo de cadastro de usuário inicia com o acesso a tela de cadastro de usuário, onde o usuário escolhe primeiramente se irá se cadastrar como locador ou locatário. Em seguida, é exibido o formulário correspondente: no caso do Locador, são solicitadas informações como nome, e-mail, CPF/CNPJ, endereço, senha e confirmação de senha, além da possibilidade de inserir uma foto de perfil. Já para o Locatário, os dados coletados seguem estrutura semelhante, porém focada em pessoa física, não sendo possivel cadastrar CNPJ. Após o preenchimento e a confirmação do usuário, o sistema validará os dados preenchidos e se tudo estiver nos conformes enviará um código de verificação para e-mail e exigirá a aceitação dos termos de uso junto do codigo para concluir o cadastro. 

![Modelo BPMN do PROCESSO 1 - Cadastro de Usuário](../images/processo1_bpmn.png "Cadastro de Usuário")

#### Detalhamento das atividades

1. [Acessar a tela de cadastro](#atividade-1---acessar-a-tela-de-cadastro)
   - Ponto inicial do fluxo. O usuário acessará a tela de cadastro de usuário ao clicar no botão Criar novo usuário.
     
2. [Escolher tipo de usuário](#atividade-2---escolher-tipo-de-usuário)
   - O usuário irá escolher qual tipo de usuário ele deseja cadastrar.(Locador/Locatário)

3. [Preencher os dados](#atividade-3---preencher-os-dados)
   - O usuário irá preencher os dados como nome, e-mail, CPF, CNPJ(caso tenha escolhido cadastrar como locador), endereço, etc..
     
4. [Confirmar cadastro](#atividade-4---confirmar-cadastro)
   - O usuário irá confirmar o cadastro ao clicar no botão Cadastrar.
   - Envio de código de verificação por e-mail.  
   - Exige aceite dos termos de uso antes da validação.
     
5. [Confirmar cadastro efetuado com sucesso)](#atividade-5---confirmar-cadastro-efetuado-com-sucesso)
   - O usuário irá confirmar o cadastro caso tenha sido efetuado com sucesso.  

### Atividade 1 - Acessar a tela de cadastro

**Comandos**

| Nome do botão/link | Destino | Tipo |
| :--- | :--- | :--- |
| Criar novo usuário | Atividade 2 - Escolher tipo de usuário | default |
| Já possuo uma conta| - | default |

  
### Atividade 2 - Escolher tipo de usuário

| Campo            | Tipo           | Restrições                                                     | Valor default   |
|------------------|----------------|----------------------------------------------------------------|-----------------|
| Locatário | Botão de opção(radio button) | -    | checked            |
| Locador   | Botão de opção(radio button) | -    | null               |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|--------------------|----------------------------|---------|
| Cancelar           | Fim do processo            | cancel  |
| Confirmar cadastro | Confirmação de cadastro    | default |

### Atividade 3 - Preencher os dados

| Campo            | Tipo           | Restrições                                                     | Valor default   |
|------------------|----------------|----------------------------------------------------------------|-----------------|
| Nome completo    | Caixa de texto | obrigatório, mínimo 3 caracteres                               | -              |
| E-mail           | Caixa de texto | formato de e-mail válido, obrigatório                          | -              |
| Telefone         | Caixa de texto | formato (xx) xxxxx-xxxx, obrigatório                           | -              |
| CPF/CNPJ(locador)| Caixa de texto | obrigatório, verificação de duplicidade                        | -              |
| Endereço         | Área de texto  | obrigatório                                                    | -              |
| Senha            | Caixa de texto | mínimo 8 caracteres, incluir letra maiúscula, número e símbolo | -              |
| Confirmar senha  | Caixa de texto | deve coincidir com senha                                       | -              |
| Foto de perfil   | Imagem         | opcional, até 2MB                                              | imagem padrão  |

**Comandos**  
| Nome do botão/link | Destino                    | Tipo    |
|--------------------|----------------------------|---------|
| Cancelar           | Fim do processo            | cancel  |
| Confirmar cadastro | Confirmação de cadastro    | default |


### Atividade 4 - Confirmar cadastro
| Campo                    | Tipo                     | Restrições                                      | Valor default |
|--------------------------|--------------------------|-------------------------------------------------|---------------|
| Código de verificação    | Número                   | enviado por e-mail ou SMS, obrigatório          | -             |
| Aceite dos termos de uso | Seleção única (checkbox) | obrigatório                                     | desmarcado    |

**Comandos**  
| Nome do botão/link | Destino                                | Tipo    |
|--------------------|----------------------------------------|---------|
| Voltar             | Preenchimento dos dados                | cancel  |
| Confirmar          | Validação do usuário Locador/Locatário | default |


### Atividade 5 - Confirmar cadastro efetuado com sucesso
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
