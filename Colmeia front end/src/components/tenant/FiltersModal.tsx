import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { X } from 'lucide-react';

export interface FilterValues {
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  propertyName: string;
  ownerName: string;
}

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
  initialFilters: FilterValues;
}

export function FiltersModal({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
}: FiltersModalProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  const propertyTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'kitnet', label: 'Kitnet' },
    { value: 'studio', label: 'Studio' },
    { value: 'cobertura', label: 'Cobertura' },
  ];

  const handlePriceRangeChange = (values: number[]) => {
    setFilters({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleClearFilters = () => {
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
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-amber-100">
        <DialogHeader>
          <DialogTitle className="text-amber-900">Filtros Avançados</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-amber-900">
              Localização / Endereço
            </Label>
            <Input
              id="location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl"
              placeholder="Ex: Centro, São Paulo"
            />
          </div>

          {/* Tipo de Propriedade */}
          <div className="space-y-3">
            <Label className="text-amber-900">Tipo de Propriedade</Label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFilters({ ...filters, propertyType: type.value })}
                  className={`px-4 py-2 rounded-full transition-all duration-200 ${
                    filters.propertyType === type.value
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Faixa de Preço */}
          <div className="space-y-4">
            <Label className="text-amber-900">Faixa de Preço (Valor do Aluguel)</Label>
            
            <div className="px-2">
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={handlePriceRangeChange}
                min={0}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="minPrice" className="text-amber-700/70 text-sm mb-1">
                  Valor Mínimo
                </Label>
                <Input
                  id="minPrice"
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: Number(e.target.value) })
                  }
                  className="bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl"
                  placeholder="R$ 0"
                />
              </div>
              <div className="text-amber-700/50 pt-6">até</div>
              <div className="flex-1">
                <Label htmlFor="maxPrice" className="text-amber-700/70 text-sm mb-1">
                  Valor Máximo
                </Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: Number(e.target.value) })
                  }
                  className="bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl"
                  placeholder="R$ 10.000"
                />
              </div>
            </div>

            <p className="text-amber-700/70 text-sm">
              Faixa selecionada: R$ {filters.minPrice.toLocaleString('pt-BR')} - R${' '}
              {filters.maxPrice.toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Avaliação */}
          <div className="space-y-3">
            <Label className="text-amber-900">Avaliação Mínima</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFilters({ ...filters, rating: star })}
                  className="group relative w-10 h-10 transition-transform duration-200 hover:scale-110"
                >
                  {/* Hexágono */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill={star <= filters.rating ? '#f59e0b' : '#e5e7eb'}
                      className="transition-colors duration-200"
                    />
                  </svg>
                </button>
              ))}
              <span className="text-amber-700 ml-2">
                {filters.rating > 0 ? `${filters.rating}+ estrelas` : 'Qualquer avaliação'}
              </span>
            </div>
          </div>

          {/* Nome da Propriedade */}
          <div className="space-y-2">
            <Label htmlFor="propertyName" className="text-amber-900">
              Nome da Propriedade
            </Label>
            <Input
              id="propertyName"
              value={filters.propertyName}
              onChange={(e) => setFilters({ ...filters, propertyName: e.target.value })}
              className="bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl"
              placeholder="Ex: Apartamento Luxo"
            />
          </div>

          {/* Nome do Locador */}
          <div className="space-y-2">
            <Label htmlFor="ownerName" className="text-amber-900">
              Nome do Locador
            </Label>
            <Input
              id="ownerName"
              value={filters.ownerName}
              onChange={(e) => setFilters({ ...filters, ownerName: e.target.value })}
              className="bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl"
              placeholder="Ex: João Silva"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-4 border-t border-amber-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
          >
            Limpar Filtros
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Exibir Resultados
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
