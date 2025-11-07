# Como rodar o projeto Colmeia (passo-a-passo)

Este documento mostra os passos mínimos para rodar o site localmente e os ajustes rápidos do Firebase (Auth / Firestore / Storage).

## 1. Pré-requisitos
- Internet (para carregar os SDKs do Firebase via CDN)
- Node.js (opcional, somente para servir local via `npx`) ou Python 3 (alternativa)
- Navegador moderno (Chrome, Firefox, Safari)

> Observação: não é necessário executar `npm install firebase` — o projeto usa os SDKs Firebase via CDN.

## 2. Servir o site localmente
Na raiz do projeto, abra um terminal e execute um dos comandos abaixo.

Com Node (recomendado):
```bash
npx http-server -p 8000
```

Com Python 3 (alternativa):
```bash
python3 -m http.server 8000
```

Abra no navegador: http://localhost:8000

## 3. Firebase (se estiver usando seu próprio projeto)
Se quiser usar seu próprio Firebase Project, no Console do Firebase crie/pega as credenciais e substitua `firebaseConfig` em `assets/js/firebase-init.js`.

- Habilite Authentication → Sign-in method → Email/Password
- Habilite Firestore
- Habilite Storage

### Regras recomendadas (copiar/colar)

Firestore (cole em Firestore → Rules):
```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /user/{userId} {
      allow create: if request.auth != null && request.auth.uid == userId;
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
    }

    match /locations/{locationId} {
      allow read: if true;
      allow create: if request.auth != null && request.resource.data.owner is string && request.resource.data.owner == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.owner == request.auth.uid;
    }
  }
}
```

Storage (cole em Storage → Rules):
```text
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /user_photos/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 4. Fluxo de teste (cadastro)
1. Abra `http://localhost:8000/pages/cadastro.html`
2. Preencha o formulário (foto é opcional)
3. Clique em "Criar Conta", marque os termos e confirme
4. Verifique:
   - DevTools → Console: mensagens de debug (Auth user created, Profile written...)
   - Firebase Console → Authentication: novo usuário criado
   - Firebase Console → Firestore → coleção `user`: documento com id = uid
   - Firebase Console → Storage → `user_photos/{uid}` (se enviou foto)

## 5. Debug / Problemas comuns
- permission-denied: regra do Firestore/Storage bloqueando gravação. Verifique e publique as regras do passo 3.
- email-already-in-use: remover usuário manualmente no Console → Authentication ou usar o rollback automático que o projeto já tenta.
- Se a requisição ao Firestore não enviar token, abra DevTools → Network → procure por `firestore.googleapis.com` e confira se o header `Authorization: Bearer ...` está presente.

## 6. Opcional: usar Firebase Emulator Suite (recomendado para desenvolver regras)
```bash
npm install -g firebase-tools
firebase login
firebase init emulators  # selecione Firestore, Auth, Storage
firebase emulators:start
```
Depois, adicione os `connect*Emulator` no `firebase-init.js` enquanto estiver em `localhost` (podemos ajudar com isso se desejar).

## 7. Observações finais
- O projeto não precisa de bundler; mudanças rápidas podem ser feitas editando os arquivos em `assets/js` e recarregando a página.
- Se compartilhar o projeto com outra pessoa e não quiser que use seu Firebase, peça que ela substitua `firebaseConfig` pelas credenciais do próprio projeto.

---
Arquivo criado automaticamente: `README_RUN.md`
