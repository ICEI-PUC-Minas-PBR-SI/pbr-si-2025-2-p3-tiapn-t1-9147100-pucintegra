// Firebase Locals Service
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
  Query,
  QueryConstraint,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  StorageReference,
} from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { db, storage, auth } from './firebase-init';

/**
 * Location data structure (from form)
 */
export interface LocationData {
  name: string;
  address: string;
  type: string;
  rentPrice: string; // Will be converted to rentCents
  description: string;
}

/**
 * Location structure in Firestore
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  type: string;
  rentCents: number; // Price in cents (integer)
  description: string;
  photos: string[]; // Array of photo URLs
  createdAt: Timestamp;
  owner: string; // UID of the owner
}

/**
 * Create a new location in Firestore and upload photos
 * @param locationData - Location data from form
 * @param photos - Array of photo files
 * @returns Promise<string> - ID of the created location document
 */
export async function createLocation(
  locationData: LocationData,
  photos: File[]
): Promise<string> {
  console.log('[FIREBASE-LOCALS] createLocation() chamado', { 
    name: locationData.name,
    address: locationData.address,
    type: locationData.type,
    rentPrice: locationData.rentPrice,
    photosCount: photos.length
  });
  
  if (!db || !storage) {
    console.error('[FIREBASE-LOCALS] createLocation() - Serviços Firebase não inicializados');
    throw new Error('Firebase services not initialized');
  }

  const user = auth?.currentUser;
  if (!user) {
    console.error('[FIREBASE-LOCALS] createLocation() - Usuário não autenticado');
    throw new Error('Você precisa estar logado para cadastrar um local');
  }

  console.log('[FIREBASE-LOCALS] createLocation() - Usuário autenticado', { uid: user.uid });

  try {
    // Convert rentPrice string to cents (integer)
    // Remove all non-digit characters except comma/dot, then convert
    const priceString = locationData.rentPrice.replace(/[^\d,.]/g, '').replace(',', '.');
    const rentCents = Math.round(parseFloat(priceString) * 100);
    console.log('[FIREBASE-LOCALS] createLocation() - Preço convertido', { 
      original: locationData.rentPrice, 
      rentCents 
    });

    if (isNaN(rentCents) || rentCents < 0) {
      console.error('[FIREBASE-LOCALS] createLocation() - Preço inválido:', rentCents);
      throw new Error('Preço inválido');
    }

    // Upload photos if provided
    const photoUrls: string[] = [];
    const uploadedRefs: StorageReference[] = [];

    try {
      console.log('[FIREBASE-LOCALS] createLocation() - Iniciando upload de fotos...', { 
        totalPhotos: photos.length 
      });
      for (const photo of photos) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(photo.type)) {
          console.warn('[FIREBASE-LOCALS] createLocation() - Tipo de arquivo inválido ignorado:', photo.type);
          continue;
        }

        // Validate file size (max 2MB as per requirements)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (photo.size > maxSize) {
          console.warn('[FIREBASE-LOCALS] createLocation() - Arquivo muito grande ignorado:', photo.name);
          continue;
        }

        const filename = `${Date.now()}_${photo.name.replace(/\s+/g, '_')}`;
        const photoRef = storageRef(storage, `location_photos/${filename}`);
        
        console.log('[FIREBASE-LOCALS] createLocation() - Fazendo upload da foto:', filename);
        await uploadBytes(photoRef, photo);
        uploadedRefs.push(photoRef);
        
        const url = await getDownloadURL(photoRef);
        photoUrls.push(url);
        console.log('[FIREBASE-LOCALS] createLocation() - Foto enviada com sucesso:', url);
      }
      console.log('[FIREBASE-LOCALS] createLocation() - Upload de fotos concluído', { 
        uploadedCount: photoUrls.length 
      });
    } catch (photoError: unknown) {
      console.error('[FIREBASE-LOCALS] createLocation() - Erro no upload de fotos:', photoError);
      // Rollback: delete already uploaded photos
      console.log('[FIREBASE-LOCALS] createLocation() - Fazendo rollback das fotos enviadas...');
      for (const ref of uploadedRefs) {
        try {
          await deleteObject(ref);
        } catch (cleanupError) {
          console.warn('[FIREBASE-LOCALS] createLocation() - Erro ao deletar foto no rollback:', cleanupError);
        }
      }
      const errorMessage = photoError instanceof Error ? photoError.message : 'Erro desconhecido';
      throw new Error('Erro ao fazer upload das fotos: ' + errorMessage);
    }

    // Create location document in Firestore
    const locationDoc = {
      name: locationData.name,
      address: locationData.address,
      type: locationData.type,
      rentCents: rentCents,
      description: locationData.description,
      photos: photoUrls,
      createdAt: serverTimestamp(),
      owner: user.uid,
    };

    console.log('[FIREBASE-LOCALS] createLocation() - Criando documento no Firestore...', locationDoc);
    const docRef = await addDoc(collection(db, 'locals'), locationDoc);
    console.log('[FIREBASE-LOCALS] createLocation() - Local criado com sucesso no Firestore', { 
      id: docRef.id 
    });

    return docRef.id;
  } catch (error: unknown) {
    console.error('[FIREBASE-LOCALS] createLocation() - Erro ao criar local:', error);
    
    let errorMessage = 'Erro ao cadastrar local';
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-LOCALS] createLocation() - Código do erro:', error.code);
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.error('[FIREBASE-LOCALS] createLocation() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Get all locations from Firestore
 * @returns Promise<Location[]>
 */
export async function getLocations(): Promise<Location[]> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const locationsRef = collection(db, 'locals');
    const q = query(locationsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const locations: Location[] = [];
    querySnapshot.forEach((doc) => {
      locations.push({
        id: doc.id,
        ...doc.data(),
      } as Location);
    });

    return locations;
  } catch (error: unknown) {
    console.error('Error getting locations:', error);
    
    let errorMessage = 'Erro ao buscar locais';
    if (error instanceof FirebaseError) {
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      }
    }
    
    throw new Error(errorMessage);
  }
}

