## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução


A solução é composta por três módulos principais: o front-end em React, responsável pela interface do usuário e construído com arquivos TSX, TS e CSS gerados em HTML/JS/CSS no build; a API REST local, que recebe as requisições do front-end; e o banco de dados MySQL, onde todas as informações do sistema são armazenadas. No fluxo geral, o usuário acessa a aplicação no navegador, o React envia requisições para a API conforme as ações realizadas, e a API consulta ou atualiza o MySQL, retornando os resultados para o front-end.
 
 **Diagrama de Arquitetura**:
 
 ![Diagrama de arquitetura](./images/diagrama-arquitetura.png)
 

### 4.2. Protótipos de telas

#### Wireframe — Processo 1: Cadastro de Usuário
![Wireframe do Processo 1](../images/Wireframe_Cadastro_Colmeia(1).jpg "Wireframe de baixa fidelidade")

#### Wireframe — Processo 2: Cadastro do Local (1/3)
![Wireframe do Processo 2 — Parte 1](../images/Wireframeprocesso2_1_1.jpg "Wireframe de baixa fidelidade")

#### Wireframe — Processo 2: Cadastro do Local (2/3)
![Wireframe do Processo 2 — Parte 2](../images/Wireframeprocesso2_1_2.jpg "Wireframe de baixa fidelidade")

#### Wireframe — Processo 2: Cadastro do Local (3/3)
![Wireframe do Processo 2 — Parte 3](../images/Wireframeprocesso2_1_3.jpg "Wireframe de baixa fidelidade")

#### Wireframe — Processo 3: Busca e Filtros Avançados
![Wireframe do Processo 3](../images/Wireframe_Busca_Colmeia.png "Wireframe de baixa fidelidade")

#### Wireframe — Processo 4: Reserva e Confirmação
![Wireframe do Processo 4](../images/Processo_4_Wireframes.png "Wireframe de baixa fidelidade")

#### Wireframe — Processo 5: Dashboard para Locadores
![Wireframe do Processo 5](../images/wireframe_dashboard.jpg "Wireframe de baixa fidelidade - Dashboard")

#### Wireframe — Processo 6: Avaliação e Reputação
![Wireframe do Processo 6](../images/Wireframe-Processo-6.jpg "Avaliação e Reputação")


## Diagrama de Classes

 **Diagrama de Classes**:
  ![Diagrama de classes](./images/diagrama-classes.png)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)


### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

#### 4.3.2 Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

![Exemplo de um modelo relacional](images/modeloRelacional.png "Exemplo de Modelo Relacional.")
---


#### 4.3.3 Modelo Físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:

<code>

 -- Criação da tabela Médico
CREATE TABLE Medico (
    MedCodigo INTEGER PRIMARY KEY,
    MedNome VARCHAR(100)
);


-- Criação da tabela Paciente
CREATE TABLE Paciente (
    PacCodigo INTEGER PRIMARY KEY,
    PacNome VARCHAR(100)
);

-- Criação da tabela Consulta
CREATE TABLE Consulta (
    ConCodigo INTEGER PRIMARY KEY,
    MedCodigo INTEGER,
    PacCodigo INTEGER,
    Data DATE,
    FOREIGN KEY (MedCodigo) REFERENCES Medico(MedCodigo),
    FOREIGN KEY (PacCodigo) REFERENCES Paciente(PacCodigo)
);

-- Criação da tabela Medicamento
CREATE TABLE Medicamento (
    MdcCodigo INTEGER PRIMARY KEY,
    MdcNome VARCHAR(100)
);

-- Criação da tabela Prescricao
CREATE TABLE Prescricao (
    ConCodigo INTEGER,
    MdcCodigo INTEGER,
    Posologia VARCHAR(200),
    PRIMARY KEY (ConCodigo, MdcCodigo),
    FOREIGN KEY (ConCodigo) REFERENCES Consulta(ConCodigo),
    FOREIGN KEY (MdcCodigo) REFERENCES Medicamento(MdcCodigo)
);

</code>

Este script deverá ser incluído em um arquivo .sql na pasta src\bd.




### 4.4. Tecnologias

_Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas._

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MySQL           |
| Front end      | HTML+CSS+JS     |
| Back end       | Java SpringBoot |
| Deploy         | Github Pages    |

