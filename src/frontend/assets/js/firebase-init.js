// Firebase initialization (ES module via CDN)
// Load this before your non-module scripts that use the Firebase app.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, deleteUser, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";



// Your web app's Firebase configuration (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyC1hGEb47NcA4EoAJwMDJdR1w4EbrHLW2A",
  authDomain: "colmeia-test-7b418.firebaseapp.com",
  projectId: "colmeia-test-7b418",
  storageBucket: "colmeia-test-7b418.firebasestorage.app",
  messagingSenderId: "905980840417",
  appId: "1:905980840417:web:45d28b6f6fd0a1aaedaaa0",
  measurementId: "G-R8V7KTK8JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize analytics only if available in this environment
let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  // Analytics may fail on insecure origins or when blocked; keep app usable
  // eslint-disable-next-line no-console
  console.warn('Firebase analytics not initialized:', err && err.message ? err.message : err);
}

// Initialize Firestore and expose a helper to add users to the 'user' collection
let db;
try {
  db = getFirestore(app);
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('Firestore not initialized:', err && err.message ? err.message : err);
}

// Initialize Storage
let storage;
try {
  storage = getStorage(app);
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('Storage not initialized:', err && err.message ? err.message : err);
}

// Initialize Auth
let auth;
let currentUser = null; // Variável para armazenar o usuário atualmente logado
try {
  auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
      console.log("Usuário autenticado (UID):", user.uid);
    } else {
      console.log("Nenhum usuário autenticado.");
    }
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('Auth not initialized:', err && err.message ? err.message : err);
}


async function addUserToFirestore(userData) {
  if (!db) throw new Error('Firestore not available');
  const colRef = collection(db, 'user');
  // attach a server timestamp
  const payload = Object.assign({}, userData, { createdAt: serverTimestamp() });
  const docRef = await addDoc(colRef, payload);
  return docRef.id;
}

/**
 * Create a Firebase Auth user (email/password) and save profile to Firestore
 * profileData should NOT include password. This function will create the
 * auth user, then create a document in /user/{uid} with profileData.
 */
async function uploadProfilePicture(uid, file) {
  if (!storage) throw new Error('Storage not available');
  if (!file) return null;

  const filename = `${Date.now()}_${file.name}`;
  const ref = storageRef(storage, `user_photos/${uid}/${filename}`);
  // uploadBytes accepts a Blob/File
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  return url;
}

async function createAuthUserAndProfile(email, password,name, profileData = {}, photoFile = null) {
  if (!db) throw new Error('Firestore not available');
  if (!auth) throw new Error('Auth not initialized');

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const currentUser = userCredential.user;
  const uid = userCredential.user.uid;

 await updateProfile(currentUser, {
    displayName: name
  });

  const profile = Object.assign({}, profileData);

  // Debug: log auth creation result
  try {
    // print basic info to help debug permission issues
    // eslint-disable-next-line no-console
    console.info('Auth user created:', { uid, email: userCredential.user.email });
    // attempt to get ID token to ensure auth token is present
    try {
      const token = await userCredential.user.getIdToken();
      // eslint-disable-next-line no-console
      console.debug('Auth ID token length:', token ? token.length : 0);
    } catch (tokErr) {
      // eslint-disable-next-line no-console
      console.warn('Could not obtain ID token directly after signup:', tokErr && tokErr.message ? tokErr.message : tokErr);
    }
  } catch (dbgErr) {
    // eslint-disable-next-line no-console
    console.warn('Debug logging failed:', dbgErr && dbgErr.message ? dbgErr.message : dbgErr);
  }

  // If a photo file was provided and Storage is available, upload and attach URL
  if (photoFile && storage) {
    try {
      const photoUrl = await uploadProfilePicture(uid, photoFile);
      if (photoUrl) profile.photo = [photoUrl];
    } catch (err) {
      // non-fatal: warn and continue to create profile without photo
      // eslint-disable-next-line no-console
      console.warn('Profile photo upload failed:', err && err.message ? err.message : err);
    }
  }

  profile.createdAt = serverTimestamp();
  try {
    await setDoc(doc(db, 'user', uid), profile);
    // eslint-disable-next-line no-console
    console.info('Profile written to Firestore for uid:', uid);
  } catch (fireErr) {
    // eslint-disable-next-line no-console
    console.error('Failed to write profile to Firestore for uid:', uid, fireErr);
    // Attempt to rollback: delete the newly created Auth user to avoid leaving a half-created account
    try {
      // eslint-disable-next-line no-console
      console.info('Attempting to delete Auth user due to Firestore write failure:', uid);
      await deleteUser(userCredential.user);
      // eslint-disable-next-line no-console
      console.info('Deleted Auth user after Firestore failure:', uid);
      try {
        await signOut(auth);
      } catch (soErr) {
        // eslint-disable-next-line no-console
        console.warn('Sign-out after deleting user failed (non-fatal):', soErr && soErr.message ? soErr.message : soErr);
      }
    } catch (delErr) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete Auth user after Firestore write failure:', uid, delErr);
      // If deletion failed, we still rethrow the original Firestore error so caller knows write failed
    }
    throw fireErr; // rethrow so callers can show error
  }
  return uid;
}

