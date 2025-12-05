import { Card } from '../ui/card';
import { MapPin, Star } from 'lucide-react';

export interface Property {
  id: number;
  name: string;
  address: string;
  propertyType: string;
  price: string;
  rating: number;
  image?: string;
}

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <Card
      onClick={() => onClick?.(property)}
      className="bg-white/80 backdrop-blur-sm border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      {/* Imagem do Imóvel */}
      <div className="relative h-48 bg-gradient-to-br from-amber-100 to-yellow-100 overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Padrão hexagonal sutil */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30"
            >
              <path
                d="M50 10L80 27.5V62.5L50 80L20 62.5V27.5L50 10Z"
                stroke="#f59e0b"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M50 25L70 37.5V62.5L50 75L30 62.5V37.5L50 25Z"
                stroke="#fbbf24"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        )}
        
        {/* Badge de Tipo */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-700 rounded-full text-sm">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="p-5">
        <h3 className="text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
          {property.name}
        </h3>

        <div className="flex items-start gap-2 text-amber-700/70 mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
          <p className="text-sm line-clamp-2">{property.address}</p>
        </div>

        <div className="flex items-center justify-between">
          {/* Preço */}
          <div>
            <p className="text-amber-900">{property.price}</p>
            <p className="text-amber-700/60 text-sm">por mês</p>
          </div>

          {/* Avaliação com Estrelas Hexagonais */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="relative w-5 h-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill={index < Math.floor(property.rating) ? '#f59e0b' : '#e5e7eb'}
                    className="transition-colors duration-200"
                  />
                </svg>
              </div>
            ))}
            <span className="text-sm text-amber-700 ml-1">
              {property.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
