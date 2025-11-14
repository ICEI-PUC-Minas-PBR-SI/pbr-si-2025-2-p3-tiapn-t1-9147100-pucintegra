// Firebase Authentication Service
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
  onAuthStateChanged,
  Unsubscribe,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from './firebase-init';

/**
 * Login with email and password
 * @param email - User email
 * @param password - User password
 * @returns Promise<UserCredential>
 */
export async function login(email: string, password: string): Promise<UserCredential> {
  console.log('[FIREBASE-AUTH] login() chamado', { email, passwordLength: password.length });
  
  if (!auth) {
    console.error('[FIREBASE-AUTH] login() - Firebase Auth não inicializado');
    throw new Error('Firebase Auth not initialized');
  }

  try {
    console.log('[FIREBASE-AUTH] login() - Tentando fazer login...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('[FIREBASE-AUTH] login() - Login realizado com sucesso', { 
      uid: userCredential.user.uid, 
      email: userCredential.user.email 
    });
    return userCredential;
  } catch (error: unknown) {
    console.error('[FIREBASE-AUTH] login() - Erro no login:', error);
    
    // Map Firebase errors to user-friendly messages
    let errorMessage = 'Erro ao fazer login';
    
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-AUTH] login() - Código do erro:', error.code);
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não cadastrado';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Credenciais inválidas';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
      }
    }
    
    console.error('[FIREBASE-AUTH] login() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Create a new user with email and password
 * @param email - User email
 * @param password - User password
 * @param displayName - User display name
 * @returns Promise<UserCredential>
 */
export async function createUser(
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> {
  console.log('[FIREBASE-AUTH] createUser() chamado', { 
    email, 
    displayName, 
    passwordLength: password.length 
  });
  
  if (!auth) {
    console.error('[FIREBASE-AUTH] createUser() - Firebase Auth não inicializado');
    throw new Error('Firebase Auth not initialized');
  }

  try {
    console.log('[FIREBASE-AUTH] createUser() - Criando usuário no Firebase Auth...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('[FIREBASE-AUTH] createUser() - Usuário criado no Auth', { 
      uid: userCredential.user.uid 
    });
    
    // Update user profile with display name
    if (userCredential.user) {
      console.log('[FIREBASE-AUTH] createUser() - Atualizando perfil com displayName...');
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      console.log('[FIREBASE-AUTH] createUser() - Perfil atualizado com sucesso');
    }
    
    console.log('[FIREBASE-AUTH] createUser() - Usuário criado com sucesso');
    return userCredential;
  } catch (error: unknown) {
    console.error('[FIREBASE-AUTH] createUser() - Erro ao criar usuário:', error);
    
    // Map Firebase errors to user-friendly messages
    let errorMessage = 'Erro ao criar usuário';
    
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-AUTH] createUser() - Código do erro:', error.code);
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está cadastrado';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Senha muito fraca. Use no mínimo 8 caracteres';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Operação não permitida';
      }
    }
    
    console.error('[FIREBASE-AUTH] createUser() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Logout current user
 * @returns Promise<void>
 */
export async function logout(): Promise<void> {
  console.log('[FIREBASE-AUTH] logout() chamado');
  
  if (!auth) {
    console.error('[FIREBASE-AUTH] logout() - Firebase Auth não inicializado');
    throw new Error('Firebase Auth not initialized');
  }

  try {
    console.log('[FIREBASE-AUTH] logout() - Fazendo logout...');
    await signOut(auth);
    console.log('[FIREBASE-AUTH] logout() - Logout realizado com sucesso');
  } catch (error: unknown) {
    console.error('[FIREBASE-AUTH] logout() - Erro no logout:', error);
    throw new Error('Erro ao fazer logout');
  }
}

/**
 * Get current authenticated user
 * @returns User | null
 */
export function getCurrentUser(): User | null {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
}

/**
 * Listen to authentication state changes
 * @param callback - Callback function that receives the user or null
 * @returns Unsubscribe function
 */
export function onAuthStateChangedListener(
  callback: (user: User | null) => void
): Unsubscribe {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  return onAuthStateChanged(auth, callback);
}

