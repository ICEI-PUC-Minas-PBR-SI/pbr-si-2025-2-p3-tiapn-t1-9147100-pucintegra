<span style="color:red">Pré-requisitos: <a href="6-Interface-Sistema.md"> Projeto da Solução</a></span>

# Dashboard de Indicadores de Desempenho - Plataforma Medlar

**Projeto:** TRABALHO INTERDISCIPLINAR DE PROCESSOS DE NEGOCIOS
**Base:** Requisitos da Professora Cleia Amaral (Nome, Objetivo, Descrição, Fonte de Dados, Memória de Cálculo e Apresentação em Dashboard)

## Resumo Executivo dos Indicadores

A tabela a seguir apresenta um resumo dos principais indicadores de desempenho (KPIs) propostos para monitorar a saúde e a eficácia da plataforma de Home Care, com base em dados simulados.

| Indicador | Último Valor (Simulado) | Meta |
|:---|:---|:---|
| **Taxa de Conversão de Cadastro de Profissionais** | 124.2% | > 70% |
| **Tempo Médio de Agendamento (TMA)** | 2.5h | < 4h |
| **Taxa de Acompanhamento Diário de Pacientes** | 113.9% | > 90% |
| **Índice de Satisfação do Usuário (ISU)** | 4.61 | > 4.5 |
| **Taxa de Utilização da Geolocalização** | 87.2% | > 80% |

---

## Detalhamento e Visualização dos Indicadores

### 1. Taxa de Conversão de Cadastro de Profissionais

**Objetivo:** Medir a eficácia do processo de *onboarding* de profissionais de saúde.
**Memória de Cálculo:** (Número de Cadastros de Profissionais Validados / Número de Cadastros de Profissionais Iniciados) * 100

