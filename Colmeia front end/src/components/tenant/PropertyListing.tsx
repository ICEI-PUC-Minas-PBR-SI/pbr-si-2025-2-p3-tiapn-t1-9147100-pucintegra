import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { PropertyCard, Property } from './PropertyCard';
import { FiltersModal, FilterValues } from './FiltersModal';
import { Search, SlidersHorizontal, X, LogOut, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import {
  getLocationsWithFilters,
  locationToProperty,
  LocationFilters,
  Location,
} from '../../services/firebase-locals';

interface PropertyListingProps {
  userName: string;
  onLogout: () => void;
  onSelectProperty: (property: Property) => void;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function PropertyListing({ userName, onLogout, onSelectProperty }: PropertyListingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    location: '',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    propertyName: '',
    ownerName: '',
  });

  // States for Firestore data
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert price from reais to cents
  const convertPriceToCents = (priceInReais: number): number => {
    return Math.round(priceInReais * 100);
  };

  // Fetch locations from Firestore
  const fetchLocations = useCallback(async (appliedFilters?: LocationFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use appliedFilters if provided, otherwise use current filters state
      const currentFilters = appliedFilters || {
        type: filters.propertyType,
        minPrice: filters.minPrice > 0 ? convertPriceToCents(filters.minPrice) : undefined,
        maxPrice:
          filters.maxPrice > 0 && filters.maxPrice < 10000
            ? convertPriceToCents(filters.maxPrice)
            : undefined,
        location: filters.location || undefined,
      };

      const fetchedLocations = await getLocationsWithFilters(currentFilters);
      setLocations(fetchedLocations);
    } catch (err: any) {
      console.error('Error fetching locations:', err);
      setError(err.message || 'Erro ao buscar locais');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convert locations to properties
  const allProperties = useMemo(() => {
    return locations.map(locationToProperty);
  }, [locations]);

  // Filter properties by search term (client-side)
  const filteredProperties = useMemo(() => {
    let filtered = allProperties;

    // Apply text search filter
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(searchLower) ||
          property.address.toLowerCase().includes(searchLower)
      );
    }

    // Apply rating filter (client-side, as rating doesn't exist in Firestore yet)
    if (filters.rating > 0) {
      filtered = filtered.filter((property) => property.rating >= filters.rating);
    }

    // Apply property name filter (client-side)
    if (filters.propertyName) {
      const nameLower = filters.propertyName.toLowerCase();
      filtered = filtered.filter((property) =>
        property.name.toLowerCase().includes(nameLower)
      );
    }

    // Note: Type, price, and location filters are already applied in Firestore query
    // via fetchLocations

    return filtered;
  }, [allProperties, debouncedSearchTerm, filters.rating, filters.propertyName]);

  // Verificar se há filtros ativos
  const hasActiveFilters =
    filters.location ||
    filters.propertyType !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000 ||
    filters.rating > 0 ||
    filters.propertyName ||
    filters.ownerName ||
    searchTerm;

  const activeFiltersCount = [
    filters.location,
    filters.propertyType !== 'all',
    filters.minPrice > 0,
    filters.maxPrice < 10000,
    filters.rating > 0,
    filters.propertyName,
    filters.ownerName,
    searchTerm,
  ].filter(Boolean).length;

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    // Convert price filters to cents and fetch from Firestore
    const firestoreFilters: LocationFilters = {
      type: newFilters.propertyType,
      minPrice: newFilters.minPrice > 0 ? convertPriceToCents(newFilters.minPrice) : undefined,
      maxPrice:
        newFilters.maxPrice > 0 && newFilters.maxPrice < 10000
          ? convertPriceToCents(newFilters.maxPrice)
          : undefined,
      location: newFilters.location || undefined,
    };
    fetchLocations(firestoreFilters);
  };

  const handleClearAllFilters = () => {
    const clearedFilters: FilterValues = {
      location: '',
      propertyType: 'all',
      minPrice: 0,
      maxPrice: 10000,
      rating: 0,
      propertyName: '',
      ownerName: '',
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    // Fetch all locations without filters
    fetchLocations({
      type: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      location: undefined,
    });
  };

  const handleRetry = () => {
    fetchLocations();
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-amber-900 mb-1">
              {hasActiveFilters || searchTerm
                ? `Resultados da Busca ${searchTerm ? `"${searchTerm}"` : ''}`
                : 'Encontre seu Lar Ideal'}
            </h1>
            <p className="text-amber-700/70">
              {isLoading ? (
                'Carregando...'
              ) : (
                <>
                  {filteredProperties.length}{' '}
                  {filteredProperties.length === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
                </>
              )}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Barra de Busca */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 bg-white border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl h-12"
              placeholder="Buscar por localização ou nome do imóvel..."
            />
          </div>
          <Button
            onClick={() => setIsFiltersOpen(true)}
            variant="outline"
            className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl h-12 px-6 relative"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filtros
            {hasActiveFilters && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-xs">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Badge de Filtros Ativos */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-amber-100">
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-sm hover:from-amber-200 hover:to-yellow-200 transition-all duration-200"
            >
              {activeFiltersCount} {activeFiltersCount === 1 ? 'Filtro Aplicado' : 'Filtros Aplicados'}
            </button>
            <button
              onClick={handleClearAllFilters}
              className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors duration-200"
              title="Limpar todos os filtros"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 overflow-hidden"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-red-900 mb-3">Erro ao carregar locais</h2>
          <p className="text-red-700/70 mb-6">{error}</p>
          <Button
            onClick={handleRetry}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      )}

      {/* Listagem de Imóveis */}
      {!isLoading && !error && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={(property) => onSelectProperty(property)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredProperties.length === 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-amber-900 mb-3">Nenhum resultado encontrado</h2>
          <p className="text-amber-700/70 mb-6">
            {hasActiveFilters
              ? 'Não encontramos imóveis que correspondam aos seus critérios de busca.'
              : 'Ainda não há locais cadastrados.'}
          </p>
          {hasActiveFilters && (
            <Button
              onClick={handleClearAllFilters}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
            >
              Limpar Filtros
            </Button>
          )}
        </div>
      )}

      {/* Modal de Filtros */}
      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
    </div>
  );
}
