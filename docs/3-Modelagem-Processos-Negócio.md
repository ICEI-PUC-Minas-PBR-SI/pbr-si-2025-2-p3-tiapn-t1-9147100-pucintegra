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


### Modelos de Processos Atuais (AS-IS) em BPMN

#### Processo 1: Busca e Contratação de Profissional (Visão da Família)

Este diagrama ilustra o fluxo de trabalho manual e repetitivo que uma família enfrenta.


          +-------------------------+
(Início)-->| Identificar Necessidade |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |   Buscar Indicações     |
          | (Amigos, Grupos, etc.)  |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |   Contatar Profissional |
          +-------------------------+
                  |
                  v
          <  Disponível?  >
          +---------------+
                  | (Sim)
                  v
          < Qualificado?  >
          +---------------+
                  | (Sim)
                  v
          < Valor Aceitável? >
          +------------------+
                  | (Sim)
                  v
          +-------------------------+
          |   Agendar Atendimento   |
          |       (Manual)          |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |    Realizar Pagamento   |
          +-------------------------+
                  |
                  v
               (Fim)


*Descrição Visual:* O diagrama mostra um caminho linear que só é seguido em caso de sucesso. Na prática, as setas de "Não" criam um ciclo de retrabalho frustrante, forçando a família a reiniciar a busca a cada falha na negociação, o que representa o principal gargalo do processo.

---

#### Processo 2: Captação de Pacientes e Gestão de Agenda (Visão do Profissional)

Este diagrama mostra a perspectiva do profissional de saúde e sua gestão administrativa manual.


          +-------------------------+
(Início)-->|  Receber Contato de     |
(Evento)  |    Potencial Paciente   |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |     Retornar Contato    |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |  Verificar Agenda Manual|
          +-------------------------+
                  |
                  v
          < Negociação OK? >
          | (Horário/Valor)  |
          +------------------+
                  | (Sim)
                  v
          +-------------------------+
          |   Agendar Manualmente   |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |      Planejar Rota      |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |   Realizar Atendimento  |
          +-------------------------+
                  |
                  v
          +-------------------------+
          |  Controlar Recebimento  |
          +-------------------------+
                  |
                  v
               (Fim)



*Descrição Visual:* O diagrama mostra que o processo depende de eventos externos e comunicação assíncrona ("Retornar Contato"). O ponto crítico é o gateway de negociação: um "Não" encerra o processo abruptamente, significando uma lacuna na agenda e perda de renda para o profissional. As múltiplas tarefas administrativas manuais (verificar agenda, agendar, planejar rota, controlar recebimento) demonstram a alta carga de trabalho não clínico.

---


### 3.2. Descrição geral da proposta (Modelagem TO BE)

Tendo identificado os gargalos dos modelos AS IS, apresentem uma descrição da proposta de solução, buscando maior eficiência com a introdução da tecnologia. Abordem também os limites dessa solução e o seu alinhamento com as estratégias e objetivos do contexto de negócio escolhido. 
Colem aqui os modelos da solução proposta (modelo TO BE) elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina.
Cada processo identificado deve ter seu modelo TO-BE específico. Descrevam as oportunidades de melhoria de cada processo da solução proposta.

_Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias._

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](./processos/processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")
