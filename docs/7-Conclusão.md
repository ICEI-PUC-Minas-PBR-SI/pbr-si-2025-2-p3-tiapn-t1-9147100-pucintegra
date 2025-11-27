## 7. Conclusão

<span style="color:red">Pré-requisitos: <a href="4-Projeto-Solucao.md"> Projeto da Solução</a></span>

O projeto PUC Integra alcançou seu objetivo principal de idealizar e especificar uma plataforma colaborativa voltada para a comunidade acadêmica da PUC Minas. Inspirado na dinâmica de redes como o Brainly, mas adaptado ao rigor e às necessidades institucionais, o sistema proposto oferece uma solução viável para a fragmentação do conhecimento e a falta de canais digitais centralizados para suporte mútuo entre alunos.
Através da modelagem de processos (AS-IS e TO-BE), foi possível identificar gargalos na comunicação atual e propor fluxos otimizados para o cadastro, login e interação (perguntas e respostas). A arquitetura de dados relacional desenhada garante que a integridade das informações acadêmicas seja mantida, permitindo a validação de conteúdos por monitores e professores, um diferencial chave em relação a fóruns abertos na internet.

### Indicadores
| Indicadores | Objetivos | Descrição | Fonte de Dados |
|--------------|----------------------------------------------------------------|------------------------------------|------------------------------------|
|Taxa de Usuários Ativos | Avaliar o nível de adoção e engajamento da comunidade acadêmica com a plataforma | Número de usuários únicos (alunos e professores) que realizaram pelo menos uma ação no período de um mês |Tabela de usuários e Logs de atividade da plataforma|
|Volume de Conteúdo Colaborativo | Medir a produção e o crescimento do repositório de conhecimento| Contagem total de perguntas, respostas e materiais de estudo postados na plataforma em um determinado período|Tabela de posts e Tabela de respostas (Banco de dados da plataforma)|
|Taxa de Conteúdo Validado | Garantir a confiabilidade e qualidade das informações compartilhadas | Percentual de respostas que foram oficialmente validadas por um Professor ou Moderador Institucional | Tabela de respostas e Tabela de validação|
|Tempo Médio para Primeira Resposta |Avaliar a rapidez do suporte mútuo da comunidade, impulsionando a colaboração em tempo real | O tempo médio (em horas ou minutos) que uma pergunta leva para receber a sua primeira resposta | Logs de data/hora de postagem da pergunta e da primeira resposta|
|Taxa de Integração Institucional | Verificar a integração da plataforma com elementos e informações da PUC Minas (disciplinas, calendários, etc)|Percentual de perguntas ou materiais que foram associados a um tópico (ex: disciplina, bibliografia) ou evento oficial da PUC Minas | Tabela de posts e Tabela de associações institucionais|

### Limitações e Trabalhos Futuros
Apesar da robustez da especificação, algumas limitações foram observadas nesta versão inicial do projeto:
- **Escopo de Implementação:** A solução foca primariamente na interface web, não contemplando, neste momento, um aplicativo nativo para dispositivos móveis (iOS/Android), embora a interface web seja responsiva.
- **Integração com Sistemas Legados:** A integração automática com o sistema de matrícula oficial da PUC Minas (SGA) foi modelada logicamente, mas sua implementação real dependeria de APIs que não são públicas.

### Como sugestões para trabalhos futuros, recomenda-se:
- Desenvolvimento de um sistema de Gamificação, atribuindo pontos e badges para alunos que mais contribuem com respostas validadas.
- Implementação de Inteligência Artificial para recomendação automática de respostas baseada em dúvidas similares já solucionadas.
- Expansão do módulo de Monitoria, permitindo agendamento de sessões de estudo em tempo real.

**O PUC Integra posiciona-se, portanto, como uma ferramenta estratégica para fortalecer o aprendizado colaborativo e o senso de comunidade dentro da universidade.**
