import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Calendar, MapPin, Star, CheckCircle, User, Home } from 'lucide-react';

export interface TenantToRate {
  id: number;
  tenantName: string;
  propertyId: number;
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'pending' | 'rated';
  rating?: number;
}

interface LandlordRatingsProps {
  onBack: () => void;
  onRateTenant: (tenant: TenantToRate) => void;
}

export function LandlordRatings({ onBack, onRateTenant }: LandlordRatingsProps) {
  const [tenantsToRate] = useState<TenantToRate[]>([
    {
      id: 1,
      tenantName: 'Maria Silva',
      propertyId: 1,
      propertyName: 'Apartamento Moderno Centro',
      checkInDate: '2025-11-15',
      checkOutDate: '2025-11-17',
      status: 'pending'
    },
    {
      id: 2,
      tenantName: 'João Santos',
      propertyId: 2,
      propertyName: 'Casa Luxuosa Jardim Europa',
      checkInDate: '2025-11-01',
      checkOutDate: '2025-11-03',
      status: 'rated',
      rating: 9
    },
    {
      id: 3,
      tenantName: 'Ana Costa',
      propertyId: 3,
      propertyName: 'Studio Aconchegante Vila Madalena',
      checkInDate: '2025-10-20',
      checkOutDate: '2025-10-22',
      status: 'pending'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const pendingRatings = tenantsToRate.filter(t => t.status === 'pending');
  const completedRatings = tenantsToRate.filter(t => t.status === 'rated');

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
          <h1 className="text-amber-900 mb-2">Avaliar Locatários na Colmeia</h1>
          <p className="text-amber-700/70">Avalie seus locatários e contribua para a reputação da comunidade</p>
        </div>
      </Card>

      {/* Locatários Pendentes de Avaliação */}
      {pendingRatings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-amber-900 mb-4">Pendentes de Avaliação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRatings.map((tenant) => (
              <Card
                key={tenant.id}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Locação Concluída
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-sm flex items-center gap-2 animate-pulse">
                      <Star className="w-4 h-4" />
                      Avaliar
                    </span>
                  </div>

                  {/* Nome do Locatário */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-amber-900">Locatário</h3>
                      <p className="text-amber-700/70 text-sm">{tenant.tenantName}</p>
                    </div>
                  </div>

                  {/* Imóvel Locado */}
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-amber-700/70 text-sm">{tenant.propertyName}</p>
                  </div>

                  {/* Período da Locação */}
                  <div className="flex items-center gap-2 mb-6 text-amber-700/70 text-sm">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                      {formatDate(tenant.checkInDate)} - {formatDate(tenant.checkOutDate)}
                    </span>
                  </div>

                  {/* Botão de Avaliação */}
                  <Button
                    onClick={() => onRateTenant(tenant)}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-auto"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Avaliar Locatário
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Avaliações Já Enviadas */}
      {completedRatings.length > 0 && (
        <div>
          <h2 className="text-amber-900 mb-4">Avaliações Enviadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedRatings.map((tenant) => (
              <Card
                key={tenant.id}
                className="bg-white/80 border-green-200 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Avaliado
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (tenant.rating || 0) / 2
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-amber-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Nome do Locatário */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-amber-900">Locatário</h3>
                      <p className="text-amber-700/70 text-sm">{tenant.tenantName}</p>
                    </div>
                  </div>

                  {/* Imóvel Locado */}
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-amber-700/70 text-sm">{tenant.propertyName}</p>
                  </div>

                  {/* Período da Locação */}
                  <div className="flex items-center gap-2 text-amber-700/70 text-sm">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                      {formatDate(tenant.checkInDate)} - {formatDate(tenant.checkOutDate)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {tenantsToRate.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-amber-900 mb-3">Nenhum locatário para avaliar</h2>
          <p className="text-amber-700/70">
            Quando suas locações forem concluídas, você poderá avaliar os locatários aqui.
          </p>
        </Card>
      )}
    </div>
  );
}
