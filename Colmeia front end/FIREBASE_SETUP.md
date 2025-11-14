# Configuração do Firebase - Colmeia

Este documento fornece instruções completas para configurar o Firebase para o projeto Colmeia, incluindo as regras de segurança necessárias.

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Configuração Inicial do Firebase](#configuração-inicial-do-firebase)
3. [Regras de Segurança do Firestore](#regras-de-segurança-do-firestore)
4. [Regras de Segurança do Storage](#regras-de-segurança-do-storage)
5. [Habilitar Serviços](#habilitar-serviços)
6. [Configuração no Código](#configuração-no-código)
7. [Verificação](#verificação)

---

## Pré-requisitos

- Conta Google (para acessar Firebase Console)
- Projeto Firebase criado
- Node.js instalado (para desenvolvimento local)

---

## Configuração Inicial do Firebase

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou selecione um projeto existente
3. Siga o assistente de criação do projeto
4. Anote o **Project ID** do seu projeto

### 2. Obter Credenciais

1. No Firebase Console, vá em **Configurações do projeto** (ícone de engrenagem)
2. Role até a seção **Seus apps**
3. Clique em **Web** (ícone `</>`) para adicionar um app web
4. Registre o app com um nome (ex: "Colmeia Web")
5. **Copie as credenciais** do objeto `firebaseConfig`

---

## Regras de Segurança do Firestore

### Configuração no Firebase Console

1. No Firebase Console, vá em **Firestore Database**
2. Clique na aba **Regras** (Rules)
3. **Substitua** o conteúdo existente pelas regras abaixo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Permitir leitura apenas para usuários autenticados
      allow read: if request.auth != null;
      
      // Permitir criação apenas se o userId corresponder ao UID do usuário autenticado
      allow create: if request.auth != null 
        && request.auth.uid == userId;
      
      // Permitir atualização e exclusão apenas pelo próprio usuário
      allow update, delete: if request.auth != null 
        && request.auth.uid == userId;
    }
    
    // Locals collection
    match /locals/{localId} {
      // Permitir leitura para todos os usuários autenticados
      allow read: if request.auth != null;
      
      // Permitir criação por qualquer usuário autenticado
      // O campo 'owner' deve ser definido como o UID do usuário autenticado
      allow create: if request.auth != null
        && request.resource.data.owner is string
        && request.resource.data.owner == request.auth.uid;
      
      // Permitir atualização e exclusão apenas pelo proprietário
      allow update, delete: if request.auth != null 
        && resource.data.owner == request.auth.uid;
    }
  }
}
```

### Explicação das Regras

#### Collection `users`:
- **read**: Qualquer usuário autenticado pode ler perfis (necessário para exibir informações)
- **create**: Apenas o próprio usuário pode criar seu perfil (o `userId` deve ser igual ao `uid` do usuário autenticado)
- **update/delete**: Apenas o próprio usuário pode atualizar ou excluir seu perfil

#### Collection `locals`:
- **read**: Qualquer usuário autenticado pode ler locais (necessário para listagem)
- **create**: Qualquer usuário autenticado pode criar locais, mas o campo `owner` deve ser seu próprio `uid`
- **update/delete**: Apenas o proprietário (campo `owner`) pode atualizar ou excluir um local

### Publicar as Regras

1. Após colar as regras, clique em **Publicar** (Publish)
2. Aguarde a confirmação de publicação

---

## Regras de Segurança do Storage

### Configuração no Firebase Console

1. No Firebase Console, vá em **Storage**
2. Clique na aba **Regras** (Rules)
3. **Substitua** o conteúdo existente pelas regras abaixo:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Fotos de perfil de usuários
    match /user_photos/{userId}/{allPaths=**} {
      // Permitir leitura para usuários autenticados
      allow read: if request.auth != null;
      
      // Permitir escrita apenas pelo próprio usuário
      allow write: if request.auth != null 
        && request.auth.uid == userId;
    }
    
    // Fotos de locais
    match /location_photos/{allPaths=**} {
      // Permitir leitura para usuários autenticados
      allow read: if request.auth != null;
      
      // Permitir escrita para qualquer usuário autenticado
      allow write: if request.auth != null;
    }
  }
}
```

### Explicação das Regras

#### Pasta `user_photos/{userId}/`:
- **read**: Qualquer usuário autenticado pode visualizar fotos de perfil
- **write**: Apenas o próprio usuário pode fazer upload de sua foto de perfil

#### Pasta `location_photos/`:
- **read**: Qualquer usuário autenticado pode visualizar fotos de locais
- **write**: Qualquer usuário autenticado pode fazer upload de fotos de locais

### Publicar as Regras

1. Após colar as regras, clique em **Publicar** (Publish)
2. Aguarde a confirmação de publicação

---

## Habilitar Serviços

### 1. Authentication

1. No Firebase Console, vá em **Authentication**
2. Clique em **Começar** (Get started) se ainda não habilitou
3. Vá na aba **Sign-in method**
4. Habilite **Email/Password**:
   - Clique em "Email/Password"
   - Ative a opção
   - Clique em **Salvar**

### 2. Firestore Database

1. No Firebase Console, vá em **Firestore Database**
2. Clique em **Criar banco de dados** (Create database)
3. Escolha o modo:
   - **Modo de produção** (recomendado para produção)
   - **Modo de teste** (apenas para desenvolvimento - permite leitura/escrita por 30 dias)
4. Escolha a localização do banco (ex: `southamerica-east1` para Brasil)
5. Clique em **Ativar**

### 3. Storage

1. No Firebase Console, vá em **Storage**
2. Clique em **Começar** (Get started)
3. Aceite as regras padrão (você já configurou as regras personalizadas)
4. Escolha a localização do Storage (ex: `southamerica-east1` para Brasil)
5. Clique em **Concluir**

---

## Configuração no Código

### Atualizar Credenciais

1. Abra o arquivo `Colmeia front end/src/services/firebase-init.ts`
2. Localize o objeto `firebaseConfig` (linhas 9-17)
3. **Substitua** as credenciais pelas do seu projeto:

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

### Verificar Instalação

Certifique-se de que o Firebase está instalado:

```bash
cd "Colmeia front end"
npm install firebase
```

---

## Verificação

### 1. Testar Autenticação

1. Execute o projeto: `npm run dev`
2. Tente criar uma conta
3. Verifique no Firebase Console → **Authentication** se o usuário foi criado

### 2. Testar Firestore

1. Após criar uma conta, verifique no Firebase Console → **Firestore Database**
2. Deve existir uma collection `users` com um documento cujo ID é o UID do usuário
3. O documento deve conter os dados do perfil

### 3. Testar Storage

1. Faça upload de uma foto de perfil
2. Verifique no Firebase Console → **Storage**
3. Deve existir a pasta `user_photos/{uid}/` com a foto

### 4. Verificar Regras de Segurança

#### Teste de Leitura:
- ✅ Usuário autenticado pode ler seu próprio perfil
- ✅ Usuário autenticado pode ler locais

#### Teste de Escrita:
- ✅ Usuário pode criar seu próprio perfil
- ✅ Usuário pode criar locais
- ❌ Usuário NÃO pode criar perfil de outro usuário
- ❌ Usuário NÃO pode atualizar/excluir locais de outros usuários

---

## Troubleshooting

### Erro: "permission-denied"

**Causa**: Regras de segurança bloqueando a operação.

**Solução**:
1. Verifique se as regras foram publicadas corretamente
2. Verifique se o usuário está autenticado
3. Verifique se o `uid` corresponde ao `userId` no documento

### Erro: "unavailable"

**Causa**: Problema de conexão ou Firestore não habilitado.

**Solução**:
1. Verifique sua conexão com a internet
2. Verifique se o Firestore está habilitado no Firebase Console
3. Verifique se o banco de dados foi criado

### Erro: "storage/unauthorized"

**Causa**: Regras de Storage bloqueando o upload.

**Solução**:
1. Verifique se as regras de Storage foram publicadas
2. Verifique se o usuário está autenticado
3. Para `user_photos`, verifique se o `uid` corresponde ao `userId` no caminho

### Erro: "auth/email-already-in-use"

**Causa**: Tentativa de criar usuário com email já cadastrado.

**Solução**: Use outro email ou faça login com o email existente.

---

## Segurança Adicional (Opcional)

### Para Produção

1. **Limite de taxa**: Configure limites de taxa no Firebase para prevenir abuso
2. **Validação de dados**: Adicione validações adicionais nas regras do Firestore
3. **Backup**: Configure backups automáticos do Firestore
4. **Monitoramento**: Use Firebase Performance Monitoring e Crashlytics

### Exemplo de Regras Mais Restritivas

Se quiser restringir ainda mais o acesso:

```javascript
// Firestore - Regras mais restritivas
match /users/{userId} {
  // Apenas o próprio usuário pode ler seu perfil
  allow read: if request.auth != null && request.auth.uid == userId;
  allow create: if request.auth != null && request.auth.uid == userId;
  allow update, delete: if request.auth != null && request.auth.uid == userId;
}

match /locals/{localId} {
  // Todos podem ler, mas apenas o dono pode modificar
  allow read: if request.auth != null;
  allow create: if request.auth != null 
    && request.resource.data.owner == request.auth.uid;
  allow update, delete: if request.auth != null 
    && resource.data.owner == request.auth.uid;
}
```

---

## Recursos Adicionais

- [Documentação do Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Documentação do Storage Security Rules](https://firebase.google.com/docs/storage/security)
- [Firebase Console](https://console.firebase.google.com/)
- [Simulador de Regras do Firestore](https://console.firebase.google.com/project/_/firestore/rules)

---

**Última atualização**: 2025-01-27

