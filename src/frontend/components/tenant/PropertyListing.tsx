import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { PropertyCard, Property } from './PropertyCard';
import { FiltersModal, FilterValues } from './FiltersModal';
import { ProfileDropdown } from '../shared/ProfileDropdown';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface PropertyListingProps {
  userName: string;
  onLogout: () => void;
  onSelectProperty: (property: Property) => void;
  onViewReservations?: () => void;
}

export function PropertyListing({ userName, onLogout, onSelectProperty, onViewReservations }: PropertyListingProps) {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Mock data de imóveis
  const allProperties: Property[] = [
    {
      id: 1,
      name: 'Apartamento Moderno Centro',
      address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
      propertyType: 'Apartamento',
      price: 'R$ 2.500,00',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI4MTc3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Casa Luxuosa Jardim Europa',
      address: 'Av. Europa, 456 - Jardim Europa, São Paulo - SP',
      propertyType: 'Casa',
      price: 'R$ 8.500,00',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Mjc5MjY4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Studio Aconchegante Vila Madalena',
      address: 'Rua Harmonia, 789 - Vila Madalena, São Paulo - SP',
      propertyType: 'Studio',
      price: 'R$ 1.800,00',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1507138451611-3001135909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwc3R1ZGlvJTIwYXBhcnRtZW50fGVufDF8fHx8MTc2Mjc3NzIxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      name: 'Apartamento Elegante Pinheiros',
      address: 'Rua dos Pinheiros, 321 - Pinheiros, São Paulo - SP',
      propertyType: 'Apartamento',
      price: 'R$ 3.200,00',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1698849071904-090feee32e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaG9tZSUyMGludGVyaW9yfGVufDF8fHx8MTc2Mjg3NjQ3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      name: 'Kitnet Compacta Consolação',
      address: 'Rua da Consolação, 555 - Consolação, São Paulo - SP',
      propertyType: 'Kitnet',
      price: 'R$ 1.200,00',
      rating: 3.5,
    },
    {
      id: 6,
      name: 'Cobertura Vista Panorâmica',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      propertyType: 'Cobertura',
      price: 'R$ 12.000,00',
      rating: 5.0,
    },
  ];

  // Função de filtragem
  const getFilteredProperties = () => {
    return allProperties.filter((property) => {
      // Filtro de busca por texto
      const matchesSearch =
        !searchTerm ||
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de localização
      const matchesLocation =
        !filters.location ||
        property.address.toLowerCase().includes(filters.location.toLowerCase());

      // Filtro de tipo de propriedade
      const matchesType =
        filters.propertyType === 'all' ||
        property.propertyType.toLowerCase() === filters.propertyType.toLowerCase();

      // Filtro de preço
      const priceValue = parseFloat(property.price.replace(/[^\d,]/g, '').replace(',', '.'));
      const matchesPrice =
        priceValue >= filters.minPrice && priceValue <= filters.maxPrice;

      // Filtro de avaliação
      const matchesRating = property.rating >= filters.rating;

      // Filtro de nome da propriedade
      const matchesPropertyName =
        !filters.propertyName ||
        property.name.toLowerCase().includes(filters.propertyName.toLowerCase());

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesPrice &&
        matchesRating &&
        matchesPropertyName
      );
    });
  };

  const filteredProperties = getFilteredProperties();

  // Verificar se há filtros ativos
  const hasActiveFilters =
    filters.location ||
    filters.propertyType !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 10000 ||
    filters.rating > 0 ||
    filters.propertyName ||
    filters.ownerName;

  const activeFiltersCount = [
    filters.location,
    filters.propertyType !== 'all',
    filters.minPrice > 0,
    filters.maxPrice < 10000,
    filters.rating > 0,
    filters.propertyName,
    filters.ownerName,
  ].filter(Boolean).length;

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      location: '',
      propertyType: 'all',
      minPrice: 0,
      maxPrice: 10000,
      rating: 0,
      propertyName: '',
      ownerName: '',
    });
    setSearchTerm('');
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
              {filteredProperties.length}{' '}
              {filteredProperties.length === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
            </p>
          </div>
          <ProfileDropdown
            userName={userName}
            userType="locatario"
            onLogout={onLogout}
            onViewReservations={onViewReservations}
          />
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

      {/* Listagem de Imóveis */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={(property) => onSelectProperty(property)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-amber-900 mb-3">Nenhum resultado encontrado</h2>
          <p className="text-amber-700/70 mb-6">
            Não encontramos imóveis que correspondam aos seus critérios de busca.
          </p>
          <Button
            onClick={handleClearAllFilters}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
          >
            Limpar Filtros
          </Button>
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