## 3. Modelagem dos Processos de Negócio


> **Links Úteis**:
> - [Modelagem de Processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 Dicas Práticas de Modelagem de Processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

### 3.1. Modelagem da situação atual (Modelagem AS IS)

Atualmente, a conexão entre famílias que necessitam de cuidados de saúde domiciliares e os profissionais autônomos ocorre de maneira descentralizada, ineficiente e, em grande parte, analógica. Os processos são manuais e dependem fortemente de redes de contatos pessoais, indicações e buscas ativas, o que gera incerteza, retrabalho e ansiedade para ambos os lados.

#### Processo 1: Busca e Contratação de Profissional (Perspectiva da Família/Paciente)

O processo para uma família encontrar um profissional de saúde qualificado é fragmentado e consome tempo. As etapas atuais são:

1.  *Busca por Indicações:* A jornada começa com a busca por recomendações em círculos de confiança, como amigos, familiares, outros médicos ou grupos em redes sociais. Não há uma fonte centralizada e confiável.
2.  *Contato Individual e Verificação:* A família entra em contato com cada profissional indicado, um por um, via telefone ou mensagem. Esta etapa é marcada por longas esperas por resposta, pois os profissionais frequentemente estão em atendimento.
3.  *Negociação Manual (Idas e Vindas):* Para cada contato, a família precisa verificar as credenciais, a experiência, a disponibilidade de agenda e negociar os valores. Esse ciclo de conversas é repetido com múltiplos profissionais até que se encontre um que seja qualificado, disponível e cujo valor seja compatível, gerando um grande desgaste.
4.  *Agendamento Informal:* O agendamento é realizado verbalmente ou por texto, anotado em agendas pessoais e sujeito a esquecimentos ou erros, pois não há um sistema de confirmação ou lembretes automáticos.
5.  *Gestão Descentralizada:* O acompanhamento da evolução do paciente, o controle de pagamentos e o reagendamento de novas sessões são feitos de forma manual, reiniciando o ciclo de comunicação ineficiente a cada novo atendimento.

#### Processo 2: Captação de Pacientes e Gestão de Atendimentos (Perspectiva do Profissional)

Para o profissional de saúde que deseja oferecer serviços domiciliares, o processo para encontrar pacientes e gerenciar sua agenda é igualmente desafiador:

1.  *Divulgação Limitada:* A captação de novos pacientes depende do marketing "boca a boca", da distribuição de cartões de visita e da sua rede de contatos. A visibilidade é restrita e o alcance é limitado.
2.  *Comunicação Interrompida:* O profissional recebe contatos de potenciais pacientes em horários inoportunos (durante outros atendimentos, por exemplo), o que dificulta a resposta imediata e pode levar à perda da oportunidade.
3.  *Gestão de Agenda Ineficiente:* A verificação de disponibilidade é feita em uma agenda pessoal (física ou no celular), tornando complexo o encaixe de novos pacientes, o cálculo de rotas de deslocamento e a otimização do tempo. A negociação de horários é um quebra-cabeça manual.
4.  *Carga Administrativa Elevada:* O profissional gasta um tempo considerável em tarefas administrativas que não são remuneradas, como agendamento, planejamento logístico, controle financeiro (em planilhas ou cadernos) e elaboração de relatórios manuais sobre o paciente.
5.  *Isolamento Profissional:* A falta de uma plataforma centralizada dificulta o compartilhamento de informações sobre o paciente com outros especialistas e a manutenção de um histórico de atendimentos unificado e de fácil acesso.


---

### Modelos de Processos Atuais (AS-IS) em BPMN

A seguir, apresentamos os diagramas BPMN que modelam os processos atuais, destacando as ineficiências.

#### Processo 1: Busca e Contratação de Profissional (Visão da Família)

Este diagrama ilustra o fluxo de trabalho manual e repetitivo que uma família enfrenta.

| Etapa | Ação | Decisão | Caminho de Sucesso | Caminho de Falha (Retrabalho) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *(Início)* | | -> Identificar Necessidade | |
| 2 | Buscar Indicações | | -> Contatar Profissional | |
| 3 | Contatar Profissional | Disponível? | -> (Sim) | -> *Voltar para Etapa 2* |
| 4 | | Qualificado? | -> (Sim) | -> *Voltar para Etapa 2* |
| 5 | | Valor Aceitável? | -> (Sim) | -> *Voltar para Etapa 2* |
| 6 | Agendar Atendimento | | -> Realizar Pagamento | |
| 7 | Realizar Pagamento | | -> *(Fim)* | |

*Descrição Visual:* A tabela mostra que as etapas 3, 4 e 5 são pontos de decisão críticos. Qualquer resposta "Não" força o processo a retornar à etapa 2 ("Buscar Indicações"), criando um ciclo de retrabalho frustrante que representa o principal gargalo do processo.

---

#### Processo 2: Captação de Pacientes e Gestão de Agenda (Visão do Profissional)

Este diagrama mostra a perspectiva do profissional de saúde e sua gestão administrativa manual.

| Etapa | Ação | Decisão | Caminho de Sucesso | Caminho de Falha |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *(Início)* | | -> Receber Contato | |
| 2 | Retornar Contato | | -> Verificar Agenda | |
| 3 | Verificar Agenda | Negociação OK? | -> (Sim) | -> *(Fim - Oportunidade Perdida)* |
| 4 | Agendar Manualmente | | -> Planejar Rota | |
| 5 | Planejar Rota | | -> Realizar Atendimento | |
| 6 | Realizar Atendimento | | -> Controlar Recebimento | |
| 7 | Controlar Recebimento | | -> *(Fim)* | |

*Descrição Visual:* A tabela destaca a etapa 3 como o ponto crítico. Uma falha na negociação leva ao fim imediato do processo, resultando em perda de renda para o profissional. As múltiplas tarefas manuais (Etapas 3, 4, 5, 7) demonstram a alta carga de trabalho administrativo não clínico.

---

### 3.2. Descrição geral da proposta (Modelagem TO BE)

A proposta consiste na implementação de um aplicativo digital para gestão de atendimentos domiciliares (Home Care) que centraliza e automatiza todo o processo de conexão entre pacientes/familiares e profissionais de saúde. O sistema tem como objetivo eliminar a fragmentação e o retrabalho identificados no modelo atual (AS-IS), promovendo eficiência, segurança e acessibilidade.

A solução permitirá que famílias encontrem profissionais de forma simples e confiável, por meio de perfis verificados, avaliações de usuários e filtros inteligentes. O agendamento será realizado diretamente na plataforma, com confirmações automáticas, notificações e lembretes, garantindo organização e evitando falhas de comunicação.

Para os profissionais, o aplicativo oferecerá gestão integrada de agenda, rotas, histórico de pacientes e faturamento, reduzindo a carga administrativa e aumentando a produtividade. Além disso, contará com prontuário digital, relatórios de evolução do paciente, chat seguro e geolocalização em tempo real, proporcionando maior transparência e confiança no serviço.

Com essa proposta, os processos que hoje são manuais, repetitivos e descentralizados passam a ser digitalizados, padronizados e escaláveis, criando um ecossistema de Home Care moderno, seguro e de fácil uso, que beneficia pacientes, familiares e profissionais de saúde.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](./processos/processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")