/**
 * Get locations by owner ID
 * @param ownerId - UID of the owner
 * @returns Promise<Location[]>
 */
export async function getLocationsByOwner(ownerId: string): Promise<Location[]> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const locationsRef = collection(db, 'locals');
    const q = query(
      locationsRef,
      where('owner', '==', ownerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const locations: Location[] = [];
    querySnapshot.forEach((doc) => {
      locations.push({
        id: doc.id,
        ...doc.data(),
      } as Location);
    });

    return locations;
  } catch (error: unknown) {
    console.error('Error getting locations by owner:', error);
    
    let errorMessage = 'Erro ao buscar locais do proprietário';
    if (error instanceof FirebaseError) {
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      }
    }
    
    throw new Error(errorMessage);
  }
}

/**
 * Get a single location by ID
 * @param locationId - Document ID of the location
 * @returns Promise<Location | null>
 */
export async function getLocationById(locationId: string): Promise<Location | null> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  try {
    const locationRef = doc(db, 'locals', locationId);
    const locationSnap = await getDoc(locationRef);

    if (locationSnap.exists()) {
      return {
        id: locationSnap.id,
        ...locationSnap.data(),
      } as Location;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.error('Error getting location by ID:', error);
    
    let errorMessage = 'Erro ao buscar local';
    if (error instanceof FirebaseError) {
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      }
    }
    
    throw new Error(errorMessage);
  }
}

/**
 * Location filters interface for querying locations
 */
export interface LocationFilters {
  /** Type of location ('all' or specific type like 'Apartamento', 'Casa', etc.) */
  type?: string;
  /** Minimum price in cents (rentCents) */
  minPrice?: number;
  /** Maximum price in cents (rentCents) */
  maxPrice?: number;
  /** Location text for client-side filtering (address search) */
  location?: string;
}

/**
 * Get locations from Firestore with optional filters
 * @param filters - Optional filters for type, price range, and location
 * @returns Promise<Location[]> - Array of locations matching the filters
 */