/**
 * Create a new location document in Firestore and upload its photos
 * @param {FormData} formData - Form data containing location details and photos
 * @returns {Promise<string>} The ID of the created document
 */

async function createLocation(formData) {
  
  if (!db || !storage) {
        console.error('Erro: Firebase services not available.');
        throw new Error('Firebase services not available');
    }

    const user = auth.currentUser; 
    if (!user) {
        console.error('Erro: Nenhum usuário autenticado para criar um local.');
        throw new Error('Você precisa estar logado para cadastrar um local.');
    }

    const name = formData.get('name') || '';
    const address = formData.get('address') || '';
    const type = formData.get('type') || '';
    const rentCents = parseInt(formData.get('rentCents'), 10) || 0;
    const description = formData.get('description') || '';
    const photos = formData.getAll('photos') || [];

    const photoUrls = [];
    const uploadedRefs = [];

    try {
        // upload photos (se houver)
        for (const photo of photos) {
            if (!(photo instanceof Blob)) continue;
            const filename = `${Date.now()}_${(photo.name || 'photo').replace(/\s+/g, '_')}`;
            const photoRef = storageRef(storage, `location_photos/${filename}`);
            await uploadBytes(photoRef, photo);
            uploadedRefs.push(photoRef);
            const url = await getDownloadURL(photoRef);
            photoUrls.push(url);
        }

        const locationData = {
            name,
            address,
            type,
            rentCents,
            description,
            photos: photoUrls,
            createdAt: serverTimestamp(),
            owner: user.uid
        };

        const docRef = await addDoc(collection(db, 'locals'), locationData);''

        return docRef.id;
    } catch (err) {
        // tenta remover arquivos já enviados (melhor esforço)
        for (const ref of uploadedRefs) {
            try {
                if (typeof deleteObject === 'function') {
                    await deleteObject(ref);
                }
            } catch (cleanupErr) {
                console.warn('Falha ao remover foto durante rollback:', cleanupErr);
            }
        }
        throw err;
    }
}

// Expose for non-module scripts
window.firebaseApp = app;
window.firebaseAnalytics = analytics;
window.addUserToFirestore = addUserToFirestore;
// Sign-in helper: returns userCredential
async function signIn(email, password) {
  if (!auth) throw new Error('Auth not initialized');
  return await signInWithEmailAndPassword(auth, email, password);
}
async function logout() {
  if (!auth) throw new Error('Auth not initialized');
  return signOut(auth)
    .then(() => {
      console.log("Usuário deslogado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao deslogar:", error);
    });
}
async function listenToUserChanges(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

window.signIn = signIn;
window.logout = logout;
window.listenToUserChanges = listenToUserChanges;
window.createAuthUserAndProfile = createAuthUserAndProfile;
window.createLocation = createLocation;

// Export for module usage as well
export { app, analytics, db, addUserToFirestore, createAuthUserAndProfile, createLocation };

// Helpful debug log
// eslint-disable-next-line no-console
console.info('Firebase initialized (assets/js/firebase-init.js)');
