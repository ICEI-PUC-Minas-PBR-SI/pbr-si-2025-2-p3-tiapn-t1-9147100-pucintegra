// Firebase initialization for React/TypeScript
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

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
let app: FirebaseApp;
let analytics: Analytics | null = null;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

try {
  app = initializeApp(firebaseConfig);
  console.info('Firebase app initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase app:', error);
  throw error;
}

// Initialize Analytics (only if available in this environment)
try {
  analytics = getAnalytics(app);
  console.info('Firebase Analytics initialized');
} catch (err) {
  // Analytics may fail on insecure origins or when blocked; keep app usable
  console.warn('Firebase Analytics not initialized:', err instanceof Error ? err.message : err);
}

// Initialize Firestore
try {
  db = getFirestore(app);
  console.info('Firestore initialized successfully');
} catch (err) {
  console.error('Error initializing Firestore:', err);
  throw err;
}

// Initialize Storage
try {
  storage = getStorage(app);
  console.info('Firebase Storage initialized successfully');
} catch (err) {
  console.error('Error initializing Storage:', err);
  throw err;
}

// Initialize Auth
try {
  auth = getAuth(app);
  console.info('Firebase Auth initialized successfully');
} catch (err) {
  console.error('Error initializing Auth:', err);
  throw err;
}

// Export instances for use throughout the app
export { app, analytics, db, auth, storage };
export default app;

