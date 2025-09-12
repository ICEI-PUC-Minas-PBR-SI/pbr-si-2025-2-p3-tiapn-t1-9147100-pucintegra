# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas


### João Almeida
Homem de 57 anos, classe média, mora em Belo Horizonte, na região do Centro. É formado em Administração e trabalha como auxiliar administrativo. Gosta de passar tempo com sua família e de viajar sempre que possível. Portanto, João prefere comprar produtos mais baratos, a fim de juntar seu dinheiro para realizar tais viagens com os filhos e a esposa. Ele é um homem de poucas palavras, mas que está sempre disposto a ajudar quem precisa. Está a procura de um salão de festas simples, mas aconchegante e de boa localização, para realizar o aniversário de seu filho Lucas, de 8 anos.

### Ana Carolina
Mulher de 24 anos, classe média-baixa, mora em Belo Horizonte, na região de Venda Nova. É estudante de direito e faz estágio em um cartório. Gosta de visitar museus, ir a parques, sair para festas com as amigas e visitar seus parentes toda semana. Sempre que possível, ela gosta de comprar produtos caros, de alta qualidade, pois acredita que “o barato sai caro”. Ela é uma pessoa animada, que aprecia as artes e gosta de passar tempo com seus conhecidos. Junto de suas outras amigas, ela está em busca de um salão de festas para realizar uma festa surpresa para sua amiga, Letícia, de 26 anos, que irá mudar de país em breve.

### Paulo Martins
Homem de 38 anos, classe média-alta, mora em Nova Lima, mas visita Belo Horizonte com frequência. Ele é formado em Propaganda e Marketing, e é dono de um salão de festas no hipercentro de Belo Horizonte. Gosta de viajar com a esposa, ir a restaurantes chiques e de treinar em academias. Ele busca contratar sempre os melhores serviços para seu negócio, pois é graças a ele que Paulo consegue manter seu estilo de vida. Paulo é um homem reservado, que prefere ter poucos amigos. Está buscando um modo de divulgar seu salão online, a fim de conseguir agendar o maior número de clientes possível nele, e então poder pensar em expandir seu negócio


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO...       | QUERO/PRECISO...                                                                 | PARA...                                                                                  |
|------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| **Locador**      | Registrar meu espaço (salão de festas, sítio, casa de praia, galpão, auditório, …) | Divulgá-lo a possíveis clientes                                                           |
| **Administrador**| Deletar postagens impróprias                                                     | Manter o tema do site e evitar que conteúdos inadequados sejam postados                   |
| **Locatário**    | Buscar um lugar disponível para alugar                                           | Comemorar uma festa de aniversário, festa de casamento, reunião de família, evento comercial, … |
| **Usuário do site** | Registrar meu perfil                                                             | Poder acessar todos os serviços do site                                                   |



## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir o cadastro de locador, locatários e seus espaços | ALTA  |
|RF-002| O sistema deve permitir avaliar locadores e locatários                   | MÉDIA  |
|RF-003|  |   |
|RF-004|  |   |
|RF-005|  |   |
|RF-006|  |   |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  | Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser intuitivo a fim de englobar diferentes perfis de usuario                               | ALTA  |
|RNF-002| O sistema deve ser responsivo e ter suporte a multiplas plataformas de navegação                          | ALTA  |
|RNF-003| A interface deve apresentar informações claras sobre as funcionalidades do sistema                        | ALTA  |
|RNF-004| O processo de busca e reserva deve ser ágil                                                               | MÉDIA  |
|RNF-005| O sistema de busca e filtros deve retornar resultados rapidamente                                         | BAIXA  |
|RNF-006| O módulo de reservas e o calendário de disponibilidade devem ser atualizados em tempo real                | ALTA  |
|RNF-007| O sistema deve incorporar mecanismos para fortalecer a segurança                                          | ALTA  |
|RNF-008| O sistema deve suportar um aumento de 50% no número de usuários simultâneos sem degradação do desempenho  | ALTA  |
|RNF-009| O sistema deve operar corretamente e sem falhas em 99% do tempo                                           | ALTA  |
|RNF-010| O sistema deve ser tolerante a falhas, de forma transparente e não prejudicial ao usuario                 | ALTA  |


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
|02| O sistema deve ser responsivo, permitindo uso em diferentes dispositivos (Web e mobile) |
|03| O sistema deve ser compatível com a ultima versão dos navegadores mais utilzados (Chrome, Edge e Safari) |
|04| O desenvolvimento do backend deve ser feito em C# |
|05| O desenvolvimento do front deve ser feito em HTML/CSS/JS |
|06| O banco de dados utilizado deve ser o Firebase |
|07| O sistema não terá integração com meios de pagamento online |

