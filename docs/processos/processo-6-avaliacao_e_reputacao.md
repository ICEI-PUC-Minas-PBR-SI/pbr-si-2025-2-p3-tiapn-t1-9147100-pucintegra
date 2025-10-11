### 3.3.6 Processo 6 – Avaliação e Reputação

O processo de avaliação inicia-se ao término da locação do local. O cliente, ao acessar a página de reservas em seu perfil, escolherá qual reserva irá avaliar, assim, será direcionado para uma página específica destinada à avaliação do ambiente. Nessa etapa, o locatário pode descrever detalhadamente sua experiência em uma caixa de texto, relatando aspectos positivos e pontos a melhorar.
Por outro lado, o proprietário (locador) do espaço, ao acessar o perfil do locatário, tem a possibilidade de registrar uma avaliação sobre o cliente, descrevendo como o local foi entregue após o evento.

![Modelo BPMN do PROCESSO 6 - ](../images/06-diagrama-avaliação-reputação.jpg")


#### Detalhamento das atividades

1. [Acessar Resevas no Perfil Locatário](#atividade-1---)
   - O usuário deve acessar a aba reservas em seu perfil.
   - *Exibe a lista de propriedades ja reservadas anteriormente.

2. [Selecionar Local](#atividade-2---)
   - Permite que o usuário selecione a reserva que deseja avaliar.
   - *Exibe a opção de avaliação.
3. [Descrever e avaliar  ](#atividade-1---)
   - Usuário clica em uma nota de 0 a 10 para avaliar o local
   - Usuário digita em uma caixa de texto suas opiniões sobre o local


### Atividade 1 - Acessar Resevas no Perfil Locatário

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| :--- | :--- | :--- | :--- |
| Botão | Link | acesso via click | - |

| **Botão/Link** | **Destino** | **Tipo** |
| :--- | :--- | :--- |
| Minhas reservas | Tela de Reservas | default |



### Atividade 2 - Selecionar Local

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| :--- | :--- | :--- | :--- |
|Botão | Link | acesso via click | default |
| Nome da propriedade | Seleção de opções | - | - |
| Nome da propriedade | Texto | - | - |
| Endereço | Texto | - | - |
| Locador | Texto | - | - |



| **Comandos** | **Destino** | **Tipo** |
| :--- | :--- | :--- |
| Card Interativo |  Informações da Reserva | default |



### Atividade 3 - Pesquisar por locais

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| :--- | :--- | :--- | :--- |
| Localização | Caixa de texto | obrigatório, mínimo 3 caracteres | - |


| **Comandos** | **Destino** | **Tipo** |
| :--- | :--- | :--- |
| Pesquisar | Listagem de locais | default |
