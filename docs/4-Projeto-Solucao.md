## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução


......  COLOQUE AQUI O SEU TEXTO E O DIAGRAMA DE ARQUITETURA .......

 Inclua um diagrama da solução e descreva os módulos e as tecnologias
 que fazem parte da solução. Discorra sobre o diagrama.
 
 **Exemplo do diagrama de Arquitetura**:


 ![Exemplo de Arquitetura](./images/arquitetura-exemplo.png)
 

### 4.2. Protótipos de telas

Os protótipos apresentados a seguir representam as principais interfaces do sistema **Medlar**, desenvolvidas para ilustrar a **interação do usuário com a plataforma** e apoiar o design final do aplicativo.  

Esses *wireframes* demonstram como o sistema atende às **histórias de usuário**, **requisitos funcionais** e **não funcionais** descritos na *Especificação do Projeto*, oferecendo uma visão clara de como o usuário navegará entre as telas e executará as principais ações.

As telas foram criadas em **baixa fidelidade**, com foco na estrutura, hierarquia e posicionamento dos elementos da interface, sem aplicação de cores, estilos visuais ou identidade definitiva.  

---

### 1️⃣ Protótipo de Baixa Fidelidade — Cadastro de Profissional  

![Cadastro de Profissional - Protótipo Baixa de Fidelidade](https://github.com/user-attachments/assets/6d9e1a0b-9857-4139-a7c5-729a9cfb218d)

### Descrição da Tela  

- **Cabeçalho:** contém o logotipo do sistema, o nome *Medlar* e o menu de navegação (“Início” e “Sobre”), garantindo identidade visual e consistência.  
- **Título:** “Cadastro de Profissional” indica claramente o propósito da página.  
- **Campos de entrada:**  
  - **Nome** e **Sobrenome** — identificação pessoal.  
  - **CRRM/COREN** — campo para o registro profissional obrigatório.  
  - **Experiência Profissional** — área de texto para descrição detalhada da formação e experiências.  
  - **Área de Atendimento** — especialidade ou campo de atuação (ex.: enfermagem, fisioterapia, fonoaudiologia).  
- **Seção de Documentos:** espaço para upload de arquivos comprobatórios (ex.: diploma, registro profissional, documento de identidade), representados por *cards* de upload.  
- **Botões de ação:**  
  - **Voltar** — retorna à tela anterior.  
  - **Enviar** — envia o cadastro para validação pela equipe administrativa.

 ---

### 2️⃣ Tela de Cadastro de Paciente  

![Protótipo de Cadastro de Paciente](Cadastro%20de%20Paciente%20-%20Prot%C3%B3tipo%20Baixa%20de%20Fidelidade.jpg)

#### Descrição da Tela  
- **Objetivo:** Permitir que pacientes ou familiares realizem o cadastro inicial na plataforma, inserindo dados pessoais, endereço e contatos.  
- **Elementos Principais:**  
  - Campos: Nome completo, CPF, data de nascimento, telefone, e-mail e endereço.  
  - Botões de ação: “Voltar” e “Continuar”.  
- **Requisitos atendidos:**  
  - **RF-001:** Cadastro de pacientes e familiares.  
  - **RNF-001:** Compatibilidade com dispositivos móveis.  

---

### 3️⃣ Tela de Busca de Profissionais  

<img width="777" height="559" alt="aprototipo" src="https://github.com/user-attachments/assets/bc745274-c9d5-4b9f-8fa3-abf6281e7c91" />

#### Descrição da Tela  
- **Objetivo:** Permitir que o usuário busque profissionais de saúde por nome, especialidade, localização e avaliação.  
- **Elementos Principais:**  
  - Barra de busca e filtros dinâmicos (especialidade, localização, disponibilidade, preço).  
  - Cards com foto, nome, especialidade e avaliação média.  
- **Requisitos atendidos:**  
  - **RF-003:** Busca de profissionais.  
  - **RF-004:** Exibir localização e disponibilidade.  
  - **RNF-004:** Interface simples e responsiva.  

---


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

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

