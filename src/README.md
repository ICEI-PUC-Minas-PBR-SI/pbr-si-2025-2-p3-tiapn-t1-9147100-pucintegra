# Colmeia

Projeto "Colmeia" (Sistemas de Informação) — plataforma para conectar quem busca espaços para eventos com proprietários que fazem locação de locais (salões, chácaras, casas, etc).

## Tecnologias utilizadas
- Front‑end: React + TypeScript (TSX) — ver [`App`](src/Front%20End/App.tsx).
- Estilização: Tailwind CSS (utilizado nas classes em componentes).
- Componentes e animações: motion/react (ex.: [`StepThree`](src/Front%20End/components/StepThree.tsx), [`StepFour`](src/Front%20End/components/StepFour.tsx)).
- Bibliotecas UI e utilitários: `lucide-react` (ícones) — ex.: [`Header`](src/Front%20End/components/Header.tsx), `embla-carousel-react` (carrossel) — [`carousel`](src/Front%20End/components/ui/carousel.tsx), `recharts` (gráficos) — [`chart`](src/Front%20End/components/ui/chart.tsx).
- Banco de dados: MySQL — arquivo de exemplo [`src/db/colmeia.sql`](src/db/colmeia.sql).
- Backend (especificado na documentação): Node.js (API REST) — arquitetura descrita em [docs/4-Projeto-Solucao.md](docs/4-Projeto-Solucao.md).

## Estrutura de diretórios (resumo)
- [docs/](docs/) — documentação (contexto, especificação, modelagem, protótipos).  
  Ex.: [docs/4-Projeto-Solucao.md](docs/4-Projeto-Solucao.md)
- [src/Front End/](src/Front%20End/) — código-fonte do front-end (componentes React/TSX).  
  Componentes principais: [`App`](src/Front%20End/App.tsx), [`StepOne`](src/Front%20End/components/StepOne.tsx), [`PropertyForm`](src/Front%20End/components/landlord/PropertyForm.tsx), [`RatingModal`](src/Front%20End/components/shared/RatingModal.tsx), [`ReportsManager`](src/Front%20End/components/landlord/ReportsManager.tsx).
- [src/db/](src/db/) — script SQL de exemplo: [`colmeia.sql`](src/db/colmeia.sql).
- Arquivos top-level: `.gitignore`, `CITATION.cff`, `README.md`.

Para referência direta aos arquivos:
- Código-fonte front-end: [src/Front End/](src/Front%20End/)
- Banco SQL de exemplo: [src/db/colmeia.sql](src/db/colmeia.sql)
- Documentação do projeto: [docs/](docs/)

## Como executar o projeto

### Pré‑requisitos
- Node.js (recomendado >= 20.10.0) e npm.
- MySQL (para carregar o script SQL, se desejar usar o banco local).
- Git (para clonar o repositório).
- IDE (recomendado: Visual Studio Code).

### Configuração da aplicação
1. Clone o repositório:
   git clone https://github.com/ICEI-PUC-Minas-PBR-SI/pbr-si-2025-2-p3-tiapn-t1-9147100-colmeia.git

2. (Opcional) Banco de dados: importe o script SQL para criar o esquema e dados iniciais:
   mysql -u <usuario> -p < src/db/colmeia.sql
   - Arquivo: [`src/db/colmeia.sql`](src/db/colmeia.sql)

3. O repositório contém o front-end React em [src/Front End/](src/Front%20End/). Caso exista um backend Node.js, configure variáveis de ambiente conforme seu servidor (não há `.env` padrão no front-end).

> Observação: o front-end contém fluxos com dados mock (ex.: handlers de login em [`App`](src/Front%20End/App.tsx) usam mock e mudam o fluxo interno sem backend).

### Executando a aplicação (front-end)
1. Abra um terminal e navegue até a pasta do front-end:
   cd "src/Front End"

2. Instale dependências:
   npm install

3. Inicie em modo de desenvolvimento:
   npm run dev

4. Abra no navegador pelo endereço mostrado (normalmente http://localhost:3000 ou conforme configuração do seu ambiente).

## Links úteis / documentação
- Documentação do projeto: [docs/](docs/)  
- Arquivo do front-end principal: [`App`](src/Front%20End/App.tsx)  
- Componentes de cadastro/fluxo: [`StepOne`](src/Front%20End/components/StepOne.tsx), [`StepThree`](src/Front%20End/components/StepThree.tsx), [`StepFour`](src/Front%20End/components/StepFour.tsx)  
- Cadastro de imóvel: [`PropertyForm`](src/Front%20End/components/landlord/PropertyForm.tsx)  
- Avaliações: [`RatingModal`](src/Front%20End/components/shared/RatingModal.tsx), [`RatingSuccess`](src/Front%20End/components/shared/RatingSuccess.tsx)  
- Relatórios (locadores): [`ReportsManager`](src/Front%20End/components/landlord/ReportsManager.tsx)  
- Informação do DB: [`src/db/colmeia.sql`](src/db/colmeia.sql)

