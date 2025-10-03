### 3.3.3 Processo 3 – Busca e filtros avançados

O processo ocorre dentro do dashboard de aluguel de locais e tem como participante principal o usuário locatário e se inicia quando ele insere algum campo na barra de pesquisa ou acessa e preenche os campos do filtro para buscas mais refinadas. O processo se encerra quando o sistema retorna os resultados da pesquisa ou do filtro de buscas avançadas.

![Modelo BPMN do PROCESSO 3 - ](../images/processo_3_bpmn.png "Busca e filtros avançados")


#### Detalhamento das atividades

1. [Pesquisar por locais](#atividade-1---pesquisar-por-locais)

   - Permite que o usuário insira um endereço, CEP, bairro, cidade ou ponto de referência em um campo de busca.
   - Exibe a lista de propriedades relacionadas com o dados inseridos na área de propriedades.

2. [Filtrar por opções avançadas](#atividade-2---filtrar-por-opções-avançadas)

   - Permite que o usuário selecione e insira filtros como localização, capacidade de pessoas, faixa de preço, tipos de evento, comodidade, classificação por avaliações e disponibilidade em calendario.
   - Exibe a lista de propriedades relacionadas com o dados inseridos nos filtros na área de propriedades.

   

### Atividade 1 - Pesquisar por locais

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| :--- | :--- | :--- | :--- |
| Localização | Caixa de texto | obrigatório, mínimo 3 caracteres | - |


| **Comandos** | **Destino** | **Tipo** |
| :--- | :--- | :--- |
| Pesquisar | Listagem de locais | default |



### Atividade 2 - Filtrar por opções avançadas 

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| :--- | :--- | :--- | :--- |
| Localização | Caixa de texto | obrigatório, mínimo 3 caracteres | - |
| Capacidade de pessoas | Número | opcional | - |
| Faixa de preço | Número | opcional, formato monetário | - |
| Comodidade | Selecão múltipla | opcional | - |
| Avaliações | Selecão única |  | - |
| Disponibilidade em calendário | Seleção múltipla | opcional, formato em data | - |


| **Comandos** | **Destino** | **Tipo** |
| :--- | :--- | :--- |
| Exibir resultados |  Listagem de locais | default |
| Limpar filtros |  Fim do processo | cancel |

## Wireframe
![Wireframe do PROCESSO 3 - Busca e filtros avançados](../images/ "Wireframe de baixa fidelidade")




