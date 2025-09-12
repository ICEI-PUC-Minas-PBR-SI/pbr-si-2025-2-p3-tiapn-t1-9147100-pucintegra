# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md">Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. Esta seção apresenta uma visão geral da especificação do sistema Passa Régua, que será detalhada a seguir por meio de personas, histórias de usuários, requisitos funcionais e não funcionais e restrições do projeto.

Técnicas e Ferramentas Utilizadas

Para realizar a especificação do projeto, serão empregadas as seguintes abordagens e recursos:

- Modelagem de Personas para identificar perfis e necessidades dos usuários.

- Histórias de Usuário (User Stories) no formato ágil (“Como [ator], quero [ação] para [benefício]”), auxiliando na elicitação dos requisitos.

- Levantamento de Requisitos por meio da análise do contexto e das discussões do time.

- Documentação em Markdown (.md) no repositório GitHub, facilitando versionamento e colaboração.

- Tecnologias alvo do projeto: banco de dados MySQL já provisionado e implementação em arquitetura de microserviços, com uso de Java e .NET para os módulos conforme definido pela equipe.

## Personas

1- Júlia, 28 anos, estudante de mestrado e a amiga que sempre organiza os rolês. Ela é metódica e adora planejar tudo com antecedência, mas se sente sobrecarregada na hora de dividir as contas. Ela é quem geralmente paga tudo primeiro e depois tem que ficar cobrando a galera. Quer que todos se divirtam e se sintam confortáveis, sem que o dinheiro seja um problema. Acha estressante ter que controlar todas as despesas em planilhas e ter a "cobrança" como uma responsabilidade adicional. Sente que o peso da organização financeira recai sobre ela.

2- Pedro, 25 anos, designer gráfico e o cara mais relax do grupo. Ele tem a melhor das intenções, mas é bem esquecido quando o assunto é dinheiro. Muitas vezes ele nem se lembra que pagou ou que precisa pagar alguém. Quer participar de tudo e curtir sem se preocupar com os detalhes financeiros. Fica com vergonha de não se lembrar de pagar ou de ter que perguntar para os outros quanto ele deve. Tem medo de parecer irresponsável e de prejudicar a organização do grupo.

3-  André, 32 anos, engenheiro de software, é o mais cético e analítico do grupo. Ele valoriza a justiça e a transparência em tudo, inclusive nas finanças. Ele tem uma planilha pessoal para tudo e quer ter certeza de que as contas estão perfeitamente equilibradas. Quer garantir que as contas sejam divididas de forma exata e justa, sem que ninguém saia no prejuízo. Não confia em "acertos de cabeça" e se sente desconfortável quando as contas não fecham no final do encontro. Fica inseguro sobre o uso de planilhas manuais que podem ter erros.

4- Ana, 40 anos, mãe de duas crianças (8 e 12 anos). Ela adora viajar com a família, mas a divisão de contas com outros casais é sempre um desafio. Suas filhas nem sempre consomem a mesma coisa ou participam de todas as atividades, o que torna a divisão mais complexa. Quer aproveitar o tempo com a família e amigos, sem se preocupar com a logística de quem pagou o quê, especialmente em despesas que não são iguais para todos. Sente dificuldade em calcular a divisão de gastos quando o consumo é desigual. Sente-se pressionada para que a divisão seja feita de forma justa, sem que as crianças sejam "cobradas" por despesas de adultos.

5- Lucas, 23 anos, estudante universitário, vive com o orçamento apertado. Ele sempre participa de viagens e eventos, mas está sempre de olho nos gastos. Ele não gosta de ter que pagar algo que não consumiu. Quer participar das atividades do grupo, mas precisa controlar seu dinheiro para não estourar o orçamento. Se sente desconfortável quando a divisão é por igual, especialmente quando consome menos que os outros. Tem dificuldade em pedir para que as contas sejam divididas de forma diferente.


## Histórias de Usuários

1. História da Júlia
Como a Organizadora, eu quero um aplicativo onde eu possa registrar as despesas do grupo em tempo real, para que eu não precise mais usar planilhas e me sinta segura de que todas as contas estão sendo registradas, aliviando o estresse da cobrança.

2. História do Pedro
Como o Esquecido, eu quero receber notificações sobre quem eu preciso pagar e quem me deve, para que eu não me esqueça de acertar as contas e não crie atrito com meus amigos por causa de dívidas pendentes.

3. História do André
Como o Controlado, eu quero ter acesso a um painel com um resumo financeiro claro e transparente para todos os membros, para que eu possa verificar se as despesas foram registradas corretamente e ter certeza de que o acerto final é justo e preciso para todos.

4. História da Ana
Como mãe de família, eu quero a capacidade de marcar despesas como "não participativas" para determinados membros do grupo, para que a divisão de contas considere o consumo das minhas filhas, garantindo que eu pague apenas pelo que consumimos e a divisão seja equitativa.

5. História do Lucas
Como o Poupador, eu quero poder visualizar meu saldo individual em tempo real e ver exatamente quanto eu devo ou quanto me devem, para que eu possa planejar meus gastos e me sentir mais à vontade sabendo que não terei que pagar por algo que não consumi, mantendo meu orçamento sob controle.

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |


> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito                                                                 | Prioridade |
|------|-----------------------------------------------------------------------------------------|------------|
|RF-001| Permitir que o usuário crie uma conta e faça login com validação de e-mail ou celular.  | ALTA       |
|RF-002| Permitir a criação de grupos de despesas e o gerenciamento por administradores.         | ALTA       |
|RF-003| Enviar convites para inclusão de membros no grupo, com aceite ou recusa.                | ALTA       |
|RF-004| Permitir a inclusão de participantes não cadastrados, com opção de substituição futura. | MÉDIA      |
|RF-005| Registrar despesas com anexos e submetê-las à aprovação do administrador.               | ALTA       |
|RF-006| Enviar notificações automáticas sobre aprovações, reprovações e alterações de despesas. | ALTA       |
|RF-007| Calcular automaticamente a divisão das despesas entre os membros do grupo.              | ALTA       |
|RF-008| Permitir o registro de pagamentos e abatimentos, com atualização dos saldos.            | ALTA       |
|RF-009| Enviar notificações de confirmação de pagamento aos membros do grupo.                   | MÉDIA      |
|RF-010| Oferecer visualização clara da carteira individual e coletiva do grupo.                 | MÉDIA      |
|RF-011| Disponibilizar relatórios de despesas, saldos e histórico de eventos.                   | MÉDIA      |
|RF-012| Implementar elementos de gamificação (medalhas, selos) para incentivar engajamento.     | BAIXA      |
|RF-013| Gerar estatísticas de uso e comportamento dos usuários, disponibilizando relatórios para a administração do sistema. | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
