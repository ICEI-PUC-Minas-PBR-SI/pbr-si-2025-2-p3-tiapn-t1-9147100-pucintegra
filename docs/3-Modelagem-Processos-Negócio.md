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
graph TD
    subgraph Família/Paciente
        A(Início) --> B[Identificar Necessidade];
        B --> C[Buscar Indicações];
        C --> D{Profissional Encontrado?};
        D -- Sim --> E[Contatar Profissional];
        E --> F{Disponível?};
        F -- Sim --> G{Qualificado?};
        G -- Sim --> H{Valor Aceitável?};
        H -- Sim --> I[Agendar Manualmente];
        I --> J[Receber Atendimento];
        J --> K(Fim);

        F -- Não --> C;
        G -- Não --> C;
        H -- Não --> C;
        D -- Não --> L[Buscar em Outras Fontes];
        L --> C;
    end

    subgraph Profissional de Saúde
        P1[Receber Contato] --> P2[Analisar Solicitação];
        P2 --> P3{Pode Atender?};
        P3 -- Sim --> P4[Informar Disponibilidade e Valor];
        P3 -- Não --> P5[Recusar Solicitação];
    end

    E --> P1;
    P4 --> F;

### 3.2. Descrição geral da proposta (Modelagem TO BE)

Tendo identificado os gargalos dos modelos AS IS, apresentem uma descrição da proposta de solução, buscando maior eficiência com a introdução da tecnologia. Abordem também os limites dessa solução e o seu alinhamento com as estratégias e objetivos do contexto de negócio escolhido. 
Colem aqui os modelos da solução proposta (modelo TO BE) elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina.
Cada processo identificado deve ter seu modelo TO-BE específico. Descrevam as oportunidades de melhoria de cada processo da solução proposta.

_Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias._

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](./processos/processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")