![Gráfico da Taxa de Conversão de Cadastro de Profissionais](https://private-us-east-1.manuscdn.com/sessionFile/hawtSnYMeyBBj75zaskoDC/sandbox/2SGBpB6KjJEFI7Hd4Gibll-images_1764196081554_na1fn_L2hvbWUvdWJ1bnR1L2Rhc2hib2FyZF9hc3NldHMvY29udmVyc2FvX3Byb2Zpc3Npb25haXM.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaGF3dFNuWU1leUJCajc1emFza29EQy9zYW5kYm94LzJTR0JwQjZLakpFRkk3SGQ0R2libGwtaW1hZ2VzXzE3NjQxOTYwODE1NTRfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmhjMmhpYjJGeVpGOWhjM05sZEhNdlkyOXVkbVZ5YzJGdlgzQnliMlpwYzNOcGIyNWhhWE0ucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=l6jHwqVKY24BZmG4ESh2H4wq-m-JuMaCZt7~~xjt43KLVIT9E8I9zJ21BoZQXLPuac55zbmncmPim-aNdU6DUCGfL47bsZur0HLNx0wPL~9ql4zbnupr5ImwwvO-XRZjG8t8jiFqdtv~oHMjoLX-wuGa8cISGPFVzUhYQSwOBdsFBN39TK1IqZoVebD61a-Rea6wXEVUGr27MzzhEYDmRT2hEgOcSJ5YB9YJBQ7p6eP57YZpbBdZOz~2TYCWjj4uM6J4hY8o1bPSGJqIMMpIbGT~Z70XnQeTyxRZPk8tHfzMyBfxMBsu7hWqyVX4heOx2zArR9q5cHxK0SUHa0pKUg__)

### 2. Tempo Médio de Agendamento (TMA)

**Objetivo:** Avaliar a eficiência e a agilidade do processo de agendamento de serviços.
**Memória de Cálculo:** Soma do Tempo (Confirmação - Solicitação) de todos os Agendamentos / Número Total de Agendamentos Confirmados

![Gráfico do Tempo Médio de Agendamento](https://private-us-east-1.manuscdn.com/sessionFile/hawtSnYMeyBBj75zaskoDC/sandbox/2SGBpB6KjJEFI7Hd4Gibll-images_1764196081555_na1fn_L2hvbWUvdWJ1bnR1L2Rhc2hib2FyZF9hc3NldHMvdG1hX2FnZW5kYW1lbnRv.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaGF3dFNuWU1leUJCajc1emFza29EQy9zYW5kYm94LzJTR0JwQjZLakpFRkk3SGQ0R2libGwtaW1hZ2VzXzE3NjQxOTYwODE1NTVfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmhjMmhpYjJGeVpGOWhjM05sZEhNdmRHMWhYMkZuWlc1a1lXMWxiblJ2LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nQzr1lJ-7NYIxz6BLvb3S6dhwiOPuzA2pzCQselMv3t7bEhNVvg8ubSVY9~92e3Io7G~uhmzObNzGTdUDQN3rTIj8FConHv7XPFXGDqMY1-i56Y-qXUOBTGDRHlNz2qlCU6F~uN3C-abN2RPEAeGF0lQ627hAsD2fxCRZIphSswzXiHIePShAPk3baoXck4cuo7oVyyoHvTTLpliYLwNTBcXoYsV1N1oMyIGlOer4VYu25fhe0qghhNwBvhpd4h8azbIx1fbp6qqWJh-uvHy5G4PIoq6NcTi2OiZqJOSsHDm5TYmxAOVutq92BdBS3TgGpnjhQeiceLMt445PnVhBg__)

### 3. Taxa de Acompanhamento Diário de Pacientes

**Objetivo:** Medir a adesão dos profissionais ao sistema de relatórios diários, garantindo a qualidade e a transparência do Monitoramento do Paciente.
**Memória de Cálculo:** (Número de Relatórios Diários Submetidos / Número de Atendimentos Concluídos) * 100

![Gráfico da Taxa de Acompanhamento Diário de Pacientes](https://private-us-east-1.manuscdn.com/sessionFile/hawtSnYMeyBBj75zaskoDC/sandbox/2SGBpB6KjJEFI7Hd4Gibll-images_1764196081556_na1fn_L2hvbWUvdWJ1bnR1L2Rhc2hib2FyZF9hc3NldHMvYWNvbXBhbmhhbWVudG9fZGlhcmlv.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaGF3dFNuWU1leUJCajc1emFza29EQy9zYW5kYm94LzJTR0JwQjZLakpFRkk3SGQ0R2libGwtaW1hZ2VzXzE3NjQxOTYwODE1NTZfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmhjMmhpYjJGeVpGOWhjM05sZEhNdllXTnZiWEJoYm1oaGJXVnVkRzlmWkdsaGNtbHYucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jbT8JJ4be~LZqEqMY8vumz23VHYdJLZfqmnwBrEd8QH48l-n9zWRaXsHIqHp7FvPNZuXcNPXapdQ6nv860Ea7ir1W5bhIdmS7E3YdXBD1s41AbvPyXijt9wODBqFDvZPgUEABCqpoyc9XSk8fB6C2fPIeZ8bidc-xX1cwks~KxY--BOtEzG2hms~06Bwl-gBf4bPBCS~FIg0TSNOVEYCLjwdmc1NMsF4ysz0HGZEKCSrRsuXAuh-poW~McqQ4sHrVoGAo5CjZPUIZKAmG96Iy3jZkgpiJY1rnmqD90Ik5cd4EaagO7cE2CGU6Sa-Eis32VzKu~whKyJsbE-5GqMUJA__)

### 4. Índice de Satisfação do Usuário (ISU)

**Objetivo:** Quantificar a satisfação geral dos pacientes/familiares com o serviço prestado.
**Memória de Cálculo:** Soma de Todas as Notas de Avaliação / Número Total de Avaliações Registradas

![Gráfico do Índice de Satisfação do Usuário](https://private-us-east-1.manuscdn.com/sessionFile/hawtSnYMeyBBj75zaskoDC/sandbox/2SGBpB6KjJEFI7Hd4Gibll-images_1764196081556_na1fn_L2hvbWUvdWJ1bnR1L2Rhc2hib2FyZF9hc3NldHMvc2F0aXNmYWNhb191c3Vhcmlv.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaGF3dFNuWU1leUJCajc1emFza29EQy9zYW5kYm94LzJTR0JwQjZLakpFRkk3SGQ0R2libGwtaW1hZ2VzXzE3NjQxOTYwODE1NTZfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmhjMmhpYjJGeVpGOWhjM05sZEhNdmMyRjBhWE5tWVdOaGIxOTFjM1ZoY21sdi5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CIO78Rn8J3pRtJc3rF1Qn3Tj9DkOJZaLuMhg0~nKOZDjje~l6ow0RpWjRdCQGZfAn4Qm8iopCGUNc6HqvfWhOtFnPg5qE5LIIc4vaG8iMKD~2QeKH6ghNory3NYzYRDqrEMK9PuNIltth~wIqnF0QtH7CFl6-rvLRODmUSx4nD88lPsLbnEFyIcZsqEDoUyK2eRMyR78Y1fHhMVH63l4g8ZfQ~BqBuxUfo7FKEcGRxaScspaZGFm6bi~EzanE1YcJ-Z2NMwq7CE9Sb5DWtyMA8AyCBDM24dCTRTYU22~jP3Hv965iqnKL1IR1kOcvJsaj5GdWi-DZgQsB7VVVY-rHA__)

### 5. Taxa de Utilização da Geolocalização

**Objetivo:** Medir a adoção da funcionalidade de geolocalização, que visa aumentar a transparência e a segurança para o paciente.
**Memória de Cálculo:** (Número de Agendamentos com Rastreamento Visualizado / Número Total de Agendamentos) * 100

![Gráfico da Taxa de Utilização da Geolocalização](https://private-us-east-1.manuscdn.com/sessionFile/hawtSnYMeyBBj75zaskoDC/sandbox/2SGBpB6KjJEFI7Hd4Gibll-images_1764196081557_na1fn_L2hvbWUvdWJ1bnR1L2Rhc2hib2FyZF9hc3NldHMvdXRpbGl6YWNhb19nZW9sb2NhbGl6YWNhbw.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaGF3dFNuWU1leUJCajc1emFza29EQy9zYW5kYm94LzJTR0JwQjZLakpFRkk3SGQ0R2libGwtaW1hZ2VzXzE3NjQxOTYwODE1NTdfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmhjMmhpYjJGeVpGOWhjM05sZEhNdmRYUnBiR2w2WVdOaGIxOW5aVzlzYjJOaGJHbDZZV05oYncucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=W-F~HzV20g~qh5R~Llt~jydOsU~QdQ3k-PFLB0KfzvEw0zRWiObXjjlH8dYPbeUnojo4cSuVKshJTog8MiKCL9xfV1lv0DqpPIA3a9A6rsLu97aJnGpApUp7qNtSg3zNW3YwIzp-fnrEkaUqdBgJbay6R9yEGgyMxN~rWHeQ~eLTTD5NpPXCqd3p7XhFtj5vKWx9Vls2kMyM5BIn3u~7MZJ6zQty9NxhfJhzycN9uqoCR938Y7pOrONDuI~NAdfSz9zeiAge-DWUSEId9PR-6~WeZB-T-E85GbyvCsQZZT7EOHF2OLBj9Gt94GAwc3cgVr4~irrm2SQTyduVhvntEw__)

---

## Estrutura Completa dos Indicadores (Tabelas)

| Indicador | Objetivo | Descrição | Fonte de Dados | Memória de Cálculo |
|:---|:---|:---|:---|:---|
| **Taxa de Conversão de Cadastro de Profissionais** | Medir a eficácia do processo de *onboarding* de profissionais de saúde. | Percentual de profissionais de saúde que iniciam o cadastro e o concluem com a validação de credenciais. | Módulo de Cadastro de Profissionais. | (Cadastros Validados / Cadastros Iniciados) * 100 |
| **Tempo Médio de Agendamento (TMA)** | Avaliar a eficiência e a agilidade do processo de agendamento. | Tempo médio, em horas, entre a solicitação e a confirmação do agendamento. | Módulo de Agendamento de Serviço. | Soma do Tempo (Confirmação - Solicitação) / Total de Agendamentos Confirmados |
| **Taxa de Acompanhamento Diário de Pacientes** | Medir a adesão dos profissionais ao sistema de relatórios diários. | Percentual de atendimentos concluídos que tiveram o Relatório Diário de Evolução preenchido. | Módulo de Monitoramento do Paciente. | (Relatórios Submetidos / Atendimentos Concluídos) * 100 |
| **Índice de Satisfação do Usuário (ISU)** | Quantificar a satisfação geral dos pacientes/familiares. | Média das notas de avaliação (escala de 1 a 5) atribuídas pelos usuários. | Módulo de Avaliação do Serviço. | Soma de Todas as Notas / Número Total de Avaliações |
| **Taxa de Utilização da Geolocalização** | Medir a adoção da funcionalidade de geolocalização. | Percentual de agendamentos em que o paciente/familiar utilizou a geolocalização para acompanhar a chegada. | Módulo de Geolocalização. | (Agendamentos com Rastreamento Visualizado / Total de Agendamentos) * 100 |

---

## 7. Conclusão

Essa proposta de desenvolvimento de um aplicativo para colocar profissionais de 
saúde no atendimento domiciliar (Meldar) apresenta uma solução inovadora 
e prática para os desafios enfrentados por pacientes que necessitam de cuidados 
contínuos, e para o familiar que passa por dificuldades com o cuidado com a 
pessoa acamada. 

Ao conectar técnicos de enfermagem, enfermeiros, 
fisioterapeutas e fonoaudiólogos com os pacientes e suas famílias, o aplicativo 
não apenas facilita o acesso a esses serviços essenciais, mas também promove um 
cuidado mais humanizado e personalizado para o paciente e o ambiente familiar.

Além disso, a funcionalidade de acompanhamento diário da evolução dos 
pacientes, com relatórios detalhados acessíveis às famílias, fortalece a 
comunicação entre os profissionais de saúde e os responsáveis, gerando maior 
confiança e transparência no tratamento. 

Essa abordagem contribui para a 
eficiência do atendimento, reduzindo a necessidade de internações hospitalares 
desnecessárias e melhorando a qualidade de vida dos pacientes.

Por fim, o projeto alinha-se às tendências crescentes de digitalização na saúde, ao 
mesmo tempo em que atende às demandas por serviços mais acessíveis e 
integrados. Com a implementação dessa ferramenta, será possível transformar o 
cenário do Home Care, tornando-o mais eficiente mais ágil e centrado no bem
estar dos pacientes e suas famílias.