export async function getLocationsWithFilters(
  filters?: LocationFilters
): Promise<Location[]> {
  console.log('[FIREBASE-LOCALS] getLocationsWithFilters() chamado', { filters });
  
  if (!db) {
    console.error('[FIREBASE-LOCALS] getLocationsWithFilters() - Firestore não inicializado');
    throw new Error('Firestore not initialized');
  }

  try {
    const locationsRef = collection(db, 'locals');
    const constraints: QueryConstraint[] = [];

    // Apply type filter if provided and not 'all'
    if (filters?.type && filters.type !== 'all') {
      constraints.push(where('type', '==', filters.type));
      console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Filtro de tipo aplicado:', filters.type);
    }

    // Apply price filters if provided
    if (filters?.minPrice !== undefined && filters.minPrice > 0) {
      constraints.push(where('rentCents', '>=', filters.minPrice));
      console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Filtro de preço mínimo aplicado:', filters.minPrice);
    }
    if (filters?.maxPrice !== undefined && filters.maxPrice > 0) {
      constraints.push(where('rentCents', '<=', filters.maxPrice));
      console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Filtro de preço máximo aplicado:', filters.maxPrice);
    }

    // Always order by createdAt descending
    constraints.push(orderBy('createdAt', 'desc'));

    console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Buscando locais no Firestore...', { 
      constraintsCount: constraints.length 
    });
    const q: Query = query(locationsRef, ...constraints);

    const querySnapshot = await getDocs(q);
    const locations: Location[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Location, 'id'>;
      locations.push({
        id: doc.id,
        ...data,
      } as Location);
    });

    console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Locais encontrados:', { 
      count: locations.length 
    });

    // Apply client-side location filter if provided
    if (filters?.location && filters.location.trim() !== '') {
      console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Aplicando filtro de localização no cliente:', filters.location);
      const filtered = filterByLocation(locations, filters.location);
      console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Locais após filtro de localização:', { 
        count: filtered.length 
      });
      return filtered;
    }

    console.log('[FIREBASE-LOCALS] getLocationsWithFilters() - Retornando locais:', { 
      count: locations.length 
    });
    return locations;
  } catch (error: unknown) {
    console.error('[FIREBASE-LOCALS] getLocationsWithFilters() - Erro ao buscar locais:', error);

    let errorMessage = 'Erro ao buscar locais';
    if (error instanceof FirebaseError) {
      console.error('[FIREBASE-LOCALS] getLocationsWithFilters() - Código do erro:', error.code);
      if (error.code === 'permission-denied') {
        errorMessage = 'Permissão negada. Verifique as regras de segurança do Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Erro de conexão. Tente novamente';
      }
    }

    console.error('[FIREBASE-LOCALS] getLocationsWithFilters() - Erro final:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Filter locations by address (client-side, case-insensitive)
 * @param locations - Array of locations to filter
 * @param locationText - Text to search in address field
 * @returns Filtered array of locations
 */
export function filterByLocation(locations: Location[], locationText: string): Location[] {
  if (!locationText || locationText.trim() === '') {
    return locations;
  }

  const searchText = locationText.toLowerCase().trim();
  return locations.filter((location) =>
    location.address.toLowerCase().includes(searchText)
  );
}

/**
 * Convert Location (Firestore) to Property (UI component)
 * @param location - Location from Firestore
 * @returns Property object for UI display
 */
export function locationToProperty(location: Location): {
  id: string;
  name: string;
  address: string;
  propertyType: string;
  price: string;
  rating: number;
  image?: string;
} {
  return {
    id: location.id,
    name: location.name,
    address: location.address,
    propertyType: location.type,
    price: formatPrice(location.rentCents),
    rating: 0, // Default rating, as it doesn't exist in Firestore yet
    image: location.photos && location.photos.length > 0 ? location.photos[0] : undefined,
  };
}

/**
 * Convert rentCents (integer) to formatted price string (BRL)
 * @param rentCents - Price in cents
 * @returns Formatted price string (e.g., "R$ 1.500,00")
 */
export function formatPrice(rentCents: number): string {
  const reais = rentCents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(reais);
}

