import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar, 
  User, 
  Hexagon,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { Property } from './PropertyCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface PropertyReview {
  id: number;
  tenantName: string;
  rating: number;
  description: string;
  date: string;
}

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
  onBook: () => void;
}

export function PropertyDetails({ property, onBack, onBook }: PropertyDetailsProps) {
  // Mock data de avaliações
  const [reviews] = useState<PropertyReview[]>([
    {
      id: 1,
      tenantName: 'Maria Silva',
      rating: 10,
      description: 'Local excepcional! Tudo estava impecável, a localização é perfeita e o anfitrião foi super atencioso. Recomendo muito!',
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
  ]);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // 1-2, 3-4, 5-6, 7-8, 9-10
    reviews.forEach(review => {
      if (review.rating <= 2) distribution[0]++;
      else if (review.rating <= 4) distribution[1]++;
      else if (review.rating <= 6) distribution[2]++;
      else if (review.rating <= 8) distribution[3]++;
      else distribution[4]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar à busca
        </button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagem e Informações Básicas */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl overflow-hidden">
            {/* Imagem */}
            {property.image && (
              <div className="relative h-96 overflow-hidden">
                <ImageWithFallback
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                {/* Badge de Tipo */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                  <span className="text-amber-700">{property.propertyType}</span>
                </div>
              </div>
            )}

            {/* Informações */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-amber-900 mb-2">{property.name}</h1>
                  <div className="flex items-start gap-2 text-amber-700/70">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-amber-600" />
                    <p>{property.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-amber-900 mb-1">{property.price}</p>
                  <p className="text-amber-600 text-sm">por mês</p>
                </div>
              </div>

              {/* Rating Geral */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-amber-900">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-amber-600">•</span>
                <span className="text-amber-700/70">
                  {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
                </span>
              </div>
            </div>
          </Card>

          {/* Seção de Avaliações Recentes */}
          <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-amber-900">Avaliações Recentes</h2>
              </div>

              {/* Resumo Estatístico */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Nota Média */}
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                  <div className="mb-3">
                    <p className="text-amber-900 mb-2">Nota Média</p>
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= averageRating / 2
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-amber-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-amber-600">{averageRating.toFixed(1)}/10</p>
                </div>

                {/* Distribuição */}
                <div className="p-6 bg-amber-50/50 rounded-xl border border-amber-200">
                  <p className="text-amber-900 mb-3">Distribuição</p>
                  <div className="space-y-2">
                    {['9-10', '7-8', '5-6', '3-4', '1-2'].map((range, index) => {
                      const count = ratingDistribution[4 - index];
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={range} className="flex items-center gap-2">
                          <span className="text-amber-700 text-sm w-10">{range}</span>
                          <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-amber-600 text-sm w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Avaliações */}
            <div className="space-y-4">
              {reviews.map((review) => (
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

            {/* Link para ver todas */}
            {reviews.length > 3 && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
                >
                  Ver todas as avaliações ({reviews.length})
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar - Card de Reserva */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-xl p-6 sticky top-6">
            <div className="mb-6">
              <h3 className="text-amber-900 mb-2">Reserve este local</h3>
              <p className="text-amber-700/70 text-sm">
                Preencha seus dados e escolha as datas
              </p>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-700">Preço mensal</span>
                <span className="text-amber-900">{property.price}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Excelente custo-benefício</span>
              </div>
            </div>

            <Button
              onClick={onBook}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Fazer Reserva
            </Button>

            {/* Informações Adicionais */}
            <div className="mt-6 pt-6 border-t border-amber-200">
              <div className="flex items-center gap-2 text-amber-700 text-sm mb-3">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Propriedade verificada</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700 text-sm">
                <Hexagon className="w-4 h-4 text-amber-500" />
                <span>Membro da Colmeia</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
