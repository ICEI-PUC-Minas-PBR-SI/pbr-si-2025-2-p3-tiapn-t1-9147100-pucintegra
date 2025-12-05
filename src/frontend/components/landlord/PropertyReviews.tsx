import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Star, Calendar, User, Hexagon, MessageSquare, TrendingUp, Home } from 'lucide-react';

interface PropertyReview {
  id: number;
  tenantName: string;
  rating: number;
  description: string;
  date: string;
}

interface PropertyWithReviews {
  id: number;
  name: string;
  address: string;
  averageRating: number;
  totalReviews: number;
  reviews: PropertyReview[];
}

interface PropertyReviewsProps {
  onBack: () => void;
}

export function PropertyReviews({ onBack }: PropertyReviewsProps) {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  
  // Mock data de imóveis com avaliações
  const [properties] = useState<PropertyWithReviews[]>([
    {
      id: 1,
      name: 'Apartamento Moderno Centro',
      address: 'Rua Augusta, 1234 - São Paulo, SP',
      averageRating: 9.0,
      totalReviews: 3,
      reviews: [
        {
          id: 1,
          tenantName: 'Maria Silva',
          rating: 10,
          description: 'Local excepcional! Tudo estava impecável, a localização é perfeita e o atendimento foi super atencioso. Recomendo muito!',
          date: '2025-11-20'
        },
        {
          id: 2,
          tenantName: 'João Santos',
          rating: 9,
          description: 'Muito bom! O apartamento é moderno e bem equipado. Apenas uma pequena observação sobre o barulho da rua, mas nada que atrapalhasse.',
          date: '2025-11-15'
        },
        {
          id: 3,
          tenantName: 'Ana Costa',
          rating: 8,
          description: 'Boa experiência! Local limpo e organizado. A internet poderia ser mais rápida, mas no geral foi ótimo.',
          date: '2025-11-10'
        }
      ]
    },
    {
      id: 2,
      name: 'Casa Luxuosa Jardim Europa',
      address: 'Av. Europa, 456 - São Paulo, SP',
      averageRating: 10.0,
      totalReviews: 1,
      reviews: [
        {
          id: 4,
          tenantName: 'Pedro Oliveira',
          rating: 10,
          description: 'Casa perfeita! Superou todas as expectativas. Luxuosa, limpa e com uma localização privilegiada.',
          date: '2025-11-18'
        }
      ]
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const property = properties.find(p => p.id === selectedProperty);

  if (selectedProperty && property) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6 mb-6">
          <button
            onClick={() => setSelectedProperty(null)}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos imóveis
          </button>
          <div>
            <h1 className="text-amber-900 mb-2">{property.name}</h1>
            <p className="text-amber-700/70">{property.address}</p>
          </div>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-amber-700 text-sm">Nota Média</p>
                <p className="text-amber-900">{property.averageRating.toFixed(1)}/10</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-amber-700 text-sm">Total de Avaliações</p>
                <p className="text-amber-900">{property.totalReviews}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-amber-700 text-sm">Performance</p>
                <p className="text-amber-900">
                  {property.averageRating >= 9 ? 'Excepcional' : property.averageRating >= 7 ? 'Muito Bom' : 'Bom'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de Avaliações */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6">
          <h2 className="text-amber-900 mb-6">Todas as Avaliações</h2>
          <div className="space-y-4">
            {property.reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors duration-200"
              >
                {/* Header da Avaliação */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative w-10 h-10">
                      <Hexagon className="w-10 h-10 text-amber-500 fill-amber-100" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="w-5 h-5 text-amber-700" />
                      </div>
                    </div>
                    <div>
                      <p className="text-amber-900">{review.tenantName}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= review.rating / 2
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-amber-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-amber-700 text-sm">{review.rating}/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-amber-700/70 leading-relaxed">{review.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </button>
        <div>
          <h1 className="text-amber-900 mb-2">Avaliações dos Meus Locais</h1>
          <p className="text-amber-700/70">Veja o feedback dos seus locatários</p>
        </div>
      </Card>

      {/* Lista de Imóveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="bg-white/80 backdrop-blur-sm border-amber-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedProperty(property.id)}
          >
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-white" />
              </div>

              {/* Informações */}
              <div className="flex-1">
                <h3 className="text-amber-900 mb-1">{property.name}</h3>
                <p className="text-amber-700/70 text-sm mb-3">{property.address}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-amber-900">{property.averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-amber-600">•</span>
                  <span className="text-amber-700/70 text-sm">
                    {property.totalReviews} {property.totalReviews === 1 ? 'avaliação' : 'avaliações'}
                  </span>
                </div>

                {/* Badge de Performance */}
                <div className="inline-flex px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm">
                  {property.averageRating >= 9 ? '🏆 Excepcional' : property.averageRating >= 7 ? '⭐ Muito Bom' : '👍 Bom'}
                </div>
              </div>

              {/* Arrow */}
              <div className="text-amber-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Estado Vazio */}
      {properties.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-amber-900 mb-3">Nenhuma avaliação ainda</h2>
          <p className="text-amber-700/70">
            Quando seus locatários avaliarem seus locais, as avaliações aparecerão aqui.
          </p>
        </Card>
      )}
    </div>
  );
}
