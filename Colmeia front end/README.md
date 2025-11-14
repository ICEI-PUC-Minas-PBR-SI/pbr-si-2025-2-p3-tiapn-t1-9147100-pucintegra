# Colmeia - Plataforma de Locação de Imóveis

Plataforma web para conectar locadores e locatários, desenvolvida com React, TypeScript e Firebase.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Funcionalidades](#funcionalidades)
- [Desenvolvimento](#desenvolvimento)

---

## 🏠 Sobre o Projeto

Colmeia é uma plataforma completa para gerenciamento de locação de imóveis, permitindo que:

- **Locadores** cadastrem e gerenciem seus imóveis
- **Locatários** busquem e reservem imóveis disponíveis

O projeto foi desenvolvido como parte de um trabalho acadêmico, seguindo boas práticas de desenvolvimento e arquitetura.

---

## 🛠 Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Sonner** - Sistema de notificações (toasts)

### Backend/Serviços
- **Firebase Authentication** - Autenticação de usuários
- **Cloud Firestore** - Banco de dados NoSQL
- **Firebase Storage** - Armazenamento de arquivos (fotos)

### Ferramentas
- **ESLint** - Linter para JavaScript/TypeScript
- **Git** - Controle de versão

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn** (vem com Node.js)
- **Conta Firebase** ([Criar conta](https://firebase.google.com/))

---

## 🚀 Instalação

### 1. Clone o repositório (se aplicável)

```bash
git clone <url-do-repositorio>
cd colmeia
```

### 2. Instale as dependências

```bash
cd "Colmeia front end"
npm install
```

---

## ⚙️ Configuração

### 1. Configurar Firebase

Siga o guia completo em **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**.

**Resumo rápido**:
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite Authentication (Email/Password)
3. Crie um banco Firestore
4. Habilite Storage
5. Configure as regras de segurança (veja [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
6. Copie as credenciais do Firebase
7. Atualize `src/services/firebase-init.ts` com suas credenciais

### 2. Atualizar Credenciais

Abra `src/services/firebase-init.ts` e substitua o objeto `firebaseConfig`:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
};
```

---

## ▶️ Executando o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou outra porta indicada).

### Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão na pasta `build/`.

Para servir o build:

```bash
# Com Node.js
npx serve -s build

# Com Python
cd build
python -m http.server 8000
```

---

## 📁 Estrutura do Projeto

```
Colmeia front end/
├── src/
│   ├── services/              # Serviços Firebase
│   │   ├── firebase-init.ts   # Inicialização do Firebase
│   │   ├── firebase-auth.ts   # Autenticação
│   │   ├── firebase-users.ts  # Gerenciamento de usuários
│   │   └── firebase-locals.ts # Gerenciamento de locais
│   ├── components/            # Componentes React
│   │   ├── landlord/         # Componentes para locadores
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── PropertyForm.tsx
│   │   │   └── ...
│   │   ├── tenant/            # Componentes para locatários
│   │   │   ├── TenantLogin.tsx
│   │   │   ├── PropertyListing.tsx
│   │   │   └── ...
│   │   ├── ui/               # Componentes de UI reutilizáveis
│   │   └── StepOne.tsx        # Componentes de cadastro
│   │   ├── StepTwo.tsx
│   │   ├── StepThree.tsx
│   │   └── StepFour.tsx
│   ├── App.tsx               # Componente principal
│   ├── main.tsx              # Ponto de entrada
│   └── index.css             # Estilos globais
├── build/                    # Build de produção
├── public/                   # Arquivos estáticos
├── package.json              # Dependências
├── vite.config.ts           # Configuração do Vite
├── FIREBASE_SETUP.md        # Guia de configuração do Firebase
├── USER_GUIDE.md            # Guia de uso para desenvolvedores
├── TESTING_GUIDE.md         # Guia de testes
└── README.md                # Este arquivo
```

---

## 📚 Documentação

### Documentação Principal

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Configuração completa do Firebase, incluindo regras de segurança
- **[USER_GUIDE.md](./USER_GUIDE.md)** - Guia de uso para desenvolvedores, estrutura do projeto e exemplos
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guia completo de testes com checklist

### Documentação do Projeto

Consulte a pasta `docs/` na raiz do projeto para documentação completa do sistema:
- Contexto e especificação
- Modelagem de processos de negócio
- Projeto da solução
- Planejamento do projeto
- Interface do sistema

---

## ✨ Funcionalidades

### Para Locadores

- ✅ Cadastro e login
- ✅ Dashboard com lista de imóveis cadastrados
- ✅ Cadastro de novos imóveis
- ✅ Upload de múltiplas fotos
- ✅ Gerenciamento de imóveis

### Para Locatários

- ✅ Cadastro e login
- ✅ Busca e listagem de imóveis
- ✅ Filtros avançados
- ✅ Visualização detalhada de imóveis
- ✅ Sistema de reservas

### Validações Implementadas

- ✅ Validação de CPF (com dígitos verificadores)
- ✅ Validação de CNPJ (com dígitos verificadores)
- ✅ Validação de email
- ✅ Máscaras de telefone, CPF, CNPJ
- ✅ Validação de senha (mínimo 8 caracteres)
- ✅ Feedback visual em tempo real

---

## 💻 Desenvolvimento

### Adicionar Nova Funcionalidade

1. Crie o componente em `src/components/`
2. Adicione a lógica de negócio em `src/services/` (se necessário)
3. Integre no `App.tsx` ou componente pai
4. Atualize as regras de segurança do Firebase (se necessário)
5. Teste seguindo o [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Padrões de Código

- **TypeScript**: Use tipos adequados
- **Componentes**: Funções com nomes descritivos
- **Serviços**: Funções assíncronas com tratamento de erros
- **Estilos**: Tailwind CSS para estilização
- **Notificações**: Use `sonner` para feedback ao usuário

### Tratamento de Erros

Sempre trate erros em operações assíncronas:

```typescript
import { toast } from 'sonner';

try {
  await login(email, password);
  toast.success('Login realizado com sucesso!');
} catch (error) {
  toast.error(error.message || 'Erro ao fazer login');
}
```

---

## 🧪 Testes

Consulte o **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** para um guia completo de testes.

**Testes principais**:
- Autenticação (login, logout, cadastro)
- Validações de formulário
- Cadastro de imóveis
- Regras de segurança do Firebase

---

## 🔒 Segurança

### Regras de Segurança Implementadas

- **Firestore**: Usuários só podem modificar seus próprios dados
- **Storage**: Usuários só podem fazer upload em suas próprias pastas
- **Autenticação**: Gerenciada pelo Firebase Auth

Para configurar as regras, consulte **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**.

---

## 📝 Licença

Este projeto foi desenvolvido como parte de um trabalho acadêmico.

---

## 👥 Contribuidores

Desenvolvido como parte do projeto acadêmico PBR-SI 2025-2.

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação em `docs/`
2. Verifique os guias em `FIREBASE_SETUP.md`, `USER_GUIDE.md` e `TESTING_GUIDE.md`
3. Verifique o console do navegador para erros
4. Verifique o Firebase Console para problemas de autenticação/dados

---

**Última atualização**: 2025-01-27
