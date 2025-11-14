// Firebase Users Service
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { db, storage } from './firebase-init';

/**
 * User profile data structure (without password)
 */
export interface UserProfileData {
  userType: 'locatario' | 'locador';
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
  foto?: string;
  aceitoTermos: boolean;
}

/**
 * User profile structure in Firestore
 */
export interface UserProfile extends UserProfileData {
  createdAt: Timestamp;
}

/**
 * Create user profile in Firestore
 * @param uid - User ID from Firebase Auth
 * @param userData - User profile data
 * @returns Promise<void>
 */
export async function createUserProfile(
  uid: string,
  userData: UserProfileData
): Promise<void> {
  console.log('[FIREBASE-USERS] createUserProfile() chamado', { 
    uid, 
    userType: userData.userType,
    email: userData.email,
    nome: userData.nome
  });
  
  if (!db) {
    console.error('[FIREBASE-USERS] createUserProfile() - Firestore não inicializado');
    throw new Error('Firestore not initialized');
  }

  try {
    console.log('[FIREBASE-USERS] createUserProfile() - Criando perfil no Firestore...');
    const userRef = doc(db, 'user', uid);
    
    // Remover campos undefined para evitar erro no Firestore
    const profileData: any = {
      userType: userData.userType,
      nome: userData.nome,
      email: userData.email,
      telefone: userData.telefone,
      cpfCnpj: userData.cpfCnpj,
      endereco: userData.endereco,
      aceitoTermos: userData.aceitoTermos,
      createdAt: serverTimestamp(),
    };
    
    // Adicionar foto apenas se existir (não undefined)
    if (userData.foto) {
      profileData.foto = userData.foto;
    }

    console.log('[FIREBASE-USERS] createUserProfile() - Dados do perfil:', profileData);
    await setDoc(userRef, profileData);
    console.log('[FIREBASE-USERS] createUserProfile() - Perfil criado com sucesso no Firestore', { uid });
  } catch (error: unknown) {
    console.error('[FIREBASE-USERS] createUserProfile() - Erro ao criar perfil:', error);
    
    let errorMessage = 'Erro ao criar perfil do usuário';
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-USERS] createUserProfile() - Código do erro:', error.code);
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      }
    }
    
    console.error('[FIREBASE-USERS] createUserProfile() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Upload user photo to Firebase Storage
 * @param uid - User ID
 * @param photoFile - Photo file to upload
 * @returns Promise<string> - URL of the uploaded photo
 */
export async function uploadUserPhoto(
  uid: string,
  photoFile: File
): Promise<string> {
  console.log('[FIREBASE-USERS] uploadUserPhoto() chamado', { 
    uid, 
    fileName: photoFile.name,
    fileSize: photoFile.size,
    fileType: photoFile.type
  });
  
  if (!storage) {
    console.error('[FIREBASE-USERS] uploadUserPhoto() - Firebase Storage não inicializado');
    throw new Error('Firebase Storage not initialized');
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(photoFile.type)) {
    console.error('[FIREBASE-USERS] uploadUserPhoto() - Tipo de arquivo inválido:', photoFile.type);
    throw new Error('Tipo de arquivo inválido. Use JPG, PNG ou WEBP');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (photoFile.size > maxSize) {
    console.error('[FIREBASE-USERS] uploadUserPhoto() - Arquivo muito grande:', photoFile.size);
    throw new Error('Arquivo muito grande. Tamanho máximo: 5MB');
  }

  try {
    const filename = `${Date.now()}_${photoFile.name.replace(/\s+/g, '_')}`;
    const photoRef = storageRef(storage, `user_photos/${uid}/${filename}`);
    
    console.log('[FIREBASE-USERS] uploadUserPhoto() - Fazendo upload da foto...', { filename });
    await uploadBytes(photoRef, photoFile);
    console.log('[FIREBASE-USERS] uploadUserPhoto() - Upload concluído, obtendo URL...');
    
    const downloadURL = await getDownloadURL(photoRef);
    console.log('[FIREBASE-USERS] uploadUserPhoto() - Foto enviada com sucesso', { downloadURL });
    
    return downloadURL;
  } catch (error: unknown) {
    console.error('[FIREBASE-USERS] uploadUserPhoto() - Erro ao fazer upload:', error);
    
    let errorMessage = 'Erro ao fazer upload da foto';
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-USERS] uploadUserPhoto() - Código do erro:', error.code);
      if (error.code === 'storage/unauthorized') {
        errorMessage = 'Permissão negada para fazer upload';
      } else if (error.code === 'storage/canceled') {
        errorMessage = 'Upload cancelado';
      } else if (error.code === 'storage/unknown') {
        errorMessage = 'Erro desconhecido no upload';
      }
    }
    
    console.error('[FIREBASE-USERS] uploadUserPhoto() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Get user profile from Firestore
 * @param uid - User ID
 * @returns Promise<UserProfile | null>
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  console.log('[FIREBASE-USERS] getUserProfile() chamado', { uid });
  
  if (!db) {
    console.error('[FIREBASE-USERS] getUserProfile() - Firestore não inicializado');
    throw new Error('Firestore not initialized');
  }

  try {
    console.log('[FIREBASE-USERS] getUserProfile() - Buscando perfil no Firestore...');
    const userRef = doc(db, 'user', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const profileData = userSnap.data() as UserProfile;
      console.log('[FIREBASE-USERS] getUserProfile() - Perfil encontrado', { 
        uid, 
        userType: profileData.userType,
        email: profileData.email
      });
      return profileData;
    } else {
      console.warn('[FIREBASE-USERS] getUserProfile() - Perfil não encontrado', { uid });
      return null;
    }
  } catch (error: unknown) {
    console.error('[FIREBASE-USERS] getUserProfile() - Erro ao buscar perfil:', error);
    
    let errorMessage = 'Erro ao buscar perfil do usuário';
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-USERS] getUserProfile() - Código do erro:', error.code);
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      }
    }
    
    console.error('[FIREBASE-USERS] getUserProfile() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Convert base64 string to File object
 * @param base64String - Base64 encoded image string
 * @param filename - Name for the file
 * @returns File object
 */
export function base64ToFile(base64String: string, filename: string = 'photo.jpg'): File {
  // Remove data URL prefix if present
  const base64Data = base64String.includes(',') 
    ? base64String.split(',')[1] 
    : base64String;
  
  // Convert base64 to binary
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  
  // Create Blob and then File
  const blob = new Blob([byteArray], { type: 'image/jpeg' });
  return new File([blob], filename, { type: 'image/jpeg' });
}

